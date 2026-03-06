import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out px-8 py-4 rounded-full flex items-center justify-between w-[90%] max-w-5xl
        ${isScrolled
                    ? 'bg-white/10 backdrop-blur-md border border-white/10 text-brand-text shadow-lg'
                    : 'bg-transparent text-white'}`}
        >
            <div className="font-headings font-bold text-xl tracking-wide">
                danielaguilarmusk
            </div>

            <div className="hidden md:flex items-center gap-8 font-mono text-sm uppercase tracking-wider">
                <a href="#music" className="hover:text-brand-accent transition-colors">Música</a>
                <a href="#tour" className="hover:text-brand-accent transition-colors">Tour</a>
                <a href="#store" className="hover:text-brand-accent transition-colors">Merch</a>
            </div>

            <button className={`px-6 py-2 rounded-full font-sans font-medium transition-all duration-300 magnetic-hover
        ${isScrolled ? 'bg-brand-accent text-brand-bg hover:bg-white' : 'bg-white text-brand-main hover:bg-brand-accent hover:text-white'}`}>
                Escuchar
            </button>
        </nav>
    );
};

export default Navbar;
