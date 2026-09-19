import React, { useRef, useState } from 'react';

const TiltCard = ({ children, className = '', maxTilt = 10, glare = true, ...props }) => {
    const cardRef = useRef(null);
    const [style, setStyle] = useState({
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease'
    });
    const [glareStyle, setGlareStyle] = useState({
        opacity: 0,
        x: 50,
        y: 50
    });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPercent = (mouseX / width - 0.5) * 2; // -1 to 1
        const yPercent = (mouseY / height - 0.5) * 2; // -1 to 1

        const rotateX = -yPercent * maxTilt;
        const rotateY = xPercent * maxTilt;

        setStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
            transition: 'transform 0.1s ease-out'
        });

        if (glare) {
            setGlareStyle({
                opacity: 0.25,
                x: (mouseX / width) * 100,
                y: (mouseY / height) * 100
            });
        }
    };

    const handleMouseLeave = () => {
        setStyle({
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
        });
        if (glare) {
            setGlareStyle((prev) => ({ ...prev, opacity: 0 }));
        }
    };

    return (
        <div
            ref={cardRef}
            className={`tilt-card-wrapper ${className}`}
            style={{
                ...style,
                position: 'relative',
                transformStyle: 'preserve-3d',
                willChange: 'transform'
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {children}
            {glare && (
                <div
                    className="tilt-card-glare"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: 'inherit',
                        pointerEvents: 'none',
                        background: `radial-gradient(circle at ${glareStyle.x}% ${glareStyle.y}%, rgba(255, 255, 255, 0.6) 0%, transparent 60%)`,
                        opacity: glareStyle.opacity,
                        transition: 'opacity 0.3s ease',
                        zIndex: 2
                    }}
                />
            )}
        </div>
    );
};

export default TiltCard;
