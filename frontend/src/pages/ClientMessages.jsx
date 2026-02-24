import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getOrdersByUser } from '../api/orderService';
import { Mail, MessageSquare, Bell, Send, CheckCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import toast from 'react-hot-toast';

const ClientMessages = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [contactForm, setContactForm] = useState({ subject: '', message: '' });

    useEffect(() => {
        if (user) {
            generateSystemMessages();
        }
    }, [user]);

    const generateSystemMessages = async () => {
        try {
            // 1. Fetch Orders to generate "fake" notifications
            const orders = await getOrdersByUser(user.id);

            const systemMsgs = orders.flatMap(order => {
                const msgs = [];
                // Message creation commande
                msgs.push({
                    id: `order-${order.id}-created`,
                    type: 'system',
                    title: `Commande #${order.orderNumber || order.id} reçue`,
                    content: `Nous avons bien reçu votre commande d'un montant de ${order.totalAmount?.toFixed(2)} €. Elle est en attente de validation.`,
                    date: new Date(order.createdAt),
                    read: true,
                    icon: Clock,
                    color: 'text-blue-500 bg-blue-50'
                });

                // Simulate other messages based on status
                if (order.status === 'CONFIRMED' || order.status === 'SHIPPED') {
                    msgs.push({
                        id: `order-${order.id}-confirmed`,
                        type: 'system',
                        title: `Commande #${order.orderNumber || order.id} validée !`,
                        content: `Bonne nouvelle ! Votre commande a été validée par notre équipe. Elle sera bientôt expédiée.`,
                        date: new Date(new Date(order.createdAt).getTime() + 3600000), // +1 hour
                        read: false,
                        icon: CheckCircle,
                        color: 'text-green-500 bg-green-50'
                    });
                }
                return msgs;
            });

            // 2. Add Welcome Message
            systemMsgs.push({
                id: 'welcome',
                type: 'system',
                title: 'Bienvenue sur AzyMarket !',
                content: `Ravi de vous compter parmi nous, ${user.username}. N'hésitez pas à nous contacter via le formulaire ci-dessous si vous avez des questions.`,
                date: new Date(user.createdAt || Date.now()), // Fallback
                read: true,
                icon: Bell,
                color: 'text-indigo-500 bg-indigo-50'
            });

            // Sort by date desc
            setMessages(systemMsgs.sort((a, b) => b.date - a.date));

        } catch (error) {
            console.error("Error generating messages", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        toast.loading("Envoi en cours...");
        setTimeout(() => {
            toast.dismiss();
            toast.success("Message envoyé au support !");
            setContactForm({ subject: '', message: '' });

            // Add fake "Sent" message
            setMessages(prev => [{
                id: Date.now(),
                type: 'user',
                title: `Envoi: ${contactForm.subject}`,
                content: contactForm.message,
                date: new Date(),
                read: true,
                icon: Send,
                color: 'text-slate-500 bg-slate-50'
            }, ...prev]);

        }, 1500);
    };

    if (loading) return <div className="p-20 text-center">Chargement...</div>;

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-5xl grid lg:grid-cols-3 gap-8">

                {/* Inbox List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                            <Bell className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Notifications</h1>
                            <p className="text-slate-500">Suivi de commandes et messages du système</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        {messages.length === 0 ? (
                            <div className="p-12 text-center text-slate-500">Aucun message pour le moment.</div>
                        ) : (
                            <div className="divide-y divide-slate-100">
                                {messages.map(msg => (
                                    <div key={msg.id} className={`p-6 hover:bg-slate-50 transition-colors ${!msg.read ? 'bg-indigo-50/30' : ''}`}>
                                        <div className="flex gap-4">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${msg.color}`}>
                                                <msg.icon size={24} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className={`font-bold text-slate-900 ${!msg.read && 'text-indigo-700'}`}>{msg.title}</h3>
                                                    <span className="text-xs text-slate-400 whitespace-nowrap">
                                                        {format(msg.date, 'dd MMM HH:mm', { locale: fr })}
                                                    </span>
                                                </div>
                                                <p className="text-slate-600 text-sm leading-relaxed">{msg.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 sticky top-24">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <MessageSquare className="text-indigo-600" />
                            Contacter le Support
                        </h2>
                        <form onSubmit={handleSendMessage} className="space-y-4">
                            <div>
                                <label className="text-sm font-bold text-slate-700 block mb-2">Sujet</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    placeholder="Ex: Problème de commande"
                                    value={contactForm.subject}
                                    onChange={e => setContactForm({ ...contactForm, subject: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-bold text-slate-700 block mb-2">Message</label>
                                <textarea
                                    required
                                    rows="5"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                                    placeholder="Comment pouvons-nous vous aider ?"
                                    value={contactForm.message}
                                    onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                                ></textarea>
                            </div>
                            <button type="submit" className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                                <Send size={18} />
                                Envoyer le message
                            </button>
                        </form>
                        <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                            <p className="text-xs text-slate-400">
                                Support disponible 7j/7 de 9h à 18h.<br />
                                Email: support@azymarket.com
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ClientMessages;
