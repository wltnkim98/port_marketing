export const pageLinks = [
    {
        label: 'ABOUT',
        children: [
            { label: '회사소개', path: '/about/company' },
            { label: 'About us', path: '/about/aboutus' },
            { label: '찾아오시는 길', path: '/about/location' },
        ]
    },
    {
        label: '마케팅 서비스',
        path: '/services',
        children: [
            { label: '사진 촬영/영상 제작', path: '/services/photography' },
            { label: '브랜드 블로그', path: '/services/blog' },
            { label: '인스타 관리', path: '/services/instagram' },
            { label: '글로벌 브랜딩', path: '/services/global-marketing' },
            { label: '웹사이트 제작', path: '/services/website' },
            { label: '체험단 마케팅', path: '/services/tester' },
        ]
    },
    { label: '포트폴리오', path: '/portfolio' },
    {
        label: '고객지원',
        children: [
            { label: '컨설팅 신청', path: '/support/consult', badge: '첫 진단 무료' },
            { label: '문의 게시판', path: '/support/qa' },
        ]
    },
];

export const links = [
    { label: 'AI 진단', id: 'ai' },
];

export const companyInfo = {
    name: '(주)마켓위드 컨설팅',
    ceo: '김지수',
    registrationNumber: '123-45-67890',
    address: '서울특별시 강남구 테헤란로 123, 마켓위드빌딩 5층',
    phone: '1600-5678',
    email: 'contact@marketwith.co.kr',
    businessHours: '평일 09:00~18:00 (점심시간 12:00~13:00)',
    founded: '2020',
    description: '소비자 심리에 기반한 데이터 드리븐 마케팅 컨설팅',
    vision: '글로벌 무대에서 경쟁하는 한국 브랜드를 위한 최적의 성장 파트너',
    mission: '고객 중심의 맞춤형 마케팅 전략으로 브랜드의 진정한 성장을 이끌어 드립니다',
    services: [
        '브랜드 전략 컨설팅',
        '퍼포먼스 마케팅',
        '콘텐츠 마케팅',
        '글로벌 마케팅',
        '디지털 광고 운영',
        'SNS 관리'
    ],
    history: [
        { year: '2020', event: '마켓위드 컨설팅 설립' },
        { year: '2021', event: '브랜드 전략 컨설팅 서비스 런칭' },
        { year: '2022', event: '퍼포먼스 마케팅 팀 확장 및 글로벌 사업 시작' },
        { year: '2023', event: 'AI 기반 마케팅 분석 시스템 도입' },
        { year: '2024', event: '100+ 브랜드 파트너십 달성' },
        { year: '2025', event: '글로벌 마케팅 센터 설립' },
        { year: '2026', event: '아시아 태평양 지역 확장' }
    ],
    stats: [
        { label: '파트너 브랜드', value: '150+' },
        { label: '프로젝트 완료', value: '500+' },
        { label: '평균 성장률', value: '240%' },
        { label: '고객 만족도', value: '98%' }
    ]
};
