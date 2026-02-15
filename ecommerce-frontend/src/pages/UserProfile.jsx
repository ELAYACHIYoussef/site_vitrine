import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { User, Mail, MapPin, Package, CreditCard, Shield, Edit2, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

const UserProfile = () => {
    const { user, deleteAccount } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    // Mock data for display - in real app, fetch from API
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        phone: '+33 6 12 34 56 78',
        address: '123 Avenue des Champs-Élysées',
        city: '75008 Paris',
        zipCode: '75008',
        country: 'France'
    });

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
            <div className="max-w-4xl mx-auto">
                {/* Header Profile Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
                    <div className="h-32 bg-gradient-to-r from-indigo-600 to-violet-600 relative">
                        <div className="absolute -bottom-16 left-8">
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center overflow-hidden shadow-lg">
                                    <User className="w-16 h-16 text-slate-400" />
                                </div>
                                <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 rounded-full text-white shadow-lg hover:bg-indigo-700 transition-colors">
                                    <Camera className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="pt-20 pb-8 px-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">{user?.username}</h1>
                                <p className="text-slate-500 flex items-center gap-2 mt-1">
                                    <Shield className="w-4 h-4 text-indigo-500" />
                                    Membre depuis 2024 • Client AzyMarket
                                </p>
                            </div>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${isEditing
                                    ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'
                                    }`}
                            >
                                <Edit2 className="w-4 h-4" />
                                {isEditing ? 'Annuler' : 'Modifier le profil'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Sidebar Stats */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <h3 className="font-bold text-slate-800 mb-4">Statistiques</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-xl text-indigo-900">
                                    <div className="flex items-center gap-3">
                                        <Package className="w-5 h-5" />
                                        <span className="font-medium">Commandes</span>
                                    </div>
                                    <span className="font-bold text-lg">5</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl text-green-900">
                                    <div className="flex items-center gap-3">
                                        <CreditCard className="w-5 h-5" />
                                        <span className="font-medium">Dépensé</span>
                                    </div>
                                    <span className="font-bold text-lg">342 €</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Menu (visual only for now) */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <h3 className="font-bold text-slate-800 mb-4">Compte</h3>
                            <ul className="space-y-2 text-slate-600">
                                <li className="hover:text-indigo-600 cursor-pointer transition-colors p-2 hover:bg-slate-50 rounded-lg">Notifications</li>
                                <li className="hover:text-indigo-600 cursor-pointer transition-colors p-2 hover:bg-slate-50 rounded-lg">Sécurité</li>
                                <li className="hover:text-indigo-600 cursor-pointer transition-colors p-2 hover:bg-slate-50 rounded-lg">Moyens de paiement</li>
                            </ul>
                        </div>
                    </div>

                    {/* Main Form */}
                    <div className="md:col-span-2">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <User className="w-5 h-5 text-indigo-600" />
                                Informations Personnelles
                            </h2>

                            <form onSubmit={handleSave} className="space-y-6">
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

                                )}
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
                                    <button
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
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default UserProfile;
