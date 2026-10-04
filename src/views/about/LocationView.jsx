import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const LocationView = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

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

    const locationInfo = {
        address: '서울특별시 강남구 테헤란로 123, 마켓위드빌딩 5층',
        phone: '1600-5678',
        email: 'contact@marketwith.co.kr',
        hours: '평일 09:00 - 18:00 (주말 및 공휴일 휴무)'
    };

    const transportOptions = [
        {
            id: 'subway',
            icon: '🚇',
            title: '지하철',
            tag: 'SUBWAY',
            routes: [
                '1호선, 4호선 서울역 (1번 출구)',
                '2호선, 5호선 을지로4가역 (4번 출구)'
            ],
            walking: '도보 5분'
        },
        {
            id: 'bus',
            icon: '🚌',
            title: '버스',
            tag: 'BUS',
            routes: [
                '서울역 정류장 하차 (간선 101, 102, 103)',
                '을지로입구 정류장 하차 (지선 7017, 7022)'
            ],
            walking: '도보 3분'
        },
        {
            id: 'car',
            icon: '🚗',
            title: '자가용',
            tag: 'PARKING',
            routes: [
                '네비게이션: 서울역 검색',
                '인근 공영주차장 이용 (서울역 주차장)'
            ],
            walking: '도보 7분'
        }
    ];

    return (
        <div className="location-page">
            <div 
                className="location-progress-bar" 
                style={{ width: `${scrollProgress}%` }}
                aria-hidden="true"
            />

            <Header />

            <main className="location-container">
                {/* HERO HEADER */}
                <header className="location-header fade-up">
                    <h1 className="location-main-title">
                        찾아오시는 길
                    </h1>
                    <p className="location-lead-desc">
                        MarketWith 본사를 방문하여 브랜드 성장을 위한<br />
                        맞춤형 마케팅 전략을 상담해 보세요.
                    </p>
                </header>

                {/* QUICK CONTACT BAR */}
                <div className="location-quick-bar fade-up">
                    <div className="quick-bar-left">
                        <div className="quick-bar-icon">📍</div>
                        <div className="quick-bar-info">
                            <h3>방문 상담 안내</h3>
                            <p>사전 예약을 통해 편안하게 방문해 주세요. (평일 09:00 - 18:00)</p>
                        </div>
                    </div>
                    <div className="quick-bar-right">
                        <a href={`tel:${locationInfo.phone}`} className="quick-btn tel-btn">
                            전화상담 {locationInfo.phone}
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

                {/* LOCATION INFO & MAP SECTION */}
                <section className="location-info-section fade-up">
                    <div className="location-grid">
                        {/* INFO CARD */}
                        <div className="location-info-card">
                            <div className="info-card-header">
                                <span className="info-card-tag">LOCATION & DIRECTION</span>
                                <h2 className="info-card-title">찾아오시는 길</h2>
                            </div>
                            <div className="info-card-body">
                                <div className="info-item">
                                    <span className="info-label">주소</span>
                                    <p className="info-value">{locationInfo.address}</p>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">연락처</span>
                                    <a href={`tel:${locationInfo.phone}`} className="info-value link">
                                        {locationInfo.phone}
                                    </a>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">이메일</span>
                                    <a href={`mailto:${locationInfo.email}`} className="info-value link">
                                        {locationInfo.email}
                                    </a>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">영업시간</span>
                                    <p className="info-value">{locationInfo.hours}</p>
                                </div>
                            </div>
                        </div>

                        {/* MAP CARD */}
                        <div className="location-map-card">
                            <div className="map-wrapper">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m5!3m3!1m2!1s0x357ca157b7724c47%3A0x75f2f9d7958750eb!2z7ISc7Jq47Yq567OE7IucIOqwleuCqOq1rCDthYztl6TrnoDroZwgMTIz!5e0!3m2!1sko!2skr!4v1789384380605!5m2!1sko!2skr"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="MarketWith Location Map"
                                    className="map-iframe"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* TRANSPORT SECTION */}
                <section className="location-transport-section fade-up">
                    <div className="section-sub-header">
                        <h2 className="section-headline">대중교통 이용 안내</h2>
                    </div>
                    <div className="transport-grid">
                        {transportOptions.map((option) => (
                            <div key={option.id} className="transport-card">
                                <div className="transport-card-header">
                                    <span className="transport-icon">{option.icon}</span>
                                    <span className="transport-tag">{option.tag}</span>
                                </div>
                                <h3 className="transport-title">{option.title}</h3>
                                <ul className="transport-routes">
                                    {option.routes.map((route, idx) => (
                                        <li key={idx}>
                                            <span className="route-dot">•</span>
                                            <span>{route}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="transport-walking">
                                    <span className="walking-label">소요시간</span>
                                    <span className="walking-time">{option.walking}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA SECTION */}
                <section className="location-cta-section fade-up">
                    <div className="cta-content">
                        <div className="cta-kicker">READY TO VISIT?</div>
                        <h2 className="cta-title">
                            사전 상담 예약을 통해<br />
                            더 편안하게 방문해 보세요.
                        </h2>
                        <p className="cta-desc">
                            방문 일정과 희망 상담 내용을 미리 알려주시면,
                            전문 컨설턴트가 준비를 마치고 맞이해 드립니다.
                        </p>
                        <div className="cta-btn-wrap">
                            <Link to="/support/consult" className="cta-primary-btn">
                                방문 상담 예약하기 →
                            </Link>
                            <a href={`tel:${locationInfo.phone}`} className="cta-secondary-btn">
                                전화로 문의하기
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default LocationView;