// ========================================
// Authentication Module
// ========================================
const Auth = {
    // Check if user is logged in
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    // Get current user from localStorage
    getUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    // Get JWT token
    getToken: () => {
        return localStorage.getItem('token');
    },

    // Login - store token and user, then redirect
    login: (token, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        // Redirect based on role
        if (user.role === 'admin') {
            window.location.href = '/admin.html';
        } else {
            window.location.href = '/site-collection.html';
        }
    },

    // Logout - clear storage and redirect
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    },

    // Check if user is admin, redirect if not
    checkAdmin: () => {
        const user = Auth.getUser();
        if (!user || user.role !== 'admin') {
            alert('Accès réservé aux administrateurs');
            window.location.href = 'login.html';
            return false;
        }
        return true;
    },

    // Update navigation links based on auth state
    updateNavigation: () => {
        const nav = document.getElementById('navLinks');
        if (!nav) return;

        const user = Auth.getUser();
        let html = '';

        // Common links for all users
        html += `<li><a href="/" onclick="if(typeof showHome==='function'){showHome();return false;}">Accueil</a></li>`;
        html += `<li><a href="#produits">Produits</a></li>`;
        html += `<li><a href="#contact">Contact</a></li>`;

        if (user) {
            // Logged In User
            if (user.role === 'admin') {
                html += `<li><a href="admin.html" style="color: var(--accent); font-weight: 600;">Dashboard Admin</a></li>`;
            }
            // Everyone gets "Mon Profil" link
            html += `<li><a href="profile.html" style="color: var(--primary); font-weight: 500;">👤 Mon Profil</a></li>`;
            html += `<li><a href="#" onclick="Auth.logout(); return false;">Déconnexion (${user.username})</a></li>`;
        } else {
            // Guest - Show Sign In / Sign Up
            html += `<li><a href="login.html">Connexion</a></li>`;
            html += `<li><a href="register.html" class="product-cta" style="padding: 8px 20px; font-size: 0.8rem;">S'inscrire</a></li>`;
        }

        nav.innerHTML = html;
    }
};

// Auto-update navigation on page load
document.addEventListener('DOMContentLoaded', () => {
    Auth.updateNavigation();
});
