import React from 'react';
import IntroVideo from '../assets/video/Intro_video_low.mp4';

const Intro = () => {
    return (
        <section className="intro" id="intro">
            <video
                className="intro-video"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
            >
                <source src={IntroVideo} type="video/mp4" />
            </video>
            <h1 className="intro-title fade-up">
                기회를 설계하다 <br/>
                <span className="catchphrase"> 브랜드의 성장을 함께, </span><br />
                <span className="brand-name"> 마켓위드 </span>
            </h1>
            <p className="intro-desc fade-up fade-up-delay-1">
                마켓위드는 솔루션을 시작하기 전, <strong>왜 팔리지 않는가</strong>를 먼저 묻습니다. <br />
                데이터와 현장 사이의 간극을 찾아내고, <br />근본 원인부터 해결하는 마케팅 컨설팅 에이전시입니다.
            </p>
            <div className="intro-download fade-up fade-up-delay-2">
                <a href="/company-introduction.pdf" download className="btn-download">
                    회사소개서 다운로드
                    {/* public/company-introduction.pdf 경로에 파일 넣어야지 다운로드 됨*/}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 7L17 17M17 17H7M17 17V7"/>
                    </svg>
                </a>
            </div>
        </section>
    );
};

export default Intro;