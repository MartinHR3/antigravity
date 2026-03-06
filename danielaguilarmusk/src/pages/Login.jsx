import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin/dashboard');
        } catch (err) {
            console.error(err);
            setError('Credenciales incorrectas o error de conexión.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4 font-mono w-full">
            <div className="w-full max-w-md bg-[#0f172a] p-8 rounded-3xl border border-white/10 shadow-2xl">
                <h1 className="font-headings text-3xl text-brand-text mb-2 text-center">Acceso Privado</h1>
                <p className="text-white/40 mb-8 text-center text-sm">Dashboard de la Gira</p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                    <div>
                        <label className="block text-brand-text text-sm mb-2 opacity-60">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-brand-text text-sm mb-2 opacity-60">Contraseña</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-accent text-brand-bg font-bold uppercase tracking-widest py-4 rounded-xl mt-4 hover:bg-white transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Accediendo...' : 'Entrar'}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="text-white/30 text-xs text-center mt-4 hover:text-white transition-colors"
                    >
                        Volver a la web pública
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
