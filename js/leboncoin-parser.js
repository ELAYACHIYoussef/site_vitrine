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
            // Navigate through Leboncoin's complex nested JSON
            // Note: Structure varies, but usually under props.pageProps.initialState.search.results
            const results = data.props?.pageProps?.search?.results ||
                data.props?.pageProps?.initialState?.search?.results || [];

            results.forEach(ad => {
                products.push({
                    name: ad.subject,
                    price: ad.price?.[0] || 0,
                    category: 'divers', // Default category
                    categoryLabel: ad.category_name || 'Autre',
                    description_courte: ad.body || '',
                    thumbnail: ad.images?.thumb_url || (ad.images?.urls?.[0]),
                    images: ad.images?.urls || [],
                    leboncoinId: ad.list_id,
                    url: ad.url
                });
            });

            if (products.length > 0) return products;
        } catch (e) {
            console.error('Error parsing __NEXT_DATA__:', e);
        }
    }

    // Fallback: Regex-based extraction if JSON is missing or structure changed
    // (Less reliable but good to have)
    const adRegex = /"subject":"([^"]+)","price":\[(\d+)\].*?"thumb_url":"([^"]+)"/g;
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

module.exports = { parseLeboncoinHTML };
