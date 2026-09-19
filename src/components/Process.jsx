import React from 'react';

const steps = [
    {
        tag: 'Step 01',
        title: '현장 진단 & 문제 정의',
        desc: 'B2B SaaS 클라이언트는 "전환율이 낮다"고 의뢰했습니다. 3주간의 인터뷰 결과, 실제 문제는 구매 결정권자가 도입 ROI를 팀에 설득할 자료가 없다는 것이었습니다.',
        img: '/img/process_01.jpg',
        fallback: '#1e3229',
    },
    {
        tag: 'Step 02',
        title: '경쟁 & 포지셔닝',
        desc: '같은 키워드로 경쟁하는 것이 아니라, 아무도 말하지 않는 고객의 고민을 먼저 알아주는 메시지로 조회수를 높입니다.',
        img: '/img/process_02.jpg',
        fallback: '#1a2440',
    },
    {
        tag: 'Step 03',
        title: '전략 설계',
        desc: '광고비를 늘리기 전에, 기존 고객의 재구매율을 높이는 것이 CAC 대비 3배 효율적이었습니다. 우선순위를 다시 세우는 것이 전략의 핵심이었습니다.',
        img: '/img/process_03.jpg',
        fallback: '#2a1e0e',
    },
    {
        tag: 'Step 04',
        title: '실행 & 반복 최적화',
        desc: '4개월 캠페인에서 초기 크리에이티브 방향을 2번 전면 수정했습니다. 고집하지 않는 유연성이 최종 성과를 만들었습니다.',
        img: '/img/process_04.jpeg',
        fallback: '#1c1c28',
    },
];

const Process = () => {
    return (
        <section className="process-section" id="process">
            <h2 className="section-title fade-up">성과를 올려주는<br />맞춤형 컨설팅</h2>
            <p style={{fontSize:'15px', color:'var(--muted)', maxWidth:'520px', lineHeight:'1.8', marginTop:'24px'}} className="fade-up">
                처음부터 끝까지 4가지 단계를 통해 성공적인 마케팅 프로세스를 함께 진행합니다.
            </p>

            <div className="process-card-grid">
                {steps.map((s, i) => (
                    <div
                        className={`process-card fade-up fade-up-delay-${i + 1}`} 
                        key={i}
                    >
                        <div
                            className="process-card-bg"
                            style={{
                                backgroundImage: `url('${s.img}')`,
                                backgroundColor: s.fallback,
                            }}
                        />
                        <div className="process-card-overlay" />
                        <div className="process-card-content">
                            <span className="process-card-tag">{s.tag}</span>
                            <h3 className="process-card-title">{s.title}</h3>
                            <div className="process-card-divider" />
                            <p className="process-card-desc">{s.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Process;