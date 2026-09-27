import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { links, pageLinks } from '../constants';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [expandedDropdowns, setExpandedDropdowns] = useState({});
    const navRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 60;
            setScrolled(isScrolled);
            if (isScrolled) {
                document.body.classList.add('header-scrolled');
            } else {
                document.body.classList.remove('header-scrolled');
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.classList.remove('header-scrolled');
        };
    }, []);

    // Keep sticky elements positioned directly below the rendered header.
    // ResizeObserver also follows the padding transition when the header shrinks.
    useLayoutEffect(() => {
        const nav = navRef.current;
        if (!nav) return undefined;

        const setHeaderHeight = () => {
            document.documentElement.style.setProperty('--header-height', `${nav.offsetHeight}px`);
        };

        setHeaderHeight();
        const observer = new ResizeObserver(setHeaderHeight);
        observer.observe(nav);

        return () => observer.disconnect();
    }, []);

    useLayoutEffect(() => {
        if (navRef.current) {
            document.documentElement.style.setProperty('--header-height', `${navRef.current.offsetHeight}px`);
        }
    }, [scrolled]);

    // 메인 페이지 진입 및 해시 변경 시 해당 섹션으로 부드럽게 스크롤
    useEffect(() => {
        if (location.pathname === '/') {
            if (location.hash) {
                const id = location.hash.replace('#', '');
                const scrollToElement = () => {
                    const el = document.getElementById(id);
                    if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
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
                el.scrollIntoView({ behavior: 'smooth' });
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
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const toggleDropdown = (key) => {
        setExpandedDropdowns(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const renderNavItem = (item) => {
        const itemKey = item.path || item.label;
        const isExpanded = expandedDropdowns[itemKey] !== false;

        if (item.children) {
            return (
                <li
                    key={itemKey}
                    className="nav-item-with-dropdown"
                >
                    {item.path ? (
                        <Link
                            to={item.path}
                            className={`nav-link-with-children ${isExpanded ? '' : 'collapsed'}`}
                            onClick={(e) => {
                                if (window.innerWidth <= 1030) {
                                    e.preventDefault();
                                    toggleDropdown(itemKey);
                                } else {
                                    closeMobileMenu();
                                }
                            }}
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <button
                            type="button"
                            className={`nav-link-with-children ${isExpanded ? '' : 'collapsed'}`}
                            onClick={(e) => {
                                e.preventDefault();
                                toggleDropdown(itemKey);
                            }}
                        >
                            {item.label}
                        </button>
                    )}
                    <ul className={`nav-dropdown ${isExpanded ? 'expanded' : 'collapsed'}`}>
                        {item.children.map(child => (
                            <li key={child.path}>
                                <Link to={child.path} onClick={closeMobileMenu}>
                                    {child.label}
                                    {child.badge && <span className="nav-dropdown-badge">{child.badge}</span>}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
            );
        }

        return (
            <li key={itemKey}>
                <Link to={item.path} onClick={closeMobileMenu}>
                    {item.label}
                </Link>
            </li>
        );
    };

    return (
        <>
            <nav ref={navRef} className={scrolled ? 'scrolled' : ''}>
                <Link to="/" className="nav-logo" onClick={handleLogoClick}>
                    Market<span>With</span>
                </Link>

                <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="메뉴 열기">
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
                    {pageLinks.slice(0, -1).map(renderNavItem)}

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

                    {pageLinks.slice(-1).map(renderNavItem)}
                </ul>
            </nav>

            <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={closeMobileMenu}></div>
        </>
    );
};

export default Header;
