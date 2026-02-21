import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, CreditCard, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../hooks/animations';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
            <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.1 }}
                className="container mx-auto px-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <motion.div variants={fadeInUp} className="space-y-6">
                        <Link to="/" className="text-2xl font-black text-white flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-lg">V</span>
                            VITRINE.IO
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Votre destination numéro un pour la mode, la technologie et bien plus encore. Qualité, rapidité et service client exceptionnel sont nos engagements.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all duration-300">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={fadeInUp}>
                        <h4 className="text-white font-bold text-lg mb-6">Liens Rapides</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link to="/products" className="hover:text-indigo-400 transition-colors">Nos Produits</Link></li>
                            <li><Link to="/mentions-legales" className="hover:text-indigo-400 transition-colors">Mentions Légales</Link></li>
                            <li><Link to="/cgv" className="hover:text-indigo-400 transition-colors">CGV</Link></li>
                            <li><Link to="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link></li>
                        </ul>
                    </motion.div>

                    {/* Customer Support */}
                    <motion.div variants={fadeInUp}>
                        <h4 className="text-white font-bold text-lg mb-6">Service Client</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-indigo-500 mt-0.5" />
                                <span>123 Avenue des Champs-Élysées,<br />75008 Paris, France</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-indigo-500" />
                                <span>+33 1 23 45 67 89</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-indigo-500" />
                                <span>support@vitrine.io</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Newsletter */}
                    <motion.div variants={fadeInUp}>
                        <h4 className="text-white font-bold text-lg mb-6">Newsletter</h4>
                        <p className="text-slate-400 text-sm mb-4">Inscrivez-vous pour recevoir nos offres exclusives et codes promo.</p>
                        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Votre email..."
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                />
                                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 rounded-md text-white hover:bg-indigo-700 transition-colors">
                                    <Send size={16} />
                                </button>
                            </div>
                            <p className="text-xs text-slate-500">
                                En vous inscrivant, vous acceptez notre politique de confidentialité.
                            </p>
                        </form>
                    </motion.div>
                </div>

                <motion.div variants={fadeInUp} className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        &copy; {new Date().getFullYear()} VITRINE.IO. Tous droits réservés.
                    </p>
                    <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Payment Icons Placeholder */}
                        <div className="h-8 w-12 bg-slate-700 rounded rounded-sm"></div>
                        <div className="h-8 w-12 bg-slate-700 rounded rounded-sm"></div>
                        <div className="h-8 w-12 bg-slate-700 rounded rounded-sm"></div>
                        <div className="h-8 w-12 bg-slate-700 rounded rounded-sm"></div>
                    </div>
                </motion.div>
            </motion.div>
        </footer>
    );
};

export default Footer;
