import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/scss/style.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Disable GSAP lagSmoothing for better Lenis integration
gsap.ticker.lagSmoothing(0);

// Initialize Lenis smooth scroll
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1.2,
  touchMultiplier: 2,
  infinite: false,
  smoothTouch: false,
});

// Make lenis instance globally accessible
window.lenis = lenis;

// Disable Lenis on mobile devices
const isMobile = () => window.innerWidth <= 768;
if (isMobile()) {
  lenis.destroy();
}

// Connect Lenis to GSAP ScrollTrigger
function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}

if (!isMobile()) {
  requestAnimationFrame(raf);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
