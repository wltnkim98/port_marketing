import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ServiceNav from '../../components/ServiceNav';
import TiltCard from '../../components/motion/TiltCard';
import LiveMetricCountUp from '../../components/motion/LiveMetricCountUp';
import InteractiveProcessTimeline from '../../components/motion/InteractiveProcessTimeline';
import ServiceSimulator from '../../components/motion/ServiceSimulator';
import InteractiveDeviceMockup from '../../components/motion/InteractiveDeviceMockup';
import AnimatedTitle from '../../components/motion/AnimatedTitle';

const WebsiteServiceView = () => {
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
            id: 'landingpage',
            title: '고전환 인터랙티브 랜딩페이지',
            tag: 'HIGH-CONVERTING LANDING PAGE',
            heading: '단 하나의 목표(문의·신청·구매)를 극대화하는 원페이지 반응형 랜딩',
            desc: '광고 유입 방문자가 이탈하지 않고 스크롤을 내릴 때마다 설득되는 스토리라인과 부드러운 인터랙션으로 리드 전환율을 극대화합니다.',
            image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1000&q=80',
            features: [
                '소비자 심리를 파고드는 5단계 설득 카피라이팅 및 구조 설계',
                '스크롤 기반 GSAP 모션 인터랙션 및 시선 집중 유도 애니메이션',
                '간편 상담 신청 폼, 카카오톡 상담, 전화 걸기 원클릭 버튼 연동',
                'Meta Pixel, Google Tag Manager, GA4 전환 추적 태그 기본 탑재'
            ],
            target: '신제품 런칭, 이벤트 프로모션, B2B 상담 리드 수집을 집중적으로 노리는 기업'
        },
        {
            id: 'corporate',
            title: '프리미엄 기업/브랜드 웹사이트',
            tag: 'ENTERPRISE & BRAND FLAGSHIP',
            heading: '브랜드의 격을 한 단계 높이는 감각적인 멀티페이지 공식 웹사이트',
            desc: '회사 소개, 비즈니스 영역, 포트폴리오, 소식, 채용, 고객센터 등 체계적인 정보 구조와 독보적인 비주얼로 기업의 신뢰도를 입증합니다.',
            image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1000&q=80',
            features: [
                '브랜드 아이덴티티를 살린 맞춤형 UI/UX GUI 디자인 (Figma 시안 제공)',
                '반응형 웹 완벽 지원 (Desktop, Tablet, Mobile 최적화)',
                '포트폴리오 및 소식 게시판 자체 관리 CMS(Admin Panel) 구축',
                '시맨틱 HTML5 마크업 및 네이버·구글 SEO 검색 최적화'
            ],
            target: '투자 유치, B2B 대형 계약, 공공기관 제휴 등 높은 대외 신뢰도가 필요한 기업'
        },
        {
            id: 'ecommerce',
            title: '반응형 이커머스 쇼핑몰',
            tag: 'E-COMMERCE & D2C STORE',
            heading: '매끄러운 결제와 탁월한 제품 진열로 결제 전환율을 높이는 쇼핑몰',
            desc: '빠른 로딩 속도, 간편 결제(네이버페이, 카카오페이, 토스), 장바구니 및 회원 관리 시스템이 완비된 고성능 D2C 이커머스를 구축합니다.',
            image: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=1000&q=80',
            features: [
                '국내외 PG사(KG이니시스, 토스페이먼츠, NHN KCP, PG사) 간편 결제 연동',
                '옵션 선택, 쿠폰/적립금, 리뷰 시스템, 카카오 알림톡 자동 발송 연계',
                '모바일 결제 이탈을 방지하는 1단계 간소화 체크아웃 UI',
                '실시간 재고 관리 및 주문/배송 통합 관리자 대시보드'
            ],
            target: '수수료가 높은 입점몰을 넘어 독자적인 자사몰 D2C 팬덤을 구축하려는 브랜드'
        },
        {
            id: 'customweb',
            title: '커스텀 웹 솔루션 & 웹앱',
            tag: 'CUSTOM REACT & FULL-STACK',
            heading: 'React / Next.js 기반 초고속 현대적 웹 애플리케이션 개발',
            desc: '단순 템플릿 제작을 넘어, 맞춤형 견적 계산기, 지도 기반 검색, 예약 시스템, 회원 전용 대시보드 등 비즈니스에 필요한 커스텀 기능을 구현합니다.',
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
            features: [
                'React / Next.js / Node.js 최신 프레임워크 기반 컴포넌트 아키텍처',
                'RESTful API 및 외부 서비스(카카오맵, CRM, 결제 등) 완벽 연동',
                'Lighthouse 성능 95점 이상의 초고속 웹 바이탈(Core Web Vitals) 달성',
                '안정적인 클라우드 호스팅(AWS, Vercel) 및 SSL 보안 인증서 적용'
            ],
            target: '차별화된 인터랙션 기능이나 커스텀 비즈니스 로직 개발이 필요한 스타트업 및 기업'
        }
    ];

    const processSteps = [
        {
            step: '01',
            title: '요구사항 분석 & IA 정보구조 설계',
            desc: '비즈니스 목표, 필수 기능, 타겟 유저 동선을 분석하고 전체 사이트맵과 와이어프레임을 설계합니다.',
            duration: '1주차',
            deliverable: '기능 명세서 & 와이어프레임'
        },
        {
            step: '02',
            title: 'UI/UX 디자인 시안 수립 (Figma)',
            desc: '브랜드 가이드에 맞춘 감각적인 그래픽 디자인과 반응형 인터페이스 시안을 제작하여 컨펌을 진행합니다.',
            duration: '2주차',
            deliverable: 'Figma 인터랙티브 프로토타입'
        },
        {
            step: '03',
            title: '프론트엔드 모션 인터랙션 개발',
            desc: 'React / GSAP 기반으로 부드러운 스크롤 애니메이션과 모든 디바이스에 완벽히 대응하는 반응형 코드를 구현합니다.',
            duration: '3~4주차',
            deliverable: '프론트엔드 퍼블리싱'
        },
        {
            step: '04',
            title: '관리자 CMS 및 백엔드 기능 연동',
            desc: '상담 폼, 게시판 관리, 결제 연동, 마케팅 트래킹 픽셀(GA4/Meta Pixel) 등 백엔드 시스템을 연동합니다.',
            duration: '4~5주차',
            deliverable: 'CMS & API 연동'
        },
        {
            step: '05',
            title: '크로스브라우징 & QA 성능 테스트',
            desc: 'iOS, Android, Chrome, Safari 등 다양한 기기와 브라우저에서 로딩 속도, 결제 플로우, 폼 전송을 정밀 검증합니다.',
            duration: '5주차',
            deliverable: 'QA 검수 보고서'
        },
        {
            step: '06',
            title: '도메인 연결, SEO 세팅 & 정식 론칭',
            desc: '도메인 및 SSL 인증서 연결, 네이버/구글 검색등록(SEO)을 완료하고 관리자 운영 가이드를 전달합니다.',
            duration: '6주차',
            deliverable: '정식 오픈 & 매뉴얼'
        }
    ];

    const faqs = [
        {
            q: '제작 기간은 보통 얼마나 소요되나요?',
            a: '원페이지 고전환 랜딩페이지는 기획부터 런칭까지 약 1~2주, 멀티페이지 기업 공식 홈페이지는 3~4주, 커스텀 이커머스 및 웹앱은 4~6주 정도 소요됩니다.'
        },
        {
            q: '웹사이트 오픈 후 직접 텍스트나 이미지를 수정할 수 있나요?',
            a: '네! 비개발자도 손쉽게 사용할 수 있는 직관적인 관리자 대시보드(CMS)를 구축해 드리며, 상세한 운영 가이드북과 화상 교육을 함께 제공합니다.'
        },
        {
            q: '모바일 환경에서도 깨짐 없이 잘 작동하나요?',
            a: '네, 100% 모바일 퍼스트 반응형 웹으로 제작됩니다. 스마트폰, 태블릿, 데스크톱, 4K 와이드 모니터까지 모든 해상도에 최적화된 레이아웃을 제공합니다.'
        },
        {
            q: '네이버와 구글 검색 엔진에 등록(SEO)도 해주시나요?',
            a: '기본으로 포함됩니다. 네이버 서치어드바이저 및 구글 서치콘솔 등록, 메타태그(OG 태그), 사이트맵(sitemap.xml), robots.txt 최적화를 완벽히 세팅해 드립니다.'
        }
    ];

    return (
        <div className="service-page">
            <Header />
            <ServiceNav currentPath="/services/website" />

            <main className="service-content">
                {/* ─── Hero Section with Motion Canvas & MacBook Mockup ─── */}
                <section className="service-hero-detail fade-up">
                    <div className="hero-badge-row">
                        <span className="hero-service-tag">WEB ARCHITECTURE & UI/UX</span>
                        <span className="hero-status-pill">LIGHTHOUSE 95+ SCORE</span>
                    </div>

                    <h1>
                        압도적인 인터랙션과 전환율을 만드는<br />
                        <span className="accent-text">맞춤형 웹사이트</span> 개발 & 마케팅
                    </h1>

                    <p className="hero-lead">
                        단순히 예쁘기만 한 홈페이지는 고객을 머무르게 하지 못합니다.
                        스크롤마다 시선을 사로잡는 모션 인터랙션, 완벽한 모바일 반응형 최적화,
                        구글·네이버 검색엔진 최적화(SEO)로 브랜드의 강력한 온라인 플래그십을 완성합니다.
                    </p>

                    {/* Interactive MacBook Mockup */}
                    <div className="hero-mockup-wrapper">
                        <InteractiveDeviceMockup serviceType="website" />
                    </div>

                    <div className="hero-metrics-grid">
                        <TiltCard maxTilt={8}>
                            <div className="hero-metric-card">
                                <div className="metric-card-number">
                                    <LiveMetricCountUp value="100%" />
                                </div>
                                <div className="metric-card-label">모바일 반응형 최적화</div>
                                <div className="metric-card-desc">모든 기기 완벽 호환 UI/UX</div>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={8}>
                            <div className="hero-metric-card">
                                <div className="metric-card-number">
                                    <LiveMetricCountUp value="95+" />
                                </div>
                                <div className="metric-card-label">Google Lighthouse 성능</div>
                                <div className="metric-card-desc">초고속 로딩 및 시맨틱 SEO 마크업</div>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={8}>
                            <div className="hero-metric-card">
                                <div className="metric-card-number">
                                    <LiveMetricCountUp value="3.2x" />
                                </div>
                                <div className="metric-card-label">리드 상담 전환율 상승</div>
                                <div className="metric-card-desc">소비자 심리를 관통하는 퍼널 설계</div>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={8}>
                            <div className="hero-metric-card">
                                <div className="metric-card-number">
                                    <LiveMetricCountUp value="0원" />
                                </div>
                                <div className="metric-card-label">불필요한 월 유지비 제거</div>
                                <div className="metric-card-desc">자사 소유권 100% 소스코드 양도</div>
                            </div>
                        </TiltCard>
                    </div>

                    <div className="hero-action-buttons">
                        <Link to="/support/consult" className="btn-primary-consult">
                            웹사이트 제작 무료 견적·기획 상담 →
                        </Link>
                        <Link to="/portfolio" className="btn-secondary-outline">
                            웹 개발 포트폴리오 보기
                        </Link>
                    </div>
                </section>

                {/* ─── Strategic Insights with 3D Tilt Cards ─── */}
                <section className="strategic-insights-section fade-up">
                    <div className="service-section-header">
                        <span className="section-kicker">CONVERSION ARCHITECTURE</span>
                        <AnimatedTitle>웹사이트가 마케팅의 성패를 가르는 4가지 이유</AnimatedTitle>
                        <p className="section-subtext">
                            모든 광고와 홍보의 최종 종착지는 웹사이트입니다. 첫 5초의 인터랙션이 고객의 이탈과 결제를 가릅니다.
                        </p>
                    </div>

                    <div className="insights-card-grid">
                        <TiltCard maxTilt={6}>
                            <div className="insight-card">
                                <div className="insight-card-num">01</div>
                                <h3 className="insight-card-title">브랜드의 디지털 플래그십 스토어</h3>
                                <p className="insight-card-body">
                                    웹사이트는 타 플랫폼의 규제나 알고리즘 변화에 구애받지 않는 귀사만의 독점적 디지털 부동산이자 본진입니다.
                                </p>
                                <span className="insight-card-badge">자사 디지털 자산 구축</span>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={6}>
                            <div className="insight-card">
                                <div className="insight-card-num">02</div>
                                <h3 className="insight-card-title">살아 숨 쉬는 모션 인터랙션</h3>
                                <p className="insight-card-body">
                                    밋밋한 텍스트 대신 부드러운 스크롤 모션과 마이크로 인터랙션을 통해 방문자의 평균 체류 시간을 2.5배 이상 늘립니다.
                                </p>
                                <span className="insight-card-badge">체류 시간 극대화</span>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={6}>
                            <div className="insight-card">
                                <div className="insight-card-num">03</div>
                                <h3 className="insight-card-title">네이버·구글 통합 검색엔진 최적화</h3>
                                <p className="insight-card-body">
                                    시맨틱 HTML5 구조와 고속 로딩 스피드를 통해 포털 검색 로봇이 가장 신뢰하는 웹사이트로 자동 평가받도록 만듭니다.
                                </p>
                                <span className="insight-card-badge">SEO 1페이지 랭킹</span>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={6}>
                            <div className="insight-card">
                                <div className="insight-card-num">04</div>
                                <h3 className="insight-card-title">데이터 기반 마케팅 추적(GA4) 연동</h3>
                                <p className="insight-card-body">
                                    고객이 어떤 버튼을 누르고 어디서 이탈하는지 실시간 히트맵과 전환 픽셀을 심어 광고 효율을 정밀하게 개선합니다.
                                </p>
                                <span className="insight-card-badge">전환율 지속 개선</span>
                            </div>
                        </TiltCard>
                    </div>
                </section>

                {/* ─── Interactive Solutions Tabs ─── */}
                <section className="solutions-tab-section fade-up">
                    <div className="service-section-header">
                        <span className="section-kicker">TAILORED SOLUTIONS</span>
                        <AnimatedTitle>비즈니스 유형별 4대 웹 솔루션</AnimatedTitle>
                        <p className="section-subtext">
                            원페이지 랜딩부터 기업 공식 웹, 이커머스, 커스텀 웹앱까지 비즈니스 목적에 최적화된 개발 방식을 확인하세요.
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

                {/* ─── Live Web Performance & Conversion Simulator ─── */}
                <section className="fade-up">
                    <ServiceSimulator serviceType="website" />
                </section>

                {/* ─── Interactive 6-Step Timeline ─── */}
                <section className="execution-process-section fade-up" style={{ maxWidth: '1300px', margin: '0 auto 80px', padding: '0 24px' }}>
                    <div className="service-section-header">
                        <span className="section-kicker">DEVELOPMENT LIFECYCLE</span>
                        <AnimatedTitle>투명하고 정확한 6단계 웹 개발 프로세스</AnimatedTitle>
                        <p className="section-subtext">
                            단계를 클릭하여 기획부터 시안 컨펌, 퍼블리싱, 론칭까지의 프로세스를 확인하세요.
                        </p>
                    </div>

                    <InteractiveProcessTimeline steps={processSteps} serviceName="웹사이트 제작" />
                </section>

                {/* ─── Web Advantage Showcase ─── */}
                <section className="performance-showcase-section fade-up">
                    <span className="perf-header-kicker">MARKETWITH TECH STRENGTH</span>
                    <h2 className="perf-main-title">CLEAN CODE & STUNNING INTERACTIONS</h2>
                    <p className="perf-sub-desc">
                        빌더 템플릿의 무거운 코드와 잦은 버그로 고통받지 마세요.
                        MarketWith는 최신 React 및 클린 코드로 제작하여 압도적인 성능과 자유로운 확장성을 보장합니다.
                    </p>

                    <div className="perf-grid-columns">
                        <div className="perf-col-card">
                            <span className="perf-col-tag">LIGHTNING FAST</span>
                            <h3 className="perf-col-title">초고속 로딩 & 무결점 반응형</h3>
                            <p className="perf-col-body">
                                0.8초 이내의 빠른 페이지 로딩으로 사용자의 초기 이탈을 방지하고 구글 웹 바이탈(Core Web Vitals) 최우수 등급을 획득합니다.
                            </p>
                        </div>
                        <div className="perf-col-card">
                            <span className="perf-col-tag">SMOOTH MOTION</span>
                            <h3 className="perf-col-title">GSAP & React 모션 그래픽</h3>
                            <p className="perf-col-body">
                                스크롤 트리거와 인터랙티브 비주얼 효과를 통해 사용자가 지루하지 않게 콘텐츠를 끝까지 탐색하도록 유도합니다.
                            </p>
                        </div>
                        <div className="perf-col-card">
                            <span className="perf-col-tag">FULL OWNERSHIP</span>
                            <h3 className="perf-col-title">100% 소스코드 양도 & 독립성</h3>
                            <p className="perf-col-body">
                                월 관리비에 묶이는 폐쇄형 빌더와 달리, 완성된 모든 소스코드와 지적재산권을 클라이언트에게 온전히 전달합니다.
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
                            웹사이트 제작 및 개발에 관한 주요 궁금증을 확인해보세요.
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
                    <span className="cta-kicker">READY TO BUILD YOUR WEBSITE?</span>
                    <h2 className="cta-main-title">
                        고객이 감탄하고 문의가 쏟아지는<br />
                        당신만의 맞춤형 웹사이트를 제작하세요.
                    </h2>
                    <p className="cta-desc-text">
                        원하시는 웹사이트의 레퍼런스나 기획안을 알려주시면 최적의 견적과 맞춤형 IA 구조도를 무료로 컨설팅해 드립니다.
                    </p>
                    <div className="cta-button-group">
                        <Link to="/support/consult" className="btn-primary-consult">
                            무료 웹사이트 제작 상담 신청 →
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

export default WebsiteServiceView;
