import React from 'react';

const MentionsLegales = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Mentions Légales</h1>

            <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">1. Éditeur du site</h2>
                    <p className="text-gray-600">
                        Le site Vitrine.io est édité par l'entreprise <strong>Vitrine SAS</strong>.<br />
                        Siège social : 123 Avenue des Champs-Élysées, 75008 Paris, France.<br />
                        SIRET : 123 456 789 00000<br />
                        RCS Paris B 123 456 789<br />
                        Capital social : 10 000 €<br />
                        TVA Intracommunautaire : FR 12 123456789
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">2. Directeur de la publication</h2>
                    <p className="text-gray-600">
                        Monsieur Youssef El Ayachi, en qualité de Président.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">3. Hébergement</h2>
                    <p className="text-gray-600">
                        Le site est hébergé par <strong>OVH SAS</strong>.<br />
                        2 rue Kellermann - 59100 Roubaix - France.<br />
                        Téléphone : 1007
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">4. Propriété intellectuelle</h2>
                    <p className="text-gray-600">
                        L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.
                        Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">5. Données personnelles</h2>
                    <p className="text-gray-600">
                        Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant.
                        Pour exercer ce droit, vous pouvez nous contacter via notre formulaire de contact ou depuis votre espace client.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default MentionsLegales;
