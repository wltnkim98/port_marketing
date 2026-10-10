import React from 'react';
import PhotographyVideo from '../../assets/video/photography_low.mp4';
import GlobalVideo from '../../assets/video/global_video.mp4';

const InteractiveDeviceMockup = ({ serviceType }) => {
    return (
        <div className="interactive-mockup-container">
            {/* ─── Photography Viewfinder Mockup ─── */}
            {serviceType === 'photography' && (
                <div className="mockup-camera-hud">
                    <video
                        className="photography-video"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                    >
                        <source src={PhotographyVideo} type="video/mp4" />
                    </video>
                </div>
            )}

            {/* ─── Blog Naver Search Mockup ─── */}
            {serviceType === 'blog' && (
                <div className="mockup-phone-frame">
                    <div className="phone-screen-naver">
                        <div className="naver-search-bar">
                            <span className="naver-n">N</span>
                            <span className="search-query-text">브랜드 추천 전문 칼럼</span>
                            <span className="search-glass-icon">🔍</span>
                        </div>

                        <div className="naver-smartblock-header">
                            <span className="smartblock-badge">스마트블록</span>
                            <span className="smartblock-title">소비자가 가장 많이 찾는 인기글</span>
                        </div>

                        <div className="naver-post-item rank-1">
                            <div className="rank-pill">인기글 1위</div>
                            <h4 className="post-item-title">[공식칼럼] 왜 이 브랜드가 1위를 달성했을까? 핵심 비교 분석</h4>
                            <p className="post-item-desc">
                                검색 1위를 점유하는 고품격 전문 칼럼으로 고객의 신뢰를 즉시 얻고 문의로 연결되는 비밀을 공개합니다...
                            </p>
                            <div className="post-item-meta">
                                <span>공식 브랜드 블로그</span> • <span>방금 전</span> • <span>조회수 12,480회</span>
                            </div>
                        </div>

                        <div className="naver-post-item rank-2">
                            <div className="rank-pill secondary">스마트블록 2위</div>
                            <h4 className="post-item-title">실제 고객 98%가 만족한 이유 3가지 정리</h4>
                            <div className="post-item-meta">
                                <span>공식 브랜드 블로그</span> • <span>1일 전</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── Instagram Live Phone Mockup ─── */}
            {serviceType === 'instagram' && (
                <div className="mockup-phone-frame instagram-phone">
                    <div className="phone-screen-insta">
                        <div className="insta-app-header">
                            <span className="insta-logo">Instagram</span>
                            <div className="insta-actions">
                                <span>♡</span>
                                <span>💬</span>
                                <span>⚡</span>
                            </div>
                        </div>

                        <div className="insta-profile-bar">
                            <div className="profile-avatar">MW</div>
                            <div className="profile-stats">
                                <div className="stat-col"><strong>48</strong><span>게시물</span></div>
                                <div className="stat-col"><strong>18.4K</strong><span>팔로워</span></div>
                                <div className="stat-col"><strong>320</strong><span>팔로잉</span></div>
                            </div>
                        </div>

                        <div className="insta-grid-preview">
                            <div className="insta-grid-cell item1">
                                <span className="cell-overlay">🔥 48.2K</span>
                            </div>
                            <div className="insta-grid-cell item2">
                                <span className="cell-overlay">▶ 120K</span>
                            </div>
                            <div className="insta-grid-cell item3">
                                <span className="cell-overlay">✨ NEW</span>
                            </div>
                            <div className="insta-grid-cell item4">
                                <span className="cell-overlay">❤️ 3.2K</span>
                            </div>
                            <div className="insta-grid-cell item5">
                                <span className="cell-overlay">▶ 84K</span>
                            </div>
                            <div className="insta-grid-cell item6">
                                <span className="cell-overlay">⚡ 15.6K</span>
                            </div>
                        </div>

                        <div className="insta-bottom-nav">
                            <span>🏠</span>
                            <span>🔍</span>
                            <span>➕</span>
                            <span>▶</span>
                            <span>👤</span>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── Global Marketing World Map Mockup ─── */}
            {serviceType === 'global-marketing' && (
                <div className="mockup-world-network">
                    <video
                        className="global-video"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                    >
                        <source src={GlobalVideo} type="video/mp4" />
                    </video>
                </div>
            )}

            {/* ─── Website MacBook Mockup ─── */}
            {serviceType === 'website' && (
                <div className="mockup-macbook-frame">
                    <div className="macbook-browser-bar">
                        <div className="browser-dots">
                            <span className="dot red"></span>
                            <span className="dot yellow"></span>
                            <span className="dot green"></span>
                        </div>
                        <div className="browser-url-pill">
                            🔒 https://yourbrand.com • Core Web Vitals 99/100
                        </div>
                    </div>
                    <div className="macbook-screen-content">
                        <div className="browser-page-hero">
                            <span className="badge-tech">LIGHTHOUSE SPEED 0.6s</span>
                            <h4 className="web-hero-title">NEXT-GEN INTERACTIVE EXPERIENCE</h4>
                            <p className="web-hero-desc">100% Responsive • GSAP Motion • GA4 & Conversion Tracking</p>
                            <div className="web-cta-mock-btns">
                                <span className="btn-mock primary">Get Started</span>
                                <span className="btn-mock secondary">Learn More</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── Tester Influencer Review Mockup ─── */}
            {serviceType === 'tester' && (
                <div className="mockup-tester-feed">
                    <div className="tester-feed-header">
                        <span>VERIFIED REVIEW FEED (15,000+ CREATORS)</span>
                        <span className="feed-status-dot">● LIVE UPDATE</span>
                    </div>
                    <div className="tester-review-card active">
                        <div className="reviewer-info-row">
                            <div className="reviewer-avatar">⭐</div>
                            <div>
                                <strong>뷰티/라이프 전문 인플루언서</strong>
                                <span className="reviewer-badge">네이버 공식 인플루언서</span>
                            </div>
                            <span className="stars">★★★★★</span>
                        </div>
                        <p className="review-quote">
                            "직접 써보고 깜짝 놀랐습니다. 발림성과 지속력이 기대 이상이라 주변에도 추천하고 있어요!"
                        </p>
                        <div className="review-tags">
                            <span>#체험단솔직후기</span>
                            <span>#스마트스토어구매링크</span>
                            <span>#추천템</span>
                        </div>
                    </div>

                    <div className="tester-review-card">
                        <div className="reviewer-info-row">
                            <div className="reviewer-avatar">☕</div>
                            <div>
                                <strong>핫플 맛집 에디터 (일방문자 8,500+)</strong>
                                <span className="reviewer-badge">플레이스 상위 랭커</span>
                            </div>
                            <span className="stars">★★★★★</span>
                        </div>
                        <p className="review-quote">
                            "인테리어 분위기부터 시그니처 메뉴까지 완벽했던 곳. 재방문 의사 200% 입니다."
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InteractiveDeviceMockup;
