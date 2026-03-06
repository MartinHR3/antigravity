import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import manifestoImg from '../assets/img_daniel/639764487_17849551320683104_4273853012414652022_n.webp';

gsap.registerPlugin(ScrollTrigger);

const Manifesto = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Parallax effect for the image
            gsap.to(".manifesto-img-inner", {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: ".manifesto-img-container",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Text reveal animation
            gsap.from(".reveal-text", {
                y: 50,
                opacity: 0,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="bg-brand-bg py-20 md:py-32 px-6 md:px-8 text-brand-text/90 flex justify-center w-full">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">

                {/* Text Side */}
                <div className="flex flex-col gap-10 md:gap-12 order-2 lg:order-1">
                    <div className="reveal-text">
                        <h2 className="font-headings text-xl md:text-3xl lg:text-4xl text-white/40 mb-4 line-through decoration-brand-accent/50 decoration-2">
                            La industria pregunta: ¿Cuál es el hit del verano?
                        </h2>
                        <h3 className="font-serif italic text-3xl md:text-5xl lg:text-7xl text-brand-text leading-tight mt-6">
                            Nosotros preguntamos: ¿Qué melodía te salvará hoy?
                        </h3>
                    </div>

                    <div className="reveal-text border-l-2 border-brand-accent pl-4 md:pl-6 mt-4">
                        <p className="font-mono text-brand-accent/80 tracking-widest uppercase text-xs md:text-sm leading-6 md:leading-8">
                            Sonido Auténtico · Pura Energía · Sin Filtros
                        </p>
                    </div>
                </div>

                {/* Image Side with Parallax */}
                <div className="order-1 lg:order-2 manifesto-img-container rounded-3xl md:rounded-[3rem] overflow-hidden h-[45vh] md:h-[60vh] lg:h-[80vh] w-full relative group shadow-2xl shadow-brand-accent/10">
                    <div
                        className="manifesto-img-inner absolute top-[-20%] left-0 w-full h-[140%] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${manifestoImg})` }}
                    ></div>
                    <div className="absolute inset-0 bg-brand-main/40 mix-blend-multiply"></div>
                </div>

            </div>
        </section>
    );
};

export default Manifesto;
