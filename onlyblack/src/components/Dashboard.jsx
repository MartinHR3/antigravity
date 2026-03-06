import { useState, useEffect } from 'react';
import { Activity, Clock, CalendarDays } from 'lucide-react';

export default function Dashboard() {
    const [activeService, setActiveService] = useState(0);
    const services = ['Blackout Total', 'Realismo Oscuro', 'Minimalismo Brutal'];

    const [feedState, setFeedState] = useState(0);
    const feedMessages = ['Sala abierta...', 'Sala cerrada...', 'En proceso a nueva agenda...'];

    useEffect(() => {
        // Rotator para Tarjeta 1
        const serviceInterval = setInterval(() => {
            setActiveService((prev) => (prev + 1) % services.length);
        }, 3000);

        // Rotator para Tarjeta 2
        const feedInterval = setInterval(() => {
            setFeedState((prev) => (prev + 1) % feedMessages.length);
        }, 4500);

        return () => {
            clearInterval(serviceInterval);
            clearInterval(feedInterval);
        };
    }, []);

    return (
        <section className="py-32 px-6 bg-fondo">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 flex items-center gap-4">
                    <Activity className="w-6 h-6 text-acento" />
                    <h2 className="font-mono text-sm tracking-widest uppercase text-texto/60">
                        Sala de Control del Estudio
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Tarjeta 1 - Clasificador */}
                    <div className="bg-principal p-8 rounded-3xl border border-texto/5 flex flex-col justify-between h-[350px]">
                        <div className="font-mono text-xs text-texto/40 tracking-widest">01 // SISTEMA</div>
                        <div className="relative h-24 overflow-hidden mt-8">
                            {services.map((item, index) => (
                                <div
                                    key={index}
                                    className={`absolute w-full font-serif italic text-4xl text-texto transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${index === activeService ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                                        }`}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            {services.map((_, i) => (
                                <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i === activeService ? 'bg-acento' : 'bg-texto/10'}`} />
                            ))}
                        </div>
                    </div>

                    {/* Tarjeta 2 - Feed en vivo */}
                    <div className="bg-principal p-8 rounded-3xl border border-texto/5 flex flex-col justify-between h-[350px]">
                        <div className="flex justify-between items-center">
                            <div className="font-mono text-xs text-texto/40 tracking-widest">02 // TRANSMISIÓN</div>
                            <Activity className="w-4 h-4 text-acento animate-pulse" />
                        </div>

                        <div className="font-mono text-texto/80 mt-8 mb-auto">
                            <span className="text-acento">{'>'}</span> {feedMessages[feedState]}
                            <span className="inline-block w-2 h-4 bg-texto ml-2 animate-pulse"></span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-acento animate-ping relative">
                                <div className="absolute inset-0 bg-acento rounded-full animate-pulse"></div>
                            </div>
                            <span className="font-mono text-xs uppercase text-texto/60 tracking-wider">
                                Vínculo Establecido
                            </span>
                        </div>
                    </div>

                    {/* Tarjeta 3 - Protocolo (Calendario) */}
                    <div className="bg-principal p-8 rounded-3xl border border-texto/5 flex flex-col justify-between h-[350px]">
                        <div className="flex justify-between items-center">
                            <div className="font-mono text-xs text-texto/40 tracking-widest">03 // ACCESO</div>
                            <Clock className="w-4 h-4 text-texto/40" />
                        </div>

                        <div className="grid grid-cols-7 gap-1 mt-auto mb-8 font-mono text-xs text-center">
                            {['D', 'L', 'M', 'X', 'J', 'V', 'S'].map((day, i) => (
                                <div key={i} className="text-texto/30 pb-2">{day}</div>
                            ))}
                            {Array.from({ length: 14 }).map((_, i) => (
                                <div
                                    key={`day-${i}`}
                                    className={`aspect-square rounded flex items-center justify-center transition-colors ${i === 5 || i === 8 ? 'bg-acento/20 text-acento outline outline-1 outline-acento' : 'bg-texto/5 text-texto/20'
                                        }`}
                                >
                                    {i % 31 + 1}
                                </div>
                            ))}
                        </div>

                        <button className="w-full bg-texto text-principal font-sans font-bold py-4 rounded-xl hover:bg-acento hover:text-texto transition-colors uppercase tracking-widest text-sm flex items-center justify-center gap-2 group">
                            <CalendarDays className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            Ver Disponibilidad
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
