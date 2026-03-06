import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
    const heroRef = useRef(null);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery.matches) return;

        let ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.to('.hero-overlay', {
                opacity: 0.8,
                duration: 2,
                ease: 'power2.inOut'
            })
                .from('.hero-title-1', {
                    y: 100,
                    opacity: 0,
                    duration: 1.2,
                    ease: 'power3.out'
                }, '-=1')
                .from('.hero-title-2', {
                    y: 100,
                    opacity: 0,
                    duration: 1.2,
                    ease: 'power3.out'
                }, '-=1')
                .from('.hero-tagline', {
                    opacity: 0,
                    x: -20,
                    duration: 1
                }, '-=0.6')
                .from('.hero-cta', {
                    y: 40,
                    opacity: 0,
                    duration: 1,
                    ease: 'back.out(1.7)'
                }, '-=0.6');
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="relative w-full h-[100dvh] overflow-hidden flex items-end">
            {/* Background Image - inferred macro/dark texture */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=2600&auto=format&fit=crop")' }}
            >
                {/* Overlay gradient pesado */}
                <div className="hero-overlay absolute inset-0 bg-gradient-to-t from-principal via-principal/80 to-transparent opacity-100"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24 md:pb-32 flex flex-col md:flex-row justify-between items-end gap-12">

                <div className="flex flex-col gap-4 max-w-4xl">
                    <div className="hero-tagline font-mono text-acento text-sm md:text-base tracking-widest uppercase mb-4">
            // Negro o nada.
                    </div>

                    <h1 className="flex flex-col gap-1 md:gap-2 leading-[0.85]">
                        <span className="hero-title-1 font-sans font-bold text-5xl md:text-8xl lg:text-[10rem] text-texto tracking-tighter uppercase">
                            La tinta como
                        </span>
                        <span className="hero-title-2 font-serif italic text-6xl md:text-9xl lg:text-[11rem] text-texto/80 pr-4">
                            condena.
                        </span>
                    </h1>
                </div>

                <button className="hero-cta group relative overflow-hidden rounded-full bg-texto text-principal font-sans font-bold uppercase tracking-widest text-sm px-10 py-5 transition-transform hover:scale-105 flex-shrink-0">
                    <span className="relative z-10">Empieza tu tatuaje</span>
                    <div className="absolute inset-0 bg-acento translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"></div>
                </button>
            </div>
        </section>
    );
}
