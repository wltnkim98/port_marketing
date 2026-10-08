const nodemailer = require('nodemailer');
const MailComposer = require('nodemailer/lib/mail-composer');

// Category mapping for Korean labels
const CATEGORY_LABELS = {
  'build': '구축 컨설팅',
  'branding': '창업 & 브랜딩',
  'global': '글로벌 브랜딩',
  'marketing': '마케팅 & 그로스',
  'solution': '유지관리 & 솔루션',
  'etc': '종합 비즈니스 상담'
};

const getAdminEmail = () => {
  return process.env.GMAIL_USER || process.env.EMAIL_USER || 'wltnkim98@gmail.com';
};

// Check if Gmail REST API credentials are configured
const isGmailApiConfigured = () => {
  return Boolean(
    process.env.GMAIL_CLIENT_ID &&
    process.env.GMAIL_CLIENT_SECRET &&
    process.env.GMAIL_REFRESH_TOKEN
  );
};

// Get fresh access token from Google OAuth2
const getGoogleAccessToken = async () => {
  const params = new URLSearchParams({
    client_id: process.env.GMAIL_CLIENT_ID,
    client_secret: process.env.GMAIL_CLIENT_SECRET,
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    grant_type: 'refresh_token'
  });

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error_description || data.error || 'Failed to refresh Google access token');
  }

  return data.access_token;
};

// Send email via Gmail REST API (HTTPS port 443 - Render free tier compatible)
const sendViaGmailApi = async ({ to, subject, html }) => {
  const accessToken = await getGoogleAccessToken();
  const fromEmail = getAdminEmail();

  const mail = new MailComposer({
    from: `MarketWith <${fromEmail}>`,
    to,
    subject,
    html
  });

  const messageBuffer = await mail.compile().build();
  const raw = Buffer.from(messageBuffer).toString('base64url');

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ raw })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || 'Failed to send email via Gmail REST API');
  }

  return data;
};

// Fallback SMTP Transporter (Local development)
const createSmtpTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    family: 4
  });
};

// Verify email connection
const verifyEmailConnection = async () => {
  // 1. Gmail REST API 검증
  if (isGmailApiConfigured()) {
    try {
      await getGoogleAccessToken();
      return {
        success: true,
        provider: 'gmail_api',
        message: 'Gmail REST API OAuth2 인증 성공 (HTTPS 통신 정상, 모든 수신자 발송 가능)'
      };
    } catch (err) {
      return {
        success: false,
        provider: 'gmail_api',
        message: `Gmail REST API 인증 실패: ${err.message}`
      };
    }
  }

  // 2. SMTP 검증 (로컬 환경 등)
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    try {
      const transporter = createSmtpTransporter();
      await transporter.verify();
      return {
        success: true,
        provider: 'smtp',
        message: 'Gmail SMTP 서버 연결 성공 (포트 465)'
      };
    } catch (err) {
      return {
        success: false,
        provider: 'smtp',
        message: `SMTP 연결 실패: ${err.message}`
      };
    }
  }

  return {
    success: false,
    provider: 'none',
    message: 'Gmail API 또는 SMTP 환경변수가 설정되어 있지 않습니다.'
  };
};

