const mongoose = require('mongoose');

const qaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '제목은 필수입니다.'],
    trim: true,
    maxLength: [50, '제목은 50자 이내로 작성해주세요.']
  },
  questionerName: {
    type: String,
    default: '익명',
    trim: true
  },
  question: {
    type: String,
    required: [true, '질문 내용은 필수입니다.'],
    trim: true,
    maxLength: [2000, '질문 내용은 2000자 이내로 작성해주세요.']
  },
  answer: {
    type: String,
    default: '',
    trim: true,
    maxLength: [5000, '답변 내용은 5000자 이내로 작성해주세요.']
  },
  password: {
    type: String,
    required: [true, '비밀번호는 필수입니다.'],
    trim: true
  },
  isPrivate: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'answered'],
    default: 'pending'
  },
  answeredAt: {
    type: Date
  },
  answeredBy: {
    type: String,
    default: '관리자'
  }
}, {
  timestamps: true
});

// Index for faster queries
qaSchema.index({ status: 1, createdAt: -1 });
qaSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Qa', qaSchema);
