$path = "c:\Users\Administrator\OneDrive\Desktop\site_vitrine\site_vitrine\site-collection.html"
$content = Get-Content -Path $path -Raw -Encoding UTF8

# CSS Replacement
$cssSearch = "</style>"
$cssReplace = @"
        /* Search Bar Styles */
        .search-container {
            position: relative;
            margin-left: 2rem;
            display: flex;
            align-items: center;
        }

        .search-input {
            padding: 10px 15px 10px 40px;
            border: 1px solid #e1e1e1;
            border-radius: 30px;
            font-family: 'Montserrat', sans-serif;
            font-size: 0.9rem;
            width: 200px;
            transition: all 0.3s ease;
            outline: none;
            background: #f9f9f9;
        }

        .search-input:focus {
            width: 300px;
            border-color: var(--accent);
            background: #fff;
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        .search-icon {
            position: absolute;
            left: 15px;
            width: 18px;
            height: 18px;
            fill: #999;
            pointer-events: none;
            transition: all 0.3s ease;
        }

        .search-input:focus + .search-icon {
            fill: var(--accent);
        }
    </style>
"@
$content = $content.Replace($cssSearch, $cssReplace)

# HTML Nav Replacement
# Use substring matching to be safe with whitespace if needed, but exact string should work based on view_file output
$navSearch = '<a href="#" onclick="showHome(); return false;" class="logo">Collection</a>'
$navReplace = @"
            <a href="#" onclick="showHome(); return false;" class="logo">Collection</a>
            
            <div class="search-container">
                <input type="text" id="searchInput" class="search-input" placeholder="Rechercher un produit...">
                <svg class="search-icon" viewBox="0 0 24 24">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
            </div>
"@
$content = $content.Replace($navSearch, $navReplace)

# Modal HTML Replacement
$modalSearch = "<script>"
$modalReplace = @"
    <!-- Product Modal -->
    <div id="productModal" class="product-detail">
        <div class="container">
            <a href="#" class="back-button" onclick="closeModal(); return false;">← Retour</a>
            <div class="product-detail-grid">
                <div class="product-gallery">
                    <div class="gallery-main-image">
                        <img src="" alt="Product Image">
                    </div>
                    <div class="gallery-thumbnails"></div>
                </div>
                <div class="product-detail-info">
                    <div id="modalCategory" class="product-detail-category"></div>
                    <h2 id="modalTitle" class="product-detail-title"></h2>
                    <div id="modalPrice" class="product-detail-price"></div>
                    <p id="modalDescription" class="product-detail-description"></p>
                    
                    <div class="product-caracteristiques">
                        <h3>Caractéristiques</h3>
                        <ul></ul>
                    </div>
                    
                    <div class="product-contact-buttons">
                        <a href="#contact" class="btn-primary" onclick="closeModal()">Commander</a>
                        <a href="#" class="btn-whatsapp">WhatsApp</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
"@
$content = $content.Replace($modalSearch, $modalReplace)

# JS Replacement - Using Single Quote Here-String for literal content (no variable expansion)
$jsSearch = "function showHome() {"
$jsReplace = @'
    // State Management
    const products = productsData;
    let currentCategory = 'all';
    let currentSearchTerm = '';
    let currentProductImages = [];
    let currentImageIndex = 0;

    // Search and Filter Logic
    document.addEventListener('DOMContentLoaded', () => {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                currentSearchTerm = e.target.value.trim();
                displayProducts(currentCategory);
            });
        }

        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            };
        });
        
        displayProducts();
    });

    function displayProducts(category = null) {
        if (category) {
            currentCategory = category;
        }
        
        document.querySelectorAll('.category-btn').forEach(btn => {
            if (currentCategory === 'all' && btn.textContent.toLowerCase().includes('tous')) {
                 btn.classList.add('active');
            } else if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(currentCategory)) {
                 btn.classList.add('active');
            } else {
                 btn.classList.remove('active');
            }
        });

        const grid = document.getElementById('productGrid');
        if (!grid) return;
        
        grid.innerHTML = '';

        const filtered = products.filter(product => {
            const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
            const searchLower = currentSearchTerm.toLowerCase();
            const matchesSearch = !currentSearchTerm || 
                                  product.name.toLowerCase().includes(searchLower) || 
                                  (product.description_courte && product.description_courte.toLowerCase().includes(searchLower));
            return matchesCategory && matchesSearch;
        });

        if (filtered.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">Aucun produit ne correspond à votre recherche.</div>';
            return;
        }

        filtered.forEach((product, index) => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.style.animationDelay = `${index * 0.1}s`;

            card.innerHTML = `
                <div class="product-image-container">
                    <img src="${product.thumbnail}" alt="${product.name}" class="product-image">
                    ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                    <div class="product-photo-count">📸 ${product.photos} photos</div>
                </div>
                <div class="product-info">
                    <div class="product-category">${product.categoryLabel}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description_courte}</p>
                    <div class="product-footer">
                        <div class="product-price">${product.price}€</div>
                        <a href="#" class="product-cta" onclick="openModal(${product.id}); return false;">Voir plus</a>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    function openModal(id) {
        const product = products.find(p => p.id === id);
        if (!product) return;

        currentProductImages = product.images;
        currentImageIndex = 0;

        document.getElementById('modalCategory').textContent = product.categoryLabel;
        document.getElementById('modalTitle').textContent = product.name;
        document.getElementById('modalDescription').textContent = product.description_complete;
        document.getElementById('modalPrice').textContent = product.price + '€';
        
        const featuresList = document.querySelector('.product-caracteristiques ul');
        if (featuresList) {
             featuresList.innerHTML = (product.caracteristiques || []).map(c => `<li>${c}</li>`).join('');
        }

        updateGallery();

        document.getElementById('productModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        document.getElementById('productModal').classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateGallery() {
        const mainImage = document.querySelector('.gallery-main-image img');
        if (mainImage && currentProductImages[currentImageIndex]) {
            mainImage.src = currentProductImages[currentImageIndex];
        }
        
        const thumbnailsContainer = document.querySelector('.gallery-thumbnails');
        if (thumbnailsContainer) {
            thumbnailsContainer.innerHTML = currentProductImages.map((img, index) => 
                `<div class="gallery-thumbnail ${index === currentImageIndex ? 'active' : ''}" onclick="currentImageIndex = ${index}; updateGallery();"><img src="${img}" alt=""></div>`
            ).join('');
        }
    }

    function showHome() {
'@
$content = $content.Replace($jsSearch, $jsReplace)

Set-Content -Path $path -Value $content -Encoding UTF8
