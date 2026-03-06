import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

const Calendario = () => {
    const containerRef = useRef(null);
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'shows'), orderBy('order', 'asc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const showsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setShows(showsData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (loading || shows.length === 0) return;

        let ctx = gsap.context(() => {
            gsap.from(".show-row", {
                y: 20,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "power3.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, [shows, loading]);

    if (loading) {
        return (
            <div className="pt-48 pb-32 px-6 md:px-8 max-w-5xl mx-auto min-h-[90vh] flex flex-col justify-center items-center">
                <div className="w-12 h-12 border-4 border-brand-accent border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="font-mono text-brand-text/50 uppercase text-xs tracking-widest">Conectando con el booking...</p>
            </div>
        );
    }

    return (
        <section ref={containerRef} className="pt-48 pb-32 px-6 md:px-8 max-w-5xl mx-auto min-h-[90vh]">
            <div className="mb-16">
                <h1 className="font-headings text-5xl md:text-7xl text-brand-text mb-4">Agenda</h1>
                <p className="font-mono text-brand-accent text-sm tracking-widest uppercase">
                    // Próximos shows en vivo
                </p>
            </div>

            <div className="flex flex-col gap-4">
                {shows.map((show, idx) => (
                    <div
                        key={idx}
                        className="show-row group flex flex-col md:flex-row justify-between items-start md:items-center p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                        <div className="flex gap-8 items-center mb-6 md:mb-0">
                            <span className="font-mono text-brand-accent text-2xl font-bold w-24">
                                {show.date}
                            </span>
                            <div>
                                <h3 className="font-headings text-2xl text-white mb-1 group-hover:text-brand-accent transition-colors">{show.city}</h3>
                                <p className="font-sans text-white/50">{show.venue}</p>
                            </div>
                        </div>


                    </div>
                ))}
            </div>

            <div className="mt-16 p-8 rounded-3xl bg-brand-main border border-brand-accent/30 flex flex-col items-center text-center">
                <h3 className="font-headings text-2xl text-white mb-4">¿Quieres que toque en tu ciudad?</h3>
                <p className="font-sans text-white/60 mb-6 max-w-md">Envía tu propuesta a mi agencia de booking y miraremos poder montar algo increíble.</p>
                <a href="#" className="font-mono text-sm text-brand-accent underline hover:text-white transition-colors">booking@danielaguilarmusk.com</a>
            </div>
        </section>
    );
};

export default Calendario;
