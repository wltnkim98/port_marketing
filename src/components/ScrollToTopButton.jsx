import React from 'react';

const ScrollToTopButton = () => {
    const scrollToTop = () => {
        if (window.lenis) {
            window.lenis.scrollTo(0);
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'auto'
            });
        }
    };

    return (
        <button 
            className="scroll-to-top-btn visible"
            onClick={scrollToTop}
            aria-label="맨 위로 이동"
        >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 15l-6-6-6 6"/>
            </svg>
        </button>
    );
};

export default ScrollToTopButton;
