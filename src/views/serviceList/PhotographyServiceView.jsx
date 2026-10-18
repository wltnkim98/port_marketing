import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ServiceNav from '../../components/ServiceNav';
import TiltCard from '../../components/motion/TiltCard';
import LiveMetricCountUp from '../../components/motion/LiveMetricCountUp';
import InteractiveProcessTimeline from '../../components/motion/InteractiveProcessTimeline';
import InteractiveDeviceMockup from '../../components/motion/InteractiveDeviceMockup';
import AnimatedTitle from '../../components/motion/AnimatedTitle';

const PhotographyServiceView = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [openFaq, setOpenFaq] = useState(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.12 }
        );

        const fadeElements = document.querySelectorAll('.fade-up');
        fadeElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const toggleFaq = (idx) => {
        setOpenFaq(openFaq === idx ? null : idx);
    };

    const solutionTabs = [
        {
            id: 'shortform',
            title: '숏폼 & 릴스 제작',
            tag: 'REELS & TIKTOK & SHORTS',
            heading: '첫 3초 후킹과 트렌드 음원으로 알고리즘을 타는 15~60초 숏폼',
            desc: '소셜 미디어 플랫폼 알고리즘에 최적화된 호흡 빠른 컷편집과 직관적인 텍스트 모션 그래픽으로 수십만 조회수의 오가닉 바이럴을 만듭니다.',
            image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=80',
            features: [
                '시선을 뺏는 후킹 인트로 3초 연출 및 스크립트 작성',
                '트렌딩 음원 및 플랫폼별 최적 화면비(9:16) 맞춤 렌더링',
                '모바일 가독성을 극대화한 타이포그래피 & 모션 이펙트',
                '광고 소재(Spark Ads / Reels Ad) 즉시 집행 호환 포맷 납품'
            ],
            target: '인스타그램·틱톡 유입 확대 및 브랜드 인지도 급상승을 원하는 브랜드'
        },
        {
            id: 'brandfilm',
            title: '브랜드 홍보 영상',
            tag: 'BRAND COMMERCIAL & STORY',
            heading: '브랜드의 철학과 프리미엄 가치를 담아내는 시네마틱 홍보 영상',
            desc: '4K/6K 시네마 카메라와 전문 조명 연출을 통해 브랜드 고유의 스토리와 감성을 완성도 높은 한 편의 영화처럼 제작합니다.',
            image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1000&q=80',
            features: [
                '전문 크리에이티브 디렉터 1:1 기획 및 콘티/스토리보드 설계',
                '전문 촬영 감독, 조명팀, 아트 디렉터 풀 패키지 투입',
                '전문 성우 내레이션, 오리지널 사운드 디자인 및 시네마틱 컬러 그레이딩',
                '웹사이트 메인 영상, B2B 소개, 유튜브 광고 다목적 활용'
            ],
            target: '기업 이미지 제고, 신제품 런칭, 브랜드 리뉴얼을 준비하는 기업'
        },
        {
            id: 'productphoto',
            title: '제품 & 공간 상업 화보',
            tag: 'COMMERCIAL PHOTOGRAPHY',
            heading: '소비자의 구매욕을 자극하는 고감도 제품 화보 및 공간 인테리어 촬영',
            desc: '조명과 텍스처, 색감의 디테일을 살려 제품의 실물보다 더 매력적인 비주얼을 포착하고 공간의 분위기를 극대화합니다.',
            image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1000&q=80',
            features: [
                '컨셉츄얼 스튜디오 연출 및 브랜드 무드에 맞춘 소품 스타일링',
                '화장품, 패션, F&B, 리빙 등 산업군별 특화된 라이팅 테크닉',
                '고해상도 원본 및 상세페이지·카탈로그용 하이엔드 정밀 리터칭',
                '누끼컷, 연출컷, 모델 착용컷, 디테일 텍스처 컷 완벽 구성'
            ],
            target: '스마트스토어, 자사몰, 와디즈 펀딩, 룩북 제작을 앞둔 브랜드'
        },
        {
            id: 'creatormatching',
            title: '크리에이터 & 모델 매칭',
            tag: 'CREATOR COLLABORATION',
            heading: '가장 빠르고 적합한 전문 모델·인플루언서 크리에이터 매칭',
            desc: '자체 크리에이터 네트워크를 통해 브랜드 타겟 연령대와 이미지에 부합하는 전문 모델 및 촬영 인력을 다이렉트로 섭외합니다.',
            image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80',
            features: [
                '패션/뷰티/피트니스/비즈니스 전문 모델 포트폴리오 사전 검토',
                '초상권 및 온·오프라인 2차 라이선스 계약 원스톱 조율',
                '현장 전담 매니저 동행을 통한 안정적인 촬영 디렉팅',
                '인플루언서 개인 채널 업로드 연계를 통한 추가 홍보 효과'
            ],
            target: '모델 섭외부터 촬영, 라이선스까지 복잡한 과정을 한 번에 해결하고 싶은 브랜드'
        }
    ];

    const processSteps = [
        {
            step: '01',
            title: '무드보드 기획 & 사전 컨설팅',
            desc: '브랜드 아이덴티티와 타겟 소비자의 시각적 취향을 분석하여 맞춤형 레퍼런스 무드보드와 콘티를 수립합니다.',
            duration: 'D-10',
            deliverable: '기획안 & 무드보드'
        },
        {
            step: '02',
            title: '로케이션 & 크리에이터 확정',
            desc: '촬영 컨셉에 최적화된 스튜디오 및 야외 로케이션을 대관하고 전문 모델 및 촬영 스태프를 배정합니다.',
            duration: 'D-7',
            deliverable: '로케이션 & 모델 매칭'
        },
        {
            step: '03',
            title: '촬영 큐시트 & 스타일링 셋업',
            desc: '소품, 조명 셋업, 착장 가이드, 타임테이블이 포함된 정밀 큐시트를 확정하여 촬영 당일 오차를 없앱니다.',
            duration: 'D-3',
            deliverable: '최종 촬영 큐시트'
        },
        {
            step: '04',
            title: '현장 본 촬영 & 실시간 모니터링',
            desc: '4K/6K 카메라 시스템과 전문 조명팀이 투입되어 콘티에 따른 시네마틱 촬영을 진행하며 실시간 피드백을 반영합니다.',
            duration: 'D-Day',
            deliverable: '현장 원본 데이터'
        },
        {
            step: '05',
            title: '하이엔드 포스트 프로덕션',
            desc: '색보정(Color Grading), 사운드 디자인, 텍스트 모션 그래픽, 피부 및 텍스처 정밀 리터칭 작업을 진행합니다.',
            duration: 'D+5',
            deliverable: '1차 가편집본'
        },
        {
            step: '06',
            title: '최종 마스터링 & 다채널 납품',
            desc: '피드백을 반영한 최종 수정본을 웹사이트, 인스타, 유튜브, 상세페이지 등 플랫폼별 맞춤 비율로 납품합니다.',
            duration: 'D+7',
            deliverable: '마스터 완성본 패키지'
        }
    ];

    const faqs = [
        {
            q: '촬영 1회 진행 시 어떤 포맷의 산출물을 받게 되나요?',
            a: '선택하신 패키지에 따라 4K/FHD 고화질 영상 원본, 인스타그램 릴스 및 숏폼용 9:16 세로형 영상, 상세페이지 및 웹사이트용 가로형 비주얼 컷, 고해상도 리터칭 사진이 올인원 패키지로 함께 제공됩니다.'
        },
        {
            q: '촬영 컨셉이나 레퍼런스가 없는 상태에서도 의뢰가 가능한가요?',
            a: '네, 가능합니다! MarketWith 전담 크리에이티브 디렉터가 귀사의 제품군과 타겟 고객의 선호도를 분석하여 기획안, 레퍼런스 무드보드, 큐시트를 직접 제안해 드립니다.'
        },
        {
            q: '모델 섭외나 스튜디오 대관도 함께 진행해 주시나요?',
            a: '네. 제품 카테고리에 최적화된 전문 스튜디오 대관부터 전문 모델 섭외, 스타일리스트, 헤어/메이크업 팀 배정, 라이선스 계약까지 원스톱으로 대행해 드립니다.'
        },
        {
            q: '제작된 영상과 사진의 2차 활용 라이선스 범위는 어떻게 되나요?',
            a: '기본적으로 공식 웹사이트, 공식 SNS(인스타그램, 유튜브), 온·오프라인 상세페이지, 온라인 유료 광고 집행에 자유롭게 활용하실 수 있도록 라이선스를 설계해 드립니다.'
        }
    ];

    return (
        <div className="service-page">
            <Header />
            <ServiceNav currentPath="/services/photography" />

            <main className="service-content">
                {/* ─── Hero Section with Motion Canvas & Interactive HUD ─── */}
                <section className="service-hero-detail fade-up">
                    <div className="hero-badge-row">
                        <span className="hero-service-tag">VISUAL PRODUCTION</span>
                        <span className="hero-status-pill">4K/6K HDR CINEMATIC</span>
                    </div>

                    <h1>
                        소비자의 3초를 훔치는<br />
                        <span className="accent-text">고감도 사진·영상·숏폼</span> 촬영 제작
                    </h1>

                    <p className="hero-lead">
                        단순히 찍는 것에 그치지 않습니다. 브랜드의 고유한 철학을 시각적 언어로 번역하여,
                        플레이스·인스타그램·웹사이트·상세페이지 어디서든 강력한 전환을 일으키는 완성도 높은 비주얼 에셋을 제작합니다.
                    </p>

                    {/* Interactive Device Viewfinder Mockup */}
                    <div className="hero-mockup-wrapper">
                        <InteractiveDeviceMockup serviceType="photography" />
                    </div>

                    <div className="hero-metrics-grid">
                        <TiltCard maxTilt={8}>
                            <div className="hero-metric-card">
                                <div className="metric-card-number">
                                    <LiveMetricCountUp value="1,800+" />
                                </div>
                                <div className="metric-card-label">누적 콘텐츠 제작</div>
                                <div className="metric-card-desc">패션·뷰티·F&B·IT 전 분야 촬영</div>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={8}>
                            <div className="hero-metric-card">
                                <div className="metric-card-number">
                                    <LiveMetricCountUp value="4.8M+" />
                                </div>
                                <div className="metric-card-label">숏폼 누적 조회수</div>
                                <div className="metric-card-desc">알고리즘을 타는 후킹 컷 연출</div>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={8}>
                            <div className="hero-metric-card">
                                <div className="metric-card-number">
                                    <LiveMetricCountUp value="98.4%" />
                                </div>
                                <div className="metric-card-label">클라이언트 만족도</div>
                                <div className="metric-card-desc">기획부터 모델 섭외까지 원스톱</div>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={8}>
                            <div className="hero-metric-card">
                                <div className="metric-card-number">
                                    <LiveMetricCountUp value="100%" />
                                </div>
                                <div className="metric-card-label">원소스 멀티유즈</div>
                                <div className="metric-card-desc">SNS·웹·광고 다채널 규격 지원</div>
                            </div>
                        </TiltCard>
                    </div>

                    <div className="hero-action-buttons">
                        <button to="/support/consult" className="btn-primary-consult">
                            촬영 제작 무료 견적 상담 →
                        </button>
                        <button to="/portfolio" className="btn-secondary-outline">
                            제작 포트폴리오 둘러보기
                        </button>
                    </div>
                </section>

                {/* ─── Strategic Insights with 3D Tilt Cards ─── */}
                <section className="strategic-insights-section fade-up">
                    <div className="service-section-header">
                        <span className="section-kicker">WHY VISUAL MATTERS</span>
                        <AnimatedTitle>왜 브랜드 맞춤형 촬영 제작이 필요할까요?</AnimatedTitle>
                        <p className="section-subtext">
                            넘쳐나는 온라인 광고 속에서 소비자가 브랜드를 기억하고 결제하기까지 걸리는 시간은 단 3초입니다.
                        </p>
                    </div>

                    <div className="insights-card-grid">
                        <TiltCard maxTilt={6}>
                            <div className="insight-card">
                                <div className="insight-card-num">01</div>
                                <h3 className="insight-card-title">첫 3초의 시각적 결정력</h3>
                                <p className="insight-card-body">
                                    소비자의 84% 이상이 고해상도 비주얼 퀄리티를 통해 브랜드의 전문성과 신뢰도를 즉시 판단합니다. 조악한 스톡 이미지는 신뢰를 떨어뜨립니다.
                                </p>
                                <span className="insight-card-badge">신뢰도 3.2배 상승</span>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={6}>
                            <div className="insight-card">
                                <div className="insight-card-num">02</div>
                                <h3 className="insight-card-title">숏폼 중심의 플랫폼 알고리즘</h3>
                                <p className="insight-card-body">
                                    인스타그램 릴스와 숏폼은 팔로워 수와 무관하게 퀄리티 높은 콘텐츠를 수십만 타겟에게 자연 도달시키는 가장 강력한 무기입니다.
                                </p>
                                <span className="insight-card-badge">오가닉 바이럴 극대화</span>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={6}>
                            <div className="insight-card">
                                <div className="insight-card-num">03</div>
                                <h3 className="insight-card-title">원소스 멀티유즈 효율</h3>
                                <p className="insight-card-body">
                                    단 한 번의 정밀 촬영으로 홈페이지 메인, 스마트스토어 상세페이지, 인스타 피드, 퍼포먼스 광고 소재까지 모든 채널을 완벽히 커버합니다.
                                </p>
                                <span className="insight-card-badge">마케팅 리소스 절감</span>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={6}>
                            <div className="insight-card">
                                <div className="insight-card-num">04</div>
                                <h3 className="insight-card-title">독보적 브랜드 아이덴티티</h3>
                                <p className="insight-card-body">
                                    귀사만의 독창적인 조명 톤, 색감 팔레트, 구도 가이드를 확립하여 시장 경쟁사들과 확실히 차별화되는 고유의 브랜드 무드를 만듭니다.
                                </p>
                                <span className="insight-card-badge">프리미엄 가치 구축</span>
                            </div>
                        </TiltCard>
                    </div>
                </section>

                {/* ─── Interactive Solutions Tabs ─── */}
                <section className="solutions-tab-section fade-up">
                    <div className="service-section-header">
                        <span className="section-kicker">CUSTOM SOLUTIONS</span>
                        <AnimatedTitle>목적에 맞춘 4대 전문 촬영 솔루션</AnimatedTitle>
                        <p className="section-subtext">
                            제품 및 브랜드의 마케팅 단계에 가장 적합한 제작 솔루션을 탭을 클릭하여 확인해보세요.
                        </p>
                    </div>

                    <div className="tab-nav-wrapper">
                        {solutionTabs.map((tab, idx) => (
                            <button
                                key={tab.id}
                                className={`solution-tab-btn ${activeTab === idx ? 'active' : ''}`}
                                onClick={() => setActiveTab(idx)}
                            >
                                {tab.title}
                            </button>
                        ))}
                    </div>

                    <div className="solution-panel-display">
                        <div className="solution-panel-visual">
                            <img src={solutionTabs[activeTab].image} alt={solutionTabs[activeTab].title} />
                            <span className="panel-img-badge">{solutionTabs[activeTab].tag}</span>
                        </div>

                        <div className="solution-panel-info">
                            <span className="panel-tag-sub">{solutionTabs[activeTab].tag}</span>
                            <h3 className="panel-main-heading">{solutionTabs[activeTab].heading}</h3>
                            <p className="panel-desc-text">{solutionTabs[activeTab].desc}</p>

                            <ul className="panel-features-list">
                                {solutionTabs[activeTab].features.map((feat, fIdx) => (
                                    <li key={fIdx}>
                                        <span className="check-icon">✓</span>
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="panel-target-recommend">
                                <strong>추천 대상:</strong> {solutionTabs[activeTab].target}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── Interactive 6-Step Timeline ─── */}
                <section className="execution-process-section fade-up" style={{ maxWidth: '1300px', margin: '0 auto 80px', padding: '0 24px' }}>
                    <div className="service-section-header">
                        <span className="section-kicker">INTERACTIVE WORKFLOW</span>
                        <AnimatedTitle>체계적인 6단계 제작 프로세스</AnimatedTitle>
                        <p className="section-subtext">
                            단계를 클릭하여 사전 기획부터 후반 마스터링까지의 세부 과정과 산출물을 확인하세요.
                        </p>
                    </div>

                    <InteractiveProcessTimeline steps={processSteps} serviceName="사진·영상 제작" />
                </section>

                {/* ─── Production Quality Showcase ─── */}
                <section className="performance-showcase-section fade-up">
                    <span className="perf-header-kicker">MARKETWITH PRODUCTION ADVANTAGE</span>
                    <h2 className="perf-main-title">WE MAKE YOUR BRAND STAND OUT</h2>
                    <p className="perf-sub-desc">
                        일반 촬영 대행업체와의 차이는 ‘마케팅 관점에서의 기획력’에 있습니다.
                        예쁘기만 한 영상이 아니라 실제 구매와 문의로 이어지는 비주얼 아키텍처를 제공합니다.
                    </p>

                    <div className="perf-grid-columns">
                        <div className="perf-col-card">
                            <span className="perf-col-tag">GEAR & SYSTEM</span>
                            <h3 className="perf-col-title">시네마급 장비 & 전문 스튜디오</h3>
                            <p className="perf-col-body">
                                4K/6K 고화질 시네마 라인, 전문 시네 렌즈, 고출력 Aputure 라이팅, 짐벌 시스템을 보유하여 타협 없는 퀄리티를 보장합니다.
                            </p>
                        </div>
                        <div className="perf-col-card">
                            <span className="perf-col-tag">DIRECTING</span>
                            <h3 className="perf-col-title">전문 크리에이티브 디렉터 전담</h3>
                            <p className="perf-col-body">
                                수백 편의 상업 광고와 숏폼 바이럴을 총괄한 전문 디렉터가 기획부터 현장 연출, 후반 편집까지 1:1로 밀착 책임집니다.
                            </p>
                        </div>
                        <div className="perf-col-card">
                            <span className="perf-col-tag">CROSS-CHANNEL</span>
                            <h3 className="perf-col-title">마케팅 캠페인 즉시 연계</h3>
                            <p className="perf-col-body">
                                완성된 영상과 사진을 인스타그램, 블로그 체험단, 네이버 플레이스, 퍼포먼스 광고와 유기적으로 결합하여 효과를 배가시킵니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ─── FAQ Accordion ─── */}
                <section className="faq-accordion-section fade-up">
                    <div className="service-section-header">
                        <span className="section-kicker">FAQ</span>
                        <h2 className="section-main-title">자주 묻는 질문</h2>
                        <p className="section-subtext">
                            사진 촬영 및 영상 제작에 대해 궁금하신 점을 확인해보세요.
                        </p>
                    </div>

                    <div className="faq-list-container">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className={`faq-item-card ${openFaq === idx ? 'open' : ''}`}>
                                <button
                                    className="faq-question-btn"
                                    onClick={() => toggleFaq(idx)}
                                    aria-expanded={openFaq === idx}
                                >
                                    <span>
                                        <span className="faq-q-badge">Q.</span>
                                        {faq.q}
                                    </span>
                                    <span className="faq-toggle-icon">+</span>
                                </button>
                                {openFaq === idx && (
                                    <div className="faq-answer-drawer">
                                        <p>{faq.a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* ─── Bottom CTA ─── */}
                <section className="service-footer-cta fade-up">
                    <span className="cta-kicker">GET STARTED WITH MARKETWITH</span>
                    <h2 className="cta-main-title">
                        당신의 브랜드에 걸맞은<br />
                        압도적인 비주얼을 지금 만들어보세요.
                    </h2>
                    <p className="cta-desc-text">
                        전문 마케터와 크리에이티브 디렉터가 귀사의 제품과 공간에 최적화된 촬영 플랜과 무료 견적을 안내해 드립니다.
                    </p>
                    <div className="cta-button-group">
                        <Link to="/support/consult" className="btn-primary-consult">
                            1:1 촬영 컨설팅 신청하기 →
                        </Link>
                        <Link to="/services" className="btn-secondary-outline">
                            전체 마케팅 서비스 보기
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default PhotographyServiceView;
