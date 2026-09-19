import React from 'react';

const problems = [
    { num:'01', title:'왜 지금의 마케팅이 실패하는가', desc:'많은 기업이 트렌드를 따르는 데 집중하다 자사 고객이 실제로 무엇을 원하는지 잊어버립니다. 우리는 이 간극에서 프로젝트를 시작합니다.' },
    { num:'02', title:'데이터가 있어도 인사이트가 없다', desc:' 데이터가 "왜 이탈했는가"에 대한 답까지 주지 않습니다. 데이터와 고객 경험을 교차 분석해 진짜 문제를 찾습니다.' },
    { num:'03', title:'실행가능성이 전략과 따로 논다', desc:'원하는 만큼 통계치가 나오지 않는 이유는 현실성 낮은 마케팅 전략 때문입니다. 우리는 전략 수립 단계에서 운영전략까지 함께 설계합니다.' },
    { num:'04', title:'성과 측정 기준이 없다', desc:'클릭수, 노출수가 매출로 이어지지 않는 이유를 모릅니다. 퍼널 전체를 단일 대시보드로 연결해 어디서 돈이 새는지 눈에 보이게 만듭니다.' },
];

const Problem = () => {
    return (
        <section className="problem-section" id="problem">
            <h2 className="section-title fade-up">왜 아무리 광고해도<br />사람들이 모를까?</h2>
            <div className="problem-grid">
                {problems.map(p => (
                    <div className="problem-item fade-up" key={p.num}>
                        <span className="problem-num">{p.num}</span>
                        <h3>{p.title}</h3>
                        <p>{p.desc}</p>
                    </div>
                ))}
            </div>
            <div className="problem-bg-text">INSIGHT</div>
        </section>
    );
};

export default Problem;