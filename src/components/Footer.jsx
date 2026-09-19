import React from 'react';

const Footer = () => {
    return (
        <footer>
            <span className="footer-logo">MARKET<span>With</span></span>
            <div className="footer-social-links">
                <a href="https://pf.kakao.com" className="footer-social-link" aria-label="카카오톡 상담" rel="noopener noreferrer" target="_blank">
                    <img src={require('../assets/img/kakaotalk_logo.png')} alt="카카오톡" width="20" height="20" />
                </a>
                <a href="https://instagram.com" className="footer-social-link" aria-label="인스타그램" rel="noopener noreferrer" target="_blank">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                </a>
                <a href="https://section.blog.naver.com" className="footer-social-link" aria-label="네이버 블로그"  rel="noopener noreferrer" target="_blank">
                    <img src={require('../assets/img/naverblog_logo.png')} alt="네이버 블로그" width="20" height="20" />
                </a>
            </div>
            <div className="footer-info">
                <div className="footer-info-left">
                    <div className="footer-info-item">
                        <span className="footer-info-label">상호명:</span>
                        <span className="footer-info-value">(주)마켓위드 컨설팅</span>
                    </div>
                    <div className="footer-info-item">
                        <span className="footer-info-label">대표자:</span>
                        <span className="footer-info-value">김지수</span>
                    </div>
                    <div className="footer-info-item">
                        <span className="footer-info-label">사업자등록번호:</span>
                        <span className="footer-info-value">123-45-67890</span>
                    </div>
                    <div className="footer-info-item">
                        <span className="footer-info-label">주소:</span>
                        <span className="footer-info-value">서울특별시 강남구 테헤란로 123, 마켓위드빌딩 5층</span>
                    </div>
                </div>
                <div className="footer-info-right">
                    <div className="footer-info-item">
                        <span className="footer-info-label">대표번호:</span>
                        <span className="footer-info-value">1600-5678</span>
                    </div>
                    <div className="footer-info-item">
                        <span className="footer-info-label">영업시간:</span>
                        <span className="footer-info-value">평일 09:00~18:00 (점심시간 12:00~13:00)</span>
                    </div>
                    <div className="footer-info-item">
                        <span className="footer-info-label">이메일:</span>
                        <span className="footer-info-value">contact@marketwith.co.kr</span>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-menu">
                    <a href="/agreement" className="footer-menu-item">이용약관</a>
                    <a href="/privacy" className="footer-menu-item">개인정보처리방침</a>
                </div>
                <span className="footer-copy">© 2026 MARKETWITH Marketing Consulting. All rights reserved.</span>
            </div>
        </footer>
    );
};

export default Footer;