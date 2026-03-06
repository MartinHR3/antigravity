import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out px-6 py-4 rounded-3xl md:rounded-full flex flex-col md:flex-row items-center justify-between w-[90%] max-w-5xl
        ${isScrolled || isMobileMenuOpen
                    ? 'bg-[#0f172a]/95 backdrop-blur-md border border-white/10 text-brand-text shadow-lg'
                    : 'bg-transparent text-white'}`}
        >
            <div className="flex justify-between items-center w-full md:w-auto">
                <Link to="/" className="font-headings font-bold text-xl tracking-wide">
                    Daniel Aguilar
                </Link>
                <button
                    className="md:hidden p-1 text-white hover:text-brand-accent transition-colors"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Desktop Navigation */}
            <div className={`hidden md:flex items-center gap-8 font-mono text-sm uppercase tracking-wider`}>
                <Link to="/" className="hover:text-brand-accent transition-colors">Música</Link>
                <Link to="/biografia" className="hover:text-brand-accent transition-colors">Biografía</Link>
                <Link to="/calendario" className="hover:text-brand-accent transition-colors">Calendario</Link>
            </div>

            {/* Mobile Navigation Dropdown */}
            <div
                className={`md:hidden flex flex-col items-center gap-6 font-mono text-sm uppercase tracking-wider w-full overflow-hidden transition-all duration-300 ease-in-out
                ${isMobileMenuOpen ? 'max-h-64 opacity-100 pt-8 pb-4' : 'max-h-0 opacity-0 py-0'}`}
            >
                <Link to="/" className="hover:text-brand-accent transition-colors w-full text-center py-2">Música</Link>
                <Link to="/biografia" className="hover:text-brand-accent transition-colors w-full text-center py-2">Biografía</Link>
                <Link to="/calendario" className="hover:text-brand-accent transition-colors w-full text-center py-2">Calendario</Link>
            </div>
        </nav>
    );
};

export default Navbar;
