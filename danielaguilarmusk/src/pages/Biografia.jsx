import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Importing images directly for Vite base URL resolution
import imgBio1 from '../assets/img_daniel/621735894_17843042145683104_9075920315092747962_n.webp';
import imgBio2 from '../assets/img_daniel/639764487_17849551320683104_4273853012414652022_n.webp';

const Biografia = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".bio-text", {
                y: 30,
                opacity: 0,
                stagger: 0.15,
                duration: 1,
                ease: "power3.out"
            });
            gsap.from(".bio-img", {
                scale: 0.95,
                opacity: 0,
                duration: 1.5,
                ease: "power2.out",
                delay: 0.3
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="pt-48 pb-32 px-6 md:px-8 max-w-6xl mx-auto min-h-screen">
            <div className="mb-16 md:mb-24">
                <h1 className="bio-text font-headings text-5xl md:text-8xl text-brand-text mb-6">Orígenes</h1>
                <p className="bio-text font-mono text-brand-accent text-sm md:text-base tracking-widest uppercase">
                    // De Venezuela a Las Palmas. 10 años cocinando un sueño.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
                <div className="bio-img rounded-[3rem] overflow-hidden aspect-[4/5] relative">
                    <img
                        src={imgBio1}
                        alt="Daniel Aguilar Retrato"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-brand-main/20 mix-blend-multiply pointer-events-none"></div>
                </div>

                <div className="flex flex-col gap-8 text-lg font-sans text-brand-text/70 leading-relaxed">
                    <p className="bio-text text-2xl text-brand-text font-headings italic">
                        "La música empezó para mí como un refugio, pero rápido me di cuenta de que era el único camino que realmente quería seguir."
                    </p>
                    <p className="bio-text">
                        Nacido en Venezuela, la música siempre fue el latido de fondo en la vida de Daniel. Sin embargo, fue
                        hace 10 años, al instalarse en Las Palmas de Gran Canaria, cuando esa pasión empezó a tomar forma de
                        ambición profesional.
                    </p>
                    <p className="bio-text">
                        En Canarias encontró una escena vibrante que mezclaba mundos, ritmos calientes con melodías electrónicas frías.
                        Rodeado de ese contraste, Daniel comenzó a esculpir su identidad como músico y creativo.
                    </p>
                    <p className="bio-text">
                        Su sueño es claro: ser un músico icónico. No por la fama vacía, sino por lograr llevar la música que suena en su cabeza a millones de personas.
                        Es la incesante búsqueda del sonido perfecto, el beat que hace temblar el suelo del club pero que también sirve para mirar por la ventanilla del coche por la noche.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="flex flex-col gap-8 text-lg font-sans text-brand-text/70 leading-relaxed order-2 lg:order-1">
                    <h2 className="bio-text font-headings text-4xl text-brand-text mb-4">El Sonido Actual</h2>
                    <p className="bio-text">
                        El proyecto "danielaguilarmusk" no se limita a un solo género, pero cabalga con una fuerte influencia del
                        electropop, los sintes nocturnos y un feeling muy cinematográfico.
                    </p>
                    <p className="bio-text">
                        Cada canción está escrita, producida y ejecutada desde una aproximación indie pero con calidad de artista major.
                        Buscando siempre ese coro memorable y esa atmósfera densa donde es fácil perderse.
                    </p>
                </div>

                <div className="bio-img rounded-3xl md:rounded-[3rem] border border-white/10 overflow-hidden aspect-[16/10] lg:aspect-square relative order-1 lg:order-2">
                    <img
                        src={imgBio2}
                        alt="Daniel Aguilar Live"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
};

export default Biografia;
