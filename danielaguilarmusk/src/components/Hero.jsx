import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import heroImg from '../assets/img_daniel/621783423_17843042169683104_9103661063162591784_n.webp';

const Hero = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Timeline for staggered reveal
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            tl.from(".hero-text", {
                y: 100,
                opacity: 0,
                duration: 1.5,
                stagger: 0.2,
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

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-[100dvh] flex items-end pb-32 overflow-hidden">
            {/* Background Image with heavy elegant gradient overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
                style={{
                    backgroundImage: `url(${heroImg})`,
                }}
            />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-brand-main via-brand-main/80 to-transparent" />
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-brand-main/90 via-transparent to-transparent mix-blend-multiply" />

            {/* Content */}
            <div className="container relative z-20 px-8 mx-auto max-w-7xl">
                <div className="max-w-3xl">
                    <p className="hero-tag font-mono text-brand-accent text-sm md:text-base tracking-widest uppercase mb-6 drop-shadow-md">
            // Canciones en vivo. Corazón y sintetizadores.
                    </p>

                    <h1 className="flex flex-col mb-10 overflow-hidden leading-tight text-brand-text">
                        <span className="hero-text font-headings font-bold text-4xl md:text-7xl xl:text-8xl tracking-tight text-white/90">
                            El sonido de una
                        </span>
                        <span className="hero-text font-serif italic font-light text-5xl md:text-8xl xl:text-9xl text-white ml-0 md:ml-12 drop-shadow-xl mt-[-5px] md:mt-[-10px]">
                            nueva era.
                        </span>
                    </h1>

                    <div className="hero-btn mt-12 flex gap-4">
                        <a href="#spotify" className="group relative overflow-hidden rounded-full bg-white text-brand-main px-8 py-4 font-sans font-bold text-lg tracking-wide transition-all magnetic-hover shadow-xl hover:shadow-brand-accent/20 border border-white">
                            <span className="relative z-10">Escúchame en Spotify</span>
                            <div className="absolute inset-0 h-full w-full bg-brand-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-0"></div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
