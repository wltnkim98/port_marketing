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

const InstagramServiceView = () => {
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
            id: 'gridfeed',
            title: '9그리드 피드 큐레이션',
            tag: 'AESTHETIC GRID BRANDING',
            heading: '방문 즉시 팔로우를 누르게 만드는 감각적인 9그리드 피드 브랜딩',
            desc: '단순한 이미지 업로드가 아닌, 브랜드 고유의 컬러 팔레트와 톤앤매너를 일관되게 적용하여 고급 쇼룸에 방문한 듯한 시각적 임팩트를 구현합니다.',
            image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1000&q=80',
            features: [
                '브랜드 맞춤형 컬러 팔레트 및 타이포그래피 디자인 가이드 수립',
                '스크롤을 유도하는 3단 분할 그리드 및 고감도 카드뉴스 템플릿 제작',
                '고해상도 제품 연출컷과 브랜드 철학 스토리의 유기적 배치',
                '프로필 바이오 최적화 및 원링크(All-in-One Link) 연동 세팅'
            ],
            target: '브랜드 인지도와 시각적 프리미엄 이미지를 강력하게 구축하고 싶은 브랜드'
        },
        {
            id: 'reelsviral',
            title: '알고리즘 저격 바이럴 릴스',
            tag: 'REELS VIRAL STRATEGY',
            heading: '탐색 탭과 릴스 추천 탭을 장악하는 15~30초 몰입형 숏폼 기획',
            desc: '인스타그램의 최신 추천 알고리즘을 분석하여, 초기 3초 이탈률을 낮추고 완시청률과 공유수를 폭발시키는 릴스 콘텐츠를 정기 제작·발행합니다.',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
            features: [
                '매주 실시간 릴스 트렌딩 오디오 및 챌린지 밈 분석 적용',
                '반복 재생(루프)을 유도하는 스마트한 편집 컷 구성',
                '가독성을 높인 다이내믹 텍스트 자막 및 효과음 믹싱',
                '비팔로워 도달률 평균 75% 이상 달성을 위한 해시태그 클러스터링'
            ],
            target: '팔로워가 적은 초기 계정이거나 단기간에 폭발적인 잠재고객 도달을 원하는 브랜드'
        },
        {
            id: 'storyengage',
            title: '인터랙티브 스토리 & 하이라이트',
            tag: 'STORY & HIGHLIGHT FUNNEL',
            heading: '24시간 소통으로 팬덤을 만들고 상시 정보를 제공하는 스토리 시스템',
            desc: '투표, 질문 스티커, 퀴즈 등 인스타그램 참여 기능을 적극 활용하여 팔로워와의 친밀도를 높이고, 프로필 하이라이트에 핵심 정보를 구조화합니다.',
            image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1000&q=80',
            features: [
                '주간 3~5회 인터랙션 스티커 기반 스토리 업로드로 계정 친밀도 점수 상승',
                'FAQ, 고객 후기, 브랜드 소개, 이벤트 카테고리별 하이라이트 커버 디자인',
                '스토리 링크 스티커를 통한 자사몰 및 프로모션 즉각 유입 트리거',
                '실시간 멘션 및 태그 스토리 즉각 리포스트를 통한 고객 소통 강화'
            ],
            target: '고객과의 지속적인 관계 유지와 충성 팬덤 육성이 필수적인 D2C/커머스 브랜드'
        },
        {
            id: 'dmautomation',
            title: 'DM 자동화 퍼널 & 광고 연동',
            tag: 'DM AUTOMATION & META BOOST',
            heading: '댓글을 다는 순간 DM으로 구매 링크를 전달하는 초고속 전환 퍼널',
            desc: '특정 키워드 댓글 시 자동 DM 발송 시스템과 고성과 콘텐츠 유료 부스팅(Meta Ads)을 결합하여 문의와 구매 전환율을 극대화합니다.',
            image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1000&q=80',
            features: [
                '인스타그램 공식 API 기반 ManyChat/DM 자동 응답 시나리오 설계',
                '쿠폰 발급, 카탈로그 전달, 1:1 상담 예약 자동 트리거 연동',
                '자연 도달률이 검증된 인기 릴스/게시물의 정밀 타겟 유료 광고 부스팅',
                'ROAS(광고비 대비 매출액) 추적 및 최적화 리포팅'
            ],
            target: '이벤트 참여율을 극대화하고 실질적인 매출 전환을 가속화하고 싶은 브랜드'
        }
    ];

    const processSteps = [
        {
            step: '01',
            title: '계정 감사 & 타겟 오디언스 분석',
            desc: '기존 계정의 인게이지먼트율, 팔로워 인구통계, 경쟁사 피드 구성을 면밀히 진단하고 개선 방향을 도출합니다.',
            duration: '1주차',
            deliverable: '계정 진단 보고서'
        },
        {
            step: '02',
            title: '비주얼 가이드 & 프로필 최적화',
            desc: '브랜드 대표 컬러, 폰트, 피드 레이아웃 규칙을 확립하고 검색에 유리한 프로필 바이오와 하이라이트를 구축합니다.',
            duration: '1~2주차',
            deliverable: '피드 무드보드 가이드'
        },
        {
            step: '03',
            title: '월간 콘텐츠 캘린더 기획',
            desc: '피드, 카드뉴스, 릴스, 스토리의 발행 요일과 시간대, 카테고리별 테마를 균형 있게 배분한 월간 일정을 확정합니다.',
            duration: '월초',
            deliverable: '월간 콘텐츠 플랜'
        },
        {
            step: '04',
            title: '고감도 비주얼 & 릴스 제작',
            desc: '전문 디자이너와 영상 에디터가 매력적인 비주얼 에셋과 호흡 빠른 숏폼 영상을 제작 및 검수합니다.',
            duration: '정기 일정',
            deliverable: '카드뉴스 & 릴스 영상'
        },
        {
            step: '05',
            title: '골든타임 업로드 & 타겟 소통',
            desc: '팔로워 활동성이 가장 높은 시간대에 예약 발행하고, 업로드 직후 타겟 계정과의 적극적인 인터랙션을 전개합니다.',
            duration: '상시 운영',
            deliverable: '정기 포스팅 & 소통'
        },
        {
            step: '06',
            title: '메타 인사이트 분석 & 리포트',
            desc: '도달수, 프로필 방문수, 웹사이트 클릭수, 저장/공유 수치를 정밀 분석하여 다음 달 그로스 전략에 반영합니다.',
            duration: '매월 말',
            deliverable: '월간 성과 분석서'
        }
    ];

    const faqs = [
        {
            q: '인스타그램 관리는 어떤 방식으로 진행되나요?',
            a: 'KAIT 공인 SNS 마케터 1급 전문 인력이 전담 배정되어, 월간 기획안 승인 후 콘텐츠 디자인, 릴스 영상 제작, 골든타임 업로드, 해시태그 최적화, 댓글/DM 관리, 월간 성과 분석까지 토탈 대행으로 운영됩니다.'
        },
        {
            q: '유령 팔로워나 단순 어뷰징 프로그램을 사용하는 것은 아닌가요?',
            a: '절대로 어뷰징 프로그램을 사용하지 않습니다. 인스타그램 가이드라인을 철저히 준수하여 고퀄리티 콘텐츠와 오가닉 인터랙션, 정밀 타겟 광고를 통해서만 진성 타겟 팔로워를 안전하게 유치합니다.'
        },
        {
            q: '사진이나 영상 촬영 소스가 부족한데 어떻게 하나요?',
            a: 'MarketWith 내부 사진/영상 제작팀과 연계하여 고해상도 제품 촬영 및 현장 출장 촬영을 함께 진행하실 수 있으며, 전달해 주신 기초 사진으로도 세련된 카드뉴스와 모션 릴스를 제작해 드립니다.'
        },
        {
            q: '기존 계정의 팔로워 수가 적어도 효과를 볼 수 있나요?',
            a: '네! 최근 인스타그램 알고리즘은 팔로워 수가 적더라도 완성도 높은 릴스와 반응형 콘텐츠를 탐색 탭에 적극 노출시켜 주기 때문에 신규 계정도 단기간에 수만 명의 잠재고객에게 도달할 수 있습니다.'
        }
    ];

    return (
        <div className="service-page">
            <Header />
            <ServiceNav currentPath="/services/instagram" />

            <main className="service-content">
                {/* ─── Hero Section with Motion Canvas & Instagram Live Phone Mockup ─── */}
                <section className="service-hero-detail fade-up">
                    <div className="hero-badge-row">
                        <span className="hero-service-tag">INSTAGRAM GROWTH & BRANDING</span>
                        <span className="hero-status-pill">KAIT CERTIFIED SPECIALIST</span>
                    </div>

                    <h1>
                        브랜드 무드와 팬덤을 완성하는<br />
                        <span className="accent-text">올인원 인스타그램</span> 토탈 관리
                    </h1>

                    <p className="hero-lead">
                        단순히 사진을 올리는 계정 관리는 이제 의미가 없습니다.
                        고감도 9그리드 피드 디자인, 알고리즘 맞춤 릴스 바이럴, DM 자동화 퍼널로
                        팔로워를 실제 충성 고객과 매출로 전환시키는 체계적인 인스타그램 브랜딩을 실현합니다.
                    </p>

                    {/* Interactive Live Instagram Phone Mockup */}
                    <div className="hero-mockup-wrapper">
                        <InteractiveDeviceMockup serviceType="instagram" />
                    </div>

                    <div className="hero-metrics-grid">
                        <TiltCard maxTilt={8}>
                            <div className="hero-metric-card">
                                <div className="metric-card-number">
                                    <LiveMetricCountUp value="4.2x" />
                                </div>
                                <div className="metric-card-label">평균 인게이지먼트 상승</div>
                                <div className="metric-card-desc">좋아요·댓글·저장·공유 지표 극대화</div>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={8}>
                            <div className="hero-metric-card">
                                <div className="metric-card-number">
                                    <LiveMetricCountUp value="78%" />
                                </div>
                                <div className="metric-card-label">비팔로워 유기적 도달률</div>
                                <div className="metric-card-desc">탐색 탭 및 릴스 추천 알고리즘 선점</div>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={8}>
                            <div className="hero-metric-card">
                                <div className="metric-card-number">
                                    <LiveMetricCountUp value="1급" />
                                </div>
                                <div className="metric-card-label">공인 SNS 마케터 전담</div>
                                <div className="metric-card-desc">KAIT 공식 자격 보유 전문 인력 배치</div>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={8}>
                            <div className="hero-metric-card">
                                <div className="metric-card-number">
                                    <LiveMetricCountUp value="3.5x" />
                                </div>
                                <div className="metric-card-label">프로필 링크 클릭수 증가</div>
                                <div className="metric-card-desc">스마트스토어 및 자사몰 즉각 유입</div>
                            </div>
                        </TiltCard>
                    </div>

                    <div className="hero-action-buttons">
                        <Link to="/support/consult" className="btn-primary-consult">
                            인스타그램 무료 계정 진단 신청 →
                        </Link>
                        <Link to="/portfolio" className="btn-secondary-outline">
                            피드 브랜딩 포트폴리오 보기
                        </Link>
                    </div>
                </section>

                {/* ─── Strategic Insights with 3D Tilt Cards ─── */}
                <section className="strategic-insights-section fade-up">
                    <div className="service-section-header">
                        <span className="section-kicker">THE SOCIAL POWER</span>
                        <AnimatedTitle>오늘날 인스타그램이 비즈니스의 심장인 이유</AnimatedTitle>
                        <p className="section-subtext">
                            소비자들은 더 이상 텍스트 광고를 믿지 않습니다. 인스타그램 피드의 분위기와 릴스 영상으로 브랜드의 격을 평가합니다.
                        </p>
                    </div>

                    <div className="insights-card-grid">
                        <TiltCard maxTilt={6}>
                            <div className="insight-card">
                                <div className="insight-card-num">01</div>
                                <h3 className="insight-card-title">브랜드의 공식 온라인 쇼룸</h3>
                                <p className="insight-card-body">
                                    잠재 고객의 78% 이상이 구매 전 브랜드 인스타그램을 방문해 팔로워 반응과 최근 소식을 확인하며 신뢰를 쌓습니다.
                                </p>
                                <span className="insight-card-badge">첫인상 결정 척도</span>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={6}>
                            <div className="insight-card">
                                <div className="insight-card-num">02</div>
                                <h3 className="insight-card-title">알고리즘 기반의 무료 도달</h3>
                                <p className="insight-card-body">
                                    릴스와 추천 피드를 통해 팔로워가 없는 초기 계정도 매력적인 콘텐츠만으로 수십만 명의 잠재 타겟에게 무료로 도달합니다.
                                </p>
                                <span className="insight-card-badge">자연 바이럴 효과</span>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={6}>
                            <div className="insight-card">
                                <div className="insight-card-num">03</div>
                                <h3 className="insight-card-title">스토리 & DM 기반의 강력한 팬덤</h3>
                                <p className="insight-card-body">
                                    일방적 광고가 아닌 스토리 폴, DM 소통을 통해 고객과 직접 관계를 맺고 단골 팬덤(Brand Loyalty)으로 발전시킵니다.
                                </p>
                                <span className="insight-card-badge">고객 리텐션 80%+</span>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={6}>
                            <div className="insight-card">
                                <div className="insight-card-num">04</div>
                                <h3 className="insight-card-title">Meta 유료 광고와의 최강 시너지</h3>
                                <p className="insight-card-body">
                                    반응이 입증된 오가닉 게시물을 유료 광고 소재로 활용하면 일반 배너 광고 대비 클릭당 비용(CPC)이 40% 이상 절감됩니다.
                                </p>
                                <span className="insight-card-badge">ROAS 극대화</span>
                            </div>
                        </TiltCard>
                    </div>
                </section>

                {/* ─── Interactive Solutions Tabs ─── */}
                <section className="solutions-tab-section fade-up">
                    <div className="service-section-header">
                        <span className="section-kicker">GROWTH ENGINE</span>
                        <AnimatedTitle>인스타그램 4대 성장 핵심 솔루션</AnimatedTitle>
                        <p className="section-subtext">
                            피드 기획부터 릴스 제작, DM 자동화까지 브랜드에 필요한 솔루션을 탭을 클릭해 확인해보세요.
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

                {/* ─── Live Instagram Growth Simulator ─── */}
                <section className="fade-up">
                    <ServiceSimulator serviceType="instagram" />
                </section>

                {/* ─── Interactive 6-Step Timeline ─── */}
                <section className="execution-process-section fade-up" style={{ maxWidth: '1300px', margin: '0 auto 80px', padding: '0 24px' }}>
                    <div className="service-section-header">
                        <span className="section-kicker">OPERATIONAL SYSTEM</span>
                        <AnimatedTitle>빈틈없는 6단계 계정 운영 프로세스</AnimatedTitle>
                        <p className="section-subtext">
                            단계를 클릭하여 기획부터 업로드, 소통 관리까지의 프로세스를 확인하세요.
                        </p>
                    </div>

                    <InteractiveProcessTimeline steps={processSteps} serviceName="인스타 관리" />
                </section>

                {/* ─── Quality Advantage Showcase ─── */}
                <section className="performance-showcase-section fade-up">
                    <span className="perf-header-kicker">MARKETWITH SOCIAL ADVANTAGE</span>
                    <h2 className="perf-main-title">DATA-DRIVEN INSTAGRAM ARCHITECTURE</h2>
                    <p className="perf-sub-desc">
                        단순 대행이 아닙니다. 계정의 인게이지먼트 지수와 도달 범위를 정량적으로 측정하고 지속 성장시키는 프로페셔널 소셜 아키텍처를 제공합니다.
                    </p>

                    <div className="perf-grid-columns">
                        <div className="perf-col-card">
                            <span className="perf-col-tag">CERTIFIED PROS</span>
                            <h3 className="perf-col-title">공인 SNS 마케터 1급 전담제</h3>
                            <p className="perf-col-body">
                                검증된 자격을 갖춘 시니어 마케터가 계정을 전담하여 브랜드 톤앤매너 훼손 없이 전문적인 커뮤니케이션을 보장합니다.
                            </p>
                        </div>
                        <div className="perf-col-card">
                            <span className="perf-col-tag">VIRAL REELS</span>
                            <h3 className="perf-col-title">자체 숏폼 제작팀 원스톱 연계</h3>
                            <p className="perf-col-body">
                                기획자, 모션 디자이너, 영상 편집자가 매주 트렌드 오디오에 맞춘 고화질 릴스 콘텐츠를 빠르게 생산합니다.
                            </p>
                        </div>
                        <div className="perf-col-card">
                            <span className="perf-col-tag">REAL ENGAGEMENT</span>
                            <h3 className="perf-col-title">100% 진성 타겟 오가닉 그로스</h3>
                            <p className="perf-col-body">
                                가짜 유령 팔로워 프로그램을 일체 배제하고 실제 구매 잠재력이 있는 국내 실사용자 중심의 건강한 계정 성장을 추구합니다.
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
                            인스타그램 계정 관리에 대해 자주 궁금해하시는 내용입니다.
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
                    <span className="cta-kicker">READY TO GROW YOUR INSTAGRAM?</span>
                    <h2 className="cta-main-title">
                        당신의 피드를 감각적인 쇼룸으로 바꾸고<br />
                        매일 새로운 팬과 고객을 만나보세요.
                    </h2>
                    <p className="cta-desc-text">
                        현재 계정의 현주소를 진단하고, 가장 알맞은 피드 톤앤매너와 릴스 기획안을 무료로 제안해 드립니다.
                    </p>
                    <div className="cta-button-group">
                        <Link to="/support/consult" className="btn-primary-consult">
                            무료 인스타 계정 진단 및 상담 신청 →
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

export default InstagramServiceView;
