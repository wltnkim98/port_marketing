import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Portfolio data from PortfolioView
const COMPANY_POOL = [
    {
        id: 'monobasic',
        name: '모노베이직 (MONOBASIC)',
        url: 'https://www.monobasic-store.com',
        domain: 'monobasic-store.com',
        desc: '온·오프라인 옴니채널 커머스 통합 플랫폼 구축 및 회원 멤버십 시스템 리뉴얼',
        tags: ['#옴니채널', '#대규모트래픽', '#자사몰구축', '#CRM연동'],
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'arcticpeak',
        name: '알틱피크 (ARCTIC PEAK)',
        url: 'https://www.arcticpeak-outdoor.com',
        domain: 'arcticpeak-outdoor.com',
        desc: '글로벌 아웃도어 기어 WEB / Mobile 반응형 플래그십 스토어 구축 및 UX 고도화',
        tags: ['#글로벌커머스', '#반응형웹', '#퍼포먼스', '#모바일최적화'],
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'vitaroot',
        name: '비타루트 랩 (VITA ROOT LAB)',
        url: 'https://www.vitaroot-mall.co.kr',
        domain: 'vitaroot-mall.co.kr',
        desc: '건강기능식품 정기배송 구독형 e커머스 시스템 및 맞춤 영양 상담 큐레이션 개발',
        tags: ['#정기배송', '#구독결제', '#큐레이션', '#전환율개선'],
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'lumielle',
        name: '루미엘르 스킨케어 (LUMIELLE)',
        url: 'https://www.lumielle-beauty.kr',
        domain: 'lumielle-beauty.kr',
        desc: '글로벌 뷰티 브랜드 스토리텔링 및 다국어 지원 글로벌 D2C 스토어 런칭',
        tags: ['#글로벌D2C', '#뷰티스킨케어', '#브랜드스토리', '#해외배송'],
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'maison-atelier',
        name: "메종 드 아틀리에 (MAISON D'ATELIER)",
        url: 'https://www.atelier-maison.co.kr',
        domain: 'atelier-maison.co.kr',
        desc: '감각적인 디자이너 패션 브랜드의 인터랙티브 룩북 & 글로벌 스토어 구축',
        tags: ['#패션브랜드', '#인터랙티브UI', '#룩북', '#MZ타겟'],
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'scent-nouvelle',
        name: '센트 오브 누벨 (SCENT OF NOUVELLE)',
        url: 'https://www.nouvelle-scent.com',
        domain: 'nouvelle-scent.com',
        desc: '공간적 미학을 담은 프리미엄 향수 & 바디케어 브랜드의 하이엔드 쇼케이스 웹사이트',
        tags: ['#하이엔드', '#비주얼아트', '#모션인터랙션', '#공간경험'],
        image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80'
    }
];

const FALLBACK_THUMBNAIL = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80';

const PortfolioSlider = () => {
    const sliderRef = useRef(null);
    const autoPlayRef = useRef(null);

    const itemsPerView = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;

    // 무한 루프를 위해 아이템 7배 복제 (더 긴 순환 범위)
    const duplicatedItems = [...COMPANY_POOL, ...COMPANY_POOL, ...COMPANY_POOL, ...COMPANY_POOL, ...COMPANY_POOL, ...COMPANY_POOL, ...COMPANY_POOL];
    const originalLength = COMPANY_POOL.length;
    const centerOffset = originalLength * 3; // 중앙 섹션의 시작 인덱스

    const [currentIndex, setCurrentIndex] = useState(centerOffset + 1);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const nextSlide = () => {
        setCurrentIndex((prev) => {
            const newIndex = prev + 1;
            // 전체 복제된 아이템 끝에 도달하면 중앙 섹션 시작으로 순환
            if (newIndex >= duplicatedItems.length) {
                return centerOffset;
            }
            return newIndex;
        });
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => {
            const newIndex = prev - 1;
            // 전체 복제된 아이템 시작에 도달하면 중앙 섹션 끝으로 순환
            if (newIndex < 0) {
                return centerOffset + originalLength - 1;
            }
            return newIndex;
        });
    };

    const goToSlide = (index) => {
        setCurrentIndex(centerOffset + index);
    };

    // Auto-play functionality
    useEffect(() => {
        if (isAutoPlaying) {
            autoPlayRef.current = setInterval(nextSlide, 4000);
        }
        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [isAutoPlaying, currentIndex]);

    // Pause auto-play on hover
    const handleMouseEnter = () => setIsAutoPlaying(false);
    const handleMouseLeave = () => setIsAutoPlaying(true);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setCurrentIndex(0);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className="portfolio-slider-section" id="portfolio-slider">
            <div className="portfolio-slider-header fade-up">
                <h2 className="slider-section-title fade-up">이미 많은 기업이 <br /> <span className="brand-name">마켓위드</span>와 함께하고 있습니다</h2>
                <p className="portfolio-slider-subtitle">
                    마켓위드와 성공사례를 함께 쓰는 고객사를 소개합니다.
                </p>
            </div>

            <div
                className="portfolio-slider-container fade-up"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <button
                    className="slider-nav-btn slider-prev-btn"
                    onClick={prevSlide}
                    aria-label="이전 슬라이드"
                >
                    ‹
                </button>

                <div className="slider-track-wrapper">
                    <div
                        className="slider-track"
                        ref={sliderRef}
                        style={{
                            transform: `translateX(calc(-${currentIndex * (100 / itemsPerView)}% + ${(itemsPerView - 1) * 50 / itemsPerView}%))`
                        }}
                    >
                        {duplicatedItems.map((item, index) => (
                            <div
                                key={`${item.id}-${index}`}
                                className={`portfolio-slider-card ${index === currentIndex ? 'active' : ''}`}
                                style={{ width: `${100 / itemsPerView}%` }}
                            >
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="portfolio-slider-card-link"
                                >
                                    <div className="slider-card-thumbnail">
                                        <img
                                            src={item.image || FALLBACK_THUMBNAIL}
                                            alt={item.name}
                                            loading="lazy"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = FALLBACK_THUMBNAIL;
                                            }}
                                        />
                                    </div>
                                    <div className="slider-card-content">
                                        <h3 className="slider-card-title">{item.name}</h3>
                                        <p className="slider-card-desc">{item.desc}</p>
                                        <div className="slider-card-tags">
                                            {item.tags.slice(0, 3).map((tag, idx) => (
                                                <span key={idx} className="slider-card-tag">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    className="slider-nav-btn slider-next-btn"
                    onClick={nextSlide}
                    aria-label="다음 슬라이드"
                >
                    ›
                </button>
            </div>

            <div className="portfolio-slider-cta fade-up">
                <Link to="/portfolio" className="btn-round">
                    더 많은 포트폴리오 보러가기 →
                </Link>
            </div>
        </section>
    );
};

export default PortfolioSlider;
