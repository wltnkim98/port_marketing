import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { links, pageLinks } from '../constants';
import { getLenis } from "../utils/smooth";

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [expandedDropdowns, setExpandedDropdowns] = useState({});
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const h = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', h);
        return () => window.removeEventListener('scroll', h);
    }, []);

    // 메인 페이지 진입 및 해시 변경 시 해당 섹션으로 부드럽게 스크롤
    useEffect(() => {
        if (location.pathname === '/') {
            if (location.hash) {
                const id = location.hash.replace('#', '');
                const scrollToElement = () => {
                    const el = document.getElementById(id);
                    const lenis = getLenis();

                    if (el && lenis) {
                        lenis.scrollTo(el);
                    }
                };

                // DOM 렌더링 타이밍을 고려하여 지연 후 스크롤
                const timer = setTimeout(scrollToElement, 100);
                return () => clearTimeout(timer);
            }
        }
    }, [location.pathname, location.hash]);

    const handleSectionClick = (e, id) => {
        e.preventDefault();
        if (location.pathname === '/') {
            const el = document.getElementById(id);
            if (el) {
                const lenis = getLenis();

                if (lenis) {
                    lenis.scrollTo(el);
                }

                window.history.pushState(null, '', `/#${id}`);
            }
        } else {
            // 다른 페이지에 있을 때 메인 페이지로 이동하면서 해시 전달
            navigate(`/#${id}`);
        }
    };

    const handleLogoClick = (e) => {
        if (location.pathname === '/') {
            e.preventDefault();
            window.location.reload();
        }
    };

    const toggleMobileMenu = () => {
        console.log('Toggle mobile menu, current state:', mobileMenuOpen);
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const toggleDropdown = (path) => {
        setExpandedDropdowns(prev => ({
            ...prev,
            [path]: !prev[path]
        }));
    };

    return (
        <>
            <nav className={scrolled ? 'scrolled' : ''}>
                <Link to="/" className="nav-logo" onClick={handleLogoClick}>
                    Market<span>With</span>
                </Link>

                <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                    <span className={mobileMenuOpen ? 'open' : ''}></span>
                    <span className={mobileMenuOpen ? 'open' : ''}></span>
                    <span className={mobileMenuOpen ? 'open' : ''}></span>
                </button>

                <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                    <li className="mobile-menu-logo">
                        <Link to="/" className="nav-logo" onClick={(e) => {
                            handleLogoClick(e);
                            closeMobileMenu();
                        }}>
                            Market<span>With</span>
                        </Link>
                    </li>
                    {pageLinks.slice(0, -1).map(l => (
                        <li
                            key={l.path}
                            className={l.children ? 'nav-item-with-dropdown' : ''}
                        >
                            {l.children ? (
                                <>
                                    <Link
                                        to={l.path}
                                        className="nav-link-with-children"
                                        onClick={(e) => {
                                            toggleDropdown(l.path);
                                            closeMobileMenu();
                                        }}
                                    >
                                        {l.label}
                                    </Link>
                                    <ul className={`nav-dropdown ${expandedDropdowns[l.path] !== false ? 'expanded' : 'collapsed'}`}>
                                        {l.children.map(child => (
                                            <li key={child.path}>
                                                <Link to={child.path} onClick={closeMobileMenu}>{child.label}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            ) : (
                                <Link to={l.path} onClick={closeMobileMenu}>{l.label}</Link>
                            )}
                        </li>
                    ))}

                    {links.map(l => (
                        <li key={l.id}>
                            <a
                                href={`/#${l.id}`}
                                onClick={(e) => {
                                    handleSectionClick(e, l.id);
                                    closeMobileMenu();
                                }}
                            >
                                {l.label}
                            </a>
                        </li>
                    ))}

                    {pageLinks.slice(-1).map(l => (
                        <li key={l.path}>
                            <Link to={l.path} onClick={closeMobileMenu}>{l.label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={closeMobileMenu}></div>
        </>
    );
};

export default Header;
