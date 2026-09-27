import React from 'react';
import Header from "../components/Header";
import Intro from "../components/Intro";
import Ticker from "../components/Ticker";
import Problem from "../components/Problem";
import Process from "../components/Process";
import Cases from "../components/Cases";
import Ai from "../components/Ai";
import PortfolioSlider from "../components/PortfolioSlider";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const HomeView = () => {
    return (
        <div>
            <Header />
            <Intro />
            <Ticker />
            <Problem />
            <Process />
            <Cases />
            <Ai />
            <PortfolioSlider />
            <Contact />
            <Footer />
        </div>
    );
};

export default HomeView;