import Lenis from "@studio-freight/lenis";

let lenis = null;

const smooth = () => {
    lenis = new Lenis({
        duration: 0.5,
        easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    let rafId;

    const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
        lenis = null;
    };
};

export const getLenis = () => lenis;

export default smooth;