import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // Hero Animations
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.from(".hero-text", {
            y: 100,
            opacity: 0,
            duration: 1.5,
            stagger: 0.2,
            delay: 0.5 // Wait slightly for preloader to finish
        })
            .from(".hero-btn", {
                y: 20,
                opacity: 0,
                duration: 1,
            }, "-=1")
            .from(".hero-tag", {
                opacity: 0,
                x: -20,
                duration: 1,
            }, "-=0.8");
    }

    // Manifesto Animations
    const manifestoSection = document.getElementById('manifesto-section');
    if (manifestoSection) {
        gsap.from(".reveal-text", {
            y: 50,
            opacity: 0,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: manifestoSection,
                start: "top 70%",
            }
        });
    }
});
