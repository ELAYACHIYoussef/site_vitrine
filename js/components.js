/**
 * components.js
 * Centralized components for the e-commerce platform
 */

const Components = {
    /**
     * Renders the shared navigation header
     * @param {string} containerId - The ID of the container to inject the header into
     */
    renderHeader: (containerId = 'main-header') => {
        const header = document.getElementById(containerId);
        if (!header) return;

        header.innerHTML = `
            <nav>
                <div class="nav-content">
                    <a href="/" class="logo">Collection</a>
                    <ul class="nav-links" id="navLinks">
                        <!-- Links will be injected by Auth.updateNavigation() -->
                    </ul>
                    <div class="nav-icons">
                        <div class="search-container">
                            <input type="text" id="searchInput" class="search-input" placeholder="Rechercher...">
                            <button class="search-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.35-4.35"></path>
                                </svg>
                            </button>
                        </div>
                        <div class="nav-icon" onclick="window.location.href='profile.html#favoris'">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                            <span class="nav-badge" id="wishlistBadge" style="display: none;">0</span>
                        </div>
                        <div class="nav-icon" onclick="typeof openCart === 'function' ? openCart() : window.location.href='site-collection.html?openCart=true'">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            <span class="nav-badge" id="cartBadge" style="display: none;">0</span>
                        </div>
                        <div class="theme-toggle" onclick="typeof toggleTheme === 'function' && toggleTheme()" title="Mode sombre/clair"></div>
                    </div>
                </div>
            </nav>
        `;

        // After rendering, ensure Auth module updates the links if it's loaded
        if (typeof Auth !== 'undefined' && typeof Auth.updateNavigation === 'function') {
            Auth.updateNavigation();
        }
    },

    /**
     * Renders the shared footer
     * @param {string} containerId - The ID of the container to inject the footer into
     */
    renderFooter: (containerId = 'main-footer') => {
        const footer = document.getElementById(containerId);
        if (!footer) return;

        const currentYear = new Date().getFullYear();

        footer.innerHTML = `
            <footer>
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>Collection Exclusive</h3>
                        <p>L'excellence et le luxe à votre portée. Une sélection rigoureuse des meilleurs produits premium.</p>
                        <div class="social-links">
                            <a href="#" title="Instagram">IG</a>
                            <a href="#" title="Facebook">FB</a>
                            <a href="#" title="Pinterest">PN</a>
                        </div>
                    </div>
                    <div class="footer-section">
                        <h3>Navigation</h3>
                        <ul>
                            <li><a href="/">Accueil</a></li>
                            <li><a href="site-collection.html">Boutique</a></li>
                            <li><a href="profile.html">Mon Profil</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3>Contact</h3>
                        <p>📍 Paris, France</p>
                        <p>📧 contact@collection-exclusive.fr</p>
                        <p>📱 +33 1 23 45 67 89</p>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; ${currentYear} Collection Exclusive. Tous droits réservés.</p>
                </div>
            </footer>
        `;
    }
};

// Auto-render on load if containers exist
document.addEventListener('DOMContentLoaded', () => {
    Components.renderHeader();
    Components.renderFooter();
});
