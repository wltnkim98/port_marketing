//import logo from '../public/logo.svg';
import './App.css';
import React from 'react';
import {useEffect} from "react";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import { getLenis } from "./utils/smooth";
import smooth from "./utils/smooth";
import HomeView from "./views/HomeView";
import AboutView from "./views/AboutView";
import LocationView from "./views/LocationView";
import ConsultView from "./views/ConsultView";
import PhotographyServiceView from "./views/PhotographyServiceView";
import BlogServiceView from "./views/BlogServiceView";
import InstagramServiceView from "./views/InstagramServiceView";
import WebsiteServiceView from "./views/WebsiteServiceView";
import TesterServiceView from "./views/TesterServiceView";
import GlobalMarketingServiceView from "./views/GlobalMarketingServiceView";
import ServiceView from "./views/ServiceView";
import PortfolioView from "./views/PortfolioView";
import QaView from "./views/QaView";
import AdminLogin from "./views/AdminLogin";
import AdminDashboard from "./views/AdminDashboard";
import FloatingConsultButton from "./components/FloatingConsultButton";
import ScrollToTopButton from "./components/ScrollToTopButton";


// ── Scroll reveal ──
function useScrollReveal() {
    const location = useLocation();

    const setupObserver = () => {
        // Reset all visible classes first
        const els = document.querySelectorAll('.fade-up');
        els.forEach(el => el.classList.remove('visible'));

        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                } else {
                    e.target.classList.remove('visible');
                }
            });
        }, { threshold: 0.12 });
        els.forEach(el => obs.observe(el));
        return obs;
    };

    //Scroll to top
    useEffect(() => {
        // 메인 페이지에서 해시가 있으면
        // Header의 해시 스크롤 처리가 담당
        if (location.pathname === '/' && location.hash) {
            return;
        }

        const lenis = getLenis();

        if (lenis) {
            lenis.scrollTo(0, {
                immediate: true,
            });
        } else {
            window.scrollTo(0, 0);
        }
    }, [location.pathname]);

    // Run on mount (handles page refresh)
    useEffect(() => {
        const timer = setTimeout(() => {
            const obs = setupObserver();
            return () => obs.disconnect();
        }, 200);
        return () => clearTimeout(timer);
    }, []);

    // Run on route change
    useEffect(() => {
        const rafId = requestAnimationFrame(() => {
            const obs = setupObserver();
            return () => obs.disconnect();
        });
        return () => cancelAnimationFrame(rafId);
    }, [location.pathname]);

    //Smooth 처리
    useEffect(() => {
        const cleanup = smooth();

        return cleanup;
    }, []);
}

const AppRoutes = () => {
    useScrollReveal();

    return (
        <Routes>
            <Route path="/about" element={<AboutView />} />
            <Route path="/about/location" element={<LocationView />} />
            <Route path="/" element={<HomeView />} />
            <Route path="/consult" element={<ConsultView />} />
            <Route path="/services" element={<ServiceView />} />
            <Route path="/services/photography" element={<PhotographyServiceView />} />
            <Route path="/services/blog" element={<BlogServiceView />} />
            <Route path="/services/instagram" element={<InstagramServiceView />} />
            <Route path="/services/website" element={<WebsiteServiceView />} />
            <Route path="/services/tester" element={<TesterServiceView />} />
            <Route path="/services/global-marketing" element={<GlobalMarketingServiceView />} />
            <Route path="/portfolio" element={<PortfolioView />} />
            <Route path="/qa" element={<QaView />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
    );
};

const App = () => {
    return (
        <BrowserRouter>
            <AppRoutes />
            <ScrollToTopButton />
            <FloatingConsultButton />
        </BrowserRouter>
    );
};

export default App;
