import React from 'react';
import {Link} from "react-router-dom";

const Contact = () => {
    return (
        <section className="contact-section" id="contact">
            <div>
                <h2 className="section-title fade-up">궁금한 점은<br />언제든 문의 주세요.</h2>
                <p className="contact-desc fade-up">
                    모든 문의는 영업일 내 48시간 내 답변합니다. <br />
                    첫 미팅은 무료 진단 세션으로 진행됩니다.
                </p>
            </div>
            <div className="fade-up contact-phone-wrapper">
                <a href="tel:1600-5678" className="contact-phone">
                    1600-5678
                </a>
            </div>
            <div className="contact-buttons fade-up">
                <a href="https://pf.kakao.com" target="_blank" rel="noopener noreferrer" className="contact-btn contact-btn-outline">
                    <img src={require('../assets/img/logos/kakaotalk_logo.png')} alt="카카오톡" width="20" height="20" />
                    카카오톡 상담하기
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 7L17 17M17 17H7M17 17V7"/>
                    </svg>
                </a>
                <Link to="/support/consult" className="contact-btn contact-btn-solid">
                    <span className="contact-btn-icon">💬</span>
                    무료컨설팅 신청하기
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 7L17 17M17 17H7M17 17V7"/>
                    </svg>
                </Link>
            </div>
            <div className="contact-bg">MARKETWITH</div>
        </section>
    );
};

export default Contact;