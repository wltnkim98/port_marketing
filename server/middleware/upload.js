const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const path = require('path');

// Cloudinary 설정
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 메모리 스토리지 사용 (파일을 메모리에 저장 후 Cloudinary로 업로드)
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB 제한
  },
  fileFilter: (req, file, cb) => {
    // 파일 형식 검증
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|xls|xlsx|ppt|pptx|txt|zip/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype) || 
                     file.mimetype === 'application/pdf' ||
                     file.mimetype === 'application/msword' ||
                     file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                     file.mimetype === 'application/vnd.ms-excel' ||
                     file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                     file.mimetype === 'application/vnd.ms-powerpoint' ||
                     file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
                     file.mimetype === 'text/plain' ||
                     file.mimetype === 'application/zip';

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('허용되지 않는 파일 형식입니다.'));
    }
  }
});

// Cloudinary 업로드 헬퍼 함수
const uploadToCloudinary = async (file, folder = 'consult-uploads') => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const publicId = `consult-${uniqueSuffix}`;

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: folder,
        public_id: publicId,
        resource_type: 'auto',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'zip']
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    ).end(file.buffer);
  });
};

module.exports = upload;
module.exports.uploadToCloudinary = uploadToCloudinary;
