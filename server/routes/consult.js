const express = require('express');
const router = express.Router();
const Consult = require('../models/Consult');
const { sendConsultationEmail, sendConfirmationEmail } = require('../middleware/email');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const path = require('path');
const fs = require('fs');

// @route   POST /api/consult
// @desc    Submit a new consultation request
// @access  Public
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const {
      categories,
      budget,
      preferredTime,
      company,
      name,
      role,
      phone,
      email,
      website,
      message,
      privacyAgreed
    } = req.body;

    // Parse categories from JSON string
    let parsedCategories;
    try {
      parsedCategories = categories ? JSON.parse(categories) : ['build'];
    } catch (error) {
      parsedCategories = ['build'];
    }

    // Validation
    if (!company || !name || !phone || !email) {
      return res.status(400).json({
        success: false,
        message: '필수 필드를 모두 입력해 주세요.'
      });
    }

    if (!privacyAgreed || privacyAgreed === 'false') {
      return res.status(400).json({
        success: false,
        message: '개인정보 수집 및 이용에 동의해 주세요.'
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: '올바른 이메일 형식을 입력해 주세요.'
      });
    }

    // Phone format validation (basic)
    const phoneRegex = /^[0-9\-s+]{10,20}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: '올바른 연락처 형식을 입력해 주세요.'
      });
    }

    // Create new consultation
    const newConsult = new Consult({
      categories: parsedCategories || ['build'],
      budget: budget || '미정 / 상담 후 협의',
      preferredTime: preferredTime || '항상 가능',
      company,
      name,
      role: role || '',
      phone,
      email,
      website: website || '',
      message: message || '',
      fileName: req.file ? req.file.originalname : '',
      fileSize: req.file ? req.file.size : 0,
      filePath: req.file ? req.file.path : '', // Cloudinary URL
      fileUrl: req.file ? req.file.secure_url : '', // Cloudinary secure URL
      privacyAgreed: privacyAgreed === 'true' || privacyAgreed === true,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.headers['user-agent'] || ''
    });

    // Save to database
    await newConsult.save();

    // Send emails asynchronously in background (don't wait for response)
    setImmediate(async () => {
      try {
        const [adminResult, customerResult] = await Promise.allSettled([
          sendConsultationEmail(newConsult),
          sendConfirmationEmail(newConsult)
        ]);
        console.log('Admin email status:', adminResult.status, adminResult.value);
        console.log('Customer email status:', customerResult.status, customerResult.value);
      } catch (emailErr) {
        console.error('Failed to send consultation emails:', emailErr);
      }
    });

    // Respond immediately after saving to database
    res.status(201).json({
      success: true,
      message: '상담 신청이 접수되었습니다. 영업일 기준 48시간 이내에 연락드리겠습니다.',
      data: {
        id: newConsult._id,
        company: newConsult.company,
        name: newConsult.name,
        createdAt: newConsult.createdAt
      }
    });

  } catch (error) {
    console.error('Consultation submission error:', error);
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: '이미 동일한 정보로 신청이 접수되었습니다.'
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors).map(err => err.message).join(', ')}
      );
    }

    res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
    });
  }
});

// @route   GET /api/consult
// @desc    Get all consultations (admin only)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const consultations = await Consult.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: consultations.length,
      data: consultations
    });
  } catch (error) {
    console.error('Get consultations error:', error);
    res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
});

// @route   GET /api/consult/:id
// @desc    Get single consultation by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const consultation = await Consult.findById(req.params.id);
    
    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: '상담 내역을 찾을 수 없습니다.'
      });
    }
    
    res.status(200).json({
      success: true,
      data: consultation
    });
  } catch (error) {
    console.error('Get consultation error:', error);
    res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
});

// @route   PATCH /api/consult/:id/status
// @desc    Update consultation status
// @access  Private
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    
    const consultation = await Consult.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: '상담 내역을 찾을 수 없습니다.'
      });
    }
    
    res.status(200).json({
      success: true,
      data: consultation
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
});

// @route   GET /api/consult/file/:filename
// @desc    Serve uploaded file with proper CORS
// @access  Public (filename is not easily guessable)
router.get('/file/:filename', async (req, res) => {
  // Set CORS headers for all responses
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  try {
    const { filename } = req.params;
    const uploadsDir = path.join(__dirname, '../uploads');
    const filePath = path.join(uploadsDir, filename);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: '파일을 찾을 수 없습니다.'
      });
    }
    
    // Determine content type
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
      default:
        contentType = 'application/octet-stream';
        break;
    }
    
    res.contentType(contentType);
    res.sendFile(filePath);
  } catch (error) {
    console.error('File serving error:', error);
    res.status(500).json({
      success: false,
      message: '파일 서빙 중 오류가 발생했습니다.'
    });
  }
});

module.exports = router;
