import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BRAND_LOGOS } from '../components/Ticker';

// 브랜드별 로고 매핑 맵
const LOGO_MAP = BRAND_LOGOS.reduce((acc, curr) => {
    acc[curr.id] = curr.src;
    return acc;
}, {});

// 한 페이지당 노출할 카드 개수 (12개)
const ITEMS_PER_PAGE = 12;

// 기본 대체 썸네일 이미지
const FALLBACK_THUMBNAIL = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80';

// 업종별 가상 브랜드명, 가상 도메인 및 고화질 썸네일 매핑 풀
const COMPANY_POOL = [
    {
        id: 'monobasic',
        name: '모노베이직 (MONOBASIC)',
        url: 'https://www.monobasic-store.com',
        domain: 'monobasic-store.com',
        category: 'mall',
        categoryLabel: '쇼핑몰',
        desc: '온·오프라인 옴니채널 커머스 통합 플랫폼 구축 및 회원 멤버십 시스템 리뉴얼',
        tags: ['#옴니채널', '#대규모트래픽', '#자사몰구축', '#CRM연동'],
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'arcticpeak',
        name: '알틱피크 (ARCTIC PEAK)',
        url: 'https://www.arcticpeak-outdoor.com',
        domain: 'arcticpeak-outdoor.com',
        category: 'mall',
        categoryLabel: '쇼핑몰',
        desc: '글로벌 아웃도어 기어 WEB / Mobile 반응형 플래그십 스토어 구축 및 UX 고도화',
        tags: ['#글로벌커머스', '#반응형웹', '#퍼포먼스', '#모바일최적화'],
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'vitaroot',
        name: '비타루트 랩 (VITA ROOT LAB)',
        url: 'https://www.vitaroot-mall.co.kr',
        domain: 'vitaroot-mall.co.kr',
        category: 'mall',
        categoryLabel: '쇼핑몰',
        desc: '건강기능식품 정기배송 구독형 e커머스 시스템 및 맞춤 영양 상담 큐레이션 개발',
        tags: ['#정기배송', '#구독결제', '#큐레이션', '#전환율개선'],
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'lumielle',
        name: '루미엘르 스킨케어 (LUMIELLE)',
        url: 'https://www.lumielle-beauty.kr',
        domain: 'lumielle-beauty.kr',
        category: 'brand',
        categoryLabel: '브랜드',
        desc: '글로벌 뷰티 브랜드 스토리텔링 및 다국어 지원 글로벌 D2C 스토어 런칭',
        tags: ['#글로벌D2C', '#뷰티스킨케어', '#브랜드스토리', '#해외배송'],
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'maison-atelier',
        name: "메종 드 아틀리에 (MAISON D'ATELIER)",
        url: 'https://www.atelier-maison.co.kr',
        domain: 'atelier-maison.co.kr',
        category: 'brand',
        categoryLabel: '브랜드',
        desc: '감각적인 디자이너 패션 브랜드의 인터랙티브 룩북 & 글로벌 스토어 구축',
        tags: ['#패션브랜드', '#인터랙티브UI', '#룩북', '#MZ타겟'],
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'scent-nouvelle',
        name: '센트 오브 누벨 (SCENT OF NOUVELLE)',
        url: 'https://www.nouvelle-scent.com',
        domain: 'nouvelle-scent.com',
        category: 'brand',
        categoryLabel: '브랜드',
        desc: '공간적 미학을 담은 프리미엄 향수 & 바디케어 브랜드의 하이엔드 쇼케이스 웹사이트',
        tags: ['#하이엔드', '#비주얼아트', '#모션인터랙션', '#공간경험'],
        image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'benefit-fashion',
        name: '베네핏 패션몰 (BENEFIT FASHION)',
        url: 'https://www.benefit-fashionmall.com',
        domain: 'benefit-fashionmall.com',
        category: 'mall',
        categoryLabel: '쇼핑몰',
        desc: '멀티 여성 패션 브랜드 통합 커머스 플랫폼 개발 및 스마트 물류·멤버십 연동',
        tags: ['#패션통합몰', '#ERP연동', '#스마트물류', '#멤버십'],
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'espressoteca',
        name: '에스프레소테카 (ESPRESSOTECA)',
        url: 'https://www.espressoteca.co.kr',
        domain: 'espressoteca.co.kr',
        category: 'mall',
        categoryLabel: '쇼핑몰',
        desc: '프리미엄 커피 머신 및 원두 셀렉트샵 커머스 웹/앱 통합 시스템 제작',
        tags: ['#커피머신', '#라이프스타일', '#자사몰', '#모바일웹'],
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'nova-optics',
        name: '노바 옵틱스 (NOVA OPTICS)',
        url: 'https://www.nova-optics.com',
        domain: 'nova-optics.com',
        category: 'homepage',
        categoryLabel: '홈페이지',
        desc: '미래지향적 아이웨어 브랜드의 3D 제품 뷰어 및 글로벌 플래그십 아카이브 웹',
        tags: ['#3D인터랙션', '#글로벌쇼룸', '#혁신적디자인', '#웹GL'],
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'silent-mood',
        name: '사일런트 무드 (SILENT MOOD)',
        url: 'https://www.silentmood-care.com',
        domain: 'silentmood-care.com',
        category: 'brand',
        categoryLabel: '브랜드',
        desc: '향과 감성을 전달하는 라이프스타일 뷰티 브랜드 자사몰 및 글로벌 결제 인프라',
        tags: ['#라이프스타일', '#미니멀리즘', '#글로벌결제', '#UX리뉴얼'],
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'mode-essential',
        name: '모드 에센셜 (MODE ESSENTIAL)',
        url: 'https://www.mode-essential.kr',
        domain: 'mode-essential.kr',
        category: 'brand',
        categoryLabel: '브랜드',
        desc: '모던 페미닌 디자이너 브랜드의 세련된 컬렉션 아카이빙 및 반응형 E-Shop',
        tags: ['#디자이너패션', '#모던클래식', '#해외역직구', '#반응형'],
        image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'curate-nine',
        name: '큐레이트 나인 (CURATE 9)',
        url: 'https://www.curate-nine.co.kr',
        domain: 'curate-nine.co.kr',
        category: 'marketing',
        categoryLabel: '마케팅',
        desc: '감도 깊은 라이프스타일 셀렉트샵의 브랜드 스토리텔링 및 인플루언서 제휴 캠페인',
        tags: ['#콘텐츠커머스', '#미디어믹스', '#인플루언서', '#바이럴마케팅'],
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'urban-standard',
        name: '어반스탠다드 랩 (URBAN STANDARD)',
        url: 'https://www.urbanstandard-lab.com',
        domain: 'urbanstandard-lab.com',
        category: 'marketing',
        categoryLabel: '마케팅',
        desc: '베이직 캐주얼 라인의 퍼포먼스 광고 및 AI 타깃팅 전환율 극대화 캠페인',
        tags: ['#퍼포먼스광고', '#전환율최적화', '#ROAS성장', '#빅데이터타깃'],
        image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'prism-design',
        name: '프리즘 디자인 스튜디오 (PRISM DESIGN)',
        url: 'https://www.prism-designstudio.io',
        domain: 'prism-designstudio.io',
        category: 'homepage',
        categoryLabel: '홈페이지',
        desc: '크리에이티브 디자인 에이전시의 포트폴리오 아카이브 및 1:1 견적 인터랙션 사이트',
        tags: ['#디자인에이전시', '#인터랙션', '#GSAP애니메이션', '#반응형'],
        image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'aerotech-mobility',
        name: '에어로텍 모빌리티 (AEROTECH)',
        url: 'https://www.aerotech-mobility.io',
        domain: 'aerotech-mobility.io',
        category: 'homepage',
        categoryLabel: '홈페이지',
        desc: '차세대 친환경 자율주행 모빌리티 테크 기업의 공식 웹사이트 구축 및 다국어 지원',
        tags: ['#테크기업', '#친환경', '#B2B비즈니스', '#IR웹사이트'],
        image: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'genova-biomed',
        name: '제노바 바이오메디컬 (GENOVA)',
        url: 'https://www.genova-biomed.com',
        domain: 'genova-biomed.com',
        category: 'homepage',
        categoryLabel: '홈페이지',
        desc: '첨단 바이오 제약 연구진의 기술 소개 및 글로벌 임상 파이프라인 소개 홈페이지',
        tags: ['#바이오테크', '#신약연구', '#글로벌IR', '#반응형홈페이지'],
        image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'botanic-hour',
        name: '보타닉 아워 (BOTANIC HOUR)',
        url: 'https://www.botanichour.life',
        domain: 'botanichour.life',
        category: 'brand',
        categoryLabel: '브랜드',
        desc: '도심 속 자연을 품은 플랜테리어 카페 & 라이프스타일 복합문화 브랜드몰',
        tags: ['#플랜테리어', '#복합문화공간', '#F&B브랜드', '#예약시스템'],
        image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'ecovert-wellness',
        name: '에코베르 웰니스 (ECOVERT)',
        url: 'https://www.ecovert-wellness.co.kr',
        domain: 'ecovert-wellness.co.kr',
        category: 'marketing',
        categoryLabel: '마케팅',
        desc: '클린 뷰티 브랜드 런칭 SNS 바이럴 릴스 제작 및 네이버 검색광고 통합 솔루션',
        tags: ['#SNS바이럴', '#숏폼마케팅', '#SA광고', '#브랜딩캠페인'],
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'kicks-archive',
        name: '킥스 아카이브 (KICKS ARCHIVE)',
        url: 'https://www.kicks-archive.com',
        domain: 'kicks-archive.com',
        category: 'mall',
        categoryLabel: '쇼핑몰',
        desc: '스니커즈 & 스트릿 풋웨어 한정판 드롭 및 리셀 커뮤니티 커머스 플랫폼',
        tags: ['#스니커즈', '#한정판드롭', '#커뮤니티커머스', '#실시간결제'],
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'palette-studio',
        name: '팔레트 오브 뷰티 (PALETTE STUDIO)',
        url: 'https://www.palettestudio.kr',
        domain: 'palettestudio.kr',
        category: 'brand',
        categoryLabel: '브랜드',
        desc: '다채로운 컬러 코스메틱 & 메이크업 브랜드의 감각적인 글로벌 E-Shop',
        tags: ['#컬러메이크업', '#비주얼아트', '#글로벌스토어', '#뷰티테크'],
        image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'nordic-living',
        name: '노르딕 리빙 하우스 (NORDIC LIVING)',
        url: 'https://www.nordicliving-home.com',
        domain: 'nordicliving-home.com',
        category: 'mall',
        categoryLabel: '쇼핑몰',
        desc: '북유럽 감성 프리미엄 디자이너 가구 & 홈데코 온라인 셀렉트 스토어',
        tags: ['#가구인테리어', '#북유럽감성', '#3D홈스타일링', '#자사몰'],
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'hyper-cloud',
        name: '하이퍼클라우드 테크 (HYPER CLOUD)',
        url: 'https://www.hypercloud-tech.io',
        domain: 'hypercloud-tech.io',
        category: 'homepage',
        categoryLabel: '홈페이지',
        desc: '차세대 B2B 엔터프라이즈 클라우드 SaaS 솔루션 공식 웹사이트 구축',
        tags: ['#B2B솔루션', '#SaaS테크', '#엔터프라이즈', '#글로벌IR'],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'medicare-solution',
        name: '메디케어 스마트 헬스 (MEDICARE)',
        url: 'https://www.medicaresmart-health.com',
        domain: 'medicaresmart-health.com',
        category: 'homepage',
        categoryLabel: '홈페이지',
        desc: '디지털 헬스케어 및 AI 원격 진료 플랫폼 반응형 웹사이트 구축',
        tags: ['#디지털헬스케어', '#AI의료', '#스마트케어', '#반응형웹'],
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'skyline-asset',
        name: '스카이라인 자산운용 (SKYLINE ASSET)',
        url: 'https://www.skyline-asset.com',
        domain: 'skyline-asset.com',
        category: 'homepage',
        categoryLabel: '홈페이지',
        desc: '글로벌 대체투자 및 사모펀드 자산운용사 공식 신뢰성 중심 기업 웹사이트',
        tags: ['#자산운용', '#금융IR', '#신뢰성디자인', '#다국어지원'],
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'data-growth',
        name: '데이터 그로스 랩스 (DATA GROWTH)',
        url: 'https://www.datagrowth-labs.com',
        domain: 'datagrowth-labs.com',
        category: 'marketing',
        categoryLabel: '마케팅',
        desc: '퍼포먼스 마케팅 & 애널리틱스 기반 전환율 극대화 솔루션 및 데이터 대시보드',
        tags: ['#그로스해킹', '#전환율최적화', '#데이터분석', '#퍼포먼스'],
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'fintech-pay',
        name: '핀테크페이 솔루션 (FINTECH PAY)',
        url: 'https://www.fintechpay-global.io',
        domain: 'fintechpay-global.io',
        category: 'mall',
        categoryLabel: '쇼핑몰',
        desc: '글로벌 간편결제 게이트웨이 및 원클릭 체크아웃 시스템 통합 플랫폼',
        tags: ['#핀테크결제', '#글로벌PG', '#원클릭체크아웃', '#보안인증'],
        image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'pure-organic',
        name: '퓨어 오가닉 라이프 (PURE ORGANIC)',
        url: 'https://www.pureorganic-life.com',
        domain: 'pureorganic-life.com',
        category: 'brand',
        categoryLabel: '브랜드',
        desc: '친환경 오가닉 푸드 & 프리미엄 티 브랜드 플래그십 자사몰 구축',
        tags: ['#친환경오가닉', '#티하우스', '#스토리텔링', '#반응형'],
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
    }
];

