/**
 * Site Collection - Application JavaScript
 * =========================================
 * Fonctionnalités: Panier, Wishlist, Lightbox, Recherche, Mode Sombre, Lazy Loading, Animations
 */

// ========================================
// Configuration et État Global
// ========================================
const App = {
    products: [],
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
    currentProduct: null,
    currentImageIndex: 0,
    theme: localStorage.getItem('theme') || 'light'
};

// ========================================
// Initialisation
// ========================================
document.addEventListener('DOMContentLoaded', async () => {
    await loadProducts();
    initTheme();
    initFilters();
    initSearch();
    initCart();
    initLightbox();
    initScrollAnimations();
    initLazyLoading();
    updateCartBadge();
    updateWishlistBadge();
});

// ========================================
// Chargement des Produits
// ========================================
async function loadProducts(limit = null) {
    try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Erreur réseau');
        App.products = await response.json();
        renderProducts(App.products, limit);
        updateStats();
    } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
        // Fallback or message to user
    }
}

function renderProducts(products, limit = null) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    // Limiter le nombre de produits si spécifié
    const displayProducts = limit ? products.slice(0, limit) : products;

    grid.innerHTML = displayProducts.map(product => `
        <div class="product-card animate-on-scroll" data-id="${product.id}" data-category="${product.category}">
            <div class="product-image-container">
                <img 
                    class="product-image lazy" 
                    data-src="${product.thumbnail || 'images/placeholder.jpg'}" 
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f0f0f0' width='400' height='300'/%3E%3C/svg%3E"
                    alt="${product.name}"
                    loading="lazy"
                >
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <span class="product-photo-count">📷 ${product.photos || 1} photos</span>
                <div class="product-actions">
                    <button class="action-btn" onclick="event.stopPropagation(); toggleWishlist(${product.id})" title="Ajouter aux favoris">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${isInWishlist(product.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                    <button class="action-btn" onclick="event.stopPropagation(); addToCart(${product.id})" title="Ajouter au panier">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="product-info" onclick="showProductDetail(${product.id})">
                <p class="product-category">${product.categoryLabel}</p>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description_courte}</p>
                <div class="product-footer">
                    <span class="product-price">${product.price} €</span>
                    <span class="product-cta">Voir détails</span>
                </div>
            </div>
        </div>
    `).join('');

    // Réinitialiser le lazy loading pour les nouvelles images
    initLazyLoading();
    triggerScrollAnimations();
}

function updateStats() {
    const totalProducts = App.products.length;
    const totalPhotos = App.products.reduce((sum, p) => sum + (p.photos || 1), 0);

    const statsElements = document.querySelectorAll('.stat-number');
    if (statsElements.length >= 2) {
        statsElements[0].textContent = totalProducts;
        statsElements[1].textContent = totalPhotos;
    }
}

// ========================================
// Filtres par Catégorie
// ========================================
function initFilters() {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.dataset.category;
            filterProducts(category);
        });
    });
}

function filterProducts(category) {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    let filtered = App.products;

    if (category && category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }

    if (searchTerm) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchTerm) ||
            p.categoryLabel.toLowerCase().includes(searchTerm) ||
            p.description_courte.toLowerCase().includes(searchTerm)
        );
    }

    renderProducts(filtered);
}

// ========================================
// Recherche
// ========================================
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const activeCategory = document.querySelector('.category-btn.active')?.dataset.category || 'all';
            filterProducts(activeCategory);
        }, 300);
    });
}

