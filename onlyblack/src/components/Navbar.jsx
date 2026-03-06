import { useState, useEffect } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${scrolled
                    ? 'bg-texto/90 backdrop-blur-md text-principal shadow-2xl scale-100 py-3 px-8'
                    : 'bg-transparent text-texto scale-105 py-4 px-6'
                } rounded-full flex items-center justify-between gap-12 border border-transparent ${scrolled ? 'border-principal/10' : ''
                }`}
        >
            <div className="font-outfit font-bold tracking-tighter text-xl uppercase">
                onlyblack
            </div>
            <ul className="hidden md:flex items-center gap-8 font-mono text-sm tracking-widest uppercase">
                <li className="hover:text-acento transition-colors cursor-pointer">Servicios</li>
                <li className="hover:text-acento transition-colors cursor-pointer">Estudio</li>
                <li className="hover:text-acento transition-colors cursor-pointer">Contacto</li>
            </ul>
            <button
                className={`hidden md:block font-mono text-xs px-5 py-2 rounded-full uppercase tracking-wider transition-colors border ${scrolled ? 'border-principal hover:bg-principal hover:text-texto' : 'border-texto hover:bg-texto hover:text-principal'
                    }`}
            >
                Reservar
            </button>
        </nav>
    );
}
