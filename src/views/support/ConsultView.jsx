import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// 4대 전문 컨설턴트 정보 (임의 가상 데이터, 통일된 텍스트 볼륨 & 고화질 프로필 이미지)
const CONSULTANTS = [
    {
        id: 'build',
        badge: '쇼핑몰 구축',
        badgeIcon: 'blocks',
        title: ' 편리한 이커머스 환경, 고객지향적 쇼핑몰 구축',
        name: '강태양',
        role: '개발팀 수석',
        affiliation: '커머스 플랫폼 아키텍처 전문가',
        image: 'https://images.unsplash.com/photo-1487309078313-fad80c3ec1e5?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        items: [
            '브랜드 쇼핑몰 & 자사몰 맞춤 구축',
            '솔루션 기능 커스터마이징 & UI/UX 최적화',
            'ERP · 외부 시스템 · 결제 API 고도화 연동'
        ],
        btnLabel: '구축 상담 신청하기 →'
    },
    {
        id: 'branding',
        badge: '창업 & 브랜딩',
        badgeIcon: 'idea',
        title: '자주 찾는 브랜드의 시작, 아이덴티티 및 디자인 설계',
        name: '윤서연',
        role: '브랜드 총괄 디렉터',
        affiliation: '크리에이티브 & 브랜딩 전문가',
        image: 'https://images.unsplash.com/photo-1695757002354-8bca71d087c7?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        items: [
            '브랜드 쇼핑몰 제작 및 전면 리뉴얼 기획',
            '기업 브랜드 사이트 및 스토리텔링 웹 구축',
            '브랜드 로고, 패키지, 비주얼 통합 디자인'
        ],
        btnLabel: '창업·브랜딩 상담 신청하기 →'
    },
    {
        id: 'global',
        badge: '글로벌 브랜딩',
        badgeIcon: 'globe',
        title: '성공적인 해외 진출을 위한 글로벌 브랜딩 전략 설계',
        name: '최유진',
        role: '글로벌 디렉터',
        affiliation: '크로스보더 브랜딩 전문가',
        image: 'https://images.unsplash.com/flagged/photo-1555475693-6e207bee0737?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        items: [
            '해외 자사몰(글로벌몰/Shopify) 구축 & 현지화',
            '글로벌 타깃 브랜드 포지셔닝 및 스토리텔링',
            '해외 결제(PG)·물류 연동 및 크로스보더 마케팅'
        ],
        btnLabel: '글로벌 상담 신청하기 →'
    },
    {
        id: 'marketing',
        badge: '마케팅 컨설팅',
        badgeIcon: 'chart',
        title: '고객의 마음을 읽는 데이터 기반 퍼포먼스 마케팅',
        name: '민지원',
        role: '그로스 총괄 본부장',
        affiliation: '퍼포먼스 & 광고마케팅 전문가',
        image: 'https://images.unsplash.com/photo-1544168190-79c17527004f?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        items: [
            '광고 매체 최적화 및 전략적 Media Mix',
            '구매 전환율(CVR) 극대화를 위한 그로스 진단',
            '데이터 기반 AD TECH 자동 입찰 & 타깃팅'
        ],
        btnLabel: '마케팅 상담 신청하기 →'
    }
];

const CONSULT_CATEGORIES = [
    { id: 'build', label: '🚀 구축 컨설팅' },
    { id: 'branding', label: '✨ 창업 & 브랜딩' },
    { id: 'global', label: '🌐 글로벌 브랜딩' },
    { id: 'marketing', label: '📢 마케팅 & 그로스' },
    { id: 'solution', label: '⚙️ 유지관리 & 솔루션' },
    { id: 'etc', label: '💡 종합 비즈니스 상담' }
];

const BUDGET_OPTIONS = [
    '500만원 미만',
    '500만 ~ 1,500만원',
    '1,500만 ~ 3,000만원',
    '3,000만원 이상',
    '미정 / 상담 후 협의'
];