// ========================================
// Détail Produit
// ========================================
function showProductDetail(productId) {
    const product = App.products.find(p => p.id === productId);
    if (!product) return;

    // Track view in backend
    fetch(`/api/products/${productId}/view`, { method: 'POST' }).catch(err => console.log('Error tracking view:', err));

    App.currentProduct = product;
    App.currentImageIndex = 0;

    document.getElementById('homePage').classList.add('hidden');

    const detailContainer = document.getElementById('productPages');
    detailContainer.innerHTML = `
        <div class="product-detail active">
            <div class="container">
                <span class="back-button" onclick="showHome()">← Retour à la collection</span>
                <div class="product-detail-grid">
                    <div class="product-gallery">
                        <div class="gallery-main-image" onclick="openLightbox(0)">
                            <img id="mainImage" src="${product.images?.[0] || product.thumbnail || 'images/placeholder.jpg'}" alt="${product.name}">
                        </div>
                        <div class="gallery-thumbnails">
                            ${(product.images || [product.thumbnail]).map((img, idx) => `
                                <div class="gallery-thumbnail ${idx === 0 ? 'active' : ''}" onclick="changeMainImage(${idx}, '${img}')">
                                    <img src="${img}" alt="${product.name} - Image ${idx + 1}">
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="product-detail-info">
                        <p class="product-detail-category">${product.categoryLabel}</p>
                        <h1 class="product-detail-title">${product.name}</h1>
                        <p class="product-detail-price">${product.price} €</p>
                        
                        <div class="product-caracteristiques">
                            <h3>Caractéristiques</h3>
                            <ul>
                                ${(product.caracteristiques || []).map(c => `<li>${c}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="product-detail-description">${product.description_complete || product.description_courte}</div>
                        
                        <div class="product-contact-buttons">
                            <button class="btn-cart" onclick="addToCart(${product.id})">
                                🛒 Ajouter au panier
                            </button>
                            <button class="btn-wishlist" onclick="toggleWishlist(${product.id})">
                                ${isInWishlist(product.id) ? '❤️ Dans les favoris' : '🤍 Ajouter aux favoris'}
                            </button>
                            <a href="https://wa.me/33753646781?text=Bonjour, je suis intéressé(e) par ${encodeURIComponent(product.name)}" 
                               target="_blank" class="btn-whatsapp">
                                💬 WhatsApp
                            </a>
                            <a href="mailto:ysf.elayachi@gmail.com?subject=Demande: ${encodeURIComponent(product.name)}" 
                               class="btn-primary">
                                ✉️ Email
                            </a>
                        </div>
                         </div>
                    </div>
                </div>
                
                <!-- Recommendations Section -->
                <div id="recommendationsContainer" class="recommendations-section">
                    <h3>Produits susceptibles de vous plaire</h3>
                    <div id="recommendationsGrid" class="products-grid">
                        <!-- Loaded dynamically -->
                    </div>
                </div>
            </div>
        </div>
    `;

    loadRecommendations(productId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function loadRecommendations(productId) {
    try {
        const response = await fetch(`/api/products/${productId}/recommendations`);
        if (!response.ok) return;
        const recommendations = await response.json();

        const grid = document.getElementById('recommendationsGrid');
        if (grid && recommendations.length > 0) {
            grid.innerHTML = recommendations.map(product => `
                <div class="product-card" onclick="showProductDetail(${product.id})">
                    <img src="${product.thumbnail}" alt="${product.name}">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="price">${product.price} €</p>
                    </div>
                </div>
            `).join('');
        } else {
            document.getElementById('recommendationsContainer').style.display = 'none';
        }
    } catch (error) {
        console.error('Error loading recommendations:', error);
    }
}

function showHome() {
    document.getElementById('homePage').classList.remove('hidden');
    document.getElementById('productPages').innerHTML = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function changeMainImage(index, src) {
    App.currentImageIndex = index;
    document.getElementById('mainImage').src = src;

    document.querySelectorAll('.gallery-thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

// ========================================
// Lightbox
// ========================================
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });
}

function openLightbox(index) {
    if (!App.currentProduct?.images?.length) return;

    App.currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');

    lightboxImage.src = App.currentProduct.images[index];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    if (!App.currentProduct?.images?.length) return;

    const images = App.currentProduct.images;
    App.currentImageIndex = (App.currentImageIndex + direction + images.length) % images.length;
    document.getElementById('lightboxImage').src = images[App.currentImageIndex];
}

// ========================================
// Panier
// ========================================
function initCart() {
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }
}

function addToCart(productId) {
    const product = App.products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = App.cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        App.cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartBadge();
    renderCartItems();
    showToast(`${product.name} ajouté au panier`, 'success');
}

function removeFromCart(productId) {
    App.cart = App.cart.filter(item => item.id !== productId);
    saveCart();
    updateCartBadge();
    renderCartItems();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(App.cart));
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) {
        const totalItems = App.cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function openCart() {
    document.getElementById('cartSidebar')?.classList.add('active');
    document.getElementById('cartOverlay')?.classList.add('active');
    renderCartItems();
}

function closeCart() {
    document.getElementById('cartSidebar')?.classList.remove('active');
    document.getElementById('cartOverlay')?.classList.remove('active');
}

function renderCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    if (!cartItems) return;

    if (App.cart.length === 0) {
        cartItems.innerHTML = '<div class="cart-empty">Votre panier est vide</div>';
        if (cartTotal) cartTotal.textContent = '0 €';
        return;
    }

    cartItems.innerHTML = App.cart.map(item => `
        <div class="cart-item">
            <img class="cart-item-image" src="${item.thumbnail || 'images/placeholder.jpg'}" alt="${item.name}">
            <div class="cart-item-info">
                <p class="cart-item-title">${item.name}</p>
                <p class="cart-item-price">${item.price} € x ${item.quantity}</p>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
        </div>
    `).join('');

    const total = App.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (cartTotal) cartTotal.textContent = `${total} €`;
}

// ========================================
// Wishlist
// ========================================
function toggleWishlist(productId) {
    const index = App.wishlist.indexOf(productId);
    if (index === -1) {
        App.wishlist.push(productId);
        showToast('Ajouté aux favoris', 'success');
    } else {
        App.wishlist.splice(index, 1);
        showToast('Retiré des favoris');
    }

    localStorage.setItem('wishlist', JSON.stringify(App.wishlist));
    updateWishlistBadge();

    // Mettre à jour l'affichage
    const activeCategory = document.querySelector('.category-btn.active')?.dataset.category || 'all';
    filterProducts(activeCategory);
}

function isInWishlist(productId) {
    return App.wishlist.includes(productId);
}

function updateWishlistBadge() {
    const badge = document.getElementById('wishlistBadge');
    if (badge) {
        badge.textContent = App.wishlist.length;
        badge.style.display = App.wishlist.length > 0 ? 'flex' : 'none';
    }
}

// ========================================
// Mode Sombre
// ========================================
function initTheme() {
    if (App.theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.querySelector('.theme-toggle')?.classList.add('dark');
    }
}

function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        document.querySelector('.theme-toggle')?.classList.remove('dark');
        App.theme = 'light';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.querySelector('.theme-toggle')?.classList.add('dark');
        App.theme = 'dark';
    }

    localStorage.setItem('theme', App.theme);
}

