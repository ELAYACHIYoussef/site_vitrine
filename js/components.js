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
                    <a href="/" class="logo">
                        <svg class="logo-svg logo-light" width="220" height="50" viewBox="0 0 220 50" xmlns="http://www.w3.org/2000/svg">
                            <!-- Shopping bag with house icon -->
                            <g transform="translate(5, 6)">
                                <!-- Bag outline -->
                                <path d="M5 15 L5 35 C5 38 8 40 11 40 L23 40 C26 40 29 38 29 35 L29 15" 
                                      fill="none" stroke="#FF6B47" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                <!-- Bag handle -->
                                <path d="M10 15 C10 9 12 5 17 5 C22 5 24 9 24 15" 
                                      fill="none" stroke="#FF6B47" stroke-width="3" stroke-linecap="round"/>
                                <!-- House icon inside -->
                                <path d="M17 19 L12 24 L12 32 L22 32 L22 24 Z" 
                                      fill="#FF6B47" opacity="0.9"/>
                                <path d="M17 19 L22 24" fill="none" stroke="#FF6B47" stroke-width="2.5" stroke-linecap="round"/>
                                <rect x="15" y="27" width="4" height="5" fill="#FFF"/>
                            </g>
                            <!-- AzyMarket text in dark -->
                            <text x="50" y="34" font-family="'Montserrat', sans-serif" font-size="26" font-weight="700" fill="#1A2332" letter-spacing="0.5">AzyMarket</text>
                        </svg>
                        
                        <svg class="logo-svg logo-dark" width="220" height="50" viewBox="0 0 220 50" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <!-- Glow effect -->
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                                    <feMerge>
                                        <feMergeNode in="coloredBlur"/>
                                        <feMergeNode in="SourceGraphic"/>
                                    </feMerge>
                                </filter>
                            </defs>
                            <!-- Shopping bag with house icon - with glow -->
                            <g transform="translate(5, 6)" filter="url(#glow)">
                                <!-- Bag outline -->
                                <path d="M5 15 L5 35 C5 38 8 40 11 40 L23 40 C26 40 29 38 29 35 L29 15" 
                                      fill="none" stroke="#FF6B47" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                <!-- Bag handle -->
                                <path d="M10 15 C10 9 12 5 17 5 C22 5 24 9 24 15" 
                                      fill="none" stroke="#FF6B47" stroke-width="3" stroke-linecap="round"/>
                                <!-- House icon inside -->
                                <path d="M17 19 L12 24 L12 32 L22 32 L22 24 Z" 
                                      fill="#FF6B47" opacity="0.9"/>
                                <path d="M17 19 L22 24" fill="none" stroke="#FF6B47" stroke-width="2.5" stroke-linecap="round"/>
                                <rect x="15" y="27" width="4" height="5" fill="#2A3142"/>
                            </g>
                            <!-- AzyMarket text in white -->
                            <text x="50" y="34" font-family="'Montserrat', sans-serif" font-size="26" font-weight="700" fill="#FFFFFF" letter-spacing="0.5">AzyMarket</text>
                        </svg>
                    </a>
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
                        <h3>AzyMarket</h3>
                        <p>Créez votre propre monde et gagnez de l'argent. Votre marketplace de confiance pour vos trouvailles uniques.</p>
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
                    <p>&copy; ${currentYear} AzyMarket. Tous droits réservés.</p>
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
