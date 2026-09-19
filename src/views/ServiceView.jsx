import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceNav from '../components/ServiceNav';
import HeroMotionCanvas from '../components/motion/HeroMotionCanvas';
import TiltCard from '../components/motion/TiltCard';
import LiveMetricCountUp from '../components/motion/LiveMetricCountUp';
import MagneticButton from '../components/motion/MagneticButton';

const ServiceView = () => {
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

    const serviceList = [
        {
            path: '/services/photography',
            tag: '01 / VISUAL PRODUCTION',
            icon: '📸',
            title: '사진·영상·숏폼 촬영 제작',
            desc: '소비자의 첫 3초를 사로잡는 4K/6K 시네마틱 홍보 영상, 릴스 숏폼, 룩북 및 제품 상업 화보를 기획부터 모델 매칭, 마스터링까지 원스톱으로 제작합니다.',
            highlights: ['숏폼 & 릴스 최적화 제작', '4K/6K 시네마 브랜드 필름', '제품 & 공간 연출 상업 화보', '전문 모델·크리에이터 매칭']
        },
        {
            path: '/services/blog',
            tag: '02 / BRAND BLOG & SEO',
            icon: '✍️',
            title: '브랜드 블로그 운영 관리',
            desc: '네이버 스마트블록과 D.I.A+ 알고리즘을 분석한 전략 키워드 추출과 전문 에디터의 고밀도 칼럼 스토리텔링으로 검색 1위 점유와 자산형 트래픽을 만듭니다.',
            highlights: ['스마트블록 SEO 1위 상위 노출', '업종별 전문 칼럼 집필', '홈페이지형 프리미엄 스킨 UI', '플레이스 & 상담 채널 연동']
        },
        {
            path: '/services/instagram',
            tag: '03 / INSTAGRAM SOCIAL',
            icon: '📱',
            title: '인스타그램 계정 관리',
            desc: 'KAIT 공인 SNS 마케터 1급 전문 인력이 9그리드 피드 브랜딩, 알고리즘 맞춤 릴스 바이럴, DM 자동화 퍼널로 팔로워를 진성 충성 고객으로 전환시킵니다.',
            highlights: ['고감도 9그리드 피드 큐레이션', '알고리즘 저격 바이럴 릴스', '24시간 인터랙티브 스토리', 'DM 응답 자동화 & 메타 광고']
        },
        {
            path: '/services/global-marketing',
            tag: '04 / GLOBAL EXPANSION',
            icon: '🌐',
            title: '글로벌 브랜딩 & 마케팅',
            desc: '북미, 일본, 동남아, 중화권 등 현지 문화에 맞춘 원어민 로컬라이징과 2,500+ 해외 크리에이터 네트워크, 글로벌 퍼포먼스 광고로 세계 시장을 공략합니다.',
            highlights: ['권역별 해외 현지 SNS & 틱톡', '2,500+ 글로벌 인플루언서 협업', 'Google / Meta 글로벌 광고', 'Shopify & 아마존 크로스보더 연동']
        },
        {
            path: '/services/website',
            tag: '05 / WEB ARCHITECTURE',
            icon: '💻',
            title: '맞춤형 웹사이트 제작 & 개발',
            desc: '부드러운 모션 인터랙션과 초고속 로딩 스피드, 완벽한 모바일 반응형 및 네이버·구글 SEO를 갖춘 브랜드 전용 고전환 디지털 플래그십을 구축합니다.',
            highlights: ['고전환 인터랙티브 랜딩페이지', '프리미엄 기업 공식 웹사이트', '반응형 D2C 이커머스 쇼핑몰', 'React / Next.js 커스텀 개발']
        },
        {
            path: '/services/tester',
            tag: '06 / INFLUENCER & REVIEW',
            icon: '⭐',
            title: '체험단 & 인플루언서 마케팅',
            desc: '15,000+ 검증된 진성 리뷰어 풀을 기반으로 매장 방문형, 제품 배송형, 기자단, 네이버 공식 인플루언서를 통해 소비자 검색 점유와 신뢰를 완성합니다.',
            highlights: ['매장 방문형 로컬 체험단', '제품 배송형 실사용 리뷰', '신속 확산 정보 배포형 기자단', '네이버 공식 인플루언서 매칭']
        }
    ];

    return (
        <div className="service-page">
            <Header />
            <ServiceNav currentPath="/services" />

            <main className="service-content">
                {/* ─── Hero Section with Motion Canvas ─── */}
                <section className="service-hero-detail fade-up">
                    <HeroMotionCanvas />

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
                        <MagneticButton to="/consult" className="btn-primary-consult">
                            무료 통합 마케팅 진단 상담 →
                        </MagneticButton>
                        <MagneticButton to="/portfolio" className="btn-secondary-outline">
                            전체 포트폴리오 보기
                        </MagneticButton>
                    </div>
                </section>

                {/* Sticky 작업 */}
                <section className="services-grid">
                    {serviceList.map((srv, idx) => (
                        <div className="fade-up">
                            <span className="service-card-index">Service 0{idx +1}</span>
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
                        </div>
                        ))}
                </section>

                {/* ─── 6 Hub Cards Grid with Tilt Effect ─── */}
                <section className="hub-services-grid fade-up">
                    {serviceList.map((srv, idx) => (
                        <TiltCard key={idx} maxTilt={7} className="hub-tilt-wrapper">
                            <Link to={srv.path} className="hub-service-card">
                                <div className="hub-card-top">
                                    <span className="hub-card-icon">{srv.icon}</span>
                                    <span className="hub-card-index">0{idx + 1}</span>
                                </div>
                                <span className="hub-card-tag">{srv.tag}</span>
                                <h2 className="hub-card-title">{srv.title}</h2>
                                <p className="hub-card-desc">{srv.desc}</p>

                                <ul className="hub-card-highlights">
                                    {srv.highlights.map((h, hIdx) => (
                                        <li key={hIdx}>{h}</li>
                                    ))}
                                </ul>

                                <div className="hub-card-footer">
                                    <span className="hub-view-text">상세 솔루션 & 프로세스 보기</span>
                                    <span className="hub-arrow-btn">→</span>
                                </div>
                            </Link>
                        </TiltCard>
                    ))}
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
                        <MagneticButton to="/consult" className="btn-primary-consult">
                            1:1 맞춤 마케팅 솔루션 문의 →
                        </MagneticButton>
                        <MagneticButton to="/portfolio" className="btn-secondary-outline">
                            성공 사례 포트폴리오 보기
                        </MagneticButton>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default ServiceView;
