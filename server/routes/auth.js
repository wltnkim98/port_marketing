const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// POST /api/auth/login - 관리자 로그인
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: '아이디와 비밀번호를 입력해주세요.'
      });
    }
    
    // Find admin
    const admin = await Admin.findOne({ username });
    
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: '아이디 또는 비밀번호가 올바르지 않습니다.'
      });
    }
    
    // Check password
    const isMatch = await admin.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: '아이디 또는 비밀번호가 올바르지 않습니다.'
      });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      success: true,
      message: '로그인 성공',
      token,
      admin: {
        id: admin._id,
        username: admin.username
      }
    });
  } catch (error) {
    console.error('로그인 에러:', error);
    res.status(500).json({
      success: false,
      message: '로그인 중 오류가 발생했습니다.'
    });
  }
});

// POST /api/auth/initialize - 초기 관리자 계정 생성 (환경변수 사용)
router.post('/initialize', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: '아이디와 비밀번호를 입력해주세요.'
      });
    }
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: '이미 존재하는 관리자 계정입니다.'
      });
    }
    
    // Create admin
    const admin = await Admin.create({
      username,
      password
    });
    
    res.status(201).json({
      success: true,
      message: '관리자 계정이 생성되었습니다.',
      admin: {
        id: admin._id,
        username: admin.username
      }
    });
  } catch (error) {
    console.error('관리자 계정 생성 에러:', error);
    res.status(500).json({
      success: false,
      message: '관리자 계정 생성 중 오류가 발생했습니다.'
    });
  }
});

module.exports = router;