// Send consultation notification email to admin
const sendConsultationEmail = async (consultData) => {
  const adminEmail = getAdminEmail();
  const subject = `[새 상담 신청] ${consultData.company} - ${consultData.name}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #333;">새로운 상담 신청이 접수되었습니다</h2>
      
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #666; margin-top: 0;">기업 정보</h3>
        <p><strong>회사명:</strong> ${consultData.company}</p>
        <p><strong>담당자:</strong> ${consultData.name} ${consultData.role ? `(${consultData.role})` : ''}</p>
        <p><strong>연락처:</strong> ${consultData.phone}</p>
        <p><strong>이메일:</strong> ${consultData.email}</p>
        ${consultData.website ? `<p><strong>웹사이트:</strong> <a href="${consultData.website}">${consultData.website}</a></p>` : ''}
      </div>
      
      <div style="background: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #666; margin-top: 0;">상담 정보</h3>
        <p><strong>상담 분야:</strong> ${consultData.categories.map(cat => CATEGORY_LABELS[cat] || cat).join(', ')}</p>
        <p><strong>예상 예산:</strong> ${consultData.budget}</p>
        <p><strong>희망 통화 시간:</strong> ${consultData.preferredTime}</p>
      </div>
      
      ${consultData.message ? `
      <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #666; margin-top: 0;">문의 내용</h3>
        <p style="white-space: pre-wrap;">${consultData.message}</p>
      </div>
      ` : ''}
      
      ${consultData.fileName ? `
      <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #666; margin-top: 0;">첨부 파일</h3>
        <p><strong>파일명:</strong> ${consultData.fileName}</p>
        <p><strong>크기:</strong> ${(consultData.fileSize / 1024).toFixed(1)} KB</p>
      </div>
      ` : ''}
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
        <p style="color: #999; font-size: 12px;">
          신청일시: ${new Date(consultData.createdAt).toLocaleString('ko-KR')}<br>
          IP: ${consultData.ipAddress || 'N/A'}
        </p>
      </div>
    </div>
  `;

  // 1. Gmail REST API 우선 사용
  if (isGmailApiConfigured()) {
    try {
      const result = await sendViaGmailApi({
        to: adminEmail,
        subject,
        html
      });
      console.log('[Gmail API Success] Admin email sent:', result.id);
      return true;
    } catch (err) {
      console.error('[Gmail API Error] Failed to send admin email:', err.message);
      return false;
    }
  }

  // 2. Fallback: SMTP
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('[Email Error] No email configuration found.');
      return false;
    }

    const transporter = createSmtpTransporter();
    const info = await transporter.sendMail({
      from: `MarketWith <${process.env.EMAIL_USER}>`,
      to: adminEmail,
      subject,
      html
    });

    console.log('[SMTP Success] Admin email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('[SMTP Error] Failed to send admin email:', error);
    return false;
  }
};

// Send confirmation email to customer
const sendConfirmationEmail = async (consultData) => {
  const subject = '[마켓위드] 상담 신청이 접수되었습니다';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #333;">상담 신청 접수 확인</h2>
      
      <p>${consultData.name} 님, 안녕하세요.</p>
      <p>마켓위드에 상담 신청이 접수되었습니다.</p>
      
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #666; margin-top: 0;">접수 정보</h3>
        <p><strong>상담 분야:</strong> ${consultData.categories.map(cat => CATEGORY_LABELS[cat] || cat).join(', ')}</p>
        <p><strong>접수일시:</strong> ${new Date(consultData.createdAt).toLocaleString('ko-KR')}</p>
      </div>
      
      <div style="background: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #666; margin-top: 0;">안내사항</h3>
        <p>영업일 기준 48시간 이내에 담당 컨설턴트가 연락을 드립니다.</p>
        <p>긴급한 문의는 대표 전화 <strong>1600-5678</strong>로 연락 주시면 더 빠른 상담이 가능합니다.</p>
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
        <p style="color: #999; font-size: 12px;">
          이 메일은 발신 전용입니다. 문의 사항은 위 전화번호로 연락해 주세요.
        </p>
      </div>
    </div>
  `;

  // 1. Gmail REST API 우선 사용
  if (isGmailApiConfigured()) {
    try {
      const result = await sendViaGmailApi({
        to: consultData.email,
        subject,
        html
      });
      console.log('[Gmail API Success] Customer confirmation sent to:', consultData.email, 'ID:', result.id);
      return true;
    } catch (err) {
      console.error('[Gmail API Error] Failed to send customer confirmation:', err.message);
      return false;
    }
  }

  // 2. Fallback: SMTP
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('[Email Error] No email configuration found.');
      return false;
    }

    const transporter = createSmtpTransporter();
    const info = await transporter.sendMail({
      from: `MarketWith <${process.env.EMAIL_USER}>`,
      to: consultData.email,
      subject,
      html
    });

    console.log('[SMTP Success] Customer confirmation sent to:', consultData.email, 'ID:', info.messageId);
    return true;
  } catch (error) {
    console.error('[SMTP Error] Failed to send customer confirmation:', error);
    return false;
  }
};

module.exports = {
  sendConsultationEmail,
  sendConfirmationEmail,
  verifyEmailConnection
};
