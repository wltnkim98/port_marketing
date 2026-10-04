import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const AnimatedTitleInner = ({ children, className = '', delay = 0 }) => {
    const titleRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = titleRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),   // 들어오면 true, 벗어나면 false
            { threshold: 0.2 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const text = typeof children === 'string' ? children : String(children ?? '');

    return (
        <h2 ref={titleRef} className={`section-main-title ${className}`} aria-label={text}>
            {Array.from(text).map((char, index) =>
                char === ' ' ? (
                    <span key={index} className="space" aria-hidden="true">&nbsp;</span>
                ) : (
                    <span
                        key={index}
                        className={`char${visible ? ' visible' : ''}`}
                        style={{ transitionDelay: `${delay + index * 0.05}s` }}
                        aria-hidden="true"
                    >
                        {char}
                    </span>
                )
            )}
        </h2>
    );
};

// 페이지 주소가 바뀌면 key가 바뀌어 처음부터 다시 생성 → 효과 재생
const AnimatedTitle = (props) => {
    const { pathname } = useLocation();
    return <AnimatedTitleInner key={pathname} {...props} />;
};

export default AnimatedTitle;