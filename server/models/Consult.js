const mongoose = require('mongoose');

const consultSchema = new mongoose.Schema({
  // 상담 분야
  categories: {
    type: [String],
    required: true,
    enum: ['build', 'branding', 'global', 'marketing', 'solution', 'etc']
  },
  
  // 예산 및 희망 시간
  budget: {
    type: String,
    default: '미정 / 상담 후 협의'
  },
  preferredTime: {
    type: String,
    default: '항상 가능'
  },
  
  // 기업 정보
  company: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  website: {
    type: String,
    trim: true
  },
  
  // 문의 내용
  message: {
    type: String,
    default: ''
  },
  
  // 파일 첨부 정보
  fileName: {
    type: String,
    default: ''
  },
  fileSize: {
    type: Number,
    default: 0
  },
  filePath: {
    type: String,
    default: ''
  },
  fileUrl: {
    type: String,
    default: ''
  },
  
  // 개인정보 동의
  privacyAgreed: {
    type: Boolean,
    required: true,
    default: false
  },
  
  // 상태
  status: {
    type: String,
    enum: ['pending', 'contacted', 'in_progress', 'completed'],
    default: 'pending'
  },
  
  // 메타데이터
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  }
}, {
  timestamps: true // createdAt, updatedAt 자동 생성
});

// Index for faster queries
consultSchema.index({ createdAt: -1 });
consultSchema.index({ email: 1 });
consultSchema.index({ status: 1 });

module.exports = mongoose.model('Consult', consultSchema);
