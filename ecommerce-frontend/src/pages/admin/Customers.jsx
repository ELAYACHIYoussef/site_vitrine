import React from 'react';
import { Users, Mail, Phone, Calendar } from 'lucide-react';

const Customers = () => {
    // Dummy data for visual purposes until backend endpoint exists
    const customers = [
        { id: 1, name: "Jean Dupont", email: "jean.dupont@example.com", joined: "12 Fév 2024", orders: 3, totalSpent: "145.50 €" },
        { id: 2, name: "Marie Martin", email: "marie.m@example.com", joined: "10 Fév 2024", orders: 1, totalSpent: "59.90 €" },
        { id: 3, name: "Pierre Durand", email: "p.durand@example.com", joined: "05 Fév 2024", orders: 5, totalSpent: "450.00 €" },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Clients</h1>
            <p className="text-slate-500 mb-8">Liste des clients enregistrés</p>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-700">Client</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Email</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Date d'inscription</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Commandes</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Total Dépensé</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {customers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                                {customer.name.charAt(0)}
                                            </div>
                                            <span className="font-medium text-slate-900">{customer.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{customer.email}</td>
                                    <td className="px-6 py-4 text-slate-600">{customer.joined}</td>
                                    <td className="px-6 py-4 text-slate-600">
                                        <span className="inline-block px-2 py-1 bg-slate-100 rounded text-xs font-semibold">{customer.orders}</span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-green-600">{customer.totalSpent}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Customers;
