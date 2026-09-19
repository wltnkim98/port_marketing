import React, { useState } from 'react';

const InteractiveProcessTimeline = ({ steps = [], serviceName = '' }) => {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <div className="interactive-process-container">
            {/* Step Progress Line Bar */}
            <div className="timeline-nav-bar">
                <div className="timeline-track">
                    <div
                        className="timeline-laser-progress"
                        style={{
                            width: `${(activeStep / (steps.length - 1)) * 100}%`
                        }}
                    />
                </div>
                <div className="timeline-nodes-row">
                    {steps.map((item, idx) => (
                        <button
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
                    <div className="stepper-nav-controls">
                        <button
                            className="stepper-btn prev"
                            onClick={() => setActiveStep((prev) => Math.max(prev - 1, 0))}
                            disabled={activeStep === 0}
                        >
                            ← 이전 단계
                        </button>
                        <span className="stepper-indicator">
                            {activeStep + 1} / {steps.length}
                        </span>
                        <button
                            className="stepper-btn next"
                            onClick={() => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1))}
                            disabled={activeStep === steps.length - 1}
                        >
                            다음 단계 →
                        </button>
                    </div>

                    <div className="all-steps-mini-list">
                        {steps.map((s, idx) => (
                            <div
                                key={idx}
                                className={`mini-step-item ${activeStep === idx ? 'current' : ''}`}
                                onClick={() => setActiveStep(idx)}
                            >
                                <span className="mini-step-badge">{s.step}</span>
                                <span className="mini-step-text">{s.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InteractiveProcessTimeline;
