// ========================================
// Admin Panel JavaScript
// ========================================
const API_URL = '/api/products';

// Check admin access on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is admin
    if (!Auth.checkAdmin()) {
        return; // Redirect happens in checkAdmin()
    }

    loadProducts();
    loadStats();

    // Leboncoin Sync Form Handler
    document.getElementById('leboncoinSyncForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const url = document.getElementById('leboncoinUrl').value;
        const html = document.getElementById('leboncoinHtml').value;
        const statusDiv = document.getElementById('syncStatus');

        statusDiv.style.display = 'block';
        statusDiv.style.background = '#e3f2fd';
        statusDiv.style.color = '#0d47a1';
        statusDiv.textContent = 'Synchronisation en cours...';

        try {
            const response = await fetch('/api/admin/leboncoin-sync', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Auth.getToken()}`
                },
                body: JSON.stringify({ url, html })
            });

            const result = await response.json();
            if (response.ok) {
                statusDiv.style.background = '#e8f5e9';
                statusDiv.style.color = '#2e7d32';
                statusDiv.innerHTML = `<strong>Succès !</strong> ${result.message}<br><small>${result.suggestion || ''}</small>`;
                loadProducts();
                loadStats();
            } else {
                statusDiv.style.background = '#ffebee';
                statusDiv.style.color = '#c62828';
                statusDiv.textContent = 'Erreur : ' + (result.error || response.statusText);
            }
        } catch (error) {
            statusDiv.style.background = '#ffebee';
            statusDiv.style.color = '#c62828';
            statusDiv.textContent = 'Erreur réseau : ' + error.message + '. Vérifiez que le serveur est bien lancé.';
            console.error('Sync error:', error);
        }
    });

    // Add Product Form Handler
    document.getElementById('addProductForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const token = Auth.getToken();

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                alert('Produit ajouté avec succès !');
                e.target.reset();
                loadProducts();
            } else {
                const error = await response.json();
                alert('Erreur: ' + (error.message || error.error));
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Erreur de connexion au serveur');
        }
    });
});

async function loadProducts() {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();

        const tbody = document.getElementById('productsList');
        tbody.innerHTML = products.map(p => `
            <tr>
                <td><img src="${p.thumbnail}" alt="${p.name}"></td>
                <td>${p.name}</td>
                <td>${p.categoryLabel || p.category}</td>
                <td>${p.price} €</td>
                <td>
                    <button class="btn-delete" onclick="deleteProduct(${p.id})">Supprimer</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading products:', error);
        alert('Impossible de charger les produits. Vérifiez que le serveur est lancé (npm start).');
    }
}

async function deleteProduct(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;

    const token = Auth.getToken();

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            loadProducts();
        } else {
            const error = await response.json();
            alert('Erreur: ' + (error.error || 'Suppression impossible'));
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Erreur de connexion');
    }
}

async function loadStats() {
    try {
        const response = await fetch('/api/admin/stats', {
            headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
        });
        const stats = await response.json();

        document.getElementById('statTotalClients').textContent = stats.totalClients;
        document.getElementById('statTotalViews').textContent = stats.totalViews;
        document.getElementById('statTotalOrders').textContent = stats.totalOrders;

        // Render Top Products
        const topProductsList = document.getElementById('topProductsList');
        if (topProductsList && stats.topProducts) {
            topProductsList.innerHTML = stats.topProducts.map((p, idx) => `
                <div style="display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #eee; background: ${idx % 2 === 0 ? '#fcfcfc' : 'white'};">
                    <span style="font-weight: 500;">${idx + 1}. ${p.name}</span>
                    <span style="color: var(--accent); font-weight: 600;">${p.views} vues</span>
                </div>
            `).join('') || '<p>Aucune donnée de vue disponible.</p>';
        }
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Make deleteProduct and other functions available globally
window.deleteProduct = deleteProduct;
window.loadStats = loadStats;
