import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceNav from '../components/ServiceNav';
import TiltCard from '../components/motion/TiltCard';
import LiveMetricCountUp from '../components/motion/LiveMetricCountUp';

const serviceList = [
    {
        path: '/services/photography',
        tag: '01 / VISUAL PRODUCTION',
        icon: '📸',
        title: '사진·영상·숏폼 촬영 제작',
        desc: '소비자의 첫 3초를 사로잡는 4K/6K 시네마틱 홍보 영상, 릴스 숏폼, 룩북 및 제품 상업 화보를 기획부터 모델 매칭, 마스터링까지 원스톱으로 제작합니다.',
        highlights: ['숏폼 & 릴스 최적화 제작', '4K/6K 시네마 브랜드 필름', '제품 & 공간 연출 상업 화보', '전문 모델·크리에이터 매칭'],
        image: new URL('../assets/img/ServiceList_01.jpg', import.meta.url).href,
    },
    {
        path: '/services/blog',
        tag: '02 / BRAND BLOG & SEO',
        icon: '✍️',
        title: '브랜드 블로그 운영 관리',
        desc: '네이버 스마트블록과 D.I.A+ 알고리즘을 분석한 전략 키워드 추출과 전문 에디터의 고밀도 칼럼 스토리텔링으로 검색 1위 점유와 자산형 트래픽을 만듭니다.',
        highlights: ['스마트블록 SEO 1위 상위 노출', '업종별 전문 칼럼 집필', '홈페이지형 프리미엄 스킨 UI', '플레이스 & 상담 채널 연동'],
        image: new URL('../assets/img/ServiceList_02.jpg', import.meta.url).href
    },
    {
        path: '/services/instagram',
        tag: '03 / INSTAGRAM SOCIAL',
        icon: '📱',
        title: '인스타그램 계정 관리',
        desc: 'KAIT 공인 SNS 마케터 1급 전문 인력이 9그리드 피드 브랜딩, 알고리즘 맞춤 릴스 바이럴, DM 자동화 퍼널로 팔로워를 진성 충성 고객으로 전환시킵니다.',
        highlights: ['고감도 9그리드 피드 큐레이션', '알고리즘 저격 바이럴 릴스', '24시간 인터랙티브 스토리', 'DM 응답 자동화 & 메타 광고'],
        image: new URL('../assets/img/ServiceList_03.jpg', import.meta.url).href
    },
    {
        path: '/services/global-marketing',
        tag: '04 / GLOBAL EXPANSION',
        icon: '🌐',
        title: '글로벌 브랜딩 & 마케팅',
        desc: '북미, 일본, 동남아, 중화권 등 현지 문화에 맞춘 원어민 로컬라이징과 2,500+ 해외 크리에이터 네트워크, 글로벌 퍼포먼스 광고로 세계 시장을 공략합니다.',
        highlights: ['권역별 해외 현지 SNS & 틱톡', '2,500+ 글로벌 인플루언서 협업', 'Google / Meta 글로벌 광고', 'Shopify & 아마존 크로스보더 연동'],
        image: new URL('../assets/img/ServiceList_04.jpg', import.meta.url).href
    },
    {
        path: '/services/website',
        tag: '05 / WEB ARCHITECTURE',
        icon: '💻',
        title: '맞춤형 웹사이트 제작 & 개발',
        desc: '부드러운 모션 인터랙션과 초고속 로딩 스피드, 완벽한 모바일 반응형 및 네이버·구글 SEO를 갖춘 브랜드 전용 고전환 디지털 플래그십을 구축합니다.',
        highlights: ['고전환 인터랙티브 랜딩페이지', '프리미엄 기업 공식 웹사이트', '반응형 D2C 이커머스 쇼핑몰', 'React / Next.js 커스텀 개발'],
        image: new URL('../assets/img/ServiceList_05.jpg', import.meta.url).href
    },
    {
        path: '/services/tester',
        tag: '06 / INFLUENCER & REVIEW',
        icon: '⭐',
        title: '체험단 & 인플루언서 마케팅',
        desc: '15,000+ 검증된 진성 리뷰어 풀을 기반으로 매장 방문형, 제품 배송형, 기자단, 네이버 공식 인플루언서를 통해 소비자 검색 점유와 신뢰를 완성합니다.',
        highlights: ['매장 방문형 로컬 체험단', '제품 배송형 실사용 리뷰', '신속 확산 정보 배포형 기자단', '네이버 공식 인플루언서 매칭'],
        image: new URL('../assets/img/ServiceList_06.jpg', import.meta.url).href
    }
];

