import React, { useState, useEffect, useRef } from 'react';

const AUTO_INTERVAL = 3200;   // 자동 전환 간격 (ms)

const InteractiveProcessTimeline = ({ steps = [], serviceName = '' }) => {
    const total = steps.length;
    const [activeStep, setActiveStep] = useState(0);
    const [isInView, setIsInView] = useState(false);     // 화면에 보일 때만 자동 전환
    const containerRef = useRef(null);

    // 1) 화면에 보이는지 감지
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { threshold: 0.4 }   // 카드의 40% 이상 보일 때
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // 2) 자동 전환 (activeStep이 바뀔 때마다 타이머 재시작 → 클릭해도 자연스러움)
    useEffect(() => {
        if (total < 2 || !isInView) return;
        const timer = setTimeout(() => {
            setActiveStep((prev) => (prev + 1) % total);
        }, AUTO_INTERVAL);
        return () => clearTimeout(timer);
    }, [total, activeStep, isInView]);

    return (
        <div className="interactive-process-container" ref={containerRef}>
            {/* Step Progress Line Bar */}
            <div className="timeline-nav-bar">
                <div className="timeline-track">
                    <div
                        className="timeline-laser-progress"
                        style={{ width: `${(activeStep / Math.max(total - 1, 1)) * 100}%` }}
                    />
                </div>
                <div className="timeline-nodes-row">
                    {steps.map((item, idx) => (
                        <button
                            type="button"
                            key={idx}
                            className={`timeline-node-btn ${activeStep === idx ? 'active' : ''} ${idx <= activeStep ? 'passed' : ''}`}
                            onClick={() => setActiveStep(idx)}
                            aria-label={`Step ${item.step}: ${item.title}`}
                        >
                            <span className="node-step-num">{item.step}</span>
                            <span className="node-title-label">{item.title.split(' ')[0]}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Active Step Feature Display Card */}
            <div className="timeline-active-stage">
                <div className="stage-left-info">
                    <div className="stage-badge-group">
                        <span className="stage-step-pill">STEP {steps[activeStep]?.step}</span>
                        <span className="stage-duration-tag">{steps[activeStep]?.duration}</span>
                        <span className="stage-service-name">{serviceName}</span>
                    </div>
                    <h3 className="stage-title-heading">{steps[activeStep]?.title}</h3>
                    <p className="stage-description-text">{steps[activeStep]?.desc}</p>
                    <div className="stage-deliverable-box">
                        <span className="deliverable-label">핵심 산출물 (Deliverable):</span>
                        <span className="deliverable-val">{steps[activeStep]?.deliverable}</span>
                    </div>
                </div>

                <div className="stage-right-stepper">
                    <div className="all-steps-mini-list">
                        {steps.map((s, idx) => (
                            <button
                                type="button"
                                key={idx}
                                className={`mini-step-item ${activeStep === idx ? 'current' : ''}`}
                                onClick={() => setActiveStep(idx)}
                                aria-current={activeStep === idx ? 'step' : undefined}
                            >
                                <span className="mini-step-badge">{s.step}</span>
                                <span className="mini-step-text">{s.title}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InteractiveProcessTimeline;