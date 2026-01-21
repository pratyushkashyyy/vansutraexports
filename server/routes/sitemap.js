import express from 'express';

const router = express.Router();

// Generate XML Sitemap
router.get('/sitemap.xml', (req, res) => {
    const baseUrl = 'https://7cafb2b1dade.ngrok-free.app';

    const categories = [
        'vegetables', 'fruits', 'spices', 'cereals',
        'pulses', 'iqf', 'feed', 'organic', 'flowers'
    ];

    const urls = [
        { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'daily' },
        { loc: `${baseUrl}/about`, priority: '0.8', changefreq: 'monthly' },
        { loc: `${baseUrl}/products`, priority: '0.9', changefreq: 'daily' },
        { loc: `${baseUrl}/contact`, priority: '0.7', changefreq: 'monthly' },
        ...categories.map(cat => ({
            loc: `${baseUrl}/products?category=${cat}`,
            priority: '0.8',
            changefreq: 'weekly'
        }))
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map(url => `    <url>
        <loc>${url.loc}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>${url.changefreq}</changefreq>
        <priority>${url.priority}</priority>
    </url>`).join('\n')}
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
});

export default router;
