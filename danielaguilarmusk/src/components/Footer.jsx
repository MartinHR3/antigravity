import React from 'react';
import { ArrowRight } from 'lucide-react';

const Footer = () => {
    return (
        <>
            {/* Newsletter VIP Section */}
            <section className="bg-brand-bg py-32 px-8 flex justify-center w-full min-h-[50vh] items-center">
                <div className="max-w-4xl text-center">
                    <h2 className="font-headings text-4xl md:text-5xl lg:text-7xl text-brand-text mb-6">
                        Únete al Círculo VIP
                    </h2>
                    <p className="font-mono text-brand-accent/80 text-sm md:text-base mb-12 uppercase tracking-widest max-w-xl mx-auto line-height-relaxed">
            // Material exclusivo. Eventos secretos. Antes que nadie.
                    </p>

                    <form className="relative max-w-md mx-auto flex items-center group">
                        <input
                            type="email"
                            placeholder="tu@email.com"
                            className="w-full bg-white/5 border border-white/10 rounded-full py-5 px-8 pr-16 text-brand-text font-mono focus:outline-none focus:border-brand-accent transition-colors"
                        />
                        <button
                            type="submit"
                            className="absolute right-2 p-3 bg-brand-accent text-brand-bg rounded-full hover:bg-white transition-colors magnetic-hover"
                        >
                            <ArrowRight size={20} />
                        </button>
                    </form>
                </div>
            </section>

            {/* Main Footer */}
            <footer className="bg-[#0f172a] rounded-t-[4rem] text-brand-text py-20 px-8 relative overflow-hidden">
                {/* Glowing aura at top */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-32 bg-brand-accent blur-[120px] opacity-10 rounded-full"></div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">

                    {/* Brand Info */}
                    <div className="lg:col-span-2">
                        <h3 className="font-headings font-bold text-3xl mb-6">danielaguilarmusk</h3>
                        <p className="font-sans opacity-60 max-w-sm mb-8">
                            Músico y compositor. Sonido auténtico y vibrante en la intersección del club nocturno y el escenario principal.
                        </p>

                        {/* Status Indicator */}
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-black/30 rounded-full border border-white/5 backdrop-blur-md">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                            <span className="font-mono text-xs text-white/80 uppercase tracking-widest">
                                Componiendo en Estudio
                            </span>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-mono text-xs text-brand-accent uppercase tracking-widest mb-6">Plataformas</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="font-sans opacity-70 hover:opacity-100 hover:text-brand-accent transition-colors">Spotify</a></li>
                            <li><a href="#" className="font-sans opacity-70 hover:opacity-100 hover:text-brand-accent transition-colors">Apple Music</a></li>
                            <li><a href="#" className="font-sans opacity-70 hover:opacity-100 hover:text-brand-accent transition-colors">YouTube</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-mono text-xs text-brand-accent uppercase tracking-widest mb-6">Conexión</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="font-sans opacity-70 hover:opacity-100 hover:text-brand-accent transition-colors">Instagram</a></li>
                            <li><a href="#" className="font-sans opacity-70 hover:opacity-100 hover:text-brand-accent transition-colors">Twitter / X</a></li>
                            <li><a href="#" className="font-sans opacity-70 hover:opacity-100 hover:text-brand-accent transition-colors">Contacto</a></li>
                        </ul>
                    </div>

                </div>

                <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono opacity-40">
                    <p>© {new Date().getFullYear()} danielaguilarmusk. Todos los derechos reservados.</p>
                    <p>Diseño 1:1 Píxel Perfecto</p>
                </div>
            </footer>
        </>
    );
};

export default Footer;
