//import logo from '../public/logo.svg';
import './App.css';
import React from 'react';
import {useEffect} from "react";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import HomeView from "./views/HomeView";
import AboutUsView from "./views/AboutUsView";
import CompanyIntroView from "./views/CompanyIntroView";
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

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
}

const AppRoutes = () => {
    useScrollReveal();

    return (
        <Routes>
            <Route path="/about/company" element={<CompanyIntroView />} />
            <Route path="/about/aboutus" element={<AboutUsView />} />
            <Route path="/about/location" element={<LocationView />} />
            <Route path="/" element={<HomeView />} />
            <Route path="/support/consult" element={<ConsultView />} />
            <Route path="/services" element={<ServiceView />} />
            <Route path="/services/photography" element={<PhotographyServiceView />} />
            <Route path="/services/blog" element={<BlogServiceView />} />
            <Route path="/services/instagram" element={<InstagramServiceView />} />
            <Route path="/services/website" element={<WebsiteServiceView />} />
            <Route path="/services/tester" element={<TesterServiceView />} />
            <Route path="/services/global-marketing" element={<GlobalMarketingServiceView />} />
            <Route path="/portfolio" element={<PortfolioView />} />
            <Route path="/support/qa" element={<QaView />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
    );
};

const App = () => {
    // Scroll to top on page load/refresh
    useEffect(() => {
        // Disable browser scroll restoration
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        // Force scroll to top with delay to ensure DOM is ready
        const scrollToTop = () => {
            window.scrollTo(0, 0);
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        };

        scrollToTop();
        const timer = setTimeout(scrollToTop, 100);
        const timer2 = setTimeout(scrollToTop, 300);

        return () => {
            clearTimeout(timer);
            clearTimeout(timer2);
        };
    }, []);

    return (
        <BrowserRouter>
            <AppRoutes />
            <ScrollToTopButton />
            <FloatingConsultButton />
        </BrowserRouter>
    );
};

export default App;
