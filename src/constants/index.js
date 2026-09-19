export const pageLinks = [
    {
        label: '회사소개',
        path: '/about',
        children: [
            { label: '회사소개', path: '/about' },
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
    { label: '문의하기', path: '/consult',  }
];

export const links = [
    { label: 'AI 진단', id: 'ai' },
];