const TIME_OPTIONS = [
    '항상 가능',
    '오전 9시 ~ 10시',
    '오전 10시 ~ 11시',
    '오후 11시 ~ 12시',
    '오후 13시 ~ 14시',
    '오후 14시 ~ 15시',
    '오후 15시 ~ 16시',
    '오후 16시 ~ 17시',
    '오후 17시 ~ 18시',
];

const FAQ_LIST = [
    {
        q: '상담 및 맞춤 견적 신청 시 비용이 발생하나요?',
        a: '아닙니다. 초기 비즈니스 진단 및 1차 맞춤 컨설팅, 상세 견적 제안은 100% 무료로 진행됩니다. 귀사의 현황을 편안하게 남겨주시면 최적의 솔루션을 함께 정리해 드립니다.'
    },
    {
        q: '아직 구체적인 기획서나 예산이 정해지지 않았는데도 상담이 가능한가요?',
        a: '네, 가능합니다. 아이디어 단계이거나 현재 비즈니스의 성장 정체로 고민 중이시라면, 전문 컨설턴트가 사업 규모와 목표에 맞는 적정 예산 가이드 및 로드맵을 함께 기획해 드립니다.'
    },
    {
        q: '상담 미팅은 어떤 방식으로 진행되나요?',
        a: '고객님의 선호에 따라 [전화 상담 / Zoom 화상 미팅 / 오프라인 본사 방문 미팅] 중 원하시는 방식으로 유연하게 진행됩니다. 신청서 작성 시 남겨주신 희망 통화 시간에 맞춰 1차 연락을 드립니다.'
    },
    {
        q: '상담 신청 후 언제 연락을 받을 수 있나요?',
        a: '접수된 문의는 영업일 기준 48시간 이내에 담당 전문 컨설턴트가 배정되어 사전 분석 후 연락을 드립니다. 급한 일정의 경우 대표 전화(1600-5678)로 연락 주시면 더 빠른 상담이 가능합니다.'
    }
];

const BadgeIcon = ({ type }) => {
    const commonProps = {
        className: 'card-badge-icon',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.8,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        'aria-hidden': true
    };

    if (type === 'blocks') {
        return <svg {...commonProps}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>;
    }
    if (type === 'idea') {
        return <svg {...commonProps}><path d="M9 18v-1.2c0-.9-.4-1.7-1.1-2.3a6 6 0 1 1 8.2 0c-.7.6-1.1 1.4-1.1 2.3V18h-6Z" /><path d="M9 18v3h6v-3M10 22h4" /><path d="M12 1V.2M4.5 5.5 3.3 4.3M19.5 5.5l1.2-1.2" /></svg>;
    }
    if (type === 'globe') {
        return <svg {...commonProps}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
    }
    return <svg {...commonProps}><path d="M4 19V9M10 19V5M16 19v-8M22 19H2" /><path d="m4 7 6-4 6 5 5-5" /></svg>;
};

