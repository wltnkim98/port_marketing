import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutView = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                const currentProgress = (window.scrollY / totalHeight) * 100;
                setScrollProgress(currentProgress);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll reveal animation effect
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
        <div className="about-page">
            {/* Reading Progress Indicator */}
            <div 
                className="reading-progress-bar" 
                style={{ width: `${scrollProgress}%` }}
                aria-hidden="true"
            />

            <Header />

            <main className="about-article">
                {/* ── BLOG POST HEADER ── */}
                <header className="about-header fade-up">

                    <h1 className="about-main-title">
                        어떤 곳에 마케팅을 맡겨야 할지 고민되시죠?<br />
                        <span className="highlight-text">구조화된 공식</span>보다 중요한 건 <span className="highlight-text">소비자의 마음</span>입니다.
                    </h1>

                    <p className="about-lead-desc">
                        수많은 마케팅 성공 공식과 화려한 성공사례 속에서 왜 우리 브랜드는 제자리걸음일까요?
                        MarketWith가 소비자의 실제 성향 분석에서 출발하여 글로벌 무대까지 확장시키는 
                        진짜 브랜드 성장 방정식을 전해드립니다.
                    </p>
                </header>

                {/* ── HERO VISUAL COVER ── */}
                <div className="about-hero-media fade-up">
                    <img 
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80" 
                        alt="MarketWith Brand Marketing Architecture" 
                    />
                    <div className="about-hero-caption">
                        <span>PERSPECTIVE 01</span>
                    </div>
                </div>

                {/* ── BLOG CONTENT FLOW WITH ALTERNATING LEFT/RIGHT IMAGES ── */}
                <div className="about-content-flow">

                    {/* ═══ SECTION 1: 문제 제기 ═══ */}
                    <article className="post-section fade-up">
                        <div className="post-text-wrap">
                            <span className="post-step-indicator">PART 01</span>
                            <h2 className="post-heading">
                                "어떤 마케팅 컨설팅 업체에 맡겨야 할까?"<br />
                                끝없는 비교와 선택 앞에서 마주하는 막막함
                            </h2>
                            <div className="post-body">
                                <p>
                                    마케팅 대행사를 알아보다 보면 누구나 한 번쯤 깊은 혼란을 경험합니다.
                                    포털과 SNS에는 저마다 "매출 300% 급상승", "검증된 1등 공식"이라는 화려한 수치와 자극적인 카피가 넘쳐납니다.
                                </p>
                                <p>
                                    그러나 정작 값비싼 미팅을 마치고 견적서를 받아들었을 때, 마음 한구석에 지워지지 않는 의문이 남습니다.
                                    <strong> "이 전략이 과연 우리 브랜드의 고객들에게도 통할까?"</strong>
                                </p>
                                <p>
                                    업계에서 유행하는 공식을 그대로 흉내 내는 대행사에 소중한 마케팅 예산을 맡겼다가,
                                    정작 브랜드의 핵심 가치는 훼손되고 무의미한 단순 노출 수치만 남았던 허탈한 경험.
                                    이는 수많은 브랜드들이 마케팅 파트너를 선정할 때 가장 두려워하는 지점입니다.
                                </p>
                            </div>

                            <div className="post-callout-box">
                                <div className="callout-title">THE CORE DILEMMA</div>
                                <div className="callout-text">
                                    "화려한 성공 사례가 '내 브랜드의 성공'까지 보장해주지는 않습니다. 
                                    모든 브랜드는 설립 배경도, 제품의 본질도, 고객이 느끼는 매력도가 완전히 다르기 때문입니다."
                                </div>
                            </div>
                        </div>

                        {/* [우측 끝단 사진 배치 - RIGHT ALIGNED BREAK] */}
                        <div className="post-image-break align-right fade-up">
                            <div className="break-card">
                                <div className="break-img-holder">
                                    <span className="break-img-tag">DILEMMA & PERSPECTIVE</span>
                                    <img 
                                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80" 
                                        alt="어디에 맡겨야 할지 고민하는 마케팅 전략 미팅" 
                                    />
                                </div>
                                <div className="break-info-holder">
                                    <span className="break-sublabel">POINT 01 // AGENCY SELECTION</span>
                                    <h3 className="break-title">천편일률적인 대행사 제안서의 한계</h3>
                                    <p className="break-caption">
                                        남들과 똑같은 템플릿 제안서는 귀사의 고유한 아이덴티티를 담아내지 못합니다. 
                                        진짜 파트너는 숫자를 자랑하기보다 귀사만의 맥락을 묻는 곳이어야 합니다.
                                    </p>
                                    <div className="break-metric-badge">
                                        <span className="break-metric-val">82%</span>
                                        <span className="break-metric-desc">기존 템플릿 대행에 불만족을 경험한 브랜드 비율</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* ═══ SECTION 2: 패착 요인 분석 ═══ */}
                    <article className="post-section fade-up">
                        <div className="post-text-wrap">
                            <span className="post-step-indicator">PART 02</span>
                            <h2 className="post-heading">
                                구조화된 마케팅이 무조건 성공할까?<br />
                                소비자를 고민하지 않는 순간, 치명적인 패착이 됩니다
                            </h2>
                            <div className="post-body">
                                <p>
                                    시중의 수많은 컨설팅 업체들은 이른바 '구조화된 퍼널(Funnel)'과 고정된 마케팅 프레임워크를 
                                    마치 만병통치약인 양 설파합니다. A단계에서 노출하고, B단계에서 유입시키고, C단계에서 리타깃팅한다는 판에 박힌 매뉴얼입니다.
                                </p>
                                <p>
                                    하지만 여기서 가장 중요한 질문이 빠져 있습니다:
                                    <br />
                                    <strong>"이 구조화된 방식이 '우리 브랜드의 진짜 소비자'들에게도 과연 설득력 있게 와닿는가?"</strong>
                                </p>
                                <p>
                                    우리 타깃 고객의 실제 구매 심리와 라이프스타일, 정보를 탐색하는 맥락을 깊이 고민하지 않은 채 
                                    획일화된 구조만을 강요하면 어떻게 될까요?
                                </p>
                            </div>

                            <ul className="post-point-list">
                                <li>
                                    <span className="post-point-icon">✕</span>
                                    <div><strong>막대한 광고비와 예산 누수:</strong> 타깃과 무관한 트래픽 유치로 광고비만 낭비되는 허수 현상</div>
                                </li>
                                <li>
                                    <span className="post-point-icon">✕</span>
                                    <div><strong>브랜드의 황금 타이밍 상실:</strong> 시장에 우리만의 강렬한 임팩트를 남겨야 할 골든타임을 소모</div>
                                </li>
                                <li>
                                    <span className="post-point-icon">✕</span>
                                    <div><strong>소비자 피로도 증가:</strong> 뻔한 광고 메시지로 인해 잠재 고객의 이탈 및 브랜드 신뢰도 하락</div>
                                </li>
                            </ul>

                            <div className="post-callout-box danger-style">
                                <div className="callout-title">CRITICAL PITFALL</div>
                                <div className="callout-text">
                                    "구조화된 틀에 브랜드를 억지로 끼워 맞추는 것은 마케팅 실패의 가장 흔한 원인입니다. 
                                    진짜 마케팅은 프레임워크가 아닌 '고객의 살아있는 심리'에서 시작되어야 합니다."
                                </div>
                            </div>
                        </div>

                        {/* [좌측 끝단 사진 배치 - LEFT ALIGNED BREAK] */}
                        <div className="post-image-break align-left fade-up">
                            <div className="break-card">
                                <div className="break-info-holder">
                                    <span className="break-sublabel">POINT 02 // PITFALL WARNING</span>
                                    <h3 className="break-title">소비자가 빠진 구조화의 위험성</h3>
                                    <p className="break-caption">
                                        아무리 정교해 보이는 데이터 차트라도 소비자의 실제 감정과 행동 맥락을 반영하지 못하면 
                                        비용과 시간의 치명적인 낭비로 직결됩니다.
                                    </p>
                                    <div className="break-metric-badge">
                                        <span className="break-metric-val">3.4x</span>
                                        <span className="break-metric-desc">맞춤형 분석 부재 시 발생하는 전환 비용 손실률</span>
                                    </div>
                                </div>
                                <div className="break-img-holder">
                                    <span className="break-img-tag">RISK ANALYSIS</span>
                                    <img 
                                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" 
                                        alt="정형화된 데이터의 맹점과 리스크 분석" 
                                    />
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* ═══ SECTION 3: MARKETWITH의 해답 ═══ */}
                    <article className="post-section fade-up">
                        <div className="post-text-wrap">
                            <span className="post-step-indicator">PART 03</span>
                            <h2 className="post-heading">
                                MarketWith의 솔루션:<br />
                                고객 성향 밀착 분석과 내 브랜드 맞춤형 유연한 적용
                            </h2>
                            <div className="post-body">
                                <p>
                                    MarketWith는 정해진 템플릿을 거부합니다. 
                                    우리는 가장 먼저 귀사의 제품을 진정으로 사랑하고 구매할 
                                    <strong> '고객의 성향과 페르소나'를 현미경처럼 정밀하게 해체하고 분석</strong>합니다.
                                </p>
                                <p>
                                    그들이 일상에서 느끼는 불편함은 무엇인지, 어떤 언어와 이미지에 감정적으로 반응하는지, 
                                    그리고 어느 접점에서 지갑을 열 결심을 하는지를 파악한 후 
                                    오직 귀사만을 위한 <strong>'유연하고 애자일한 마케팅 전략'</strong>을 수립합니다.
                                </p>
                                <p>
                                    시장의 반응 데이터에 따라 기민하게 궤도를 수정하며, 
                                    단순한 외주 대행이 아닌 <strong>'내 브랜드만의 독보적인 성공 사례를 함께 증명하고 만드는 경험'</strong>을 
                                    온전히 제공합니다.
                                </p>
                            </div>

                            <div className="post-callout-box growth-style">
                                <div className="callout-title">THE MARKETWITH PROMISE</div>
                                <div className="callout-text">
                                    "우리는 대행사가 아닌 '성장 동반자'입니다. 
                                    고객 성향에 기초한 기민하고 유연한 실행으로 브랜드 고유의 승리 공식을 완성합니다."
                                </div>
                            </div>
                        </div>

                        {/* [우측 끝단 사진 배치 - RIGHT ALIGNED BREAK] */}
                        <div className="post-image-break align-right fade-up">
                            <div className="break-card">
                                <div className="break-img-holder">
                                    <span className="break-img-tag">TAILORED SOLUTION</span>
                                    <img 
                                        src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80" 
                                        alt="고객 맞춤형 심층 분석 및 크리에이티브 협업" 
                                    />
                                </div>
                                <div className="break-info-holder">
                                    <span className="break-sublabel">POINT 03 // ADAPTIVE EXECUTION</span>
                                    <h3 className="break-title">브랜드 맞춤형 성공 레퍼런스 구축</h3>
                                    <p className="break-caption">
                                        정밀한 고객 성향 분석과 유연한 크리에이티브 설계가 결합될 때 
                                        비로소 시장을 리드하는 독보적인 브랜드 성공사례가 탄생합니다.
                                    </p>
                                    <div className="break-metric-badge">
                                        <span className="break-metric-val">94.8%</span>
                                        <span className="break-metric-desc">맞춤형 전략 적용 후 브랜드 리텐션 및 재계약률</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* ═══ SECTION 4: 세계적인 성장 가능성 어필 ═══ */}
                    <article className="post-section fade-up">
                        <div className="post-text-wrap">
                            <span className="post-step-indicator">PART 04</span>
                            <h2 className="post-heading">
                                국내를 넘어 글로벌 무대로:<br />
                                세계적인 성장 가능성을 여는 글로벌 스케일업 파트너
                            </h2>
                            <div className="post-body">
                                <p>
                                    오늘날 브랜드의 가능성은 국경에 갇히지 않습니다. 
                                    탁월한 아이덴티티와 정밀한 타깃팅이 뒷받침된다면 
                                    국내의 작은 스타트업도 전 세계 소비자의 열광을 이끌어낼 수 있습니다.
                                </p>
                                <p>
                                    MarketWith는 국내 시장에서의 탄탄한 성공 노하우를 바탕으로, 
                                    <strong>글로벌 시장의 현지화된 소비자 맥락과 문화적 특성을 꿰뚫는 글로벌 마케팅 시스템</strong>을 구축하고 있습니다.
                                </p>
                                <p>
                                    북미, 아시아를 비롯한 글로벌 권역별 맞춤형 퍼포먼스 아키텍처를 통해 
                                    귀사의 브랜드가 <strong>'세계적인 메가 브랜드로 도약할 수 있는 무한한 성장 가능성'</strong>을 
                                    현실로 만들어 드립니다.
                                </p>
                            </div>

                            <div className="global-stats-row">
                                <div className="global-stat-card">
                                    <div className="global-stat-num">GLOBAL</div>
                                    <div className="global-stat-label">국경 없는 확장성 지원</div>
                                </div>
                                <div className="global-stat-card">
                                    <div className="global-stat-num">AI + DATA</div>
                                    <div className="global-stat-label">실시간 글로벌 타깃 분석</div>
                                </div>
                                <div className="global-stat-card">
                                    <div className="global-stat-num">SCALABLE</div>
                                    <div className="global-stat-label">세계 시장 도약 아키텍처</div>
                                </div>
                            </div>
                        </div>

                        {/* [좌측 끝단 사진 배치 - LEFT ALIGNED BREAK] */}
                        <div className="post-image-break align-left fade-up">
                            <div className="break-card">
                                <div className="break-info-holder">
                                    <span className="break-sublabel">GLOBAL VISION // BEYOND BORDERS</span>
                                    <h3 className="break-title">세계 시장을 향한 확장과 도약</h3>
                                    <p className="break-caption">
                                        글로벌 소비자들의 문화적 맥락과 심리를 정확히 공략하여, 
                                        국내를 넘어 전 세계 무대에서 사랑받는 브랜드로의 스케일업을 지원합니다.
                                    </p>
                                    <div className="break-metric-badge">
                                        <span className="break-metric-val">WORLDWIDE</span>
                                        <span className="break-metric-desc">글로벌 타깃팅 및 크로스보더 확장 파트너십</span>
                                    </div>
                                </div>
                                <div className="break-img-holder">
                                    <span className="break-img-tag">GLOBAL POTENTIAL</span>
                                    <img 
                                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80" 
                                        alt="글로벌 시장으로 도약하는 비즈니스 메트로폴리스" 
                                    />
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* ═══ SECTION 5: 비교 매트릭스 ═══ */}
                    <div className="about-comparison-block fade-up">
                        <div className="comp-heading">WHY MARKETWITH?</div>
                        <p className="comp-sub">정형화된 일반 대행사와 MarketWith의 본질적인 차이</p>
                        
                        <div className="comp-grid">
                            <div className="comp-col wrong">
                                <div className="comp-tag">기존 정형화 대행사</div>
                                <div className="comp-title">템플릿 복제 & 획일화된 실행</div>
                                <ul>
                                    <li>과거 성공 공식을 모든 클라이언트에 동일하게 적용</li>
                                    <li>소비자 심리 분석보다 단순 노출/클릭 수치에 집착</li>
                                    <li>시장 변화에 둔감한 경직된 실행으로 예산 낭비</li>
                                    <li>국내 단기 성과에 매몰된 제한된 시야</li>
                                </ul>
                            </div>
                            <div className="comp-col right">
                                <div className="comp-tag">MARKETWITH</div>
                                <div className="comp-title">고객 분석 기반 맞춤형 성장 파트너십</div>
                                <ul>
                                    <li>소비자 성향 딥다이브 후 1:1 커스텀 전략 수립</li>
                                    <li>진짜 구매 전환을 이끄는 감정적 트리거 설계</li>
                                    <li>실시간 데이터 기반의 민첩하고 유연한 피봇팅</li>
                                    <li>국내를 넘어 세계적인 성장 가능성을 여는 글로벌 확장 지원</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>

                {/* ── BOTTOM CALL TO ACTION ── */}
                <section className="about-footer-cta fade-up">
                    <div className="cta-kicker">READY TO SCALE YOUR BRAND?</div>
                    <h2 className="cta-title">
                        어디에 맡겨야 할지 고민되셨다면,<br />
                        이제 당신의 고객에게서 답을 찾아보세요.
                    </h2>
                    <p className="cta-desc">
                        불필요한 비용과 시간 낭비 없이, 내 브랜드에 가장 효과적인 맞춤 마케팅 전략을 함께 설계합니다.
                        MarketWith의 전문가 팀이 귀사의 브랜드 성향을 면밀히 분석해 드립니다.
                    </p>
                    <div className="cta-btn-wrap">
                        <Link to="/consult" className="about-cta-btn">
                            무료 브랜드 맞춤 상담 신청하기 →
                        </Link>
                        <Link to="/" className="about-secondary-btn">
                            메인 홈 둘러보기
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AboutView;
