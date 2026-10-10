import React, { useState, useEffect, useRef } from 'react';

function AnimatedMetric({ value, label, suffix, delay = 0, isVisible }) {
    const [displayValue, setDisplayValue] = useState(0);
    
    const targetValue = value;

    useEffect(() => {
        let animationFrame;

        if (!isVisible) {
            setDisplayValue(0);
            return;
        }

        const duration = 6000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime - delay;
            const progress = Math.min(Math.max(elapsed / duration, 0), 1);

            // easeOutExpo
            const easeProgress =
                progress === 1
                    ? 1
                    : 1 - Math.pow(2, -10 * progress);

            const current = targetValue * easeProgress;

            setDisplayValue(current);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }, [isVisible, targetValue, delay]);

    const formatNumber = (num) => {
        return Math.round(num);
    };

    return (
        <div className={`fade-up fade-up-delay-${delay / 100 + 1} ${isVisible ? 'visible' : ''}`} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'16px' }}>
            <span style={{
                fontFamily: "'Pretendard-Black', sans-serif",
                fontSize: '24px',
                fontWeight : '700',
                color: 'var(--white)',
                textAlign: 'center'
            }}>
                {label}
            </span>
            <div style={{
                fontFamily: "'Pretendard-Black', sans-serif",
                fontSize: '90px',
                lineHeight: '1',
                color: 'var(--accent)',
                fontWeight: '900'
            }}>
                {formatNumber(displayValue)}{suffix}
            </div>
        </div>
    );
}

const metrics = [
    { val: 156, label: '매출 성장', suffix: '%' },
    { val: 320, label: '누적 고객사', suffix: '+' },
    { val: 89, label: '브랜드 인지도 상승', suffix: '%' },
];

function RisingGraph({ isVisible }) {
    const [graphStarted, setGraphStarted] = useState(false);

    // 그래프 애니메이션 시작 / 초기화
    useEffect(() => {
        let frameId;

        if (!isVisible) {
            setGraphStarted(false);
            return;
        }

        setGraphStarted(false);

        frameId = requestAnimationFrame(() => {
            setGraphStarted(true);
        });

        return () => {
            cancelAnimationFrame(frameId);
        };
    }, [isVisible]);

    // 끝점은 viewBox 경계에 둔다. 마지막 원은 일부 잘려도 선이 가로 영역 끝까지 이어진다.
    const endX = 1200;
    const endY = 60;
    const maxY = 600;

    const graphPath =
        `M 0 550 L 300 420 L 400 460 L 500 350 L 600 390 L 700 250 L 800 290 L 900 180 L 1000 220 L 1100 110 L ${endX} ${endY}`;

    return (
        <svg
            className={`fade-up ${isVisible ? 'visible' : ''}`}
            width="100%"
            viewBox="0 0 1200 600"
            preserveAspectRatio="xMidYMid meet"
            style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                width: '100%',
                height: 'auto',
                aspectRatio: '2 / 1',
                translate: '0 -50%',
                opacity: 0.4,
                zIndex: 2,
                pointerEvents: 'none'
            }}
        >
            <defs>

                {/* 그라디언트 */}
                <linearGradient
                    id="graphGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        style={{
                            stopColor: 'var(--paper)',
                            stopOpacity: 0.5
                        }}
                    />

                    <stop
                        offset="100%"
                        style={{
                            stopColor: 'var(--paper)',
                            stopOpacity: 0
                        }}
                    />
                </linearGradient>

                {/*
                    그라디언트 영역을 왼쪽부터 reveal
                */}
                <clipPath id="graphClip">
                    <rect
                        x="0"
                        y="0"
                        height={maxY}
                        width={graphStarted ? 1200 : 0}
                        style={{
                            transition: graphStarted
                                ? 'width 2.5s ease-out'
                                : 'none'
                        }}
                    />
                </clipPath>

            </defs>

            {/* 그라디언트 영역 */}
            <path
                d={`${graphPath} L ${endX} ${maxY} L 0 ${maxY} Z`}
                fill="url(#graphGradient)"
                stroke="none"
                style={{
                    opacity: graphStarted ? 1 : 0,
                    transition: graphStarted
                        ? 'opacity 1.8s ease-out'
                        : 'opacity 0.5s ease-in'
                }}
            />

            {/* 그래프 선 */}
            <path
                d={graphPath}
                fill="none"
                stroke="var(--paper)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="3000"
                strokeDashoffset={
                    graphStarted ? 0 : 3000
                }
                style={{
                    transition:
                        'stroke-dashoffset 2.5s ease-out',
                    filter:
                        'drop-shadow(0 8px 12px rgba(0,0,0,0.4))'
                }}
            />


            {/* 마지막 포인트 */}
            <circle
                cx={endX}
                cy={endY}
                r="15"
                fill="var(--paper)"
                style={{
                    opacity: graphStarted ? 1 : 0,
                    transition: 'opacity 0.6s ease-out 1.0s',
                    filter:
                        'drop-shadow(0 8px 12px rgba(0,0,0,0.4))'
                }}
            />

        </svg>
    );
}

const Cases = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.2,
                rootMargin: '0px 0px -20% 0px'
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section className="cases-section" id="cases" ref={sectionRef} style={{ position: 'relative' }}>
            <video
                className="cases-video-bg"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
            >
                <source src="/building_low.mp4" type="video/mp4" />
            </video>
            <RisingGraph isVisible={isVisible} />
            <div className="cases-content">
                <div>
                    <h2 className="section-title fade-up" style={{color: 'white'}}>마켓위드만의<br /> 설계의 성과</h2>
                    <p style={{fontSize:'15px',color:'white',maxWidth:'480px',lineHeight:'1.8',marginTop:'20px'}} className="fade-up">
                        수치보다 중요한 건 어떤 판단이 그 수치를 만들었는가입니다.
                    </p>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '160px',
                    marginTop: '150px',
                    flexWrap: 'wrap'
                }}>
                    {metrics.map((m, i) => (
                        <AnimatedMetric
                            key={i}
                            value={m.val}
                            label={m.label}
                            suffix={m.suffix}
                            delay={i * 100}
                            isVisible={isVisible}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Cases;
