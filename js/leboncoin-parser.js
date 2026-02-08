/**
 * Leboncoin Parser Utility
 * Extracts ad listings from Leboncoin profile HTML source.
 */

function parseLeboncoinHTML(html) {
    const products = [];

    // Look for ad cards. Leboncoin uses React/Next.js, 
    // data is often in a JSON inside <script id="__NEXT_DATA__">
    const nextDataMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);

    if (nextDataMatch && nextDataMatch[1]) {
        try {
            const data = JSON.parse(nextDataMatch[1]);
            console.log('[PARSER] __NEXT_DATA__ found');

            // Recursive function to find any array containing objects that look like ads
            function findAds(obj, depth = 0) {
                if (!obj || typeof obj !== 'object' || depth > 20) return null;

                // If it's an array, check if elements look like ads
                if (Array.isArray(obj)) {
                    // Check if the first few items have keys characteristic of an ad
                    const looksLikeAds = obj.length > 0 && obj.slice(0, 2).every(item => {
                        if (!item || typeof item !== 'object') return false;
                        const keys = Object.keys(item);
                        // Leboncoin ads usually have subject/title, price, and images/thumbnail
                        return (item.subject || item.title) && (item.price !== undefined || item.price_cents !== undefined);
                    });

                    if (looksLikeAds) {
                        console.log(`[PARSER] Potential ads array found at depth ${depth} with ${obj.length} items. Keys:`, Object.keys(obj[0]));
                        return obj;
                    }

                    // Otherwise, search inside each item
                    for (const item of obj) {
                        const found = findAds(item, depth + 1);
                        if (found) return found;
                    }
                } else {
                    // It's an object, search all keys
                    // Prioritize search/profile/ads keys
                    const priorityKeys = ['results', 'ads', 'items', 'search', 'profile', 'advertisements', 'listings'];
                    for (const key of priorityKeys) {
                        if (obj[key]) {
                            const found = findAds(obj[key], depth + 1);
                            if (found) return found;
                        }
                    }

                    for (const key in obj) {
                        if (!priorityKeys.includes(key) && obj[key]) {
                            const found = findAds(obj[key], depth + 1);
                            if (found) return found;
                        }
                    }
                }
                return null;
            }

            const results = findAds(data);

            if (results && Array.isArray(results)) {
                console.log(`[PARSER] Found ${results.length} results in JSON`);
                results.forEach(ad => {
                    const name = ad.subject || ad.title;
                    if (!name) return;

                    // Price can be an array [value] or a number
                    let price = 0;
                    if (Array.isArray(ad.price)) price = ad.price[0];
                    else if (typeof ad.price === 'number') price = ad.price;
                    else if (ad.price && typeof ad.price === 'object') price = ad.price.value || price;

                    products.push({
                        name: name,
                        price: price || 0,
                        category: 'divers',
                        categoryLabel: ad.category_name || 'Autre',
                        description_courte: ad.body || ad.description || '',
                        thumbnail: ad.images?.thumb_url || ad.images?.urls?.[0] || ad.thumbnail,
                        images: ad.images?.urls || (ad.images?.urls_large) || [],
                        leboncoinId: ad.list_id || ad.id,
                        url: ad.url
                    });
                });
            }

            if (products.length > 0) return products;
        } catch (e) {
            console.error('[PARSER] Error parsing JSON:', e.message);
        }
    }

    // Fallback: Regex-based extraction (more aggressive)
    console.log('[PARSER] Falling back to regex extraction');
    const adRegex = /"subject":"([^"]+)","price":\[?(\d+)\]?.*?"thumb_url":"([^"]+)"/g;
    let match;
    while ((match = adRegex.exec(html)) !== null) {
        products.push({
            name: match[1],
            price: parseInt(match[2]),
            thumbnail: match[3].replace(/\\u002F/g, '/'),
            category: 'divers'
        });
    }

    return products;
}

if (typeof module !== 'undefined') {
    module.exports = { parseLeboncoinHTML };
}
