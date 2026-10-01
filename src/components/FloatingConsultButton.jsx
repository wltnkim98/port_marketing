import React from 'react';
import { Link } from 'react-router-dom';

const FloatingConsultButton = () => {
    return (
        <Link to="/support/consult" className="floating-consult-btn">
            <span className="floating-btn-icon">💬</span>
            <span className="floating-btn-text">상담신청</span>
        </Link>
    );
};

export default FloatingConsultButton;
