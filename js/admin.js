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

    // Global handler for unauthorized access
    window.handleUnauthorized = () => {
        alert('Votre session a expiré ou est invalide. Par sécurité, vous allez être déconnecté pour rafraîchir vos accès.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    };

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

            if (response.status === 401 || response.status === 403) {
                return handleUnauthorized();
            }

            if (response.ok) {
                alert('Produit ajouté avec succès !');
                e.target.reset();

                // Update file input label if present
                const fileLabel = document.querySelector('.file-label span');
                if (fileLabel) fileLabel.textContent = 'Choisir une image...';

                loadProducts();

                // Switch to products catalogue section automatically
                if (typeof showSection === 'function') {
                    showSection('products');
                } else {
                    window.location.hash = 'products';
                }
            } else {
                const error = await response.json();
                alert('Erreur: ' + (error.message || error.error));
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Erreur de connexion au serveur');
        }
    });

    // Product Image preview/filename handler
    const productImgInput = document.getElementById('productImage');
    if (productImgInput) {
        productImgInput.addEventListener('change', function () {
            const fileName = this.files[0] ? this.files[0].name : 'Choisir une image...';
            const labelSpan = this.nextElementSibling ? this.nextElementSibling.querySelector('span') : null;
            if (labelSpan) labelSpan.textContent = fileName;
        });
    }
});

async function loadProducts() {
    const grid = document.getElementById('productsList');
    if (!grid) return;

    try {
        const response = await fetch(API_URL);

        if (response.status === 401 || response.status === 403) {
            return handleUnauthorized();
        }

        const products = await response.json();

        if (products.length === 0) {
            grid.innerHTML = `
                <div class="loading-state">
                    <i class="fas fa-box-open"></i>
                    <p>Aucun produit dans le catalogue pour le moment.</p>
                </div>`;
            return;
        }

        grid.innerHTML = products.map(p => `
            <div class="product-admin-card" id="product-${p.id}">
                <div class="product-card-img">
                    <img src="${p.thumbnail || p.image || 'img/placeholder.jpg'}" alt="${p.name}" onerror="this.src='img/placeholder.jpg'">
                    <span class="product-category-tag">${p.categoryLabel || p.category}</span>
                </div>
                <div class="product-card-info">
                    <h3>${p.name}</h3>
                    <div class="product-card-price">${p.price} DH</div>
                    <p class="product-card-desc">${p.description || 'Pas de description disponible.'}</p>
                </div>
                <div class="product-card-actions">
                    <button class="btn-edit-premium" onclick="editProduct('${p.id}')">
                        <i class="fas fa-edit"></i> Modifier
                    </button>
                    <button class="btn-delete-premium" onclick="deleteProduct('${p.id}')">
                        <i class="fas fa-trash-alt"></i> SUPPRIMER
                    </button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading products:', error);
        grid.innerHTML = `
            <div class="loading-state">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Erreur lors du chargement des produits.</p>
            </div>`;
    }
}

function editProduct(id) {
    alert('La modification du produit (ID: ' + id + ') sera disponible dans une prochaine version.');
}

window.editProduct = editProduct;

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

        if (response.status === 401 || response.status === 403) {
            return handleUnauthorized();
        }

        if (response.ok) {
            // Real-time: Remove the card from DOM instantly
            const card = document.getElementById(`product-${id}`);
            if (card) {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                card.style.transition = 'all 0.3s ease';
                setTimeout(() => {
                    card.remove();
                    // Brief success notification
                    const toast = document.createElement('div');
                    toast.className = 'delete-toast';
                    toast.innerHTML = '<i class="fas fa-check-circle"></i> Produit supprimé de la base !';
                    document.body.appendChild(toast);
                    setTimeout(() => toast.remove(), 3000);
                }, 300);
            }
            // Still reload in background to ensure sync
            // loadProducts(); 
        } else {
            const error = await response.json();
            const msg = error.details ? `${error.error} (${error.details})` : error.error;
            alert('Erreur: ' + (msg || 'Suppression impossible'));
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

        if (response.status === 401 || response.status === 403) {
            return; // Stats failing silently is better, or let other calls handle logout
        }

        const stats = await response.json();

        document.getElementById('statTotalClients').textContent = stats.totalClients;
        document.getElementById('statTotalViews').textContent = stats.totalViews;
        document.getElementById('statTotalOrders').textContent = stats.totalOrders;

        const productsElement = document.getElementById('statTotalProducts');
        if (productsElement) {
            productsElement.textContent = stats.totalProducts || products.length || '--';
        }

        // Render Top Products
        const topProductsList = document.getElementById('topProductsList');
        if (topProductsList && stats.topProducts) {
            topProductsList.innerHTML = stats.topProducts.map((p, idx) => `
                <div class="top-product-item">
                    <span class="top-product-name">${idx + 1}. ${p.name}</span>
                    <span class="top-product-views">${p.views} vues</span>
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
