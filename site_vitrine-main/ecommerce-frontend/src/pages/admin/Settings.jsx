import React from 'react';
import { Save, Lock, Bell, Store, Globe } from 'lucide-react';

const Settings = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Paramètres</h1>
                <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                    <Save className="w-4 h-4" />
                    Enregistrer
                </button>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
                {/* Settings Sidebar */}
                <div className="lg:col-span-1 space-y-2">
                    <button className="w-full text-left px-4 py-3 rounded-xl bg-orange-50 text-orange-600 font-semibold flex items-center gap-3">
                        <Store className="w-5 h-5" />
                        Général
                    </button>
                    <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-600 font-medium flex items-center gap-3 transition-colors">
                        <Lock className="w-5 h-5" />
                        Sécurité
                    </button>
                    <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-600 font-medium flex items-center gap-3 transition-colors">
                        <Bell className="w-5 h-5" />
                        Notifications
                    </button>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Store Info */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Informations de la Boutique</h2>
                        <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Nom de la boutique</label>
                                    <input type="text" defaultValue="AzyMarket" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Email de contact</label>
                                    <input type="email" defaultValue="contact@azymarket.com" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Description</label>
                                <textarea rows="3" defaultValue="La meilleure boutique en ligne pour vos achats quotidiens." className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none"></textarea>
                            </div>
                        </div>
                    </div>

                    {/* SEO/Links */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4 flex items-center gap-2">
                            <Globe className="w-5 h-5 text-slate-500" />
                            Réseaux Sociaux
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Facebook</label>
                                <input type="text" placeholder="https://facebook.com/..." className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Instagram</label>
                                <input type="text" placeholder="https://instagram.com/..." className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
