import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceNav from '../components/ServiceNav';
import TiltCard from '../components/motion/TiltCard';
import LiveMetricCountUp from '../components/motion/LiveMetricCountUp';
import InteractiveProcessTimeline from '../components/motion/InteractiveProcessTimeline';
import ServiceSimulator from '../components/motion/ServiceSimulator';
import InteractiveDeviceMockup from '../components/motion/InteractiveDeviceMockup';
import AnimatedTitle from '../components/motion/AnimatedTitle';

const TesterServiceView = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [openFaq, setOpenFaq] = useState(null);

    useEffect(() => {
        // Reset all character animations on page mount
        setTimeout(() => {
            const charElements = document.querySelectorAll('.char');
            charElements.forEach(el => {
                el.classList.remove('visible');
            });
        }, 50);
    }, []);

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
            id: 'visit',
            title: '매장 방문형 체험단',
            tag: 'OFFLINE STORE EXPERIENCE',
            heading: '오프라인 매장을 직접 체험하고 생생한 방문 후기를 생성하는 로컬 체험단',
            desc: '맛집, 카페, 뷰티샵, 핫플레이스 등 실제 매장을 방문하여 인테리어, 서비스, 메뉴의 매력을 고객 관점에서 솔직하고 풍부하게 리뷰합니다.',
            image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
            features: [
                '네이버 플레이스 지도 연동 및 매장 위치/주차/인테리어 상세 안내',
                '현장 분위기와 음식/서비스의 생생한 고화질 사진 15장+ 및 영상 첨부',
                '주변 지역명+업종 키워드(예: OOO맛집, OOO미용실) 검색 상위 노출',
                '방문 예약 스케줄 관리 및 노쇼(No-Show) 방지 시스템 가동'
            ],
            target: '음식점, 카페, 헤어/네일샵, 피트니스, 팝업스토어 등 오프라인 방문객 증대를 원하는 매장'
        },
        {
            id: 'delivery',
            title: '제품 배송형 체험단',
            tag: 'PRODUCT DELIVERY REVIEW',
            heading: '택배로 제품을 직접 사용해보고 실사용 비주얼 콘텐츠를 쌓는 체험단',
            desc: '화장품, 패션, 리빙, 식품, 건강기능식품 등 실사용 기반의 언박싱, 디테일 컷, 사용 전후 비교 리뷰를 통해 온라인 구매 전환을 촉진합니다.',
            image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
            features: [
                '타겟 연령 및 성별, 피부 타입 등 제품 카테고리 맞춤형 리뷰어 매칭',
                '언박싱, 텍스처, 일상 속 사용 씬 등 고퀄리티 실사용 사진·릴스 제작',
                '스마트스토어, 쿠팡, 자사몰 구매 링크 연동을 통한 즉각 구매 유도',
                '배송 트래킹 및 가이드라인 준수 여부 정밀 전수 검수'
            ],
            target: '신제품을 런칭하거나 온라인 쇼핑몰 상세페이지 후기를 대량 확보하고 싶은 커머스 브랜드'
        },
        {
            id: 'press',
            title: '정보 배포형 기자단',
            tag: 'PRESS & MEDIA SPREAD',
            heading: '브랜드 공식 행사, 프로모션, 신규 오픈 이슈를 신속하게 대량 배포',
            desc: '제품 배송이나 매장 방문 없이, 브랜드가 전달하고자 하는 핵심 보도자료 및 이벤트 소식을 다수의 영향력 있는 블로그에 빠르고 강력하게 확산합니다.',
            image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1000&q=80',
            features: [
                '원고 및 사진 가이드라인 기반 24~48시간 내 신속 동시 다발 발행',
                '브랜드명 및 프로모션 핵심 키워드 검색 결과 1페이지 대량 점유',
                '공식 이벤트 참여 링크 및 할인 쿠폰 정보 확산',
                '단기간 내 브랜드 인지도와 온라인 바이럴 버즈량을 극대화'
            ],
            target: '신규 오픈 행사, 와디즈/텀블벅 펀딩 런칭, 대규모 할인 프로모션을 알리고 싶은 기업'
        },
        {
            id: 'ninfluencer',
            title: 'N-인플루언서 프리미엄',
            tag: 'TOP-TIER INFLUENCERS',
            heading: '네이버 공식 인증 인플루언서를 통한 압도적 퀄리티와 랭킹 장악',
            desc: '네이버 공식 인플루언서 및 수만 명의 팔로워를 보유한 최상위 크리에이터를 선별 매칭하여 고단가·프리미엄 제품의 신뢰도를 극대화합니다.',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
            features: [
                '네이버 인플루언서 검색 탭 상위 노출(키워드 챌린지 1~3위 목표)',
                '잡지 화보급 연출 컷과 전문적인 롱폼 리뷰 콘텐츠 작성',
                '브랜드 신뢰도 급상승 및 대기업급 바이럴 아우라 구축',
                '인플루언서 탭, 뷰탭, 블로그 스마트블록 동시 다채널 노출'
            ],
            target: '프리미엄 브랜드 이미지 구축과 대형 키워드 1위 점유를 원하는 기업'
        }
    ];

    const processSteps = [
        {
            step: '01',
            title: '1:1 맞춤 무료 상담 & 브랜드 분석',
            desc: '브랜드 상황과 마케팅 목표를 면밀히 듣고 최적의 체험단 채널(블로그/인스타/유튜브)과 키워드 방향을 제안합니다.',
            duration: 'D+0',
            deliverable: '맞춤형 전략 제안서'
        },
        {
            step: '02',
            title: '업종별 전담 마케터 1:1 배정',
            desc: '해당 업종 경험이 풍부한 전문 마케터가 1:1로 매칭되어 정밀 키워드 분석과 상세 가이드라인을 수립합니다.',
            duration: 'D+2',
            deliverable: '키워드 & 가이드라인'
        },
        {
            step: '03',
            title: '캠페인 세팅 & 정밀 체험단 모집',
            desc: '전략 키워드 기반으로 캠페인을 등록하고, 15,000+ 리뷰어 풀에서 카테고리에 최적화된 체험단을 모집합니다.',
            duration: 'D+5',
            deliverable: '체험단 지원자 리스트'
        },
        {
            step: '04',
            title: '광고주 사전 검토 & 리뷰어 최종 선별',
            desc: '단순 모집이 아닌 일방문자수, 소통 지수, 과거 작성 퀄리티를 전수 검증하여 광고주가 직접 승인 후 확정합니다.',
            duration: 'D+7',
            deliverable: '최종 선발 리뷰어 명단'
        },
        {
            step: '05',
            title: '체험 진행 & 가이드라인 검수 발행',
            desc: '매장 방문 또는 제품 수령 후 실사용 기반의 진성 리뷰를 작성하며, 필수 키워드와 사진 누락 여부를 전수 검수합니다.',
            duration: 'D+14',
            deliverable: '검수 완료 포스팅'
        },
        {
            step: '06',
            title: '검색 노출 분석 & 종합 성과 보고서',
            desc: '키워드별 노출 순위, 조회수, 공감/댓글 수치, 유입 효과를 투명하게 정리한 결과 보고서를 제공합니다.',
            duration: 'D+20',
            deliverable: '최종 성과 분석 리포트'
        }
    ];

    const faqs = [
        {
            q: '체험단 인원은 최소 몇 명부터 진행 가능한가요?',
            a: '최소 5명 소규모 파일럿 캠페인부터 100명 이상의 대규모 바이럴 캠페인까지 브랜드 상황에 맞춰 유연하게 진행하실 수 있습니다.'
        },
        {
            q: '리뷰어들이 대충 작성하거나 불성실하게 작성하면 어떻게 하나요?',
            a: 'MarketWith는 철저한 사전 가이드라인(필수 사진 수, 필수 키워드, 제품 특장점 강조)을 제공하며, 전문 검수팀이 발행 전후 전수 검수를 진행합니다. 기준에 미달할 경우 즉시 수정을 요청하여 보완합니다.'
        },
        {
            q: '광고주가 직접 리뷰어를 확인하고 고를 수 있나요?',
            a: '네, 물론입니다! 지원한 체험단의 블로그 주소, 일 방문자수, 과거 작성 글의 퀄리티를 광고주 대시보드를 통해 직접 확인하시고 최종 승인하실 수 있습니다.'
        },
        {
            q: '체험단 모집부터 결과 보고서까지 총 얼마나 걸리나요?',
            a: '상담 및 모집 1주, 배송 및 방문 체험 1주, 작성 및 검수 1주로 대략 2~3주 내에 전체 캠페인이 완료되며 종합 결과 보고서가 전달됩니다.'
        }
    ];

    return (
        <div className="service-page">
            <Header />
            <ServiceNav currentPath="/services/tester" />

            <main className="service-content">
                {/* ─── Hero Section with Motion Canvas & Tester Review Mockup ─── */}
                <section className="service-hero-detail fade-up">
                    <div className="hero-badge-row">
                        <span className="hero-service-tag">INFLUENCER & REVIEW MARKETING</span>
                        <span className="hero-status-pill">VERIFIED 15,000+ REVIEWER POOL</span>
                    </div>

                    <h1>
                        신뢰도 높은 실사용자 후기로<br />
                        <span className="accent-text">검색과 매출을 장악하는</span> 체험단 마케팅
                    </h1>

                    <p className="hero-lead">
                        단순한 물량 배포가 아닙니다. 80% 이상의 소비자가 구매 전 검색하는 여정을 정밀 분석하여,
                        블로그·인스타그램·유튜브 등 브랜드에 최적화된 진성 리뷰어로 신뢰와 구매 전환을 동시에 완성합니다.
                    </p>

                    {/* Interactive Tester Review Feed Mockup */}
                    <div className="hero-mockup-wrapper">
                        <InteractiveDeviceMockup serviceType="tester" />
                    </div>

                    <div className="hero-metrics-grid">
                        <TiltCard maxTilt={8}>
                            <div className="hero-metric-card">
                                <div className="metric-card-number">
                                    <LiveMetricCountUp value="15,000+" />
                                </div>
                                <div className="metric-card-label">검증된 인플루언서 풀</div>
                                <div className="metric-card-desc">방문자수·지수 엄격 사전 검증</div>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={8}>
                            <div className="hero-metric-card">
                                <div className="metric-card-number">
                                    <LiveMetricCountUp value="12,000+" />
                                </div>
                                <div className="metric-card-label">누적 리뷰 콘텐츠 발행</div>
                                <div className="metric-card-desc">맛집·뷰티·IT·리빙 전 업종 커버</div>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={8}>
                            <div className="hero-metric-card">
                                <div className="metric-card-number">
                                    <LiveMetricCountUp value="96.2%" />
                                </div>
                                <div className="metric-card-label">키워드 노출 만족도</div>
                                <div className="metric-card-desc">네이버 스마트블록 & 뷰탭 상위 점유</div>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={8}>
                            <div className="hero-metric-card">
                                <div className="metric-card-number">
                                    <LiveMetricCountUp value="3배+" />
                                </div>
                                <div className="metric-card-label">광고 대비 높은 설득력</div>
                                <div className="metric-card-desc">실제 사용 후기 기반의 강력한 전환</div>
                            </div>
                        </TiltCard>
                    </div>

                    <div className="hero-action-buttons">
                        <Link to="/support/consult" className="btn-primary-consult">
                            체험단 무료 맞춤 컨설팅 신청 →
                        </Link>
                        <Link to="/portfolio" className="btn-secondary-outline">
                            체험단 집행 성공 사례 보기
                        </Link>
                    </div>
                </section>

                {/* ─── Strategic Insights with 3D Tilt Cards ─── */}
                <section className="strategic-insights-section fade-up">
                    <div className="service-section-header">
                        <span className="section-kicker">WHY INFLUENCER REVIEW</span>
                        <AnimatedTitle>체험단 마케팅이 구매 결정의 핵심인 이유</AnimatedTitle>
                        <p className="section-subtext">
                            오늘날 소비자는 브랜드의 일방적인 광고 문구보다 실제 경험자의 솔직한 후기를 3배 이상 신뢰합니다.
                        </p>
                    </div>

                    <div className="insights-card-grid">
                        <TiltCard maxTilt={6}>
                            <div className="insight-card">
                                <div className="insight-card-num">01</div>
                                <h3 className="insight-card-title">소비자 행동의 시작</h3>
                                <p className="insight-card-body">
                                    80% 이상의 소비자들이 구매 또는 매장 방문 전 검색부터 시작합니다. 포털에 풍부한 리뷰가 없으면 고객은 경쟁사로 이탈합니다.
                                </p>
                                <span className="insight-card-badge">검색 점유율 필수</span>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={6}>
                            <div className="insight-card">
                                <div className="insight-card-num">02</div>
                                <h3 className="insight-card-title">압도적인 브랜드 신뢰도</h3>
                                <p className="insight-card-body">
                                    실제 사용자의 생생한 사진과 솔직한 후기 콘텐츠는 일반적인 유료 배너 광고보다 3배 이상 높은 설득력과 구매 결정을 이끌어냅니다.
                                </p>
                                <span className="insight-card-badge">설득력 3배 상승</span>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={6}>
                            <div className="insight-card">
                                <div className="insight-card-num">03</div>
                                <h3 className="insight-card-title">검증된 필수 마케팅 전략</h3>
                                <p className="insight-card-body">
                                    동네 소상공인 맛집부터 대기업 신제품 런칭까지, 초기 시장 안착과 입소문 확산을 위해 가장 먼저 선택하는 핵심 전략입니다.
                            </p>
                                <span className="insight-card-badge">초기 버즈량 폭발</span>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={6}>
                            <div className="insight-card">
                                <div className="insight-card-num">04</div>
                                <h3 className="insight-card-title">다채널 동시 콘텐츠 확산</h3>
                                <p className="insight-card-body">
                                    블로그, 인스타그램, 릴스, 유튜브 등 브랜드 타겟에 적합한 채널을 산정하여 온라인 어디서든 귀사의 브랜드를 만나게 합니다.
                                </p>
                                <span className="insight-card-badge">옴니채널 바이럴</span>
                            </div>
                        </TiltCard>
                    </div>
                </section>

                {/* ─── Interactive Solutions Tabs ─── */}
                <section className="solutions-tab-section fade-up">
                    <div className="service-section-header">
                        <span className="section-kicker">CUSTOM CHANNELS</span>
                        <AnimatedTitle>브랜드 상황에 딱 맞춘 4대 체험단 솔루션</AnimatedTitle>
                        <p className="section-subtext">
                            매장 방문부터 제품 배송, 기자단, 네이버 공식 인플루언서까지 최적의 타입을 탭을 클릭하여 확인해보세요.
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

                {/* ─── Live Tester Review Reach Simulator ─── */}
                <section className="fade-up">
                    <ServiceSimulator serviceType="tester" />
                </section>

                {/* ─── Interactive 6-Step Timeline ─── */}
                <section className="execution-process-section fade-up" style={{ maxWidth: '1300px', margin: '0 auto 80px', padding: '0 24px' }}>
                    <div className="service-section-header">
                        <span className="section-kicker">EXECUTION FLOW</span>
                        <AnimatedTitle>철저하고 투명한 6단계 체험단 운영 프로세스</AnimatedTitle>
                        <p className="section-subtext">
                            단계를 클릭하여 사전 검토와 전수 검수 등 세부 절차를 확인하세요.
                        </p>
                    </div>

                    <InteractiveProcessTimeline steps={processSteps} serviceName="체험단 마케팅" />
                </section>

                {/* ─── Quality Advantage Showcase ─── */}
                <section className="performance-showcase-section fade-up">
                    <span className="perf-header-kicker">MARKETWITH REVIEW ADVANTAGE</span>
                    <h2 className="perf-main-title">NOT JUST NUMBERS, REAL IMPACT</h2>
                    <p className="perf-sub-desc">
                        무의미한 리뷰 개수 채우기는 그만두세요. 키워드 검색량과 구매 전환 데이터를 기반으로 진짜 매출이 일어나는 체험단을 설계합니다.
                    </p>

                    <div className="perf-grid-columns">
                        <div className="perf-col-card">
                            <span className="perf-col-tag">KEYWORD STRATEGY</span>
                            <h3 className="perf-col-title">키워드 중심 전략 컨설팅</h3>
                            <p className="perf-col-body">
                                업종에 맞는 핵심 및 세부 키워드를 먼저 빅데이터로 분석하고, 실제 검색량이 높고 구매 전환이 빠른 방향으로 캠페인을 설계합니다.
                            </p>
                        </div>
                        <div className="perf-col-card">
                            <span className="perf-col-tag">CHANNEL FIT</span>
                            <h3 className="perf-col-title">브랜드에 딱 맞는 채널 제안</h3>
                            <p className="perf-col-body">
                                블로그, 인스타그램, 릴스, 유튜브 중 어디가 더 효과적일지 타겟층의 소비 패턴을 고려해 최적의 플랫폼 믹스를 제안합니다.
                            </p>
                        </div>
                        <div className="perf-col-card">
                            <span className="perf-col-tag">VERIFIED REVIEWERS</span>
                            <h3 className="perf-col-title">검증된 진성 리뷰어만 선별</h3>
                            <p className="perf-col-body">
                                단순 인원 모집이 아닌 실제 영향력, 일방문자수, 소통 지수, 활동 이력을 전수 검증하여 고퀄리티 리뷰어만 100% 매칭합니다.
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
                            체험단 마케팅 진행 시 자주 묻는 질문들을 모았습니다.
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
                    <span className="cta-kicker">START YOUR REVIEW CAMPAIGN</span>
                    <h2 className="cta-main-title">
                        소비자의 솔직한 후기로<br />
                        포털 검색 1위와 폭발적인 매출을 만드세요.
                    </h2>
                    <p className="cta-desc-text">
                        업종별 전담 마케터가 브랜드 상황에 가장 적합한 체험단 플랜과 무료 키워드 분석을 즉시 제공해 드립니다.
                    </p>
                    <div className="cta-button-group">
                        <Link to="/support/consult" className="btn-primary-consult">
                            체험단 무료 컨설팅 신청하기 →
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

export default TesterServiceView;
