export default function Footer() {
    return (
        <footer className="bg-principal text-texto pt-32 pb-12 px-6 rounded-t-[4rem] -mt-16 relative z-30">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16 md:gap-8 mb-24">

                {/* Marca y Estado */}
                <div className="flex flex-col gap-6 max-w-sm">
                    <h2 className="font-outfit font-bold text-4xl uppercase tracking-tighter">onlyblack</h2>
                    <p className="font-serif italic text-xl text-texto/60">
                        El negro no es una opción, es tu única elección.
                    </p>

                    <div className="flex items-center gap-3 mt-4 bg-texto/5 w-max px-4 py-2 rounded-full border border-texto/10">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="font-mono text-xs uppercase tracking-widest text-texto/80">Tienda abierta.</span>
                    </div>
                </div>

                {/* Enlaces de Utilidad */}
                <div className="flex flex-col gap-6">
                    <div className="font-mono text-xs text-texto/40 tracking-widest">MAPA DEL SITIO</div>
                    <ul className="flex flex-col gap-3 font-sans uppercase tracking-wider text-sm">
                        {['Portafolio', 'Blog', 'Reseñas', 'Contacto'].map(link => (
                            <li key={link}>
                                <a href="#" className="hover:text-acento transition-colors flex items-center gap-2 group">
                                    <span className="w-0 h-[1px] bg-acento group-hover:w-4 transition-all duration-300"></span>
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contacto */}
                <div className="flex flex-col gap-6">
                    <div className="font-mono text-xs text-texto/40 tracking-widest">COORDENADAS</div>
                    <ul className="flex flex-col gap-3 font-mono text-sm text-texto/80">
                        <li>C/ Sahara 5 Los Giles</li>
                        <li>Las Palmas</li>
                        <li className="mt-4 hover:text-acento cursor-pointer transition-colors">onlyblack@gmail.com</li>
                        <li className="hover:text-acento cursor-pointer transition-colors">IG: @onlyblack_tatu</li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-8 border-t border-texto/10 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs text-texto/40">
                <div>© {new Date().getFullYear()} ONLYBLACK. TODOS LOS DERECHOS RESERVADOS.</div>
                <div className="tracking-widest">// CÓDIGO Y SANGRE</div>
            </div>
        </footer>
    );
}
