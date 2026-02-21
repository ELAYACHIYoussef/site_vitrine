/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // AzyMarket Brand Colors - Extended Palette
                azymarket: {
                    // Navy Blue (Primary)
                    navy: {
                        50: '#e6eef5',
                        100: '#b8d1e3',
                        200: '#8ab4d1',
                        300: '#5c97bf',
                        400: '#3d6a8a',  // navy-lighter
                        500: '#1a3a52',  // Main navy
                        600: '#0f2942',  // navy-dark
                        700: '#0a1f32',
                        800: '#051421',
                        900: '#000a11',
                    },
                    // Orange (Accent)
                    orange: {
                        50: '#fff4f0',
                        100: '#ffe0d6',
                        200: '#ffcbbc',
                        300: '#ffb6a2',
                        400: '#ff7f5c',  // orange-light
                        500: '#FF6835',  // Main orange
                        600: '#e85a2b',  // orange-dark
                        700: '#d14c21',
                        800: '#ba3e17',
                        900: '#a3300d',
                    },
                },
                // Semantic State Colors
                success: {
                    light: '#d1fae5',
                    DEFAULT: '#10b981',
                    dark: '#059669',
                },
                warning: {
                    light: '#fef3c7',
                    DEFAULT: '#f59e0b',
                    dark: '#d97706',
                },
                danger: {
                    light: '#fee2e2',
                    DEFAULT: '#ef4444',
                    dark: '#dc2626',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'azymarket-orange': '0 10px 40px -10px rgba(255, 104, 53, 0.4)',
                'azymarket-navy': '0 10px 40px -10px rgba(26, 58, 82, 0.4)',
            },
        },
    },
    plugins: [],
}