const ConsultView = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const formRef = useRef(null);

    // Form states
    const [selectedCategories, setSelectedCategories] = useState(['build']);
    const [selectedBudget, setSelectedBudget] = useState('500만 ~ 1,500만원');
    const [selectedTime, setSelectedTime] = useState('항상 가능');
    const [formData, setFormData] = useState({
        company: '',
        name: '',
        role: '',
        phone: '',
        email: '',
        website: '',
        message: ''
    });
    const [attachedFile, setAttachedFile] = useState(null);
    const [agreePrivacy, setAgreePrivacy] = useState(false);

    // UI Interactive states
    const [faqOpenIndex, setFaqOpenIndex] = useState(0);
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Reading progress
    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                setScrollProgress((window.scrollY / totalHeight) * 100);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll reveal observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const fadeElements = document.querySelectorAll('.fade-up');
        fadeElements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const scrollToForm = (categoryId = null) => {
        if (categoryId) {
            setSelectedCategories([categoryId]);
        }
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleCategoryToggle = (id) => {
        if (selectedCategories.includes(id)) {
            if (selectedCategories.length > 1) {
                setSelectedCategories(selectedCategories.filter(item => item !== id));
            }
        } else {
            setSelectedCategories([...selectedCategories, id]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setAttachedFile(e.target.files[0]);
        }
    };

    const handleRemoveFile = () => {
        setAttachedFile(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.company.trim()) {
            alert('회사명 또는 브랜드명을 입력해 주세요.');
            return;
        }
        if (!formData.name.trim()) {
            alert('담당자 성함을 입력해 주세요.');
            return;
        }
        if (!formData.phone.trim()) {
            alert('연락처를 입력해 주세요.');
            return;
        }
        if (!formData.email.trim()) {
            alert('이메일 주소를 입력해 주세요.');
            return;
        }
        if (!agreePrivacy) {
            alert('개인정보 수집 및 이용에 동의해 주세요.');
            return;
        }

        setIsSubmitting(true);

        try {
            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
            
            const formDataToSend = new FormData();
            formDataToSend.append('categories', JSON.stringify(selectedCategories));
            formDataToSend.append('budget', selectedBudget);
            formDataToSend.append('preferredTime', selectedTime);
            formDataToSend.append('company', formData.company);
            formDataToSend.append('name', formData.name);
            formDataToSend.append('role', formData.role);
            formDataToSend.append('phone', formData.phone);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('website', formData.website);
            formDataToSend.append('message', formData.message);
            if (attachedFile) {
                formDataToSend.append('file', attachedFile);
            }
            formDataToSend.append('privacyAgreed', agreePrivacy);
            
            const response = await fetch(`${API_URL}/api/support/consult`, {
                method: 'POST',
                body: formDataToSend
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || '신청서 전송에 실패했습니다.');
            }

            setShowSuccessModal(true);
        } catch (error) {
            console.error('Submission error:', error);
            alert(error.message || '서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResetForm = () => {
        setShowSuccessModal(false);
        setFormData({
            company: '',
            name: '',
            role: '',
            phone: '',
            email: '',
            website: '',
            message: ''
        });
        setAttachedFile(null);
        setAgreePrivacy(false);
    };

    return (
        <div className="consult-page">
            <Header />

            <main className="consult-container">
                {/* ── 1. HERO HEADER ── */}
                <header className="consult-header fade-up">
                    <h1 className="consult-main-title">
                        쇼핑몰 구축부터 퍼포먼스 마케팅까지,<br />
                        전문 컨설턴트가 <span className="highlight-text">신규 고객 맞춤 상담</span>을 도와드립니다.
                    </h1>

                    <p className="consult-lead-desc">
                        브랜드의 현재 상황과 목표를 남겨주시면, 축적된 이커머스 노하우를 바탕으로
                        가장 적합하고 실현 가능한 성장 솔루션을 함께 정리해 드립니다.
                        최초 진단 및 견적상담은 무료로 진행됩니다.
                    </p>
                </header>

                {/* ── 2. QUICK CONTACT CHANNELS BAR ── */}
                <div className="consult-quick-bar fade-up">
                    <div className="quick-bar-left">
                        <div className="quick-bar-icon">📞</div>
                        <div className="quick-bar-info">
                            <h3>컨설팅 상담을 위한 전용 상담센터</h3>
                            <p>궁금하신 점이 있다면 편하신 채널로 바로 문의해 주세요. (평일 09:00 ~ 18:00)</p>
                        </div>
                    </div>

                    <div className="quick-bar-right">
                        <a href="tel:16005678" className="quick-btn tel-btn">
                            전화상담 1600-5678
                        </a>
                        <a
                            href="https://pf.kakao.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="quick-btn chat-btn"
                        >
                            💬 카카오톡 채팅 상담
                        </a>
                    </div>
                </div>

                {/* ── 3. 4 SPECIALIZED CONSULTANT CARDS ── */}
                <section className="consult-grid-section">
                    <div className="section-sub-header fade-up">
                        <h2 className="section-headline">분야별 전문 컨설턴트에게 <br/> 문의하세요. </h2>
                    </div>

                    <div className="consultant-cards-grid">
                        {CONSULTANTS.map((c) => (
                            <div key={c.id} className="consultant-card fade-up">
                                <div className="card-top-content">
                                    <div className="card-top">
                                        <span className="card-badge">
                                            <BadgeIcon type={c.badgeIcon} />
                                            {c.badge}
                                        </span>
                                    </div>

                                    {/* 중앙 정렬된 전문가 프로필 */}
                                    <div className="consultant-profile-row">
                                        <div className="consultant-photo-wrap">
                                            <img
                                                src={c.image}
                                                alt={`${c.name} ${c.role}`}
                                                className="consultant-photo"
                                                loading="lazy"
                                            />
                                        </div>
                                    </div>

                                    <div className="consultant-meta">
                                        <h3 className="card-title">{c.title}</h3>
                                        <div className="card-person-box">
                                            <span className="card-person-name">{c.name} {c.role}</span>
                                            <span className="card-person-title">/ {c.affiliation}</span>
                                        </div>
                                    </div>

                                    <ul className="card-items">
                                        {c.items.map((item, idx) => (
                                            <li key={idx}>
                                                <span className="item-check">✓</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button
                                    type="button"
                                    className="card-select-btn"
                                    onClick={() => scrollToForm(c.id)}
                                >
                                    {c.btnLabel}
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── 4. CONSULTATION PROCESS ── */}
                <section className="consult-process-section fade-up">
                    <div className="section-sub-header">
                        <h2 className="section-headline">간결하고 체계적인 맞춤 상담 절차</h2>
                    </div>

                    <div className="process-grid">
                        <div className="process-step-card">
                            <div className="step-num">01</div>
                            <div className="step-name">상담 접수</div>
                            <div className="step-desc">온라인 신청서 접수 즉시 요구사항과 브랜드 현황을 사전 검토합니다.</div>
                        </div>

                        <div className="process-step-card">
                            <div className="step-num">02</div>
                            <div className="step-name">전문가 배정</div>
                            <div className="step-desc">귀사의 업종과 프로젝트 성격에 최적화된 1:1 전담 컨설턴트를 매칭합니다.</div>
                        </div>

                        <div className="process-step-card">
                            <div className="step-num">03</div>
                            <div className="step-name">맞춤 진단 & 제안</div>
                            <div className="step-desc">희망하시는 시간에 맞춰 심층 분석 리포트 및 실행 견적을 제안합니다.</div>
                        </div>

                        <div className="process-step-card">
                            <div className="step-num">04</div>
                            <div className="step-name">프로젝트 킥오프</div>
                            <div className="step-desc">합의된 로드맵을 바탕으로 신속하고 완성도 높은 실행에 착수합니다.</div>
                        </div>
                    </div>
                </section>

                {/* ── 5. CONSULTATION REQUEST FORM ── */}
                <section className="consult-form-section fade-up" ref={formRef} id="consult-form">
                    <div className="form-header">
                        <h2 className="form-title">1:1 맞춤 상담 및 견적 신청</h2>
                        <p className="form-desc">
                            상세한 정보를 남겨주실수록 더욱 정밀하고 구체적인 분석과 견적을 안내해 드릴 수 있습니다.
                        </p>
                    </div>

                    <form className="consult-form" onSubmit={handleSubmit}>
                        {/* 상담 분야 선택 */}
                        <div className="form-section-block">
                            <div className="form-group-title">
                                <span>1. 상담 희망 분야</span>
                                <span className="req">* (중복 선택 가능)</span>
                            </div>
                            <div className="category-chips">
                                {CONSULT_CATEGORIES.map((cat) => {
                                    const active = selectedCategories.includes(cat.id);
                                    return (
                                        <button
                                            type="button"
                                            key={cat.id}
                                            className={`chip-btn ${active ? 'active' : ''}`}
                                            onClick={() => handleCategoryToggle(cat.id)}
                                        >
                                            {cat.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 기본 정보 */}
                        <div className="form-section-block">
                            <div className="form-group-title">
                                <span>2. 고객 및 기업 정보</span>
                                <span className="req">*</span>
                            </div>

                            <div className="form-row">
                                <div className="form-field">
                                    <label className="form-label" htmlFor="company">
                                        회사명 / 브랜드명 <span className="req">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        placeholder="예: 마켓위드 스튜디오 / 주식회사 브랜드"
                                        className="form-input"
                                        required
                                    />
                                </div>

                                <div className="form-field">
                                    <label className="form-label" htmlFor="name">
                                        담당자 성함 <span className="req">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="예: 홍길동"
                                        className="form-input"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row three-col">
                                <div className="form-field">
                                    <label className="form-label" htmlFor="role">
                                        직책 / 부서
                                    </label>
                                    <input
                                        type="text"
                                        id="role"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        placeholder="예: 마케팅팀 팀장 / 대표"
                                        className="form-input"
                                    />
                                </div>

                                <div className="form-field">
                                    <label className="form-label" htmlFor="phone">
                                        연락처 <span className="req">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="예: 010-1234-5678"
                                        className="form-input"
                                        required
                                    />
                                </div>

                                <div className="form-field">
                                    <label className="form-label" htmlFor="email">
                                        이메일 <span className="req">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="예: contact@brand.com"
                                        className="form-input"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-field">
                                <label className="form-label" htmlFor="website">
                                    운영 중인 웹사이트 또는 쇼핑몰 / SNS URL
                                </label>
                                <input
                                    type="text"
                                    id="website"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleInputChange}
                                    placeholder="예: https://www.yourbrand.co.kr"
                                    className="form-input"
                                />
                            </div>
                        </div>

                        {/* 예산 및 희망 시간 */}
                        <div className="form-section-block">
                            <div className="form-group-title">
                                <span>3. 프로젝트 예산 & 희망 통화 시간</span>
                            </div>

                            <div className="form-row">
                                <div className="form-field">
                                    <label className="form-label">
                                        예상 예산 규모
                                    </label>
                                    <select
                                        className="form-select"
                                        value={selectedBudget}
                                        onChange={(e) => setSelectedBudget(e.target.value)}
                                    >
                                        {BUDGET_OPTIONS.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-field">
                                    <label className="form-label">
                                        통화 가능 희망 시간
                                    </label>
                                    <select
                                        className="form-select"
                                        value={selectedTime}
                                        onChange={(e) => setSelectedTime(e.target.value)}
                                    >
                                        {TIME_OPTIONS.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* 문의 내용 */}
                        <div className="form-section-block">
                            <div className="form-group-title">
                                <span>4. 상담 내용 및 문의사항</span>
                            </div>

                            <div className="form-field">
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="현재 겪고 계신 문제점, 프로젝트 목표, 희망 일정, 타깃 고객 등을 자유롭게 적어주세요. (구체적일수록 상세한 진단이 가능합니다)"
                                    className="form-textarea"
                                />
                            </div>
                        </div>

                        {/* 파일 첨부 */}
                        <div className="form-section-block">
                            <div className="form-group-title">
                                <span>5. 참고 자료 및 제안요청서(RFP) 첨부</span>
                            </div>

                            <div className="file-upload-box">
                                <input
                                    type="file"
                                    id="fileUpload"
                                    onChange={handleFileChange}
                                    accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.jpg,.png"
                                />
                                <div className="file-upload-icon">📁</div>
                                <div className="file-upload-text">
                                    {attachedFile ? '다른 파일로 교체하려면 클릭하세요' : '클릭하거나 파일을 이곳에 드래그하여 첨부해 주세요'}
                                </div>
                                <div className="file-upload-hint">
                                    지원 형식: PDF, PPT, Word, Excel, ZIP, 이미지 (최대 50MB)
                                </div>
                            </div>

                            {attachedFile && (
                                <div className="attached-file-badge">
                                    <span className="file-badge-info">
                                        <span className="badge-clip">📎</span>
                                        <span className="file-name">{attachedFile.name}</span>
                                        <span className="file-size">({(attachedFile.size / 1024).toFixed(1)} KB)</span>
                                    </span>
                                    <button
                                        type="button"
                                        className="remove-file-btn"
                                        onClick={handleRemoveFile}
                                        title="파일 삭제"
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* 개인정보 수집 및 이용 동의 */}
                        <div className="privacy-agreement-box">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={agreePrivacy}
                                    onChange={(e) => setAgreePrivacy(e.target.checked)}
                                />
                                <span>[필수] 개인정보 수집 및 이용에 동의합니다.</span>
                            </label>

                            <button
                                type="button"
                                className="view-privacy-btn"
                                onClick={() => setShowPrivacyModal(true)}
                            >
                                약관 전문 보기
                            </button>
                        </div>

                        {/* 제출 버튼 */}
                        <div className="submit-btn-wrap">
                            <button
                                type="submit"
                                className="form-submit-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? '신청서 전송 중...' : '무료 맞춤 상담 신청하기 →'}
                            </button>
                        </div>
                    </form>
                </section>

                {/* ── 6. FAQ ACCORDION SECTION ── */}
                <section className="consult-faq-section fade-up">
                    <div className="section-sub-header">
                        <h2 className="section-headline">자주 묻는 질문</h2>
                    </div>

                    <div className="faq-list">
                        {FAQ_LIST.map((faq, idx) => {
                            const isOpen = faqOpenIndex === idx;
                            return (
                                <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                                    <button
                                        type="button"
                                        className="faq-question"
                                        onClick={() => setFaqOpenIndex(isOpen ? -1 : idx)}
                                    >
                                        <span className="faq-q-text">
                                            <span className="faq-q-badge">Q.</span>
                                            {faq.q}
                                        </span>
                                        <span className="faq-toggle-icon">+</span>
                                    </button>

                                    {isOpen && (
                                        <div className="faq-answer">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>
            </main>

            {/* ── PRIVACY POLICY MODAL ── */}
            {showPrivacyModal && (
                <div className="modal-overlay" onClick={() => setShowPrivacyModal(false)}>
                    <div className="modal-card privacy-modal-card" onClick={(e) => e.stopPropagation()}>
                        <h3 className="modal-title">개인정보 수집 및 이용 안내</h3>
                        <div className="privacy-modal-body">
                            <h4>1. 수집 항목</h4>
                            <p>회사명/브랜드명, 담당자 성함, 직책/부서, 연락처, 이메일, 사이트 URL, 상담 문의 내용, 첨부파일</p>

                            <h4>2. 수집 및 이용 목적</h4>
                            <p>쇼핑몰 구축, 마케팅, 브랜딩, 유지관리 등 1:1 맞춤 견적 및 컨설팅 서비스 제공을 위한 담당자 소통 및 상담 안내</p>

                            <h4>3. 보유 및 이용 기간</h4>
                            <p>상담 접수일로부터 1년 보관 후 파기 (고객 요청 시 즉시 파기)</p>

                            <p className="privacy-modal-note">
                                * 귀하는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으며, 동의를 거부하실 경우 상담 접수가 제한될 수 있습니다.
                            </p>
                        </div>
                        <button
                            type="button"
                            className="modal-close-btn"
                            onClick={() => setShowPrivacyModal(false)}
                        >
                            확인
                        </button>
                    </div>
                </div>
            )}

            {/* ── SUBMISSION SUCCESS MODAL ── */}
            {showSuccessModal && (
                <div className="modal-overlay">
                    <div className="modal-card">
                        <div className="modal-icon">✓</div>
                        <h3 className="modal-title">상담 신청이 완료되었습니다!</h3>
                        <p className="modal-desc">
                            남겨주신 내용을 바탕으로 전담 컨설턴트가 사전 분석을 진행합니다.<br />
                            영업일 기준 48시간 이내에 <strong>{formData.phone || '기재하신 연락처'}</strong>로 신속히 연락드리겠습니다.
                        </p>
                        <button
                            type="button"
                            className="modal-close-btn"
                            onClick={handleResetForm}
                        >
                            확인
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default ConsultView;
