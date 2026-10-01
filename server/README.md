# Port Marketing Backend Server

백엔드 API 서버 - 상담 신청 폼 처리

## 기술 스택

- Node.js
- Express.js
- MongoDB (Mongoose)
- Nodemailer (이메일 발송)
- CORS
- Helmet (보안)
- Rate Limiting

## 설치

```bash
cd server
npm install
```

## 환경변수 설정

`.env.example`을 복사하여 `.env` 파일을 생성하고 값을 입력하세요:

```bash
cp .env.example .env
```

`.env` 파일에 다음 값을 입력:
- `MONGODB_URI`: MongoDB Atlas Connection String
- `EMAIL_USER`: 이메일 주소 (Gmail 또는 SendGrid)
- `EMAIL_PASS`: 이메일 비밀번호 또는 앱 비밀번호
- `CLIENT_URL`: 프론트엔드 URL (로컬: http://localhost:3000)

## 실행

개발 모드:
```bash
npm run dev
```

프로덕션 모드:
```bash
npm start
```

## API 엔드포인트

### POST /api/consult
상담 신청 제공

**Request Body:**
```json
{
  "categories": ["build", "marketing"],
  "budget": "500만 ~ 1,500만원",
  "preferredTime": "항상 가능",
  "company": "회사명",
  "name": "담당자명",
  "role": "직책",
  "phone": "010-1234-5678",
  "email": "email@example.com",
  "website": "https://example.com",
  "message": "문의 내용",
  "fileName": "file.pdf",
  "fileSize": 1024,
  "privacyAgreed": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "상담 신청이 접수되었습니다.",
  "data": {
    "id": "...",
    "company": "회사명",
    "name": "담당자명",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### GET /api/consult
모든 상담 내역 조회 (관리자용 - 인증 필요)

### GET /api/consult/:id
특정 상담 내역 조회

### PATCH /api/consult/:id/status
상담 상태 업데이트

## 이메일 발송

상담 신청 시 자동으로:
1. 관리자에게 알림 이메일 발송
2. 고객에게 확인 이메일 발송

## 보안

- Helmet: HTTP 헤더 보안
- Rate Limiting: 15분당 10회 요청 제한
- CORS: 특정 도메인만 접근 허용
- 환경변수: 민감 정보 보호
