import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { companyInfo } from '../../constants';

const CompanyIntroView = () => {

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.15 }
        );

        const fadeElements = document.querySelectorAll('.fade-up');
        fadeElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="company-intro-page">
            <Header />

            <main className="company-intro-article">
                {/* Header */}
                <header className="company-intro-header fade-up">
                    <h1 className="company-intro-main-title">
                        브랜드의 진정한 성장을 <span>함께</span>하는<br />
                        <span className="highlight-text">마켓위드 컨설팅</span>
                    </h1>
                    <p className="company-intro-lead-desc">
                        {companyInfo.description}<br />
                        {companyInfo.vision}
                    </p>
                </header>

                {/* Hero Visual */}
                <div className="company-intro-hero-media fade-up">
                    <img 
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80" 
                        alt="MarketWith Office" 
                        loading="eager"
                        decoding="async"
                    />
                </div>

                {/* Content Flow */}
                <div className="company-intro-content-flow">

                    {/* Company Overview */}
                    <article className="post-section fade-up">
                        <div className="post-text-wrap">
                            <span className="post-step-indicator">COMPANY OVERVIEW</span>
                            <h2 className="post-heading">
                                회사 개요
                            </h2>
                            <div className="company-overview-grid">
                                <div className="overview-item">
                                    <span className="overview-label">상호명</span>
                                    <span className="overview-value">{companyInfo.name}</span>
                                </div>
                                <div className="overview-item">
                                    <span className="overview-label">대표자</span>
                                    <span className="overview-value">{companyInfo.ceo}</span>
                                </div>
                                <div className="overview-item">
                                    <span className="overview-label">설립연도</span>
                                    <span className="overview-value">{companyInfo.founded}년</span>
                                </div>
                                <div className="overview-item">
                                    <span className="overview-label">사업자등록번호</span>
                                    <span className="overview-value">{companyInfo.registrationNumber}</span>
                                </div>
                                <div className="overview-item full-width">
                                    <span className="overview-label">주소</span>
                                    <span className="overview-value">{companyInfo.address}</span>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Vision & Mission */}
                    <article className="post-section fade-up">
                        <div className="post-text-wrap">
                            <span className="post-step-indicator">VISION & MISSION</span>
                            <h2 className="post-heading">
                                비전과 미션
                            </h2>
                            <div className="post-body">
                                <p>
                                    마켓위드 컨설팅은 소비자의 심리를 깊이 이해하고, 데이터에 기반한 전략적 접근으로
                                    브랜드의 진정한 성장을 이끌어내는 것을 목표로 합니다.
                                </p>
                            </div>
                            <div className="vision-mission-grid">
                                <div className="vm-card">
                                    <div className="vm-icon">🎯</div>
                                    <h3 className="vm-title">VISION</h3>
                                    <p className="vm-text">{companyInfo.vision}</p>
                                </div>
                                <div className="vm-card">
                                    <div className="vm-icon">🚀</div>
                                    <h3 className="vm-title">MISSION</h3>
                                    <p className="vm-text">{companyInfo.mission}</p>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Business Areas */}
                    <article className="post-section fade-up">
                        <div className="post-text-wrap">
                            <span className="post-step-indicator">BUSINESS AREAS</span>
                            <h2 className="post-heading">
                                주요 사업 영역
                            </h2>
                            <div className="services-grid">
                                {companyInfo.services.map((service, index) => (
                                    <div key={index} className="service-card">
                                        <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
                                        <span className="service-name">{service}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </article>

                    {/* Company History */}
                    <article className="post-section fade-up">
                        <div className="post-text-wrap">
                            <span className="post-step-indicator">COMPANY HISTORY</span>
                            <h2 className="post-heading">
                                회사 연혁
                            </h2>
                            <div className="history-timeline">
                                {companyInfo.history.map((item, index) => (
                                    <div key={index} className="history-item">
                                        <div className="history-year">{item.year}</div>
                                        <div className="history-event">{item.event}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </article>

                    {/* Stats */}
                    <article className="post-section fade-up">
                        <div className="post-text-wrap">
                            <span className="post-step-indicator">OUR ACHIEVEMENTS</span>
                            <h2 className="post-heading">
                                주요 성과
                            </h2>
                            <div className="stats-grid">
                                {companyInfo.stats.map((stat, index) => (
                                    <div key={index} className="stat-card">
                                        <div className="stat-value">{stat.value}</div>
                                        <div className="stat-label">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </article>

                    {/* Contact Info */}
                    <article className="post-section fade-up">
                        <div className="post-text-wrap">
                            <span className="post-step-indicator">CONTACT US</span>
                            <h2 className="post-heading">
                                문의하기
                            </h2>
                            <div className="contact-info-box">
                                <div className="contact-item">
                                    <span className="contact-label">대표번호</span>
                                    <span className="contact-value">{companyInfo.phone}</span>
                                </div>
                                <div className="contact-item">
                                    <span className="contact-label">이메일</span>
                                    <span className="contact-value">{companyInfo.email}</span>
                                </div>
                                <div className="contact-item">
                                    <span className="contact-label">영업시간</span>
                                    <span className="contact-value">{companyInfo.businessHours}</span>
                                </div>
                            </div>
                        </div>
                    </article>

                </div>

                {/* CTA */}
                <section className="company-intro-footer-cta fade-up">
                    <div className="cta-kicker">START YOUR BRAND JOURNEY</div>
                    <h2 className="cta-title">
                        브랜드 성장을 위한 첫 걸음을 내딛으세요
                    </h2>
                    <p className="cta-desc">
                        마켓위드 컨설팅과 함께 귀사의 브랜드를 위한 최적의 마케팅 전략을 설계해보세요.
                        전문가 팀이 상담부터 실행까지 함께합니다.
                    </p>
                    <div className="cta-btn-wrap">
                        <Link to="/support/consult" className="company-intro-cta-btn">
                            무료 상담 신청하기 →
                        </Link>
                        <Link to="/services" className="company-intro-secondary-btn">
                            서비스 알아보기
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default CompanyIntroView;
