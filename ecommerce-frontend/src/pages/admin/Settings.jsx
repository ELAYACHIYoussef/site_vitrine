import React, { useState, useEffect } from 'react';
import { Save, Lock, Bell, Store, Globe, Loader } from 'lucide-react';
import { getGlobalConfig, updateGlobalConfig } from '../../api/configService';
import toast from 'react-hot-toast';

const Settings = () => {
    const [config, setConfig] = useState({
        STORE_NAME: '',
        CONTACT_EMAIL: '',
        STORE_DESCRIPTION: '',
        facebook: '',
        instagram: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadConfig();
    }, []);

    const loadConfig = async () => {
        const data = await getGlobalConfig();
        if (data) {
            setConfig(prev => ({ ...prev, ...data }));
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConfig(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateGlobalConfig(config);
            toast.success("Paramètres enregistrés avec succès !");
            // Optional: trigger a global refresh event if using context
        } catch (error) {
            toast.error("Erreur lors de l'enregistrement");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-20 text-center"><Loader className="animate-spin mx-auto text-indigo-600" /></div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Paramètres</h1>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50"
                >
                    {saving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {saving ? 'Enregistrement...' : 'Enregistrer'}
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
                                    <input
                                        type="text"
                                        name="STORE_NAME"
                                        value={config.STORE_NAME}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Email de contact</label>
                                    <input
                                        type="email"
                                        name="CONTACT_EMAIL"
                                        value={config.CONTACT_EMAIL}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Description</label>
                                <textarea
                                    rows="3"
                                    name="STORE_DESCRIPTION"
                                    value={config.STORE_DESCRIPTION}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none"
                                ></textarea>
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
                                <input
                                    type="text"
                                    name="facebook"
                                    value={config.facebook}
                                    onChange={handleChange}
                                    placeholder="https://facebook.com/..."
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Instagram</label>
                                <input
                                    type="text"
                                    name="instagram"
                                    value={config.instagram}
                                    onChange={handleChange}
                                    placeholder="https://instagram.com/..."
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
