// Search Component - Advanced Product Search
const SearchModule = {
    filters: {
        query: '',
        category: '',
        minPrice: '',
        maxPrice: '',
        sortBy: 'id_desc'
    },

    init: function() {
        this.createSearchUI();
        this.attachEventListeners();
    },

    createSearchUI: function() {
        const searchContainer = document.getElementById('searchContainer');
        if (!searchContainer) return;

        searchContainer.innerHTML = \
            <div class="search-panel">
                <div class="search-input-group">
                    <input type="text" id="searchQuery" placeholder="Rechercher un produit..." class="search-input">
                    <button onclick="SearchModule.performSearch()" class="search-btn">🔍 Rechercher</button>
                </div>
                <div class="filters-group">
                    <select id="categoryFilter" class="filter-select">
                        <option value="">Toutes les catégories</option>
                    </select>
                    <input type="number" id="minPriceFilter" placeholder="Prix min" class="filter-input" min="0">
                    <input type="number" id="maxPriceFilter" placeholder="Prix max" class="filter-input" min="0">
                    <select id="sortByFilter" class="filter-select">
                        <option value="id_desc">Plus récents</option>
                        <option value="price_asc">Prix croissant</option>
                        <option value="price_desc">Prix décroissant</option>
                        <option value="name">Nom A-Z</option>
                    </select>
                    <button onclick="SearchModule.resetFilters()" class="reset-btn">Réinitialiser</button>
                </div>
            </div>
            <div id="searchResults" class="products-grid"></div>
        \;

        this.loadCategories();
    },

    async loadCategories: function() {
        try {
            const response = await fetch('/api/products/categories');
            const categories = await response.json();
            const select = document.getElementById('categoryFilter');
            categories.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat.category;
                option.textContent = cat.categoryLabel;
                select.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading categories:', error);
        }
    },

    attachEventListeners: function() {
        const searchQuery = document.getElementById('searchQuery');
        if (searchQuery) {
            searchQuery.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
        }

        ['categoryFilter', 'minPriceFilter', 'maxPriceFilter', 'sortByFilter'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('change', () => this.performSearch());
            }
        });
    },

    performSearch: async function() {
        this.filters.query = document.getElementById('searchQuery')?.value || '';
        this.filters.category = document.getElementById('categoryFilter')?.value || '';
        this.filters.minPrice = document.getElementById('minPriceFilter')?.value || '';
        this.filters.maxPrice = document.getElementById('maxPriceFilter')?.value || '';
        this.filters.sortBy = document.getElementById('sortByFilter')?.value || 'id_desc';

        const params = new URLSearchParams();
        if (this.filters.query) params.append('q', this.filters.query);
        if (this.filters.category) params.append('category', this.filters.category);
        if (this.filters.minPrice) params.append('minPrice', this.filters.minPrice);
        if (this.filters.maxPrice) params.append('maxPrice', this.filters.maxPrice);
        if (this.filters.sortBy) params.append('sortBy', this.filters.sortBy);

        try {
            const response = await fetch(\/api/products/search?\\);
            const products = await response.json();
            this.displayResults(products);
        } catch (error) {
            console.error('Search error:', error);
            document.getElementById('searchResults').innerHTML = '<p class="error-message">Erreur lors de la recherche</p>';
        }
    },

    displayResults: function(products) {
        const resultsContainer = document.getElementById('searchResults');
        
        if (products.length === 0) {
            resultsContainer.innerHTML = '<p class="no-results">Aucun produit trouvé</p>';
            return;
        }

        let html = '<div class="products-grid">';
        products.forEach(product => {
            html += \
                <div class="product-card">
                    <img src="\" alt="\" class="product-image">
                    <h3 class="product-name">\</h3>
                    <p class="product-category">\</p>
                    <p class="product-price">\ €</p>
                    <button onclick="viewProductDetails(\)" class="product-cta">Voir détails</button>
                </div>
            \;
        });
        html += '</div>';

        resultsContainer.innerHTML = html;
    },

    resetFilters: function() {
        document.getElementById('searchQuery').value = '';
        document.getElementById('categoryFilter').value = '';
        document.getElementById('minPriceFilter').value = '';
        document.getElementById('maxPriceFilter').value = '';
        document.getElementById('sortByFilter').value = 'id_desc';
        this.performSearch();
    }
};
