import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const [activeItem, setActiveItem] = useState(0);
    const items = ['Nuevos Singles', 'Videoclips', 'Merch'];

    const [messageIndex, setMessageIndex] = useState(0);
    const messages = ['Grabando nuevo single...', 'Afinando los tonos...', 'Gira Activa'];

    // Rotate items
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveItem((prev) => (prev + 1) % items.length);
            setMessageIndex((prev) => (prev + 1) % messages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [items.length, messages.length]);

    return (
        <section className="bg-brand-bg py-20 md:py-32 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 md:mb-16">
                    <h2 className="font-headings text-3xl md:text-5xl text-brand-text mb-4">Mesa de Mezclas</h2>
                    <p className="font-mono text-brand-accent text-xs md:text-sm tracking-widest uppercase">
            // Estado actual del sistema musical
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Card 1: Classifier */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <h3 className="font-mono text-xs text-white/50 mb-8 uppercase tracking-widest">Canales Activos</h3>
                        <div className="h-24 relative overflow-hidden">
                            <div
                                className="absolute w-full transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                                style={{ transform: `translateY(-${activeItem * (100 / items.length)}%)` }}
                            >
                                {items.map((item, idx) => (
                                    <div key={idx} className="h-24 flex items-center">
                                        <span className={`text-2xl md:text-3xl font-headings ${idx === activeItem ? 'text-brand-text' : 'text-white/30'}`}>
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Live Feed */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm flex flex-col justify-between">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="font-mono text-xs text-white/50 uppercase tracking-widest">Monitor de Estudio</h3>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></div>
                                <span className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">En vivo</span>
                            </div>
                        </div>

                        <div className="font-mono text-sm md:text-base text-brand-text/80 h-16">
                            <span className="mr-2 opacity-50">{'>'}</span>
                            {messages[messageIndex]}
                            <span className="inline-block w-2 h-4 bg-brand-accent ml-1 animate-pulse"></span>
                        </div>
                    </div>

                    {/* Card 3: Action */}
                    <div className="bg-brand-main border border-brand-accent/30 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/10 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>

                        <h3 className="font-mono text-xs text-brand-accent mb-8 uppercase tracking-widest relative z-10">Agenda</h3>

                        <div className="relative z-10">
                            <h4 className="font-headings text-2xl text-white mb-6">Próximos Shows</h4>
                            <button className="w-full py-4 rounded-xl bg-brand-accent/10 text-brand-accent font-mono text-sm uppercase tracking-widest hover:bg-brand-accent hover:text-brand-bg transition-colors border border-brand-accent/20">
                                Ver Fechas de Gira
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Dashboard;
