import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedTitle from './AnimatedTitle';

const ServiceSimulator = ({ serviceType }) => {
    // 2. Blog SEO Simulator State
    const [keywordCount, setKeywordCount] = useState(15);
    const [postFrequency, setPostFrequency] = useState(12);

    // 3. Instagram Growth Simulator State
    const [reelsCount, setReelsCount] = useState(8);
    const [feedCount, setFeedCount] = useState(12);

    // 5. Website Benchmark State
    const [siteType, setSiteType] = useState('landing');

    // 6. Tester Reviewer Count State
    const [reviewerCount, setReviewerCount] = useState(25);
    const [channelType, setChannelType] = useState('all');

    // Calculations
    const calcBlog = {
        organicVisits: (keywordCount * postFrequency * 42).toLocaleString(),
        adSavings: Math.round((keywordCount * postFrequency * 42 * 850) / 10000).toLocaleString(),
        rankRate: keywordCount > 20 ? '94.2%' : '88.5%'
    };

    const calcInstagram = {
        organicReach: (reelsCount * 38000 + feedCount * 6500).toLocaleString(),
        dmLeads: Math.round((reelsCount * 38000 + feedCount * 6500) * 0.024).toLocaleString(),
        engagement: (4.2 + (reelsCount > 10 ? 1.4 : 0.6)).toFixed(1)
    };

    const calcWebsite = {
        speedScore: siteType === 'custom' ? '99/100' : '96/100',
        conversionLift: siteType === 'landing' ? '+320%' : siteType === 'ecommerce' ? '+240%' : '+185%',
        loadTime: '0.6초'
    };

    const calcTester = {
        totalImpressions: (reviewerCount * 4500 * (channelType === 'all' ? 1.5 : 1)).toLocaleString(),
        ugcAssets: reviewerCount * (channelType === 'all' ? 18 : 12),
        trustScore: reviewerCount >= 30 ? '98.5%' : '92.0%'
    };

    return (
        <div className="service-simulator-wrapper">
            <div className="simulator-header">
                <span className="sim-pill-kicker">LIVE CAMPAIGN SIMULATOR</span>
                <AnimatedTitle className="sim-title">실시간 성과 예측 시뮬레이터</AnimatedTitle>
                <p className="sim-desc">
                    슬라이더와 옵션을 조절하여 예상 도달 수치와 마케팅 기대 효과를 실시간으로 확인해보세요.
                </p>
            </div>

            <div className="simulator-grid">
                {/* ─── Brand Blog ─── */}
                {serviceType === 'blog' && (
                    <>
                        <div className="sim-controls-panel">
                            <div className="sim-control-group">
                                <div className="sim-label-row">
                                    <label>공략 타겟 황금 키워드 수</label>
                                    <span className="sim-val-badge">{keywordCount}개</span>
                                </div>
                                <input
                                    type="range"
                                    min="5"
                                    max="50"
                                    step="5"
                                    value={keywordCount}
                                    onChange={(e) => setKeywordCount(Number(e.target.value))}
                                    className="sim-slider"
                                />
                            </div>

                            <div className="sim-control-group">
                                <div className="sim-label-row">
                                    <label>월간 전문 칼럼 발행 횟수</label>
                                    <span className="sim-val-badge">월 {postFrequency}회</span>
                                </div>
                                <input
                                    type="range"
                                    min="8"
                                    max="24"
                                    step="4"
                                    value={postFrequency}
                                    onChange={(e) => setPostFrequency(Number(e.target.value))}
                                    className="sim-slider"
                                />
                            </div>
                        </div>

                        <div className="sim-results-panel">
                            <span className="sim-result-heading">예상 검색 유입 및 절감 효과</span>
                            <div className="sim-metric-card-group">
                                <div className="sim-res-box highlight">
                                    <span className="res-title">월간 예상 오가닉 검색 유입</span>
                                    <span className="res-num">{calcBlog.organicVisits} 명+</span>
                                    <span className="res-sub">네이버 스마트블록 & 뷰탭 유입</span>
                                </div>
                                <div className="sim-res-box">
                                    <span className="res-title">검색 광고비(CPC) 대체 절감액</span>
                                    <span className="res-num">월 약 {calcBlog.adSavings}만원</span>
                                    <span className="res-sub">파워링크 유상 클릭 환산 가치</span>
                                </div>
                                <div className="sim-res-box">
                                    <span className="res-title">1페이지 상위 점유율</span>
                                    <span className="res-num">{calcBlog.rankRate}</span>
                                    <span className="res-sub">D.I.A+ 알고리즘 지수 반영</span>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* ─── Instagram ─── */}
                {serviceType === 'instagram' && (
                    <>
                        <div className="sim-controls-panel">
                            <div className="sim-control-group">
                                <div className="sim-label-row">
                                    <label>월간 바이럴 릴스 제작 편수</label>
                                    <span className="sim-val-badge">{reelsCount}편</span>
                                </div>
                                <input
                                    type="range"
                                    min="4"
                                    max="20"
                                    step="2"
                                    value={reelsCount}
                                    onChange={(e) => setReelsCount(Number(e.target.value))}
                                    className="sim-slider"
                                />
                            </div>

                            <div className="sim-control-group">
                                <div className="sim-label-row">
                                    <label>월간 9그리드 피드 발행 수</label>
                                    <span className="sim-val-badge">{feedCount}회</span>
                                </div>
                                <input
                                    type="range"
                                    min="6"
                                    max="24"
                                    step="3"
                                    value={feedCount}
                                    onChange={(e) => setFeedCount(Number(e.target.value))}
                                    className="sim-slider"
                                />
                            </div>
                        </div>

                        <div className="sim-results-panel">
                            <span className="sim-result-heading">예상 소셜 도달 및 인게이지먼트</span>
                            <div className="sim-metric-card-group">
                                <div className="sim-res-box highlight">
                                    <span className="res-title">월간 비팔로워 탐색 도달수</span>
                                    <span className="res-num">{calcInstagram.organicReach} 회+</span>
                                    <span className="res-sub">탐색 탭 & 릴스 추천 피드 노출</span>
                                </div>
                                <div className="sim-res-box">
                                    <span className="res-title">예상 DM 상담 / 링크 유입</span>
                                    <span className="res-num">{calcInstagram.dmLeads} 건+</span>
                                    <span className="res-sub">자동 응답 퍼널 연결 기준</span>
                                </div>
                                <div className="sim-res-box">
                                    <span className="res-title">평균 인게이지먼트율</span>
                                    <span className="res-num">{calcInstagram.engagement}%</span>
                                    <span className="res-sub">업계 평균 대비 3.5배 수준</span>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* ─── Website Development ─── */}
                {serviceType === 'website' && (
                    <>
                        <div className="sim-controls-panel">
                            <div className="sim-control-group">
                                <label className="sim-block-label">제작 목적 & 웹사이트 유형</label>
                                <div className="sim-button-pills vertical">
                                    {[
                                        { id: 'landing', label: '🚀 고전환 인터랙티브 랜딩페이지 (단일 목적)' },
                                        { id: 'corporate', label: '🏢 프리미엄 기업 공식 웹사이트 (멀티페이지)' },
                                        { id: 'ecommerce', label: '🛍️ 반응형 D2C 이커머스 쇼핑몰 (결제 연동)' },
                                        { id: 'custom', label: '⚡ 커스텀 React 풀스택 웹 애플리케이션' }
                                    ].map((t) => (
                                        <button
                                            key={t.id}
                                            type="button"
                                            className={`pill-choice-btn block ${siteType === t.id ? 'active' : ''}`}
                                            onClick={() => setSiteType(t.id)}
                                        >
                                            {t.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="sim-results-panel">
                            <span className="sim-result-heading">예상 웹사이트 퍼포먼스</span>
                            <div className="sim-metric-card-group">
                                <div className="sim-res-box highlight">
                                    <span className="res-title">Google Lighthouse 성능 점수</span>
                                    <span className="res-num">{calcWebsite.speedScore}</span>
                                    <span className="res-sub">초고속 Core Web Vitals 달성</span>
                                </div>
                                <div className="sim-res-box">
                                    <span className="res-title">상담/구매 전환율 상승폭</span>
                                    <span className="res-num">{calcWebsite.conversionLift}</span>
                                    <span className="res-sub">모바일 인터랙티브 퍼널 최적화</span>
                                </div>
                                <div className="sim-res-box">
                                    <span className="res-title">평균 첫 페이지 로딩 속도</span>
                                    <span className="res-num">{calcWebsite.loadTime}</span>
                                    <span className="res-sub">이탈률 70% 이상 방지</span>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* ─── Tester Marketing ─── */}
                {serviceType === 'tester' && (
                    <>
                        <div className="sim-controls-panel">
                            <div className="sim-control-group">
                                <div className="sim-label-row">
                                    <label>모집 체험단 / 인플루언서 인원</label>
                                    <span className="sim-val-badge">{reviewerCount}명</span>
                                </div>
                                <input
                                    type="range"
                                    min="5"
                                    max="100"
                                    step="5"
                                    value={reviewerCount}
                                    onChange={(e) => setReviewerCount(Number(e.target.value))}
                                    className="sim-slider"
                                />
                                <div className="sim-range-limits">
                                    <span>5명</span>
                                    <span>25명 (추천)</span>
                                    <span>100명</span>
                                </div>
                            </div>

                            <div className="sim-control-group">
                                <label className="sim-block-label">집행 채널 믹스</label>
                                <div className="sim-button-pills">
                                    {[
                                        { id: 'all', label: '통합 올인원 (블로그+인스타+릴스)' },
                                        { id: 'blog', label: '네이버 블로그 중심' },
                                        { id: 'insta', label: '인스타그램 릴스 중심' }
                                    ].map((c) => (
                                        <button
                                            key={c.id}
                                            type="button"
                                            className={`pill-choice-btn ${channelType === c.id ? 'active' : ''}`}
                                            onClick={() => setChannelType(c.id)}
                                        >
                                            {c.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="sim-results-panel">
                            <span className="sim-result-heading">예상 검색 노출 및 에셋 확보</span>
                            <div className="sim-metric-card-group">
                                <div className="sim-res-box highlight">
                                    <span className="res-title">월간 예상 총 검색 노출량</span>
                                    <span className="res-num">{calcTester.totalImpressions} 회+</span>
                                    <span className="res-sub">포털 검색 & 소셜 탐색 탭 총합</span>
                                </div>
                                <div className="sim-res-box">
                                    <span className="res-title">확보되는 실사용자 UGC 에셋</span>
                                    <span className="res-num">{calcTester.ugcAssets} 개</span>
                                    <span className="res-sub">상세페이지 및 광고 2차 활용 가능</span>
                                </div>
                                <div className="sim-res-box">
                                    <span className="res-title">브랜드 신뢰 검증 지수</span>
                                    <span className="res-num">{calcTester.trustScore}</span>
                                    <span className="res-sub">소비자 구매 결제 전환 유도</span>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className="simulator-footer-cta">
                <span>⚡ 계산된 시뮬레이션 결과에 대한 상세 마케팅 제안서를 무료로 받아보세요.</span>
                <Link to="/consult" className="sim-cta-link">
                    1:1 맞춤 견적 & 제안서 요청 →
                </Link>
            </div>
        </div>
    );
};

export default ServiceSimulator;