// 카테고리 탭 정의
const CATEGORIES = [
    { id: 'all', label: '전체' },
    { id: 'mall', label: '쇼핑몰' },
    { id: 'brand', label: '브랜드' },
    { id: 'homepage', label: '홈페이지' },
    { id: 'marketing', label: '마케팅 & 광고' }
];

// 포트폴리오 생성 헬퍼 함수
const createPortfolioList = () => {
    return COMPANY_POOL.map((company, index) => {
        const logo = LOGO_MAP[company.id] || BRAND_LOGOS[index % BRAND_LOGOS.length].src;
        return {
            id: company.id || `portfolio-${index + 1}`,
            companyName: company.name,
            url: company.url,
            domain: company.domain,
            category: company.category,
            categoryLabel: company.categoryLabel,
            desc: company.desc,
            tags: company.tags,
            logo: logo,
            thumbnail: company.image || FALLBACK_THUMBNAIL
        };
    });
};

const PortfolioView = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [portfolioItems] = useState(() => createPortfolioList());

    // 카테고리나 검색어가 바뀌면 1페이지로 리셋
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchQuery]);

    // 카테고리 및 검색어 필터링
    const filteredItems = useMemo(() => {
        return portfolioItems.filter(item => {
            const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
            const matchesSearch = 
                item.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

            return matchesCategory && matchesSearch;
        });
    }, [portfolioItems, selectedCategory, searchQuery]);

    // 총 페이지 수 계산
    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

    // 현재 페이지에 노출할 12개 아이템 슬라이싱
    const paginatedItems = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredItems, currentPage]);

    // 페이지 이동 처리
    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 340, behavior: 'smooth' });
    };

    // 스크롤 애니메이션 옵저버 (페이지가 변경될 때도 카드 애니메이션 보장)
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.05 }
        );

        const fadeElements = document.querySelectorAll('.fade-up');
        fadeElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [paginatedItems, currentPage]);

    return (
        <div className="portfolio-page">
            {/* ── 원래 웹사이트 상단 네비게이션 헤더 ── */}
            <Header />

            <main className="portfolio-container">
                {/* ── 포트폴리오 히어로 ── */}
                <section className="service-hero fade-up">
                    <div className="service-hero__glow service-hero__glow--one" aria-hidden="true" />
                    <div className="service-hero__glow service-hero__glow--two" aria-hidden="true" />
                    <div className="service-hero__content">
                        <span className="service-hero__eyebrow">SELECTED WORKS</span>
                        <h1>포트폴리오</h1>
                        <p>브랜드의 성장을 이끄는 디지털 커머스 &amp; 브랜딩 솔루션 성공 사례</p>
                    </div>
                </section>

                <section className="portfolio-controls-wrap fade-up">
                    {/* 툴바 (검색창, 결과 건수) */}
                    <div className="portfolio-toolbar">
                        <div className="toolbar-left">
                            <div className="results-count">
                                전체 <span>{filteredItems.length}</span>개
                            </div>
                        </div>

                        <div className="toolbar-right">
                            <div className="search-box">
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="업체명, 키워드 검색..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button 
                                        className="search-clear-btn" 
                                        onClick={() => setSearchQuery('')}
                                        aria-label="검색어 지우기"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 카테고리 선택 탭 */}
                    <nav className="portfolio-tab-wrap" aria-label="포트폴리오 카테고리">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                type="button"
                                className={`portfolio-tab-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat.id)}
                            >
                                <span>{cat.label}</span>
                            </button>
                        ))}
                    </nav>
                </section>

                {/* ── 포트폴리오 그리드 목록 (12개 단위 페이지네이션) ── */}
                {paginatedItems.length > 0 ? (
                    <>
                        <div className="portfolio-grid">
                            {paginatedItems.map((item) => (
                                <a
                                    key={item.id}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="portfolio-card"
                                    title={`${item.companyName} 공식 웹사이트로 이동 (새 창)`}
                                >
                                    {/* 썸네일 이미지 및 카테고리 뱃지 영역 */}
                                    <div className="card-thumbnail-wrap">
                                        <img
                                            src={item.thumbnail}
                                            alt={item.companyName}
                                            loading="lazy"
                                            className="card-thumbnail-img"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = FALLBACK_THUMBNAIL;
                                            }}
                                        />

                                        {/* 카테고리 뱃지 */}
                                        <span className="card-category-badge">
                                            {item.categoryLabel}
                                        </span>

                                        {/* 호버 시 나타나는 사이트 바로가기 안내 */}
                                        <div className="card-hover-banner">
                                            <span className="link-text">
                                                웹사이트 바로가기 <em>↗</em>
                                            </span>
                                            <span className="link-domain">{item.domain}</span>
                                        </div>
                                    </div>

                                    {/* 카드 상세 텍스트 정보 */}
                                    <div className="card-info">
                                        <div className="card-top-meta">
                                            <h3 className="card-company-name">
                                                {item.companyName}
                                            </h3>
                                            <div className="card-arrow-circle" aria-hidden="true">
                                                ↗
                                            </div>
                                        </div>

                                        <div className="card-url-hint">
                                            <span>🌐</span> {item.domain}
                                        </div>

                                        <p className="card-desc">
                                            {item.desc}
                                        </p>

                                        {/* 태그 목록 */}
                                        <div className="card-tag-list">
                                            {item.tags.map((tag, idx) => (
                                                <span key={idx} className="card-tag-item">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* ── 12개 이상 시 페이지네이션 UI (1, 2, 3...) ── */}
                        {totalPages > 1 && (
                            <div className="portfolio-pagination fade-up">
                                <button
                                    type="button"
                                    className="pagination-btn pagination-arrow"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    aria-label="이전 페이지"
                                >
                                    ‹
                                </button>

                                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                                    <button
                                        key={`page-${pageNum}`}
                                        type="button"
                                        className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                                        onClick={() => handlePageChange(pageNum)}
                                        aria-label={`${pageNum} 페이지로 이동`}
                                        aria-current={currentPage === pageNum ? 'page' : undefined}
                                    >
                                        {pageNum}
                                    </button>
                                ))}

                                <button
                                    type="button"
                                    className="pagination-btn pagination-arrow"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    aria-label="다음 페이지"
                                >
                                    ›
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    /* 검색 결과가 없을 때의 Empty State */
                    <div className="portfolio-empty fade-up">
                        <div className="portfolio-empty-icon">🔍</div>
                        <h3 className="portfolio-empty-title">검색된 포트폴리오가 없습니다.</h3>
                        <p className="portfolio-empty-desc">
                            검색어 "{searchQuery}"와 일치하는 업체를 찾을 수 없습니다. 다른 검색어를 입력해 보세요.
                        </p>
                        <button 
                            type="button" 
                            className="reset-search-btn"
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('all');
                            }}
                        >
                            전체 목록 보기
                        </button>
                    </div>
                )}

                {/* ── 하단 컨설팅 / 문의 유도 CTA 섹션 ── */}
                <section className="portfolio-cta-section fade-up">
                    <div className="portfolio-cta-kicker">WORK WITH MARKETWITH</div>
                    <h2 className="portfolio-cta-title">
                        당신의 브랜드도 다음 성공 사례의 주인공이 될 수 있습니다.
                    </h2>
                    <p className="portfolio-cta-desc">
                        쇼핑몰 구축부터 브랜드 리뉴얼, 퍼포먼스 마케팅까지<br />
                        마켓위드의 실력 있는 전문 컨설턴트 팀과 함께 시작해 보세요.
                    </p>
                    <div className="portfolio-cta-buttons">
                        <Link to="/support/consult" className="portfolio-cta-btn-primary">
                            무료 브랜드 맞춤 상담 신청하기 →
                        </Link>
                        <Link to="/services" className="portfolio-cta-btn-secondary">
                            제공 서비스 둘러보기
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default PortfolioView;
