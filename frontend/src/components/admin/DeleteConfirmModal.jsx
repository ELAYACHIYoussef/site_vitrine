import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, productName, isDeleting = false }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay with Blur */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-scaleIn">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
                    disabled={isDeleting}
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Icon & Title */}
                <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">
                            Confirmer la suppression
                        </h3>
                        <p className="text-sm text-slate-500">
                            Cette action est irréversible
                        </p>
                    </div>
                </div>

                {/* Message */}
                <div className="ml-16 mb-6">
                    <p className="text-slate-600">
                        Êtes-vous sûr de vouloir supprimer le produit{' '}
                        <span className="font-semibold text-slate-900">"{productName}"</span> ?
                    </p>
                    <p className="text-sm text-slate-500 mt-2">
                        Toutes les données associées seront définitivement perdues.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={isDeleting}
                        className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 
                                 text-slate-700 font-medium rounded-lg transition
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 
                                 text-white font-medium rounded-lg transition
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
                    >
                        {isDeleting ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Suppression...
                            </span>
                        ) : (
                            'Supprimer définitivement'
                        )}
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { 
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to { 
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
                .animate-scaleIn {
                    animation: scaleIn 0.2s ease-out;
                }
            `}</style>
        </div>
    );
};

export default DeleteConfirmModal;
