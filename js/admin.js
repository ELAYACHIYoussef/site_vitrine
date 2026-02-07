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

// Make deleteProduct available globally
window.deleteProduct = deleteProduct;
