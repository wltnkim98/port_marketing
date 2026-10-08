require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const path = require('path');

// Import routes
const consultRoutes = require('./routes/consult');
const qaRoutes = require('./routes/qa');
const authRoutes = require('./routes/auth');
const { verifyEmailConnection } = require('./middleware/email');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy for Render and other hosting platforms (1 hop for Render reverse proxy)
app.set('trust proxy', 1);

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  ...(process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : [])
].map(url => url.trim().replace(/\/$/, '')).filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    
    const cleanOrigin = origin.replace(/\/$/, '');
    if (
      allowedOrigins.includes(cleanOrigin) ||
      allowedOrigins.includes('*') ||
      cleanOrigin.endsWith('.netlify.app') ||
      process.env.NODE_ENV !== 'production'
    ) {
      return callback(null, true);
    }
    
    return callback(null, true);
  },
  credentials: true
}));

// Rate limiting (exclude Q&A GET and POST endpoints)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  validate: { trustProxy: false },
  message: 'Too many requests from this IP, please try again later.',
  skip: (req) => (req.originalUrl && req.originalUrl.includes('/api/qa')) || req.path.startsWith('/qa')
});
app.use('/api/', limiter);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static files (uploads) - custom route with proper CORS
app.get('/uploads/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploads', filename);
  
  res.header('Access-Control-Allow-Origin', req.headers.origin || process.env.CLIENT_URL || 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  if (!require('fs').existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      message: '파일을 찾을 수 없습니다.'
    });
  }
  
  const ext = path.extname(filename).toLowerCase();
  let contentType = 'application/octet-stream';
  
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      contentType = 'image/jpeg';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.gif':
      contentType = 'image/gif';
      break;
    case '.webp':
      contentType = 'image/webp';
      break;
    case '.pdf':
      contentType = 'application/pdf';
      break;
  }
  
  res.contentType(contentType);
  res.sendFile(filePath);
});

// Root endpoint for Render health checks and browser test
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'MarketWith API Server',
    environment: process.env.NODE_ENV || 'development',
    time: new Date().toISOString()
  });
});

// Routes
app.use('/api/support/consult', consultRoutes);
app.use('/api/support/qa', qaRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Email configuration test endpoint
app.get('/api/health/email', async (req, res) => {
  try {
    const result = await verifyEmailConnection();
    res.json({
      success: result.success,
      provider: result.provider,
      message: result.message,
      gmailApiConfigured: Boolean(process.env.GMAIL_CLIENT_ID && process.env.GMAIL_REFRESH_TOKEN),
      smtpConfigured: Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS)
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// 404 handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `경로를 찾을 수 없습니다: ${req.method} ${req.originalUrl}`
  });
});

// Error handling middleware (Express REQUIRES exactly 4 arguments: err, req, res, next)
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('[Unhandled Error]', err.stack || err);
  res.status(err.status || 500).json({ 
    success: false, 
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  const hasGmailApi = Boolean(process.env.GMAIL_CLIENT_ID && process.env.GMAIL_REFRESH_TOKEN);
  console.log(`[Email Service] ${hasGmailApi ? 'Gmail REST API (HTTPS Port 443)' : 'Nodemailer SMTP'}`);
});
