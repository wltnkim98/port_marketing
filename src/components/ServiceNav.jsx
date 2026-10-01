import React from 'react';
import { NavLink } from 'react-router-dom';

const serviceRoutes = [
    { path: '/services/photography', label: '사진·영상 제작', icon: '📸' },
    { path: '/services/blog', label: '브랜드 블로그', icon: '✍️' },
    { path: '/services/instagram', label: '인스타 관리', icon: '📱' },
    { path: '/services/global-marketing', label: '글로벌 브랜딩', icon: '🌐' },
    { path: '/services/website', label: '웹사이트 제작', icon: '💻' },
    { path: '/services/tester', label: '체험단 마케팅', icon: '🎯' },
];

const ServiceNav = ({ currentPath }) => {
    return (
        <nav className="service-subnav-sticky" aria-label="마케팅 서비스 세부 메뉴">
            <div className="service-subnav-container">
                <ul className="service-subnav-list">
                    {serviceRoutes.map((service) => (
                        <li key={service.path} className="service-subnav-item">
                            <NavLink
                                to={service.path}
                                className={({ isActive }) =>
                                    `service-subnav-link ${isActive || currentPath === service.path ? 'active' : ''}`
                                }
                            >
                                <span className="nav-icon">{service.icon}</span>
                                <span>{service.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default ServiceNav;
