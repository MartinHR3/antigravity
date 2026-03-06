import { Zap } from 'lucide-react';

export default function Plans() {
    const plans = [
        {
            name: 'Pieza Contundente',
            price: '150€',
            desc: 'Tatuaje 25cm. El inicio del camino en la oscuridad.',
            highlight: false
        },
        {
            name: 'Media Manga',
            price: '800€',
            desc: 'Tatuaje Brazo. Sumergiendo el cuerpo en el vacío absoluto.',
            highlight: true
        },
        {
            name: 'Blackout Brazo',
            price: '1000€',
            desc: 'El compromiso final. Saturación máxima, sin retorno.',
            highlight: false
        }
    ];

    return (
        <section className="py-32 px-6 bg-fondo">
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-24 flex flex-col items-center">
                    <Zap className="w-8 h-8 text-acento mb-6" />
                    <h2 className="font-sans font-bold text-5xl md:text-7xl text-texto uppercase tracking-tighter">
                        El Precio <span className="font-serif italic text-texto/60 font-normal">del Dolor</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    {plans.map((plan, i) => (
                        <div
                            key={i}
                            className={`p-10 rounded-[3rem] border transition-transform duration-500 hover:-translate-y-4 ${plan.highlight
                                    ? 'bg-principal border-acento/50 scale-105 shadow-2xl shadow-acento/10 relative z-10 py-16'
                                    : 'bg-fondo border-texto/10 scale-100 hover:border-texto/30'
                                }`}
                        >
                            <div className="font-mono text-sm tracking-widest uppercase mb-12 flex justify-between items-center text-texto/60">
                                <span>0{i + 1} // NIVEL</span>
                                {plan.highlight && <span className="text-acento bg-acento/10 px-3 py-1 rounded-full text-xs">EL RITUAL</span>}
                            </div>

                            <div className="text-5xl md:text-6xl font-serif italic text-texto mb-4">
                                {plan.price}
                            </div>
                            <h3 className="font-sans font-bold text-2xl uppercase tracking-wider mb-6">
                                {plan.name}
                            </h3>

                            <p className="text-texto/60 font-sans leading-relaxed mb-12 h-16">
                                {plan.desc}
                            </p>

                            <button className={`w-full py-5 rounded-full font-mono uppercase tracking-widest text-sm transition-colors border ${plan.highlight
                                    ? 'bg-acento text-texto border-acento hover:bg-transparent hover:text-acento'
                                    : 'bg-transparent text-texto border-texto/20 hover:bg-texto hover:text-principal'
                                }`}>
                                Solicitar Cita
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
