import React, { useState, useEffect, useRef } from 'react';

const LiveMetricCountUp = ({ value, duration = 1600, className = '' }) => {
    const [displayVal, setDisplayVal] = useState('0');
    const elemRef = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        // Parse target value (extract digits and prefix/suffix like "1,800+", "98.4%", "4.8M+")
        const match = String(value).match(/^([^\d.]*)([\d,.]+)([^\d.]*)$/);
        if (!match) {
            setDisplayVal(String(value));
            return;
        }

        const prefix = match[1] || '';
        const rawNumStr = match[2].replace(/,/g, '');
        const suffix = match[3] || '';
        const targetNum = parseFloat(rawNumStr);
        const isFloat = rawNumStr.includes('.');
        const decimalPlaces = isFloat ? rawNumStr.split('.')[1].length : 0;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    let startTime = null;

                    const animate = (timestamp) => {
                        if (!startTime) startTime = timestamp;
                        const progress = Math.min((timestamp - startTime) / duration, 1);
                        // Easing out cubic
                        const easeProgress = 1 - Math.pow(1 - progress, 3);
                        const currentNum = targetNum * easeProgress;

                        const formattedNum = isFloat
                            ? currentNum.toFixed(decimalPlaces)
                            : Math.floor(currentNum).toLocaleString();

                        setDisplayVal(`${prefix}${formattedNum}${suffix}`);

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            setDisplayVal(String(value));
                        }
                    };

                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.2 }
        );

        if (elemRef.current) {
            observer.observe(elemRef.current);
        }

        return () => observer.disconnect();
    }, [value, duration]);

    return (
        <span ref={elemRef} className={className}>
            {displayVal}
        </span>
    );
};

export default LiveMetricCountUp;
