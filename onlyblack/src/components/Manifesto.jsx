import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
    const containerRef = useRef(null);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery.matches) return;

        let ctx = gsap.context(() => {
            // Paralaje de imagen
            gsap.to('.manifesto-bg', {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });

            // Animación de texto de convención vs propuesta
            gsap.from('.manifesto-text-1', {
                opacity: 0.1,
                x: -50,
                scrollTrigger: {
                    trigger: '.manifesto-text-1',
                    start: 'top 80%',
                    end: 'bottom 50%',
                    scrub: 1
                }
            });

            gsap.from('.manifesto-text-2', {
                opacity: 0,
                y: 40,
                scrollTrigger: {
                    trigger: '.manifesto-text-2',
                    start: 'top 75%',
                    end: 'top 40%',
                    scrub: 1
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-[120vh] w-full overflow-hidden flex items-center justify-center bg-principal">
            <div
                className="manifesto-bg absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 scale-125"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1590246814883-58845b733ce5?q=80&w=2600&auto=format&fit=crop")' }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-fondo via-transparent to-fondo"></div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32 flex flex-col gap-12 md:gap-24">
                <h2 className="manifesto-text-1 font-serif italic text-4xl md:text-7xl lg:text-8xl text-texto/30 max-w-4xl tracking-tighter mix-blend-difference">
                    La competencia pregunta: "¿Qué dibujito quieres hoy?"
                </h2>

                <div className="self-end flex flex-col items-end gap-12 max-w-5xl">
                    <h3 className="manifesto-text-2 font-sans font-bold text-5xl md:text-7xl lg:text-9xl text-right text-texto uppercase tracking-tighter leading-[0.9]">
                        Nosotros dictamos: "El negro no es una opción, es tu única elección."
                    </h3>

                    <div className="font-mono text-acento uppercase tracking-[0.3em] text-xs md:text-sm">
                        Cero tonos grises · Rabia pura · Compromiso absoluto
                    </div>
                </div>
            </div>
        </section>
    );
}
