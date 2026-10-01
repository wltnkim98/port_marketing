const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Qa = require('../models/Qa');
const auth = require('../middleware/auth');

// GET /api/qa - 공개 Q&A 목록 조회 (답변된 질문만)
router.get('/', async (req, res) => {
  try {
    const { status = 'answered', page = 1, limit = 10 } = req.query;
    
    const skip = (page - 1) * limit;
    
    const query = status === 'all' ? {} : { status };
    
    const questions = await Qa.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();
    
    // 관리자 인증 확인
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const isAdmin = token && jwt.verify(token, process.env.JWT_SECRET);
    
    // 비밀글의 경우 내용을 숨김 처리 (관리자 제외)
    const sanitizedQuestions = questions.map(qa => {
      if (qa.isPrivate && !isAdmin) {
        return {
          ...qa,
          title: '',
          question: '',
          answer: ''
        };
      }
      return qa;
    });
    
    const total = await Qa.countDocuments(query);
    
    res.json({
      success: true,
      data: sanitizedQuestions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Q&A 조회 에러:', error);
    res.status(500).json({
      success: false,
      message: 'Q&A 조회 중 오류가 발생했습니다.'
    });
  }
});

// GET /api/qa/:id - 특정 Q&A 상세 조회
router.get('/:id', async (req, res) => {
  try {
    const qa = await Qa.findById(req.params.id);
    
    if (!qa) {
      return res.status(404).json({
        success: false,
        message: '해당 Q&A를 찾을 수 없습니다.'
      });
    }
    
    // 비밀글인 경우 비밀번호 확인 필요
    if (qa.isPrivate) {
      const { password } = req.query;
      if (!password || password !== qa.password) {
        return res.json({
          success: true,
          data: {
            _id: qa._id,
            isPrivate: true,
            questionerName: qa.questionerName,
            createdAt: qa.createdAt
          },
          requirePassword: true
        });
      }
    }
    
    res.json({
      success: true,
      data: qa,
      requirePassword: false
    });
  } catch (error) {
    console.error('Q&A 상세 조회 에러:', error);
    res.status(500).json({
      success: false,
      message: 'Q&A 상세 조회 중 오류가 발생했습니다.'
    });
  }
});

// POST /api/qa - 질문 등록 (공개)
router.post('/', async (req, res) => {
  try {
    const { title, questionerName, question, password } = req.body;
    
    if (!title || title.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: '제목은 필수입니다.'
      });
    }
    
    if (!question || question.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: '질문 내용은 필수입니다.'
      });
    }
    
    const isPrivate = Boolean(password && password.trim().length > 0);
    
    const newQa = await Qa.create({
      title: title.trim(),
      questionerName: questionerName || '익명',
      question: question.trim(),
      password: isPrivate ? password.trim() : '',
      isPrivate
    });
    
    res.status(201).json({
      success: true,
      message: isPrivate ? '비밀글로 등록되었습니다.' : '질문이 등록되었습니다.',
      data: newQa
    });
  } catch (error) {
    console.error('Q&A 등록 에러:', error);
    res.status(500).json({
      success: false,
      message: '질문 등록 중 오류가 발생했습니다.'
    });
  }
});

// PUT /api/qa/:id/answer - Q&A 답변 (관리자 전용)
router.put('/:id/answer', auth, async (req, res) => {
  try {
    const { answer } = req.body;
    
    if (!answer || answer.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: '답변 내용은 필수입니다.'
      });
    }
    
    const qa = await Qa.findById(req.params.id);
    
    if (!qa) {
      return res.status(404).json({
        success: false,
        message: '해당 Q&A를 찾을 수 없습니다.'
      });
    }
    
    qa.answer = answer.trim();
    qa.status = 'answered';
    qa.answeredAt = new Date();
    qa.answeredBy = req.admin.username;
    
    await qa.save({ validateBeforeSave: false });
    
    res.json({
      success: true,
      message: '답변이 등록되었습니다.',
      data: qa
    });
  } catch (error) {
    console.error('Q&A 답변 에러:', error);
    res.status(500).json({
      success: false,
      message: '답변 등록 중 오류가 발생했습니다.'
    });
  }
});

// DELETE /api/qa/:id - Q&A 삭제 (관리자 전용)
router.delete('/:id', auth, async (req, res) => {
  try {
    const qa = await Qa.findById(req.params.id);
    
    if (!qa) {
      return res.status(404).json({
        success: false,
        message: '해당 Q&A를 찾을 수 없습니다.'
      });
    }
    
    await Qa.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Q&A가 삭제되었습니다.'
    });
  } catch (error) {
    console.error('Q&A 삭제 에러:', error);
    res.status(500).json({
      success: false,
      message: 'Q&A 삭제 중 오류가 발생했습니다.'
    });
  }
});

// PUT /api/qa/:id - 질문 수정 (비밀번호 인증 필요)
router.put('/:id', async (req, res) => {
  try {
    const { title, question, password } = req.body;
    
    if (!title || title.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: '제목은 필수입니다.'
      });
    }
    
    if (!question || question.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: '질문 내용은 필수입니다.'
      });
    }
    
    const qa = await Qa.findById(req.params.id);
    
    if (!qa) {
      return res.status(404).json({
        success: false,
        message: '해당 Q&A를 찾을 수 없습니다.'
      });
    }
    
    // 비밀번호 확인
    if (qa.isPrivate && qa.password !== password) {
      return res.status(401).json({
        success: false,
        message: '비밀번호가 일치하지 않습니다.'
      });
    }
    
    qa.title = title.trim();
    qa.question = question.trim();
    await qa.save();
    
    res.json({
      success: true,
      message: '질문이 수정되었습니다.',
      data: qa
    });
  } catch (error) {
    console.error('질문 수정 에러:', error);
    res.status(500).json({
      success: false,
      message: '질문 수정 중 오류가 발생했습니다.'
    });
  }
});

// PUT /api/qa/:id/answer - 답변 수정 (관리자 전용)
router.put('/:id/answer/edit', auth, async (req, res) => {
  try {
    const { answer } = req.body;
    
    if (!answer || answer.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: '답변 내용은 필수입니다.'
      });
    }
    
    const qa = await Qa.findById(req.params.id);
    
    if (!qa) {
      return res.status(404).json({
        success: false,
        message: '해당 Q&A를 찾을 수 없습니다.'
      });
    }
    
    qa.answer = answer.trim();
    qa.answeredAt = new Date();
    qa.answeredBy = req.admin.username;
    
    await qa.save({ validateBeforeSave: false });
    
    res.json({
      success: true,
      message: '답변이 수정되었습니다.',
      data: qa
    });
  } catch (error) {
    console.error('답변 수정 에러:', error);
    res.status(500).json({
      success: false,
      message: '답변 수정 중 오류가 발생했습니다.'
    });
  }
});

module.exports = router;
