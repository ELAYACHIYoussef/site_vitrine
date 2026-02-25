import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useSearchParams } from 'react-router-dom';
import { User, Mail, MapPin, Package, CreditCard, Shield, Edit2, Camera } from 'lucide-react';
import toast from 'react-hot-toast';
import InstagramSyncPanel from '../components/InstagramSyncPanel';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem, scaleIn } from '../hooks/animations';

const UserProfile = () => {
    const { user, deleteAccount, updateUser, token } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [showAvatarPicker, setShowAvatarPicker] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const avatars = [
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop",
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop",
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
    ];

    // All useState calls must be before useEffect (Rules of Hooks)
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        phone: '+33 6 12 34 56 78',
        address: '123 Avenue des Champs-Élysées',
        city: '75008 Paris',
        zipCode: '75008',
        country: 'France'
    });

    useEffect(() => {
        if (searchParams.get('instagram_connected') === 'true') {
            toast.success('Compte Instagram connecté avec succès !');
            setSearchParams({});
        } else if (searchParams.get('error')) {
            toast.error('Erreur lors de la connexion Instagram : ' + searchParams.get('error'));
            setSearchParams({});
        }
    }, [searchParams, setSearchParams]);

    const handleAvatarSelect = async (avatarUrl) => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/users/avatar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ avatarUrl })
            });

            if (response.ok) {
                updateUser({ ...user, avatarUrl });
                setShowAvatarPicker(false);
                toast.success("Avatar mis à jour !");
            } else if (response.status === 401) {
                toast.error("Session expirée. Veuillez vous reconnecter.");
                logout();
            } else {
                toast.error("Échec de la mise à jour");
            }
        } catch (e) {
            toast.error("Erreur réseau");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setIsEditing(false);
            toast.success("Profil mis à jour avec succès !");
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            {/* Avatar Picker Modal */}
            {showAvatarPicker && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Choisir un avatar</h2>
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {avatars.map((url, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleAvatarSelect(url)}
                                    className="w-full aspect-square rounded-2xl overflow-hidden hover:scale-105 hover:ring-4 ring-indigo-500 transition-all"
                                >
                                    <img src={url} alt="Avatar option" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setShowAvatarPicker(false)}
                            className="w-full py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            )}

            <div className="max-w-4xl mx-auto">
                {/* Header Profile Card */}
                <motion.div
                    variants={fadeInUp}
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8 group"
                >
                    <div className="h-32 bg-gradient-to-r from-indigo-600 to-violet-600 relative">
                        <div className="absolute -bottom-16 left-8">
                            <motion.div className="relative group">
                                <div className="w-32 h-32 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center overflow-hidden shadow-lg">
                                    {user?.avatarUrl ? (
                                        <img src={user.avatarUrl} alt="Profil" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-16 h-16 text-slate-400" />
                                    )}
                                </div>
                                <motion.button
                                    onClick={() => setShowAvatarPicker(true)}
                                    className="absolute bottom-0 right-0 p-2 bg-indigo-600 rounded-full text-white shadow-lg hover:bg-indigo-700 transition-colors"
                                >
                                    <Camera className="w-4 h-4" />
                                </motion.button>
                            </motion.div>
                        </div>
                    </div>
                    <div className="pt-20 pb-8 px-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                            <motion.div variants={staggerItem}>
                                <h1 className="text-3xl font-black text-slate-900">{user?.username}</h1>
                                <p className="text-slate-500 flex items-center gap-2 mt-1 font-medium">
                                    <Shield className="w-4 h-4 text-indigo-500" />
                                    Membre depuis 2024 • Client AzyMarket
                                </p>
                            </motion.div>
                            <motion.button
                                variants={staggerItem}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsEditing(!isEditing)}
                                className={`px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${isEditing
                                    ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100'
                                    }`}
                            >
                                <Edit2 className="w-4 h-4" />
                                {isEditing ? 'Annuler' : 'Modifier le profil'}
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Sidebar Stats */}
                    <motion.div variants={fadeInUp} className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                            <h3 className="font-black text-slate-900 mb-4 uppercase text-xs tracking-widest opacity-50">Statistiques</h3>
                            <div className="space-y-4">
                                <motion.div
                                    whileHover={{ x: 5 }}
                                    className="flex items-center justify-between p-4 bg-indigo-50/50 rounded-2xl text-indigo-900 border border-indigo-100/50"
                                >
                                    <div className="flex items-center gap-3">
                                        <Package className="w-5 h-5 opacity-70" />
                                        <span className="font-bold">Commandes</span>
                                    </div>
                                    <span className="font-black text-xl">5</span>
                                </motion.div>
                                <motion.div
                                    whileHover={{ x: 5 }}
                                    className="flex items-center justify-between p-4 bg-emerald-50/50 rounded-2xl text-emerald-900 border border-emerald-100/50"
                                >
                                    <div className="flex items-center gap-3">
                                        <CreditCard className="w-5 h-5 opacity-70" />
                                        <span className="font-bold">Dépensé</span>
                                    </div>
                                    <span className="font-black text-xl">342 €</span>
                                </motion.div>
                            </div>
                        </div>

                        {/* Quick Menu */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <h3 className="font-black text-slate-900 mb-4 uppercase text-xs tracking-widest opacity-50">Compte</h3>
                            <ul className="space-y-1">
                                {['Notifications', 'Sécurité', 'Moyens de paiement'].map((item, idx) => (
                                    <motion.li
                                        key={item}
                                        whileHover={{ x: 4, backgroundColor: '#f8fafc' }}
                                        className="text-slate-600 font-bold cursor-pointer transition-all p-3 rounded-xl flex items-center justify-between group"
                                    >
                                        {item}
                                        <Edit2 className="w-3 h-3 opacity-0 group-hover:opacity-30 transition-opacity" />
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Main Form */}
                    <motion.div variants={fadeInUp} className="md:col-span-2 space-y-8">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                            <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                <div className="p-2 bg-indigo-50 rounded-xl">
                                    <User className="w-5 h-5 text-indigo-600" />
                                </div>
                                Informations Personnelles
                            </h2>

                            <motion.form
                                initial="initial"
                                animate="animate"
                                variants={staggerContainer}
                                onSubmit={handleSave}
                                className="space-y-6"
                            >
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Nom d'utilisateur</label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all disabled:bg-slate-50 disabled:text-slate-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                disabled={true} // Email usually immutable
                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Téléphone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all disabled:bg-slate-50 disabled:text-slate-500"
                                        />
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 pt-6">
                                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-indigo-600" />
                                        Adresse de livraison
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-sm font-medium text-slate-700">Rue</label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all disabled:bg-slate-50 disabled:text-slate-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">Ville</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all disabled:bg-slate-50 disabled:text-slate-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">Code Postal</label>
                                            <input
                                                type="text"
                                                name="zipCode"
                                                value={formData.zipCode}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all disabled:bg-slate-50 disabled:text-slate-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Linked Accounts - Instagram Sync */}
                                <div className="border-t border-slate-100 pt-6">
                                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <Camera className="w-5 h-5 text-indigo-600" />
                                        Comptes liés
                                    </h3>
                                    <InstagramSyncPanel />
                                </div>
                                {/* Danger Zone */}
                                <div className="border-t-2 border-red-100 mt-12 pt-8">
                                    <h3 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
                                        <Shield className="w-5 h-5" />
                                        Zone de Danger
                                    </h3>
                                    <p className="text-sm text-slate-500 mb-4">
                                        La suppression de votre compte est irréversible. Toutes vos données personnelles seront effacées conformément au RGPD.
                                        Vos commandes passées seront conservées à des fins comptables uniquement.
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="button"
                                        onClick={async () => {
                                            if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) {
                                                const result = await deleteAccount();
                                                if (result.success) {
                                                    toast.success("Compte supprimé avec succès");
                                                    // Redirection handled by AuthContext cleanup or wrapper
                                                } else {
                                                    toast.error(result.error);
                                                }
                                            }
                                        }}
                                        className="px-6 py-3 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 font-medium transition-colors"
                                    >
                                        Supprimer mon compte
                                    </motion.button>
                                </div>
                            </motion.form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
