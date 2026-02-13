import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../api';
import { UserPlus, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

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

        // Validation
        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Veuillez remplir tous les champs');
            return;
        }

        if (formData.password.length < 6) {
            setError('Le mot de passe doit contenir au moins 6 caractères');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        setLoading(true);

        try {
            await authService.register({
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.error || 'Une erreur est survenue lors de l\'inscription');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-slate-900 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#e85d04]/10 blur-[100px]" />
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#3b82f6]/10 blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md z-10"
            >
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] px-8 py-10 text-center border-b border-white/5">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#e85d04] to-[#f48c06] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#e85d04]/30">
                            <span className="text-white font-bold text-3xl">A</span>
                        </div>
                        <h2 className="text-3xl font-extrabold text-white mb-2">Inscription</h2>
                        <p className="text-slate-400">Créez votre compte AzyMarket</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="px-8 py-10 space-y-6">
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

                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl flex items-start gap-2"
                            >
                                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">Inscription réussie ! Redirection...</span>
                            </motion.div>
                        )}

                        <div>
                            <label htmlFor="username" className="block text-sm font-bold text-slate-300 mb-2">
                                Nom d'utilisateur
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#e85d04] focus:border-transparent transition-all outline-none text-white placeholder-slate-600"
                                    placeholder="johndoe"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-slate-300 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#e85d04] focus:border-transparent transition-all outline-none text-white placeholder-slate-600"
                                    placeholder="votre@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-bold text-slate-300 mb-2">
                                Mot de passe
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#e85d04] focus:border-transparent transition-all outline-none text-white placeholder-slate-600"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-bold text-slate-300 mb-2">
                                Confirmer le mot de passe
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#e85d04] focus:border-transparent transition-all outline-none text-white placeholder-slate-600"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || success}
                            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#e85d04] to-[#f48c06] hover:from-[#dc2f02] hover:to-[#e85d04] text-white font-bold shadow-lg shadow-orange-500/20 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Inscription en cours...
                                </>
                            ) : (
                                <>
                                    <UserPlus className="w-5 h-5" />
                                    S'inscrire
                                </>
                            )}
                        </button>

                        <div className="text-center pt-4 border-t border-white/5">
                            <p className="text-slate-400 text-sm">
                                Vous avez déjà un compte ?{' '}
                                <Link to="/login" className="text-[#e85d04] font-bold hover:text-[#f48c06] transition-colors">
                                    Se connecter
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;