const ServiceView = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const wrapRef = useRef(null);          // cardRefs 대신 이것

    useEffect(() => {
        const wrap = wrapRef.current;
        if (!wrap) return;
        const total = serviceList.length;

        let animating = false;      // 카드 이동 중인지
        let blockedStream = false;  // 이미 처리한 제스처의 남은 입력(관성) 차단용
        let startedInside = false;  // 이번 제스처가 섹션 안에서 시작됐는지
        let lastWheel = 0;
        let lastDelta = 0;
        let edgeDir = 0;            // 끝 카드에서 첫 휠을 막은 방향 (-1 위 / 1 아래)
        let edgeAt = 0;             // 마지막으로 막은 시각
        let passThrough = false;    // 이번 제스처는 전체 스크롤로 넘겨도 되는지
        let unlockTimer;
        let snapTimer;

        // 항상 "지금" 레이아웃 기준으로 계산 (낡은 값에 의존하지 않음)
        const metrics = () => {
            const start = wrap.getBoundingClientRect().top + window.scrollY;
            return { start, end: start + wrap.offsetHeight - window.innerHeight };
        };

        const block = (e) => {
            e.preventDefault();
            e.stopPropagation();   // Lenis가 이 휠을 못 받게 막음
        };

        const goTo = (next) => {
            const { start, end } = metrics();
            animating = true;
            blockedStream = true;
            edgeDir = 0;
            clearTimeout(snapTimer);
            setActiveIndex(next);
            window.lenis.scrollTo(start + (next / (total - 1)) * (end - start), { duration: 1.0 });
            clearTimeout(unlockTimer);
            unlockTimer = setTimeout(() => { animating = false; }, 900);
        };

        const onWheel = (e) => {
            if (window.innerWidth <= 960 || !window.lenis || e.ctrlKey) return;
            const dir = Math.sign(e.deltaY);
            if (!dir) return;

            const now = performance.now();
            const gap = now - lastWheel;
            lastWheel = now;

            const absDelta = Math.abs(e.deltaY);
            const isNewGesture = gap > 80 || absDelta > lastDelta + 6;
            lastDelta = absDelta;

            const { start, end } = metrics();
            const y = window.scrollY;
            const TOL = 6;
            const zone = window.innerHeight * 0.6;
            const inRange    = y >= start - TOL && y <= end + TOL;
            const nearTop    = y < start - TOL && y >= start - zone;
            const nearBottom = y > end + TOL && y <= end + zone;

            if (gap > 150) passThrough = false;
            if (isNewGesture && !animating) {
                blockedStream = false;
                startedInside = inRange;
            }

            // 탈출이 허용된 제스처는 Lenis에 맡김
            if (passThrough) return;

            // 이동 중이거나 이미 처리한 제스처의 남은 입력은 무시
            if (animating || (blockedStream && (inRange || nearTop || nearBottom))) {
                block(e);
                return;
            }

            // 섹션에 접근 중이면 끝 카드를 정중앙에 착지
            if (nearTop && dir > 0)    { block(e); startedInside = true; goTo(0);         return; }
            if (nearBottom && dir < 0) { block(e); startedInside = true; goTo(total - 1); return; }

            if (!inRange) return;   // 그 외 섹션 밖은 Lenis가 평소처럼 처리

            const cur = Math.round(((y - start) / (end - start)) * (total - 1));

            if (!startedInside) {
                block(e);
                startedInside = true;
                goTo(cur);
                return;
            }

            const next = cur + dir;

            // 끝 카드에서 나가는 방향
            if (next < 0 || next > total - 1) {
                const armed = edgeDir === dir && now - edgeAt < 2500;
                if (armed && gap > 150) {   // 막은 뒤 완전히 쉬었다가 다시 굴림 → 탈출 허용
                    passThrough = true;
                    edgeDir = 0;
                    return;
                }
                block(e);                   // 첫 번째 휠 → 막고 카드는 중앙에 유지
                edgeDir = dir;
                edgeAt = now;               // 막을 때마다 갱신 (같은 제스처의 연속 입력은 계속 '첫 번째'로 간주)
                return;
            }

            block(e);
            goTo(next);
        };

        // 스크롤바 드래그/키보드 이동 대응 + 카드 번호 동기화
        const onScroll = () => {
            if (window.innerWidth <= 960) return;
            if (animating) return;
            const { start, end } = metrics();
            if (end - start <= 0) return;
            const progress = Math.min(Math.max((window.scrollY - start) / (end - start), 0), 1);
            setActiveIndex(Math.round(progress * (total - 1)));

            clearTimeout(snapTimer);
            snapTimer = setTimeout(() => {
                if (window.innerWidth <= 960 || !window.lenis) return;
                const m = metrics();
                const yy = window.scrollY;
                if (yy <= m.start + 2 || yy >= m.end - 2) return;   // 양 끝이거나 섹션 밖이면 무시
                const idx = Math.round(((yy - m.start) / (m.end - m.start)) * (total - 1));
                window.lenis.scrollTo(m.start + (idx / (total - 1)) * (m.end - m.start), { duration: 1.0 });
            }, 200);
        };

        window.addEventListener('wheel', onWheel, { passive: false, capture: true });
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.removeEventListener('wheel', onWheel, { capture: true });
            window.removeEventListener('scroll', onScroll);
            clearTimeout(unlockTimer);
            clearTimeout(snapTimer);
        };
    }, []);

    // 모바일 전용 Sticky 처리
    useEffect(() => {
        const wrap = wrapRef.current;
        if (!wrap) return;
        const cards = wrap.querySelectorAll('.service-card');
        const img = wrap.querySelector('.service-img-wrap');
        const nav = document.querySelector('.service-subnav-sticky');
        if (!cards.length || !img) return;

        // nav의 실제 하단 위치를 그대로 사용 (전환 중에도 현재 값 반영)
        const measure = () => {
            const stick = nav ? Math.round(nav.getBoundingClientRect().bottom) - 1 : 0;
            wrap.style.setProperty('--stick-top', `${stick}px`);
            wrap.style.setProperty('--cards-top', `${stick + img.offsetHeight}px`);
        };

        let ticking = false;
        const update = () => {
            ticking = false;
            if (window.innerWidth > 960) return;
            measure();
            const line = img.getBoundingClientRect().bottom + 80;
            let idx = 0;
            cards.forEach((c, i) => {
                if (c.getBoundingClientRect().top <= line) idx = i;
            });
            setActiveIndex(idx);
        };
        const onScroll = () => {
            if (!ticking) { ticking = true; requestAnimationFrame(update); }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        nav?.addEventListener('transitionend', measure);   // nav 전환이 끝난 뒤 한 번 더 보정
        update();
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            nav?.removeEventListener('transitionend', measure);
        };
    }, []);

    return (
        <div className="service-page">
            <Header />
            <ServiceNav currentPath="/services" />

            <main className="service-content">

                {/* ─── Hero Section with Motion Canvas ─── */}
                <section className="service-hero-detail fade-up">
                    <div className="hero-badge-row">
                        <span className="hero-service-tag">MARKETWITH INTEGRATED SOLUTIONS</span>
                        <span className="hero-status-pill">ALL-IN-ONE GROWTH ARCHITECTURE</span>
                    </div>

                    <h1>
                        비즈니스의 모든 성장 단계를 완성하는<br />
                        <span className="accent-text">전문 마케팅 솔루션</span>
                    </h1>

                    <p className="hero-lead">
                        비주얼 제작부터 검색 장악, 소셜 팬덤 구축, 글로벌 확장, 웹사이트 개발, 체험단 바이럴까지.<br />
                        전 분야 연결된 통합 마케팅으로 브랜드의 진정한 스케일업을 실현합니다.
                    </p>

                    <div className="hero-metrics-grid">
                        <TiltCard maxTilt={8}>
                            <div className="hero-metric-card">
                                <div className="metric-card-number">
                                    <LiveMetricCountUp value="6대" />
                                </div>
                                <div className="metric-card-label">핵심 전문 영역</div>
                                <div className="metric-card-desc">기획·제작·바이럴·개발 풀스택</div>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={8}>
                            <div className="hero-metric-card">
                                <div className="metric-card-number">
                                    <LiveMetricCountUp value="15,000+" />
                                </div>
                                <div className="metric-card-label">통합 크리에이터 네트워크</div>
                                <div className="metric-card-desc">국내 및 해외 인플루언서</div>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={8}>
                            <div className="hero-metric-card">
                                <div className="metric-card-number">
                                    <LiveMetricCountUp value="98.2%" />
                                </div>
                                <div className="metric-card-label">클라이언트 재계약율</div>
                                <div className="metric-card-desc">데이터 기반 성과와 투명한 소통</div>
                            </div>
                        </TiltCard>

                        <TiltCard maxTilt={8}>
                            <div className="hero-metric-card">
                                <div className="metric-card-number">
                                    <LiveMetricCountUp value="1:1" />
                                </div>
                                <div className="metric-card-label">전담 PM 책임제</div>
                                <div className="metric-card-desc">분야별 시니어 전문가 밀착 케어</div>
                            </div>
                        </TiltCard>
                    </div>

                    <div className="hero-action-buttons">
                        <Link to="/support/consult" className="btn-primary-consult">
                            무료 통합 마케팅 진단 상담 →
                        </Link>
                        <Link to="/portfolio" className="btn-secondary-outline">
                            전체 포트폴리오 보기
                        </Link>
                    </div>
                </section>

                {/* Sticky 작업 */}
                <section className="service-scroll-wrap" ref={wrapRef} style={{ '--count': serviceList.length }}>
                    <div className="service-section">
                        <div className="service-img-wrap">
                            <div className="service-img-section">
                                {serviceList.map((srv, idx) => (
                                    <img
                                        key={idx}
                                        src={srv.image}
                                        alt={srv.title}
                                        className={`service-sticky-image ${activeIndex === idx ? 'active' : ''}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="service-cards-container">
                            {serviceList.map((srv, idx) => (
                                <div
                                    key={idx}
                                    className={`service-card ${activeIndex === idx ? 'active' : idx < activeIndex ? 'past' : ''}`}
                                    style={{ '--i': idx }}
                                    data-lenis-prevent
                                >
                                    {/* ↓ 기존 카드 안쪽 내용 그대로 (span, h2, p, dl, Link) */}
                                    <span className="service-card-index">Service 0{idx + 1}</span>
                                    <h2 className="service-card-title">{srv.title}</h2>
                                    <p className="service-card-desc">{srv.desc}</p>
                                    <dl className="service-card-grid">
                                        <dt>상세 서비스</dt>
                                        <ul className="service-card-highlights">
                                            {srv.highlights.map((h, hIdx) => (
                                                <li key={hIdx}>{h}</li>
                                            ))}
                                        </ul>
                                    </dl>
                                    <Link to={srv.path} className="service-card-footer">
                                        <span className="service-view-text">상세 솔루션 &amp; 프로세스 보기</span>
                                        <span className="service-arrow-btn">→</span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── Bottom CTA ─── */}
                <section className="service-footer-cta fade-up">
                    <span className="cta-kicker">GROW WITH MARKETWITH</span>
                    <h2 className="cta-main-title">
                        어떤 서비스가 우리 브랜드에 가장 필요할지 고민되시나요?
                    </h2>
                    <p className="cta-desc-text">
                        현재 귀사의 성장 단계와 예산, 목표에 맞춘 최적의 마케팅 믹스와 견적을 무료로 제안해 드립니다.
                    </p>
                    <div className="cta-button-group">
                        <Link to="/support/consult" className="btn-primary-consult">
                            1:1 맞춤 마케팅 솔루션 문의 →
                        </Link>
                        <Link to="/portfolio" className="btn-secondary-outline">
                            성공 사례 포트폴리오 보기
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default ServiceView;
