import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const MagneticButton = ({ children, to, onClick, className = '', strength = 0.35, ...props }) => {
    const btnRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!btnRef.current) return;
        const rect = btnRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;

        setPosition({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const style = {
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 && position.y === 0 ? 'transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'transform 0.1s ease-out',
        display: 'inline-block'
    };

    if (to) {
        return (
            <div
                ref={btnRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ display: 'inline-block' }}
            >
                <Link to={to} className={className} style={style} {...props}>
                    {children}
                </Link>
            </div>
        );
    }

    return (
        <div
            ref={btnRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ display: 'inline-block' }}
        >
            <button onClick={onClick} className={className} style={style} {...props}>
                {children}
            </button>
        </div>
    );
};

export default MagneticButton;
