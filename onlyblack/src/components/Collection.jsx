import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoveRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Collection() {
    const containerRef = useRef(null);

    const services = [
        {
            id: '01',
            titleP1: 'Blackout',
            titleP2: 'Implacable',
            desc: 'Cubrimos el pasado. Negro sólido, máxima saturación y dolor garantizado.',
            svg: (
                <svg viewBox="0 0 100 100" className="w-[40vw] h-[40vw] max-w-[400px] absolute right-0 top-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-40 transition-opacity duration-1000 mix-blend-difference">
                    <rect width="100" height="100" fill="currentColor" />
                    <circle cx="50" cy="50" r="40" fill="#000" className="origin-center animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
                </svg>
            )
        },
        {
            id: '02',
            titleP1: 'Realismo',
            titleP2: 'Oscuro',
            desc: 'Sombras llevadas al límite del contraste. Sin luz artificial, solo el vacío y la forma.',
            svg: (
                <svg viewBox="0 0 100 100" className="w-[40vw] h-[40vw] max-w-[400px] absolute right-0 top-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-40 transition-opacity duration-1000 mix-blend-difference">
                    <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="currentColor" strokeWidth="2" className="origin-center animate-[spin_10s_linear_infinite]" />
                    <path d="M50 20 L80 50 L50 80 L20 50 Z" fill="currentColor" />
                </svg>
            )
        },
        {
            id: '03',
            titleP1: 'Brutalismo',
            titleP2: 'Geométrico',
            desc: 'Líneas gruesas, afiladas que cortan visualmente. Estructuras pesadas.',
            svg: (
                <svg viewBox="0 0 100 100" className="w-[40vw] h-[40vw] max-w-[400px] absolute right-0 top-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-40 transition-opacity duration-1000 mix-blend-difference">
                    <rect x="25" y="0" width="10" height="100" fill="currentColor" className="origin-center animate-[pulse_2s_ease-in-out_infinite]" />
                    <rect x="65" y="0" width="10" height="100" fill="currentColor" className="origin-center animate-[pulse_3s_ease-in-out_infinite_alternate]" />
                    <rect x="0" y="45" width="100" height="10" fill="currentColor" />
                </svg>
            )
        }
    ];

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery.matches) return;

        let ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.sticky-card');

            cards.forEach((card, i) => {
                if (i !== cards.length - 1) {
                    gsap.to(card, {
                        scale: 0.9,
                        opacity: 0,
                        y: -50,
                        scrollTrigger: {
                            trigger: cards[i + 1],
                            start: 'top bottom',
                            end: 'top top',
                            scrub: true,
                        }
                    });
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="bg-fondo relative pb-32">
            {services.map((service, i) => (
                <div
                    key={service.id}
                    className="sticky-card sticky top-0 h-[100dvh] w-full flex items-center bg-fondo px-6 z-10 border-t border-texto/5 overflow-hidden group"
                    style={{ zIndex: i + 1 }}
                >
                    {service.svg}
                    <div className="absolute inset-0 bg-gradient-to-r from-fondo via-fondo/80 to-transparent"></div>

                    <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col gap-8">
                        <div className="font-mono text-acento tracking-[0.2em]">{service.id} // EXPERIENCIA</div>

                        <h3 className="flex flex-col leading-[0.8] tracking-tighter">
                            <span className="font-sans font-bold text-6xl md:text-8xl lg:text-[10rem] text-texto uppercase">
                                {service.titleP1}
                            </span>
                            <span className="font-serif italic text-7xl md:text-9xl lg:text-[11rem] text-texto/70 pl-0 md:pl-24">
                                {service.titleP2}
                            </span>
                        </h3>

                        <p className="max-w-md font-sans text-lg text-texto/80 leading-relaxed border-l-2 border-acento pl-6 mt-8">
                            {service.desc}
                        </p>

                        <button className="flex items-center gap-4 text-texto mt-8 group-hover:text-acento transition-colors font-mono uppercase tracking-widest text-sm w-max cursor-pointer">
                            <span>Explorar</span>
                            <MoveRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </div>
            ))}
        </section>
    );
}