// ========================================
// Lazy Loading
// ========================================
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img.lazy');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '50px 0px' });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback pour les anciens navigateurs
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// ========================================
// Animations au Scroll
// ========================================
function initScrollAnimations() {
    window.addEventListener('scroll', triggerScrollAnimations);
    triggerScrollAnimations();
}

function triggerScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll:not(.animated)');

    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;

        if (isVisible) {
            el.classList.add('animated');
        }
    });
}

// ========================================
// Toast Notifications
// ========================================
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span>${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
        ${message}
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// ========================================
// WhatsApp Menu
// ========================================
function toggleWhatsappMenu() {
    const menu = document.getElementById('whatsappMenu');
    menu?.classList.toggle('active');
}

// Fermer le menu WhatsApp si on clique ailleurs
document.addEventListener('click', (e) => {
    const whatsappFloat = document.querySelector('.whatsapp-float');
    const whatsappMenu = document.getElementById('whatsappMenu');

    if (whatsappMenu && !whatsappFloat?.contains(e.target) && !whatsappMenu.contains(e.target)) {
        whatsappMenu.classList.remove('active');
    }
});

// ========================================
// Formulaire de Contact
// ========================================
function handleContactForm(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Simuler l'envoi (à remplacer par un vrai backend)
    console.log('Formulaire soumis:', data);
    showToast('Message envoyé avec succès!', 'success');
    form.reset();
}
