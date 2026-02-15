import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import { authService } from '../api';

const OAuth2RedirectHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const error = params.get('error');

        if (token) {
            localStorage.setItem('token', token);

            // Fetch user profile
            const fetchUser = async () => {
                try {
                    const response = await authService.getProfile();
                    const user = response.data;
                    localStorage.setItem('user', JSON.stringify(user));
                    toast.success("Connexion Google réussie !");
                    // Force reload to update AuthContext
                    window.location.href = '/';
                } catch (err) {
                    console.error("Error fetching user profile:", err);
                    toast.error("Erreur lors de la récupération du profil");
                    navigate('/login');
                }
            };

            fetchUser();
        } else {
            toast.error(error || "Échec de l'authentification Google");
            navigate('/login');
        }
    }, [location, navigate]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
            <Loader className="w-12 h-12 animate-spin text-amber-500 mb-4" />
            <p className="text-lg font-medium">Authentification via Google...</p>
        </div>
    );
};

export default OAuth2RedirectHandler;
