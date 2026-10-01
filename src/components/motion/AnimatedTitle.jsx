import React, { useEffect, useRef } from 'react';

const AnimatedTitle = ({ children, className = '', delay = 0 }) => {
    const titleRef = useRef(null);
    const observerRef = useRef(null);

    useEffect(() => {
        const titleElement = titleRef.current;
        if (!titleElement) return;

        // Get text content from the element
        const text = titleElement.textContent;
        titleElement.innerHTML = '';

        const chars = text.split('');
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            if (char === ' ') {
                span.className = 'space';
                span.innerHTML = '&nbsp;';
            } else {
                span.className = 'char';
                span.textContent = char;
                span.style.transitionDelay = `${delay + index * 0.05}s`;
            }
            titleElement.appendChild(span);
        });

        // Set up intersection observer
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const charSpans = entry.target.querySelectorAll('.char');
                        charSpans.forEach((span) => {
                            span.classList.add('visible');
                        });
                    }
                });
            },
            { threshold: 0.2 }
        );

        observerRef.current.observe(titleElement);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [children, delay]);

    return (
        <h2 
            ref={titleRef} 
            className={`section-main-title ${className}`}
        >
            {children}
        </h2>
    );
};

export default AnimatedTitle;
