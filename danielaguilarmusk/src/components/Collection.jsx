import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Disc3, Mic2, Shirt } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        num: "01",
        namePart1: "Último",
        namePart2: "Álbum",
        desc: "Explora mi nueva música. Ondas sonoras y fluidez de sintetizadores.",
        Icon: Disc3,
        color: "brand-accent"
    },
    {
        num: "02",
        namePart1: "Gira de",
        namePart2: "Conciertos",
        desc: "Siente la energía en vivo. Luces, humo y conexión real.",
        Icon: Mic2,
        color: "brand-text"
    },
    {
        num: "03",
        namePart1: "Store &",
        namePart2: "Merchandising",
        desc: "Lleva mi estilo contigo. Diseño minimalista y exclusivo.",
        Icon: Shirt,
        color: "brand-main"
    }
];

const Collection = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.sticky-card');

            cards.forEach((card, index) => {
                if (index === cards.length - 1) return; // Skip last card

                gsap.to(card, {
                    scale: 0.9,
                    filter: "blur(20px)",
                    opacity: 0.5,
                    ease: "none",
                    scrollTrigger: {
                        trigger: card,
                        start: "top top",
                        end: "bottom top",
                        pin: true,
                        pinSpacing: false,
                        scrub: true,
                    }
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative bg-brand-bg w-full">
            {services.map((svc, i) => (
                <div
                    key={i}
                    className={`sticky-card sticky top-0 h-screen w-full flex items-center justify-center p-8
            ${i % 2 === 0 ? 'bg-brand-bg text-brand-text' : 'bg-brand-main text-white'}
          `}
                    style={{ zIndex: i }}
                >
                    <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Content Side */}
                        <div className="flex flex-col">
                            <span className="font-mono text-5xl md:text-7xl opacity-20 mb-8 font-bold">
                                {svc.num}
                            </span>

                            <h2 className="flex flex-col mb-8 overflow-hidden leading-tight">
                                <span className="font-headings font-bold text-4xl md:text-6xl tracking-tight">
                                    {svc.namePart1}
                                </span>
                                <span className={`font-serif italic font-light text-5xl md:text-8xl mt-[-5px] ${i % 2 !== 0 ? 'text-brand-accent' : ''}`}>
                                    {svc.namePart2}.
                                </span>
                            </h2>

                            <p className="font-sans text-xl md:text-2xl opacity-70 mb-12 max-w-lg leading-relaxed">
                                {svc.desc}
                            </p>

                            <button className={`w-fit px-8 py-4 rounded-full font-sans font-bold text-sm tracking-widest uppercase transition-all magnetic-hover shadow-xl border
                ${i % 2 === 0 ? 'bg-white text-brand-main hover:bg-brand-accent hover:border-brand-accent hover:text-brand-bg border-white/20' : 'bg-transparent border-white/30 text-white hover:bg-white hover:text-brand-main'}`}>
                                Descubrir más
                            </button>
                        </div>

                        {/* Visual SVG Artefact Side */}
                        <div className="flex justify-center items-center h-[400px] relative">
                            <div className={`absolute w-[120%] h-[120%] bg-${svc.color}/5 rounded-full blur-[100px] animate-pulse`} />
                            <div className={`p-16 rounded-[3rem] border backdrop-blur-sm
                ${i % 2 === 0 ? 'bg-white/5 border-white/10' : 'bg-black/20 border-black/10'}`}>
                                <svc.Icon size={120} strokeWidth={1} className={`animate-bounce duration-1000 ${i % 2 !== 0 ? 'text-brand-text' : 'text-brand-accent'}`} />
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </section>
    );
};

export default Collection;
