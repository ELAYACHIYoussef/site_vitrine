import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConcent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConcent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConcent', 'declined');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50 animate-slide-up">
            <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">🍪 Utilisation des Cookies</h3>
                    <p className="text-gray-300 text-sm">
                        Nous utilisons des cookies pour améliorer votre expérience sur Vitrine.io.
                        En continuant votre navigation, vous acceptez notre politique de confidentialité
                        et l'utilisation de cookies tiers pour la mesure d'audience.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleDecline}
                        className="px-4 py-2 text-sm text-gray-300 hover:text-white border border-gray-600 rounded hover:bg-gray-800 transition-colors"
                    >
                        Continuer sans accepter
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-6 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded transition-colors"
                    >
                        Tout Accepter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
