import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const navigate = useNavigate();
    const { login, loading } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const urlError = searchParams.get('error');
        if (urlError) {
            setError('Échec de la connexion Google. Vérifiez la configuration console.');
        }
    }, [searchParams]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password) {
            setError('Veuillez remplir tous les champs');
            return;
        }

        const result = await login(formData.email, formData.password);

        if (result.success) {
            try {
                const userDataString = localStorage.getItem('user');
                const userData = userDataString && userDataString !== 'undefined'
                    ? JSON.parse(userDataString)
                    : null;

                if (userData?.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error('Error parsing user data:', error);
                navigate('/');
            }
        } else {
            setError(result.error || 'Identifiants incorrects');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-slate-900 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#e85d04]/10 blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#3b82f6]/10 blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md z-10"
            >
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] px-8 py-10 text-center border-b border-white/5 relative overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            className="w-16 h-16 bg-gradient-to-br from-[#e85d04] to-[#f48c06] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#e85d04]/30 relative z-10"
                        >
                            <span className="text-white font-bold text-3xl">A</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-3xl font-extrabold text-white mb-2 relative z-10"
                        >
                            Connexion
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-slate-400 relative z-10"
                        >
                            Bienvenue sur AzyMarket
                        </motion.p>

                        {/* Header micro-decoration */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.1, 0.2, 0.1]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full -mr-16 -mt-16 blur-2xl"
                        />
                    </div>

                    {/* Form */}
                    <motion.form
                        variants={{
                            animate: { transition: { staggerChildren: 0.1 } }
                        }}
                        initial="initial"
                        animate="animate"
                        onSubmit={handleSubmit}
                        className="px-8 py-10 space-y-6"
                    >
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl flex items-start gap-2"
                            >
                                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{error}</span>
                            </motion.div>
                        )}

                        <motion.div
                            variants={{
                                initial: { opacity: 0, x: -20 },
                                animate: { opacity: 1, x: 0 }
                            }}
                        >
                            <label htmlFor="email" className="block text-sm font-bold text-slate-300 mb-2 ml-1">
                                Email
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#e85d04] transition-colors" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#e85d04] focus:border-transparent transition-all outline-none text-white placeholder-slate-600 hover:bg-slate-900/80"
                                    placeholder="votre@email.com"
                                    required
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            variants={{
                                initial: { opacity: 0, x: -20 },
                                animate: { opacity: 1, x: 0 }
                            }}
                        >
                            <label htmlFor="password" className="block text-sm font-bold text-slate-300 mb-2 ml-1">
                                Mot de passe
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#e85d04] transition-colors" />
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#e85d04] focus:border-transparent transition-all outline-none text-white placeholder-slate-600 hover:bg-slate-900/80"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </motion.div>

                        <motion.button
                            variants={{
                                initial: { opacity: 0, y: 10 },
                                animate: { opacity: 1, y: 0 }
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#e85d04] to-[#f48c06] hover:from-[#dc2f02] hover:to-[#e85d04] text-white font-black shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Connexion en cours...
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" />
                                    Se connecter
                                </>
                            )}
                        </motion.button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-[#1e293b] text-slate-400">Ou continuer avec</span>
                            </div>
                        </div>

                        <a
                            href="http://localhost:8080/api/auth/google/simulate"
                            className="w-full py-3.5 px-6 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-3"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Google
                        </motion.a>

                        <div className="text-center pt-4 border-t border-white/5">
                            <p className="text-slate-400 text-sm">
                                Pas encore de compte ?{' '}
                                <Link to="/register" className="text-[#e85d04] font-bold hover:text-[#f48c06] transition-colors">
                                    Créer un compte
                                </Link>
                            </p>
                        </div>
                    </motion.form>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;

