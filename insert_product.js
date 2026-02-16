import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'server', 'database.sqlite');

const db = new sqlite3.Database(dbPath);

const product = {
    title: 'Cassia Tora Seeds',
    subtitle: 'Size 2.2 mm - 3 mm',
    category: 'spices',
    image: '/assets/products/spices/cassia_tora_seeds.png',
    description: 'High-quality sun-dried Cassia Tora seeds sourced from India. Sortex Cleaned and packed in Double PP White Woven bags (50 Kgs). These seeds are 99% pure and meet strict quality standards for export.',
    featured: 1,
    hs_code: '0910', // Generic spice category or specific if known
    origin: 'Nagpur, Maharashtra - India',
    supply_type: 'Export Quality',
    quality: 'Sortex Cleaned',
    size_grade: '2.2 mm - 3 mm',
    packing: '50 Kgs Double PP White Woven Bags',
    loading_location: 'Nagpur/JNPT Mumbai',
    highlights: JSON.stringify(['Sortex Cleaned', '99% purity', 'Moisture < 7%', 'Black Seeds < 2%']),
    specifications: JSON.stringify({
        'Size': '2.2 mm - 3 mm',
        'Purity': '99%',
        'Moisture Content': '< 7%',
        'Black Seeds': '< 2%',
        'Cleaning': 'Sortex Cleaned',
        'Condition': 'Dried / Sun Dried'
    }),
    grading_options: JSON.stringify({
        export: ['Sortex Cleaned', '99% Purity'],
        domestic: ['Standard Grade']
    }),
    packing_options: JSON.stringify({
        export: ['50 Kg Double PP Bags'],
        domestic: ['50 Kg Jute Bags']
    }),
    export_markets: JSON.stringify(['China', 'Vietnam', 'Indonesia', 'Thailand', 'Global']),
    documents: JSON.stringify(['Commercial Invoice', 'Packing List', 'Certificate of Origin', 'Phytosanitary Certificate', 'Bill of Lading'])
};

const query = `INSERT INTO products (
    title, subtitle, category, image, description, featured, 
    hs_code, origin, supply_type, quality, size_grade, packing, loading_location,
    highlights, specifications, grading_options, packing_options, export_markets, documents
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

const params = [
    product.title, product.subtitle, product.category, product.image, product.description, product.featured,
    product.hs_code, product.origin, product.supply_type, product.quality, product.size_grade, product.packing, product.loading_location,
    product.highlights, product.specifications, product.grading_options, product.packing_options, product.export_markets, product.documents
];

db.run(query, params, function (err) {
    if (err) {
        console.error('Error inserting product:', err.message);
    } else {
        console.log(`Product inserted with ID: ${this.lastID}`);
    }
    db.close();
});
