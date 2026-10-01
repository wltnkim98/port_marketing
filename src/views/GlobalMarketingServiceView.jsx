import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceNav from '../components/ServiceNav';
import TiltCard from '../components/motion/TiltCard';
import LiveMetricCountUp from '../components/motion/LiveMetricCountUp';
import InteractiveProcessTimeline from '../components/motion/InteractiveProcessTimeline';
import InteractiveDeviceMockup from '../components/motion/InteractiveDeviceMockup';
import AnimatedTitle from '../components/motion/AnimatedTitle';

const GlobalMarketingServiceView = () => {
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
            id: 'globalsocial',
            title: '권역별 글로벌 SNS & 숏폼',
            tag: 'GLOBAL SOCIAL & VIRAL',
            heading: '북미·일본·동남아·중화권 현지 맞춤형 SNS 채널 구축 및 숏폼 바이럴',
            desc: '단순한 번역이 아닌 현지 인터넷 문화와 유행 밈을 반영한 다국어 콘텐츠로 TikTok, Instagram Global, Xiaohongshu(샤오홍슈) 등 핵심 채널을 운영합니다.',
            image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1000&q=80',
            features: [
                '타겟 국가(미국, 일본, 대만, 동남아 등) 현지 네이티브 에디터 감수',
                'TikTok Global 및 인스타그램 릴스 해외 알고리즘 최적화',
                '샤오홍슈(小红书) / 웨이보 / 일본 X(Twitter) 채널 특화 운영',
                '현지 트렌딩 해시태그 및 기념일/시즌 프로모션 캘린더 적용'
            ],
            target: 'K-뷰티, 패션, F&B, 푸드테크 등 글로벌 시장 인지도 확장을 노리는 브랜드'
        },
        {
            id: 'globalinfluencer',
            title: '해외 현지 인플루언서 협업',
            tag: 'CROSS-BORDER CREATORS',
            heading: '2,500+ 글로벌 인플루언서 네트워크를 통한 실사용 언박싱 바이럴',
            desc: '현지에서 실질적인 구매 영향력을 가진 메가·마이크로 크리에이터를 매칭하여 현지 언어로 진정성 있는 리뷰와 숏폼 콘텐츠를 배포합니다.',
            image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=80',
            features: [
                '국가별 타겟 카테고리(뷰티/패션/IT/리빙) 전문 인플루언서 섭외',
                '글로벌 배송 트래킹 및 가이드라인 번역/배포 원스톱 관리',
                '인플루언서 공식 채널 2차 광고 집행 라이선스 협의',
                '국가별 조회수, 댓글 반응, 유입 추적 링크 데이터 리포트 제공'
            ],
            target: '현지 소비자들에게 확실한 신뢰와 초기 구매 후기를 심어주고 싶은 기업'
        },
        {
            id: 'globalads',
            title: '글로벌 퍼포먼스 광고',
            tag: 'META & GOOGLE GLOBAL ADS',
            heading: '국가별 초정밀 타겟팅으로 ROAS를 극대화하는 크로스보더 유료 광고',
            desc: 'Meta(Facebook/Instagram), Google Search/YouTube, TikTok Ads를 통해 현지 통화 및 언어에 맞춘 고효율 퍼포먼스 광고 캠페인을 설계하고 집행합니다.',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
            features: [
                '국가별 구매력 지수 및 검색량 기반 입찰가 최적화 전략',
                '현지 소비자의 페인포인트를 자극하는 현지화 광고 크리에이티브 A/B 테스팅',
                'Shopify / Amazon / Shopee / Qoo10 등 글로벌 이커머스 전환 추적',
                '실시간 ROAS 대시보드 및 예산 자동 재분배 알고리즘 운영'
            ],
            target: '해외 자사몰(Shopify) 및 아마존·쇼피 매출을 급속도로 스케일업할 브랜드'
        },
        {
            id: 'globallanding',
            title: '다국어 랜딩페이지 & 글로벌 SEO',
            tag: 'MULTILINGUAL SEO & CRO',
            heading: 'Google 해외 검색 상위 노출과 현지 결제를 지원하는 글로벌 웹 아키텍처',
            desc: '해외 소비자의 결제 및 구매 심리를 고려한 다국어(영/일/중) 고전환 랜딩페이지를 제작하고, Google 글로벌 SEO를 세팅하여 유기적 해외 유입을 만듭니다.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
            features: [
                'Google International SEO (hreflang 태그, 국가별 서버 CDN 최적화)',
                '영어, 일본어, 중국어 등 전문 원어민 카피라이팅 및 교정',
                'PayPal, Stripe, EXIMBAY 등 글로벌 결제 게이트웨이(PG) 연동 지원',
                '초고속 해외 접속 로딩 속도 최적화 (글로벌 Edge 네트워킹)'
            ],
            target: '글로벌 투자 유치, D2C 해외 직판, B2B 해외 바이어 상담을 준비하는 기업'
        }
    ];

    const processSteps = [
        {
            step: '01',
            title: '진출 국가 타겟팅 & 경쟁사 분석',
            desc: '북미, 일본, 동남아, 유럽 등 타겟 국가의 시장 규모, 수입 규제, 현지 경쟁사 마케팅 전략을 면밀히 분석합니다.',
            duration: '1~2주차',
            deliverable: '글로벌 시장 진출 전략서'
        },
        {
            step: '02',
            title: '현지화 브랜딩 메시지 & 카피 설계',
            desc: '직역 번역의 어색함을 탈피하고, 현지 문화적 맥락과 정서에 꼭 맞는 원어민급 슬로건과 상세 메시지를 구축합니다.',
            duration: '2~3주차',
            deliverable: '현지화 브랜드 가이드'
        },
        {
            step: '03',
            title: '해외 플랫폼 세팅 & 인플루언서 섭외',
            desc: '타겟 국가별 메인 플랫폼 계정을 개설하고, 2,500+ 네트워크 중 최적의 현지 크리에이터 리스트를 확정합니다.',
            duration: '3~4주차',
            deliverable: '채널 개설 & 크리에이터 풀'
        },
        {
            step: '04',
            title: '글로벌 크리에이티브 에셋 제작',
            desc: '현지 감성에 맞춘 숏폼 릴스/틱톡 영상, 다국어 카드뉴스, 글로벌 광고 소재를 신속하게 제작 및 감수합니다.',
            duration: '4~5주차',
            deliverable: '다국어 비주얼 에셋'
        },
        {
            step: '05',
            title: '옴니채널 캠페인 론칭 & 광고 집행',
            desc: '현지 인플루언서 콘텐츠 배포와 Meta/Google 유료 광고를 동시 집행하여 인지도와 트래픽을 집중시킵니다.',
            duration: '캠페인 시작',
            deliverable: '글로벌 캠페인 롤아웃'
        },
        {
            step: '06',
            title: '국가별 ROAS 분석 & 글로벌 스케일업',
            desc: '국가별 유입 단가, 장바구니 전환율, 구매 객단가를 종합 분석하여 가장 성과가 높은 국가로 예산을 집중 스케일업합니다.',
            duration: '월간 주기',
            deliverable: '글로벌 성과 대시보드'
        }
    ];

    const faqs = [
        {
            q: '어느 국가부터 해외 마케팅을 시작해야 할지 모르는 상태여도 가능한가요?',
            a: '네, 가능합니다! 귀사 제품의 특성, 가격대, 배송 물류 조건, K-트렌드 적합도를 종합 분석하여 일본, 북미, 동남아, 대만 등 가장 성공 확률이 높은 1차 진출 국가를 컨설팅해 드립니다.'
        },
        {
            q: '번역 작업은 전문 원어민이 직접 진행하나요?',
            a: '네, MarketWith는 기계 번역을 사용하지 않습니다. 해당 국가의 마케팅 실무 경력을 보유한 전문 원어민 카피라이터가 직접 현지 문화에 맞춘 자연스러운 톤앤매너로 로컬라이징(현지화)을 진행합니다.'
        },
        {
            q: '해외 인플루언서 제품 배송 및 커뮤니케이션도 대행해 주시나요?',
            a: '네, 크리에이터 섭외부터 제품 해외 특송 트래킹, 제작 가이드라인 전달, 원고/영상 검수, 피드백 조율까지 전 과정을 전담 매니저가 원스톱으로 관리합니다.'
        },
        {
            q: '해외 이커머스 플랫폼(Amazon, Shopee, Shopify) 연계도 가능한가요?',
            a: '네. 글로벌 광고 및 인플루언서 콘텐츠에서 아마존, 쇼피, 큐텐, 쇼피파이 자사몰로 연결되는 트래킹 파라미터(UTM/픽셀)를 완벽히 세팅하여 실시간 매출 전환을 추적합니다.'
        }
    ];

    return (
        <div className="service-page">
            <Header />
            <ServiceNav currentPath="/services/global-marketing" />

            <main className="service-content">
                {/* ─── Hero Section with Motion Canvas & Global Network Map Mockup ─── */}
                <section className="service-hero-detail fade-up">
                    <div className="hero-badge-row">
                        <span className="hero-service-tag">GLOBAL EXPANSION</span>
                        <span className="hero-status-pill">CROSS-BORDER SCALING</span>
                    </div>

                    <h1>
                        국경을 넘어 전 세계 소비자를 사로잡는<br />
                        <span className="accent-text">글로벌 브랜딩 & 마케팅</span>
                    </h1>

                    <p className="hero-lead">
                        국내 시장의 한계를 넘어 세계 무대로 도약하세요.
                        철저한 현지 문화 분석에 기초한 원어민급 로컬라이징, 2,500+ 해외 크리에이터 네트워크,
                        Google·Meta 글로벌 퍼포먼스 광고로 귀사의 브랜드를 글로벌 메가 브랜드로 성장시킵니다.
                    </p>

                    {/* Interactive Global Network Map Mockup */}
                    <div className="hero-mockup-wrapper">
                        <InteractiveDeviceMockup serviceType="global-marketing" />
                    </div>

                    <div className="hero-metrics-grid">
                        <TiltCard maxTilt={8}>
                            <div className="hero-metric-card">
                                <div className="metric-card-number">
                                    <LiveMetricCountUp value="2,500+" />
                                </div>
                                <div className="metric-card-label">글로벌 인플루언서 풀</div>
                                <div className="metric-card-desc">북미·일본·동남아·중화권 네트워크</div>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={8}>
                            <div className="hero-metric-card">
                                <div className="metric-card-number">
                                    <LiveMetricCountUp value="12개국" />
                                </div>
                                <div className="metric-card-label">크로스보더 캠페인 집행</div>
                                <div className="metric-card-desc">미국·일본·대만·싱가포르 등 완벽 지원</div>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={8}>
                            <div className="hero-metric-card">
                                <div className="metric-card-number">
                                    <LiveMetricCountUp value="100%" />
                                </div>
                                <div className="metric-card-label">원어민 감수 로컬라이징</div>
                                <div className="metric-card-desc">문화적 맥락과 밈을 살린 카피라이팅</div>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={8}>
                            <div className="hero-metric-card">
                                <div className="metric-card-number">
                                    <LiveMetricCountUp value="4.6x" />
                                </div>
                                <div className="metric-card-label">해외 직구/수출 전환 증대</div>
                                <div className="metric-card-desc">Shopify & 아마존 연계 최적화</div>
                            </div>
                        </TiltCard>
                    </div>

                    <div className="hero-action-buttons">
                        <Link to="/support/consult" className="btn-primary-consult">
                            해외 진출 무료 글로벌 컨설팅 →
                        </Link>
                        <Link to="/portfolio" className="btn-secondary-outline">
                            글로벌 캠페인 사례 확인하기
                        </Link>
                    </div>
                </section>

                {/* ─── Strategic Insights with 3D Tilt Cards ─── */}
                <section className="strategic-insights-section fade-up">
                    <div className="service-section-header">
                        <span className="section-kicker">WHY CROSS-BORDER</span>
                        <AnimatedTitle>왜 지금 글로벌 시장으로 눈을 돌려야 할까요?</AnimatedTitle>
                        <p className="section-subtext">
                            K-컬처와 K-브랜드에 대한 전 세계적인 관심이 최고조에 달한 지금, 적절한 현지화 마케팅이 결합되면 국내 대비 수십 배의 스케일업이 가능합니다.
                        </p>
                    </div>

                    <div className="insights-card-grid">
                        <TiltCard maxTilt={6}>
                            <div className="insight-card">
                                <div className="insight-card-num">01</div>
                                <h3 className="insight-card-title">무한한 시장 규모와 성장 잠재력</h3>
                                <p className="insight-card-body">
                                    5천만 국내 시장의 치열한 레드오션을 벗어나 북미, 일본, 동남아 등 수억 명 규모의 글로벌 소비 시장을 선점할 수 있습니다.
                                </p>
                                <span className="insight-card-badge">시장 파이 20배 확장</span>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={6}>
                            <div className="insight-card">
                                <div className="insight-card-num">02</div>
                                <h3 className="insight-card-title">문화적 정서에 맞춘 현지화</h3>
                                <p className="insight-card-body">
                                    단순 번역기를 돌린 광고는 신뢰를 잃습니다. 현지 네이티브의 언어적 뉘앙스와 구매 심리를 반영해야만 진정한 전환이 일어납니다.
                                </p>
                                <span className="insight-card-badge">원어민 카피라이팅</span>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={6}>
                            <div className="insight-card">
                                <div className="insight-card-num">03</div>
                                <h3 className="insight-card-title">현지 플랫폼 맞춤 알고리즘 공략</h3>
                                <p className="insight-card-body">
                                    미국 틱톡, 일본 X(트위터), 중화권 샤오홍슈 등 국가별로 가장 활발한 소셜 플랫폼의 작동 방식을 정확히 공략합니다.
                                </p>
                                <span className="insight-card-badge">플랫폼별 특화 침투</span>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={6}>
                            <div className="insight-card">
                                <div className="insight-card-num">04</div>
                                <h3 className="insight-card-title">글로벌 이커머스 즉시 연계</h3>
                                <p className="insight-card-body">
                                    Shopify, Amazon, Shopee, Qoo10 등 글로벌 결제 및 물류 시스템과 유기적으로 결합하여 트래픽을 즉시 결제로 전환합니다.
                                </p>
                                <span className="insight-card-badge">글로벌 매출 파이프라인</span>
                            </div>
                        </TiltCard>
                    </div>
                </section>

                {/* ─── Interactive Solutions Tabs ─── */}
                <section className="solutions-tab-section fade-up">
                    <div className="service-section-header">
                        <span className="section-kicker">GLOBAL SOLUTIONS</span>
                        <AnimatedTitle>성공적인 해외 진출을 위한 4대 솔루션</AnimatedTitle>
                        <p className="section-subtext">
                            SNS 운영, 인플루언서 섭외, 퍼포먼스 광고, 다국어 웹사이트까지 원스톱으로 지원합니다.
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
                        <span className="section-kicker">GLOBAL ROADMAP</span>
                        <AnimatedTitle>실패 없는 글로벌 스케일업 6단계 로드맵</AnimatedTitle>
                        <p className="section-subtext">
                            단계를 클릭하여 글로벌 로컬라이징 및 캠페인 확장 프로세스를 확인하세요.
                        </p>
                    </div>

                    <InteractiveProcessTimeline steps={processSteps} serviceName="글로벌 브랜딩" />
                </section>

                {/* ─── Global Strength Showcase ─── */}
                <section className="performance-showcase-section fade-up">
                    <span className="perf-header-kicker">MARKETWITH GLOBAL STRENGTH</span>
                    <h2 className="perf-main-title">BEYOND BORDERS, BEYOND LIMITS</h2>
                    <p className="perf-sub-desc">
                        글로벌 마케팅은 언어의 장벽뿐만 아니라 현지 규제, 플랫폼 알고리즘, 결제 인프라까지 입체적으로 고려해야 합니다.
                        MarketWith는 전 영역을 책임지는 올인원 글로벌 파트너입니다.
                    </p>

                    <div className="perf-grid-columns">
                        <div className="perf-col-card">
                            <span className="perf-col-tag">NATIVE NETWORK</span>
                            <h3 className="perf-col-title">글로벌 현지 파트너십 구축</h3>
                            <p className="perf-col-body">
                                미국, 일본, 베트남, 싱가포르 등 현지 에이전시 및 전문 크리에이터와의 탄탄한 직통 채널을 통해 신속하게 캠페인을 실행합니다.
                            </p>
                        </div>
                        <div className="perf-col-card">
                            <span className="perf-col-tag">DATA INTELLIGENCE</span>
                            <h3 className="perf-col-title">다국어 검색 및 구매 데이터 분석</h3>
                            <p className="perf-col-body">
                                구글 글로벌 검색량 트렌드와 국가별 아마존/틱톡 베스트셀러 카테고리 데이터를 실시간으로 모니터링하여 최적의 방향을 제시합니다.
                            </p>
                        </div>
                        <div className="perf-col-card">
                            <span className="perf-col-tag">FULL COMPLIANCE</span>
                            <h3 className="perf-col-title">글로벌 광고 및 저작권 규정 준수</h3>
                            <p className="perf-col-body">
                                각 국가별 광고 심의 기준(FTC, 일본 약사법 등)과 인플루언서 광고 표기법을 철저히 준수하여 브랜드 리스크를 차단합니다.
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
                            글로벌 브랜딩 및 해외 마케팅에 대해 자주 묻는 질문들입니다.
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
                    <span className="cta-kicker">READY TO GO GLOBAL?</span>
                    <h2 className="cta-main-title">
                        당신의 브랜드가 전 세계에서 사랑받는<br />
                        글로벌 메가 브랜드로 도약할 시간입니다.
                    </h2>
                    <p className="cta-desc-text">
                        해외 진출을 고민 중이시라면 타겟 국가 선정부터 플랫폼 세팅까지 전문 마케터와 1:1로 상의해보세요.
                    </p>
                    <div className="cta-button-group">
                        <Link to="/support/consult" className="btn-primary-consult">
                            글로벌 마케팅 무료 상담 신청 →
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

export default GlobalMarketingServiceView;
