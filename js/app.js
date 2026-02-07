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
async function loadProducts() {
    // Données intégrées pour éviter les problèmes CORS en local
    App.products = [
    {
        "id":  1,
        "name":  "Table de massage",
        "slug":  "table-de-massage",
        "category":  "sante",
        "categoryLabel":  "Santé / Bien-être",
        "price":  90,
        "badge":  "Populaire",
        "photos":  7,
        "description_courte":  "Table de massage pliable à 3 zones - Lit portable - Hauteur réglable - Idéale pour massage, maquillage, tatouage - Taille 182x60x61cm - Poids 18kg - Rembourrage mousse cellulaire - Appui-tête réglable",
        "description_complete":  "Table de massage pliable à 3 zones - Lit portable - Hauteur réglable - Idéale pour massage, maquillage, tatouage - Taille 182x60x61cm - Poids 18kg - Rembourrage mousse cellulaire - Appui-tête réglable",
        "caracteristiques":  [
                                 "Dimensions: 182 x 60 x 61cm",
                                 "Poids: 18kg",
                                 "3 zones pliables",
                                 "Appui-tête réglable",
                                 "Rembourrage mousse cellulaire",
                                 "Résistant à l'huile et l'eau"
                             ],
        "thumbnail":  "images/products/product_1.jpg",
        "images":  [
                       "images/products/product_1.jpg",
                       "images/products/product_2.jpg",
                       "images/products/product_3.jpg",
                       "images/products/product_4.jpg",
                       "images/products/product_5.jpg",
                       "images/products/product_6.jpg",
                       "images/products/product_7.jpg"
                   ]
    },
    {
        "id":  2,
        "name":  "LEADZM Fauteuil Relax avec Fonction électrique Massage",
        "slug":  "leadzm-fauteuil-relax-avec-fonction-lectrique-massage",
        "category":  "mobilier",
        "categoryLabel":  "Maison / Confort",
        "price":  280,
        "badge":  "Nouveau",
        "photos":  10,
        "description_courte":  "Fauteuil relax massage électrique - Rotation 360° - Massage 2 points + chauffage - Inclinaison jusqu'à 160° - 2 porte-gobelets - Poches de rangement - Dimensions: 63.5x90x102cm - Poids 26kg",
        "description_complete":  "Fauteuil relax massage électrique - Rotation 360° - Massage 2 points + chauffage - Inclinaison jusqu'à 160° - 2 porte-gobelets - Poches de rangement - Dimensions: 63.5x90x102cm - Poids 26kg",
        "caracteristiques":  [
                                 "Écran LCD multifonction",
                                 "8 niveaux de résistance",
                                 "Selle ajustable",
                                 "Poids max utilisateur: 120kg",
                                 "Dimensions: 85 x 45 x 115cm",
                                 "Silencieux"
                             ],
        "thumbnail":  "images/products/product_8.jpg",
        "images":  [
                       "images/products/product_8.jpg",
                       "images/products/product_9.jpg",
                       "images/products/product_10.jpg",
                       "images/products/product_11.jpg",
                       "images/products/product_12.jpg",
                       "images/products/product_13.jpg",
                       "images/products/product_14.jpg",
                       "images/products/product_15.jpg",
                       "images/products/product_16.jpg",
                       "images/products/product_17.jpg"
                   ]
    },
    {
        "id":  3,
        "name":  "Fauteuil Inclinable",
        "slug":  "fauteuil-inclinable",
        "category":  "mobilier",
        "categoryLabel":  "Maison / Confort",
        "price":  250,
        "badge":  null,
        "photos":  5,
        "description_courte":  "Fauteuil inclinable massage électrique - 4 points massage dossier + 2 vibrations siège - Chauffage - Inclinaison 135° - Matériau PU - Poche de rangement - Dimensions: 90x63.5x102cm - Poids 26kg",
        "description_complete":  "Fauteuil inclinable massage électrique - 4 points massage dossier + 2 vibrations siège - Chauffage - Inclinaison 135° - Matériau PU - Poche de rangement - Dimensions: 90x63.5x102cm - Poids 26kg",
        "caracteristiques":  [
                                 "Dimensions canapé: 200 x 90 x 85cm",
                                 "Dimensions lit: 200 x 120cm",
                                 "Tissu polyester haute résistance",
                                 "Coffre de rangement",
                                 "Mécanisme clic-clac",
                                 "Coloris: Gris anthracite"
                             ],
        "thumbnail":  "images/products/product_18.jpg",
        "images":  [
                       "images/products/product_18.jpg",
                       "images/products/product_19.jpg",
                       "images/products/product_20.jpg",
                       "images/products/product_21.jpg",
                       "images/products/product_22.jpg"
                   ]
    },
    {
        "id":  4,
        "name":  "Cuisinière à gaz à 5 flammes",
        "slug":  "cuisini-re-gaz-5-flammes",
        "category":  "electromenager",
        "categoryLabel":  "Électroménager",
        "price":  350,
        "badge":  "Promo",
        "photos":  5,
        "description_courte":  "Cuisinière gaz 5 brûleurs - Acier inoxydable - Feu puissant - Allumage pulsé - Protection extinction flamme - Dimensions: 49x49x79cm - Facile à nettoyer - Usage domestique et commercial",
        "description_complete":  "Cuisinière gaz 5 brûleurs - Acier inoxydable - Feu puissant - Allumage pulsé - Protection extinction flamme - Dimensions: 49x49x79cm - Facile à nettoyer - Usage domestique et commercial",
        "caracteristiques":  [
                                 "Pression: 15 bars",
                                 "Réservoir: 1.5L",
                                 "Mousseur à lait vapeur",
                                 "Chauffe-tasses",
                                 "Puissance: 1450W",
                                 "Coloris: Noir/Inox"
                             ],
        "thumbnail":  "images/products/product_23.jpg",
        "images":  [
                       "images/products/product_23.jpg",
                       "images/products/product_24.jpg",
                       "images/products/product_25.jpg",
                       "images/products/product_26.jpg",
                       "images/products/product_27.jpg"
                   ]
    },
    {
        "id":  5,
        "name":  "Réchaud à gaz à 4 brûleurs",
        "slug":  "r-chaud-gaz-4-br-leurs",
        "category":  "electromenager",
        "categoryLabel":  "Électroménager",
        "price":  180,
        "badge":  null,
        "photos":  9,
        "description_courte":  "Réchaud gaz 4 brûleurs sur pied - 50cm - Double étagère + couvercle - Fer haute qualité - Contrôle indépendant - Pare-brise - Dimensions: 49x49x79cm - Poids 9kg - Idéal extérieur",
        "description_complete":  "Réchaud gaz 4 brûleurs sur pied - 50cm - Double étagère + couvercle - Fer haute qualité - Contrôle indépendant - Pare-brise - Dimensions: 49x49x79cm - Poids 9kg - Idéal extérieur",
        "caracteristiques":  [
                                 "Hauteur: 150-180cm ajustable",
                                 "LED 20W (équivalent 100W)",
                                 "3 modes de couleur",
                                 "Variateur intégré",
                                 "Base en marbre",
                                 "Coloris: Or/Blanc"
                             ],
        "thumbnail":  "images/products/product_28.jpg",
        "images":  [
                       "images/products/product_28.jpg",
                       "images/products/product_29.jpg",
                       "images/products/product_30.jpg",
                       "images/products/product_31.jpg",
                       "images/products/product_32.jpg",
                       "images/products/product_33.jpg",
                       "images/products/product_34.jpg",
                       "images/products/product_35.jpg",
                       "images/products/product_36.jpg"
                   ]
    },
    {
        "id":  6,
        "name":  "Évier",
        "slug":  "-vier",
        "category":  "electromenager",
        "categoryLabel":  "Électroménager",
        "price":  420,
        "badge":  null,
        "photos":  6,
        "description_courte":  "Évier cuisine intelligent 80cm - Acier inox - Robinet cascade affichage numérique - Contrôle température LED - Profondeur 21cm - Revêtement nano - Planche à découper + panier égouttoir inclus",
        "description_complete":  "Évier cuisine intelligent 80cm - Acier inox - Robinet cascade affichage numérique - Contrôle température LED - Profondeur 21cm - Revêtement nano - Planche à découper + panier égouttoir inclus",
        "caracteristiques":  [
                                 "Dimensions: 183 x 61cm",
                                 "Épaisseur: 6mm",
                                 "Matériau: TPE écologique",
                                 "Antidérapant double face",
                                 "Poids: 900g",
                                 "Sangle incluse"
                             ],
        "thumbnail":  "images/products/product_37.jpg",
        "images":  [
                       "images/products/product_37.jpg",
                       "images/products/product_38.jpg",
                       "images/products/product_39.jpg",
                       "images/products/product_40.jpg",
                       "images/products/product_41.jpg",
                       "images/products/product_42.jpg"
                   ]
    },
    {
        "id":  7,
        "name":  "Vélo pour garçon",
        "slug":  "v-lo-pour-gar-on",
        "category":  "sport",
        "categoryLabel":  "Sport / Fitness",
        "price":  150,
        "badge":  null,
        "photos":  5,
        "description_courte":  "VTT 20 pouces 6 vitesses - Double frein disque - Cadre acier carbone - Selle confortable cuir+éponge - Garde-boue - Porte-gobelet - Cloche boussole - Charge max 85kg - Couleur rouge",
        "description_complete":  "VTT 20 pouces 6 vitesses - Double frein disque - Cadre acier carbone - Selle confortable cuir+éponge - Garde-boue - Porte-gobelet - Cloche boussole - Charge max 85kg - Couleur rouge",
        "caracteristiques":  [
                                 "Grande: 60 x 20 x 15cm",
                                 "Moyenne: 45 x 17 x 15cm",
                                 "Petite: 30 x 14 x 15cm",
                                 "Bois de pin massif",
                                 "Supports métal noir",
                                 "Charge max: 10kg chacune"
                             ],
        "thumbnail":  "images/products/product_43.jpg",
        "images":  [
                       "images/products/product_43.jpg",
                       "images/products/product_44.jpg",
                       "images/products/product_45.jpg",
                       "images/products/product_46.jpg",
                       "images/products/product_47.jpg"
                   ]
    },
    {
        "id":  8,
        "name":  "Vases de mariage",
        "slug":  "vases-de-mariage",
        "category":  "decoration",
        "categoryLabel":  "Divers",
        "price":  80,
        "badge":  "Best-seller",
        "photos":  5,
        "description_courte":  "Set 3 vases carton mariage - Hauteurs 40+60+80cm - Présentoir fleurs pliable - Blanc laiteux - Diamètre 30cm - Charge max 50kg/pièce - Idéal centre de table mariage/fête",
        "description_complete":  "Set 3 vases carton mariage - Hauteurs 40+60+80cm - Présentoir fleurs pliable - Blanc laiteux - Diamètre 30cm - Charge max 50kg/pièce - Idéal centre de table mariage/fête",
        "caracteristiques":  [
                                 "Navigation: LiDAR",
                                 "Puissance: 2500Pa",
                                 "Autonomie: 120 min",
                                 "Niveau sonore: 55dB",
                                 "Contrôle: App + Voix",
                                 "Bac à poussière: 600ml"
                             ],
        "thumbnail":  "images/products/product_48.jpg",
        "images":  [
                       "images/products/product_48.jpg",
                       "images/products/product_49.jpg",
                       "images/products/product_50.jpg",
                       "images/products/product_51.jpg",
                       "images/products/product_52.jpg"
                   ]
    }
];
    renderProducts(App.products);
    updateStats();
}

function renderProducts(products) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    grid.innerHTML = products.map(product => `
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
        </div>
    `;

    window.scrollTo({ top: 0, behavior: 'smooth' });
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
