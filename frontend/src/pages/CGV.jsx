import React from 'react';

const CGV = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Conditions Générales de Vente (CGV)</h1>

            <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
                <p className="text-sm text-gray-500 italic mb-6">Dernière mise à jour : 15 Février 2026</p>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">Article 1 - Objet</h2>
                    <p className="text-gray-600">
                        Les présentes conditions régissent les ventes par la société Vitrine SAS de produits électroniques et accessoires sur le site Vitrine.io.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">Article 2 - Prix</h2>
                    <p className="text-gray-600">
                        Les prix de nos produits sont indiqués en euros toutes taxes comprises (TTC), sauf indication contraire et hors frais de traitement et d'expédition.
                        Toutes les commandes quelle que soit leur origine sont payables en euros.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">Article 3 - Commandes</h2>
                    <p className="text-gray-600">
                        Vous pouvez passer commande sur Internet via notre site Vitrine.io.
                        Les informations contractuelles sont présentées en langue française et feront l'objet d'une confirmation au plus tard au moment de la validation de votre commande.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">Article 4 - Validation de votre commande</h2>
                    <p className="text-gray-600">
                        Toute commande figurant sur le site Internet Vitrine.io suppose l'adhésion aux présentes Conditions Générales.
                        Toute confirmation de commande entraîne votre adhésion pleine et entière aux présentes conditions générales de vente, sans exception ni réserve.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">Article 5 - Droit de rétractation</h2>
                    <p className="text-gray-600">
                        Conformément aux dispositions de l'article L.121-21 du Code de la Consommation, vous disposez d'un délai de rétractation de <strong>14 jours</strong> à compter de la réception de vos produits pour exercer votre droit de rétractation sans avoir à justifier de motifs ni à payer de pénalité.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">Article 6 - Livraison</h2>
                    <p className="text-gray-600">
                        Les produits sont livrés à l'adresse de livraison indiquée au cours du processus de commande, dans le délai indiqué sur la page de validation de la commande.
                        En cas de retard d'expédition, un mail vous sera adressé pour vous informer d'une éventuelle conséquence sur le délai de livraison.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default CGV;
