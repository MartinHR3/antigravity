import gsap from 'gsap';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase.js';

document.addEventListener('DOMContentLoaded', () => {
    const showsContainer = document.getElementById('shows-container');
    const showsLoader = document.getElementById('shows-loader');

    if (!showsContainer || !showsLoader) return;

    const q = query(collection(db, 'shows'), orderBy('order', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const showsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // Hide loader
        showsLoader.classList.add('hidden');
        showsContainer.classList.remove('hidden');

        // Render shows
        showsContainer.innerHTML = '';

        if (showsData.length === 0) {
            showsContainer.innerHTML = '<div class="text-center py-12 text-white/30 font-mono text-sm border border-dashed border-white/10 rounded-xl">No hay fechas programadas actualmente.</div>';
            return;
        }

        showsData.forEach(show => {
            const timeTag = show.time
                ? `<span class="font-mono text-xs bg-brand-accent/10 border border-brand-accent/30 text-brand-accent px-3 py-1 rounded-full whitespace-nowrap">${show.time}</span>`
                : '';

            const showHtml = `
                <div class="show-row opacity-0 translate-y-5 group flex flex-col md:flex-row justify-between items-start md:items-center p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div class="flex gap-8 items-center mb-6 md:mb-0">
                        <span class="font-mono text-brand-accent text-2xl font-bold w-24">
                            ${show.date}
                        </span>
                        <div>
                            <div class="flex items-center gap-3 mb-1">
                                <h3 class="font-headings text-2xl text-white group-hover:text-brand-accent transition-colors">${show.city}</h3>
                                ${timeTag}
                            </div>
                            <p class="font-sans text-white/50">${show.venue}</p>
                        </div>
                    </div>
                </div>
            `;
            showsContainer.insertAdjacentHTML('beforeend', showHtml);
        });

        // Animate new elements
        gsap.to(".show-row", {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "all"
        });
    });
});
