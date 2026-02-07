// ========================================
// Profile Page JavaScript
// ========================================

// Check if user is logged in
if (!Auth.isAuthenticated()) {
    window.location.href = 'login.html';
}

const user = Auth.getUser();
const token = Auth.getToken();

// Display welcome message
document.getElementById('welcomeMessage').textContent = `Bienvenue, ${user.username} !`;

// Tab switching
function switchTab(tabName) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Add active class to selected tab
    event.target.classList.add('active');
    document.getElementById(tabName).classList.add('active');

    // Load data for the tab
    if (tabName === 'orders') loadOrders();
    if (tabName === 'favorites') loadFavorites();
}

// Make switchTab global
window.switchTab = switchTab;

// ========== PROFILE TAB ==========

// Load profile data
async function loadProfile() {
    try {
        const response = await fetch('/api/profile', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const profile = await response.json();
        document.getElementById('username').value = profile.username;
        document.getElementById('email').value = profile.email;
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}

// Update profile
document.getElementById('profileForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (response.ok) {
            alert('Profil mis à jour avec succès !');
            // Update localStorage user data
            const updatedUser = { ...user, username: data.username, email: data.email };
            localStorage.setItem('user', JSON.stringify(updatedUser));
        } else {
            alert('Erreur: ' + result.error);
        }
    } catch (error) {
        console.error('Error updating profile:', error);
    }
});

// Change password
document.getElementById('passwordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.username = document.getElementById('username').value;
    data.email = document.getElementById('email').value;

    try {
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (response.ok) {
            alert('Mot de passe changé avec succès !');
            e.target.reset();
        } else {
            alert('Erreur: ' + result.error);
        }
    } catch (error) {
        console.error('Error changing password:', error);
    }
});

// ========== ORDERS TAB ==========

async function loadOrders() {
    try {
        const response = await fetch('/api/orders', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const orders = await response.json();
        const container = document.getElementById('ordersList');

        if (orders.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                    </svg>
                    <p>Aucune commande pour le moment</p>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>N° Commande</th>
                        <th>Date</th>
                        <th>Articles</th>
                        <th>Total</th>
                        <th>Statut</th>
                    </tr>
                </thead>
                <tbody>
                    ${orders.map(order => `
                        <tr>
                            <td>#${order.id}</td>
                            <td>${new Date(order.created_at).toLocaleDateString('fr-FR')}</td>
                            <td>${order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}</td>
                            <td>${order.total.toFixed(2)} €</td>
                            <td><span class="status-badge status-${order.status}">${order.status === 'pending' ? 'En attente' : 'Complétée'}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    } catch (error) {
        console.error('Error loading orders:', error);
    }
}

// ========== FAVORITES TAB ==========

async function loadFavorites() {
    try {
        const response = await fetch('/api/favorites', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const favorites = await response.json();
        const container = document.getElementById('favoritesList');

        if (favorites.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    <p>Aucun favori pour le moment</p>
                </div>
            `;
            return;
        }

        container.innerHTML = favorites.map(product => `
            <div class="fav-card">
                <button class="btn-remove" onclick="removeFavorite(${product.id})">❌</button>
                <img src="${product.thumbnail}" alt="${product.name}">
                <div class="fav-card-content">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price} €</p>
                    <a href="/?product=${product.id}" class="product-cta" style="display: inline-block; margin-top: 10px; padding: 8px 16px; font-size: 0.9rem;">Voir le produit</a>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading favorites:', error);
    }
}

async function removeFavorite(productId) {
    if (!confirm('Retirer de vos favoris ?')) return;

    try {
        const response = await fetch(`/api/favorites/${productId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
            loadFavorites();
        }
    } catch (error) {
        console.error('Error removing favorite:', error);
    }
}

window.removeFavorite = removeFavorite;

// Initialize
loadProfile();
Auth.updateNavigation();
