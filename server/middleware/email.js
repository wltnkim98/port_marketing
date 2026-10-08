const nodemailer = require('nodemailer');
const { Resend } = require('resend');

// Category mapping for Korean labels
const CATEGORY_LABELS = {
  'build': '구축 컨설팅',
  'branding': '창업 & 브랜딩',
  'global': '글로벌 브랜딩',
  'marketing': '마케팅 & 그로스',
  'solution': '유지관리 & 솔루션',
  'etc': '종합 비즈니스 상담'
};

const getResendClient = () => {
  if (process.env.RESEND_API_KEY) {
    return new Resend(process.env.RESEND_API_KEY);
  }
  return null;
};

const getResendFrom = () => {
  return process.env.RESEND_FROM || 'MarketWith <onboarding@resend.dev>';
};

const getAdminEmail = () => {
  return process.env.EMAIL_USER || 'wltnkim98@gmail.com';
};

// Create fallback email transporter (Gmail SMTP)
const createTransporter = () => {
  if (process.env.SENDGRID_API_KEY) {
    return nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY
      }
    });
  }
  
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
  const resend = getResendClient();
  if (resend) {
    try {
      const { data, error } = await resend.apiKeys.list();
      if (error) {
        // Resend에서 "Sending access" 권한으로 생성한 키는 목록 조회 권한이 제한되어 있으나, 발송은 정상 가능함
        if (error.message && error.message.includes('restricted to only send emails')) {
          return {
            success: true,
            provider: 'resend',
            message: 'Resend API 키 인증 성공 (발송 전용 권한 확인됨 - 메일 발송 정상 작동)'
          };
        }
        return {
          success: false,
          provider: 'resend',
          message: `Resend 인증 실패: ${error.message}`
        };
      }
      return {
        success: true,
        provider: 'resend',
        message: 'Resend API 키 인증 성공 (HTTPS 통신 정상)'
      };
    } catch (err) {
      return {
        success: false,
        provider: 'resend',
        message: `Resend 통신 오류: ${err.message}`
      };
    }
  }

  // Fallback SMTP check
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return {
      success: false,
      provider: 'smtp',
      message: 'RESEND_API_KEY 또는 EMAIL_USER/EMAIL_PASS 환경 변수가 설정되어 있지 않습니다.'
    };
  }

  try {
    const transporter = createTransporter();
    await transporter.verify();
    return {
      success: true,
      provider: 'smtp',
      message: 'SMTP 서버 연결 및 인증에 성공했습니다.'
    };
  } catch (error) {
    return {
      success: false,
      provider: 'smtp',
      message: `SMTP 연결 실패: ${error.message}`
    };
  }
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

  // 1. Resend API 우선 사용
  const resend = getResendClient();
  if (resend) {
    try {
      const { data, error } = await resend.emails.send({
        from: getResendFrom(),
        to: adminEmail,
        subject,
        html
      });

      if (error) {
        console.error('[Resend Error] Failed to send admin email:', error);
        return false;
      }

      console.log('[Resend Success] Consultation email sent to admin:', data.id);
      return true;
    } catch (err) {
      console.error('[Resend Exception] Error sending admin email:', err);
      return false;
    }
  }

  // 2. Fallback: SMTP 전송
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('[Email Error] EMAIL_USER or EMAIL_PASS environment variable is not configured.');
      return false;
    }

    const transporter = createTransporter();
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: adminEmail,
      subject,
      html
    });

    console.log('[SMTP Success] Consultation email sent to admin:', info.messageId);
    return true;
  } catch (error) {
    console.error('[SMTP Error] Failed to send consultation email to admin:', error);
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

  // 1. Resend API 우선 사용
  const resend = getResendClient();
  if (resend) {
    try {
      const { data, error } = await resend.emails.send({
        from: getResendFrom(),
        to: consultData.email,
        subject,
        html
      });

      if (error) {
        console.error('[Resend Error] Failed to send customer confirmation email:', error);
        if (error.statusCode === 403 || (error.message && error.message.includes('testing emails'))) {
          console.warn('[Resend Sandbox Notice] onboarding@resend.dev 테스트 도메인은 계정 본인 이메일로만 발송 가능합니다. 고객에게 발송하려면 Resend에서 커스텀 도메인을 등록해 주세요.');
        }
        return false;
      }

      console.log('[Resend Success] Confirmation email sent to customer:', data.id);
      return true;
    } catch (err) {
      console.error('[Resend Exception] Error sending customer confirmation email:', err);
      return false;
    }
  }

  // 2. Fallback: SMTP 전송
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('[Email Error] EMAIL_USER or EMAIL_PASS environment variable is not configured.');
      return false;
    }

    const transporter = createTransporter();
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: consultData.email,
      subject,
      html
    });

    console.log('[SMTP Success] Confirmation email sent to customer:', info.messageId);
    return true;
  } catch (error) {
    console.error('[SMTP Error] Failed to send confirmation email to customer:', error);
    return false;
  }
};

module.exports = {
  sendConsultationEmail,
  sendConfirmationEmail,
  verifyEmailConnection
};
