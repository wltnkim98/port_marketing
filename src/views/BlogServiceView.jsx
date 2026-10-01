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

const BlogServiceView = () => {
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
            id: 'smartblock',
            title: '스마트블록 SEO 공략형',
            tag: 'NAVER SMARTBLOCK & SEO',
            heading: '네이버 검색 알고리즘(C-Rank & D.I.A+) 완벽 분석 상위 노출',
            desc: '네이버의 최신 검색 트렌드인 스마트블록과 인기글 영역을 타겟팅하여, 잠재 고객이 검색하는 메인 키워드 및 황금 세부 키워드를 선점합니다.',
            image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80',
            features: [
                '월간 검색량·경쟁도 정밀 분석을 통한 30~50개 황금 키워드 풀 구축',
                'D.I.A+ 알고리즘 기준 독창적 경험과 체류 시간을 유도하는 구조적 글쓰기',
                '사진 메타데이터 최적화 및 텍스트-이미지 최적 배치 레이아웃',
                '검색 상위 노출 랭킹 실시간 모니터링 및 주기적 포지셔닝 방어'
            ],
            target: '검색량이 높은 업종에서 안정적이고 지속적인 유기적 유입을 원하는 기업'
        },
        {
            id: 'column',
            title: '전문 칼럼 & 스토리텔링형',
            tag: 'AUTHORITY & CONVERSION',
            heading: '단순 광고를 넘어 고객의 결핍을 해소하는 고밀도 전문 칼럼',
            desc: '의료, 법률, 세무, B2B, 인테리어 등 고관여 상품군의 소비자를 설득하기 위해 심도 있는 지식과 실제 해결 사례 중심의 신뢰도 높은 글을 작성합니다.',
            image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=80',
            features: [
                '해당 분야 전문 에디터 배정을 통한 전문 용어 및 인사이트 반영',
                '소비자의 불안과 의문을 해소하는 문제 해결형 스토리텔링 퍼널',
                '신뢰를 높이는 인포그래픽 및 카드뉴스형 시각 자료 자체 제작',
                '글 말미 전화 상담 및 네이버 예약, 카카오톡 채널로 연결되는 강력한 CTA'
            ],
            target: '전문직, 고단가 B2B, 병의원, 교육 등 신뢰도와 상담 전환이 핵심인 업종'
        },
        {
            id: 'skinui',
            title: '홈페이지형 프리미엄 스킨',
            tag: 'CUSTOM UI/UX SKIN DESIGN',
            heading: '블로그를 공식 웹사이트처럼 탈바꿈하는 반응형 홈페이지형 스킨',
            desc: 'PC와 모바일에 최적화된 풀와이드 비주얼 스킨과 직관적인 위젯 링크 배치를 통해 방문자가 원하는 정보와 상담 채널로 즉각 이동하도록 설계합니다.',
            image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
            features: [
                '브랜드 톤앤매너를 반영한 100% 맞춤형 풀와이드 레이아웃 디자인',
                '카카오톡 상담, 전화 걸기, 네이버 지도, 인스타그램 바로가기 위젯 연동',
                '모바일 전용 홈 화면 커스텀 및 카테고리 탭 구조 최적화',
                '브랜드 로고, 슬로건, 핵심 강점 배너 디자인 기본 포함'
            ],
            target: '웹사이트 구축 비용을 절감하면서 공식 브랜드 채널의 품격을 갖추고 싶은 기업'
        },
        {
            id: 'localplace',
            title: '로컬 상권 & 플레이스 연계형',
            tag: 'LOCAL COMMERCE SYNERGY',
            heading: '지역 키워드 장악으로 매장 방문과 플레이스 예약을 폭발시키는 전략',
            desc: '지역명+업종 키워드(예: 강남역 맛집, 판교 피부과)를 선점하고, 네이버 플레이스와 상호 연동하여 오프라인 매장 방문 및 예약 전환을 극대화합니다.',
            image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80',
            features: [
                '지역 상권 분석 기반 타겟 동선 및 로컬 롱테일 키워드 추출',
                '네이버 지도 위치 태그, 플레이스 소식 탭 연동을 통한 신뢰 확보',
                '실제 매장 방문 후기 스타일과 브랜드 정보의 완벽한 밸런스',
                '네이버 톡톡 및 플레이스 예약 바로가기 링크 최적화'
            ],
            target: '음식점, 카페, 뷰티샵, 학원, 피트니스 등 로컬 기반 오프라인 사업자'
        }
    ];

    const processSteps = [
        {
            step: '01',
            title: '브랜드 진단 & 키워드 데이터 추출',
            desc: '귀사의 비즈니스 모델, 주요 고객 페르소나, 경쟁사 점유 키워드를 데이터 툴을 통해 정밀 추출합니다.',
            duration: '1주차',
            deliverable: '키워드 매트릭스 맵'
        },
        {
            step: '02',
            title: '블로그 톤앤매너 & 스킨 UI 구축',
            desc: '브랜드 가치관이 돋보이는 카테고리 구조와 맞춤형 홈페이지형 스킨 및 모바일 프로필을 세팅합니다.',
            duration: '1~2주차',
            deliverable: '프리미엄 스킨 세팅'
        },
        {
            step: '03',
            title: '월간 에디토리얼 캘린더 수립',
            desc: '월별 발행 주제, 타겟 키워드, 발행 주기를 계획한 콘텐츠 캘린더를 수립하여 승인을 받습니다.',
            duration: '월초',
            deliverable: '월간 발행 기획서'
        },
        {
            step: '04',
            title: '전문 에디터 원고 집필 & 디자인',
            desc: '해당 산업군 전담 에디터가 D.I.A+ 기준의 전문 원고를 집필하고 커스텀 카드뉴스 이미지를 제작합니다.',
            duration: '정기 일정',
            deliverable: '원고 & 카드뉴스 에셋'
        },
        {
            step: '05',
            title: 'SEO 최적화 발행 & 내부 링크 구조화',
            desc: '네이버 로봇이 가장 선호하는 포맷으로 정밀 발행하며, 상담 채널과 플레이스로 연결되는 링크를 연결합니다.',
            duration: '주 2~3회',
            deliverable: '공식 포스팅 발행'
        },
        {
            step: '06',
            title: '검색 랭킹 모니터링 & 월간 리포트',
            desc: '발행 글의 키워드별 노출 순위, 조회수, 유입 경로, 전환율 데이터를 분석하여 다음 달 전략에 피드백합니다.',
            duration: '매월 말',
            deliverable: '성과 분석 리포트'
        }
    ];

    const faqs = [
        {
            q: '브랜드 블로그 포스팅은 한 달에 몇 회 정도 발행되나요?',
            a: '보통 월 8회(주 2회), 월 12회(주 3회), 월 20회(주 5회) 플랜 중 선택하실 수 있으며, 귀사의 업종 경쟁도와 마케팅 목표에 맞춰 최적의 주기를 컨설팅해 드립니다.'
        },
        {
            q: '타 대행사처럼 단순 글자수 채우기나 복사/붙여넣기 글은 아닌가요?',
            a: 'MarketWith는 기계적인 어뷰징이나 복사 글을 엄격히 금지합니다. 전담 마케터와 전문 에디터가 귀사만을 위한 오리지널 칼럼과 독창적인 카드뉴스 디자인을 직접 제작하여 C-Rank 지수를 지속적으로 높입니다.'
        },
        {
            q: '키워드 상위 노출은 얼마나 걸리나요?',
            a: '신규 블로그 기준 2~4주간의 기초 지수 빌드업 후 중소형 키워드부터 순차적으로 상위 노출이 시작되며, 2~3개월 차부터는 대형 메인 키워드 및 스마트블록 영역을 안정적으로 장악하게 됩니다.'
        },
        {
            q: '작성된 포스팅의 원고와 디자인 저작권은 누구에게 있나요?',
            a: '제작된 모든 원고와 시각 디자인 파일의 저작권은 클라이언트에게 귀속되며, 자사몰, 뉴스레터, SNS 채널 등 다양한 마케팅 채널에 2차 활용하실 수 있습니다.'
        }
    ];

    return (
        <div className="service-page">
            <Header />
            <ServiceNav currentPath="/services/blog" />

            <main className="service-content">
                {/* ─── Hero Section with Motion Canvas & SmartBlock Mockup ─── */}
                <section className="service-hero-detail fade-up">
                    <div className="hero-badge-row">
                        <span className="hero-service-tag">BRAND BLOG & SEO</span>
                        <span className="hero-status-pill">SMARTBLOCK #1 RANKING</span>
                    </div>

                    <h1>
                        검색 1위 점유와 신뢰를 만드는<br />
                        <span className="accent-text">고품격 브랜드 블로그</span> 운영 관리
                    </h1>

                    <p className="hero-lead">
                        단순히 글을 올리는 블로그는 끝났습니다. 네이버 알고리즘에 정밀 최적화된 키워드 설계와
                        소비자의 지갑을 열게 만드는 전문 칼럼 스토리텔링으로 귀사만의 자산형 검색 트래픽을 구축합니다.
                    </p>

                    {/* Interactive Live Naver Search SmartBlock Mockup */}
                    <div className="hero-mockup-wrapper">
                        <InteractiveDeviceMockup serviceType="blog" />
                    </div>

                    <div className="hero-metrics-grid">
                        <TiltCard maxTilt={8}>
                            <div className="hero-metric-card">
                                <div className="metric-card-number">
                                    <LiveMetricCountUp value="91.4%" />
                                </div>
                                <div className="metric-card-label">핵심 키워드 상위 노출률</div>
                                <div className="metric-card-desc">스마트블록 & 뷰탭 1페이지 점유</div>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={8}>
                            <div className="hero-metric-card">
                                <div className="metric-card-number">
                                    <LiveMetricCountUp value="3.8x" />
                                </div>
                                <div className="metric-card-label">평균 유기적 유입 증가</div>
                                <div className="metric-card-desc">광고비 없이 24시간 잠재고객 유입</div>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={8}>
                            <div className="hero-metric-card">
                                <div className="metric-card-number">
                                    <LiveMetricCountUp value="100%" />
                                </div>
                                <div className="metric-card-label">전담 에디터 배정</div>
                                <div className="metric-card-desc">업종별 전문지식 보유 전문 인력</div>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={8}>
                            <div className="hero-metric-card">
                                <div className="metric-card-number">
                                    <LiveMetricCountUp value="4.6x" />
                                </div>
                                <div className="metric-card-label">상담 및 문의 전환 상승</div>
                                <div className="metric-card-desc">소비자 심리를 관통하는 칼럼 퍼널</div>
                            </div>
                        </TiltCard>
                    </div>

                    <div className="hero-action-buttons">
                        <Link to="/support/consult" className="btn-primary-consult">
                            블로그 무료 키워드 진단 받기 →
                        </Link>
                        <Link to="/portfolio" className="btn-secondary-outline">
                            운영 성공 사례 확인하기
                        </Link>
                    </div>
                </section>

                {/* ─── Strategic Insights with 3D Tilt Cards ─── */}
                <section className="strategic-insights-section fade-up">
                    <div className="service-section-header">
                        <span className="section-kicker">WHY BRAND BLOG</span>
                        <AnimatedTitle>소비자는 왜 브랜드 블로그를 찾아볼까요?</AnimatedTitle>
                        <p className="section-subtext">
                            광고에 피로감을 느끼는 현대 소비자들은 최종 구매 결정 직전, 블로그를 통해 실질적인 전문성과 신뢰도를 검증합니다.
                        </p>
                    </div>

                    <div className="insights-card-grid">
                        <TiltCard maxTilt={6}>
                            <div className="insight-card">
                                <div className="insight-card-num">01</div>
                                <h3 className="insight-card-title">구매 여정의 최종 검증 채널</h3>
                                <p className="insight-card-body">
                                    소비자의 87%는 인스타나 배너 광고를 보고 관심이 생기면 네이버에서 브랜드와 제품 후기를 검색합니다. 블로그는 최종 결제를 만드는 열쇠입니다.
                                </p>
                                <span className="insight-card-badge">구매 결정 전환율 1위</span>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={6}>
                            <div className="insight-card">
                                <div className="insight-card-num">02</div>
                                <h3 className="insight-card-title">영구적인 자산형 유기적 트래픽</h3>
                                <p className="insight-card-body">
                                    비용을 멈추면 사라지는 유료 광고와 달리, 잘 쓰인 양질의 블로그 포스팅은 수개월, 수년 동안 검색 상위에 머무르며 무과금 고객을 유치합니다.
                                </p>
                                <span className="insight-card-badge">장기 마케팅 ROI 극대화</span>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={6}>
                            <div className="insight-card">
                                <div className="insight-card-num">03</div>
                                <h3 className="insight-card-title">독보적 전문성과 신뢰 구축</h3>
                                <p className="insight-card-body">
                                    단순 홍보 문구가 아닌, 고객의 문제를 실질적으로 해결해 주는 심층 칼럼을 통해 업계 1등 브랜드로서의 권위와 신뢰를 각인시킵니다.
                                </p>
                                <span className="insight-card-badge">브랜드 권위도 확보</span>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={6}>
                            <div className="insight-card">
                                <div className="insight-card-num">04</div>
                                <h3 className="insight-card-title">플레이스 & 문의 채널 시너지</h3>
                                <p className="insight-card-body">
                                    네이버 지도, 카카오톡 상담, 전화 예약 위젯을 본문과 스킨 곳곳에 유기적으로 배치하여 읽는 즉시 문의로 이어지는 전환 경로를 만듭니다.
                                </p>
                                <span className="insight-card-badge">다이렉트 리드 수집</span>
                            </div>
                        </TiltCard>
                    </div>
                </section>

                {/* ─── Interactive Solutions Tabs ─── */}
                <section className="solutions-tab-section fade-up">
                    <div className="service-section-header">
                        <span className="section-kicker">STRATEGIC APPROACH</span>
                        <AnimatedTitle>목적별 맞춤 브랜드 블로그 솔루션</AnimatedTitle>
                        <p className="section-subtext">
                            업종과 비즈니스 특성에 맞춘 최적의 블로그 운영 방식을 탭을 통해 확인해보세요.
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

                {/* ─── Live Blog Traffic & Cost Simulator ─── */}
                <section className="fade-up">
                    <ServiceSimulator serviceType="blog" />
                </section>

                {/* ─── Interactive 6-Step Timeline ─── */}
                <section className="execution-process-section fade-up" style={{ maxWidth: '1300px', margin: '0 auto 80px', padding: '0 24px' }}>
                    <div className="service-section-header">
                        <span className="section-kicker">STEP-BY-STEP PROCESS</span>
                        <AnimatedTitle>철저한 데이터 기반 블로그 운영 프로세스</AnimatedTitle>
                        <p className="section-subtext">
                            단계를 클릭하여 D.I.A+ 알고리즘 최적화 및 발행 프로세스를 확인하세요.
                        </p>
                    </div>

                    <InteractiveProcessTimeline steps={processSteps} serviceName="브랜드 블로그" />
                </section>

                {/* ─── Quality Advantage Section ─── */}
                <section className="performance-showcase-section fade-up">
                    <span className="perf-header-kicker">MARKETWITH BLOG ADVANTAGE</span>
                    <h2 className="perf-main-title">THE DIFFERENCE IS DATA & COPYWRITING</h2>
                    <p className="perf-sub-desc">
                        저가 복사 대행사와 비교를 거부합니다. 알고리즘 변화에 흔들리지 않는 견고한 C-Rank 지수 성장 모델을 제시합니다.
                    </p>

                    <div className="perf-grid-columns">
                        <div className="perf-col-card">
                            <span className="perf-col-tag">ALGORITHM INTEL</span>
                            <h3 className="perf-col-title">네이버 최신 알고리즘 실시간 반영</h3>
                            <p className="perf-col-body">
                                C-Rank 및 D.I.A+ 점수를 극대화하기 위해 문서의 체류 시간, 전문성 지표, 독창적 이미지 배치를 엄격히 관리합니다.
                            </p>
                        </div>
                        <div className="perf-col-card">
                            <span className="perf-col-tag">COPYWRITING</span>
                            <h3 className="perf-col-title">설득의 심리학이 담긴 고밀도 원고</h3>
                            <p className="perf-col-body">
                                독자가 글을 읽다가 이탈하지 않고 끝까지 스크롤하여 문의 버튼을 누르도록 설계된 5단계 심리 전환 프레임워크를 적용합니다.
                            </p>
                        </div>
                        <div className="perf-col-card">
                            <span className="perf-col-tag">TRANSPARENCY</span>
                            <h3 className="perf-col-title">투명한 주간/월간 랭킹 리포트</h3>
                            <p className="perf-col-body">
                                발행된 모든 글의 검색어별 실시간 노출 순위와 유입 통계를 데이터 리포트로 투명하게 공유해 드립니다.
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
                            브랜드 블로그 운영에 대해 가장 많이 문의하시는 질문들입니다.
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
                    <span className="cta-kicker">START DOMINATING SEARCH RESULTS</span>
                    <h2 className="cta-main-title">
                        검색 1위 점유로 24시간 쉬지 않는<br />
                        자동 고객 유입 시스템을 구축하세요.
                    </h2>
                    <p className="cta-desc-text">
                        현재 귀사 블로그의 건강 상태와 공략 가능한 황금 키워드를 무료로 분석해 드립니다.
                    </p>
                    <div className="cta-button-group">
                        <Link to="/support/consult" className="btn-primary-consult">
                            무료 블로그 진단 & 키워드 분석 신청 →
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

export default BlogServiceView;
