import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Preloader = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        // Timeline for the splash screen intro
        const tl = gsap.timeline({
            onComplete: () => setIsFinished(true)
        });

        // 1. Text reveals itself slowly
        tl.fromTo(textRef.current,
            { opacity: 0, y: 30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power3.out" }
        )
            // 2. Holds for a second
            .to(textRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.8,
                ease: "power2.in",
                delay: 0.8 // How long it stays visible
            })
            // 3. The whole dark background slides up revealing the website
            .to(containerRef.current, {
                yPercent: -100,
                duration: 1.2,
                ease: "power4.inOut"
            });

        return () => tl.kill();
    }, []);

    // Don't render anything in the strict DOM if it's completely done
    if (isFinished) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-[#020617] flex items-center justify-center flex-col origin-top"
        >
            <div className="overflow-hidden">
                <h1
                    ref={textRef}
                    className="font-headings text-4xl md:text-6xl text-white tracking-widest uppercase"
                >
                    Daniel Aguilar
                </h1>
            </div>

            <div className="absolute bottom-12 w-48 h-px bg-white/10 overflow-hidden">
                <div className="h-full bg-brand-accent animate-[loading_2.5s_ease-in-out_infinite]" />
            </div>

            <style>{`
                @keyframes loading {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
};

export default Preloader;
