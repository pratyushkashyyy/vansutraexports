// Populate database with all products
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new sqlite3.Database(join(__dirname, 'database.sqlite'));

const products = [
    // Spices
    { title: 'Garlic', subtitle: 'Premium Quality', category: 'spices', image: '/assets/products/spices/garlic.webp', description: 'Fresh, aromatic garlic bulbs', featured: 1 },
    { title: 'Cumin', subtitle: 'Export Quality', category: 'spices', image: '/assets/products/spices/cumin.webp', description: 'Premium cumin seeds', featured: 1 },
    { title: 'Ginger', subtitle: 'Fresh & Organic', category: 'spices', image: '/assets/products/spices/ginger.webp', description: 'High-quality fresh ginger', featured: 1 },
    { title: 'Turmeric', subtitle: 'Pure & Natural', category: 'spices', image: '/assets/products/spices/turmeric.webp', description: 'Golden turmeric powder', featured: 0 },
    { title: 'Chilli', subtitle: 'Hot & Spicy', category: 'spices', image: '/assets/products/spices/chilli.webp', description: 'Red chilli peppers', featured: 0 },
    { title: 'Black Pepper', subtitle: 'Premium Grade', category: 'spices', image: '/assets/products/spices/black_pepper.webp', description: 'Whole black peppercorns', featured: 0 },
    { title: 'Cinnamon', subtitle: 'Aromatic Spice', category: 'spices', image: '/assets/products/spices/cinnamon.webp', description: 'Ceylon cinnamon sticks', featured: 0 },

    // Vegetables
    { title: 'Onion', subtitle: 'Fresh & Crisp', category: 'vegetables', image: '/assets/products/vegetables/onion.webp', description: 'Premium quality onions', featured: 1 },
    { title: 'Green Chilli', subtitle: 'Hot & Fresh', category: 'vegetables', image: '/assets/products/vegetables/greenchilly.webp', description: 'Fresh green chillies', featured: 1 },
    { title: 'Potato', subtitle: 'Farm Fresh', category: 'vegetables', image: '/assets/products/vegetables/potato.webp', description: 'High-quality potatoes', featured: 0 },
    { title: 'Yam (Suran)', subtitle: 'Nutritious', category: 'vegetables', image: '/assets/products/vegetables/yam.webp', description: 'Fresh yam tubers', featured: 0 },
    { title: 'Drumstick', subtitle: 'Organic', category: 'vegetables', image: '/assets/products/vegetables/drumstick.webp', description: 'Fresh drumsticks', featured: 0 },
    { title: 'Green Pea', subtitle: 'Sweet & Fresh', category: 'vegetables', image: '/assets/products/vegetables/greenpea.webp', description: 'Fresh green peas', featured: 1 },

    // Fruits
    { title: 'Grapes', subtitle: 'Sweet & Juicy', category: 'fruits', image: '/assets/products/fruits/grapes.webp', description: 'Premium quality grapes', featured: 1 },
    { title: 'Guava', subtitle: 'Fresh & Ripe', category: 'fruits', image: '/assets/products/fruits/guava.webp', description: 'Tropical guavas', featured: 0 },
    { title: 'Banana', subtitle: 'Naturally Sweet', category: 'fruits', image: '/assets/products/fruits/banana.webp', description: 'Fresh bananas', featured: 0 },
    { title: 'Lemon', subtitle: 'Citrus Fresh', category: 'fruits', image: '/assets/products/fruits/lemon.webp', description: 'Juicy lemons', featured: 0 },
    { title: 'Pomegranate', subtitle: 'Rich & Healthy', category: 'fruits', image: '/assets/products/fruits/pomogranate.webp', description: 'Premium pomegranates', featured: 0 },

    // Cereals
    { title: 'Rice', subtitle: 'Premium Basmati', category: 'cereals', image: '/assets/products/cereals/rice.webp', description: 'Long grain basmati rice', featured: 0 },
    { title: 'Wheat', subtitle: 'Whole Grain', category: 'cereals', image: '/assets/products/cereals/wheat.webp', description: 'High-quality wheat', featured: 0 },
    { title: 'Corn', subtitle: 'Sweet Corn', category: 'cereals', image: '/assets/products/cereals/corn.webp', description: 'Fresh corn kernels', featured: 0 },
    { title: 'Sorghum (Jwari)', subtitle: 'Nutritious Grain', category: 'cereals', image: '/assets/products/cereals/jwari.webp', description: 'Whole sorghum grains', featured: 0 },
    { title: 'Pearl Millet (Bajra)', subtitle: 'Healthy Grain', category: 'cereals', image: '/assets/products/cereals/bajra.webp', description: 'Pearl millet grains', featured: 0 },

    // Pulses
    { title: 'Green Gram', subtitle: 'Moong Dal', category: 'pulses', image: '/assets/products/pulses/greengram.webp', description: 'Premium green gram', featured: 0 },
    { title: 'Chickpea', subtitle: 'Chana Dal', category: 'pulses', image: '/assets/products/pulses/chickpe.webp', description: 'High-quality chickpeas', featured: 0 },
    { title: 'Dry Pea', subtitle: 'Matar Dal', category: 'pulses', image: '/assets/products/pulses/drypea.webp', description: 'Dried peas', featured: 0 },
    { title: 'Pigeon Pea', subtitle: 'Toor Dal', category: 'pulses', image: '/assets/products/pulses/pigeonpea.webp', description: 'Premium pigeon peas', featured: 0 },
    { title: 'Soybean', subtitle: 'Protein Rich', category: 'pulses', image: '/assets/products/pulses/soyabean.webp', description: 'High-protein soybeans', featured: 0 },
    { title: 'Lentil', subtitle: 'Masoor Dal', category: 'pulses', image: '/assets/products/pulses/lentil.webp', description: 'Red lentils', featured: 0 },

    // IQF
    { title: 'IQF Green Pea', subtitle: 'Frozen Fresh', category: 'iqf', image: '/assets/products/iqf/greenpea.webp', description: 'Individually quick frozen peas', featured: 0 },
    { title: 'IQF Sweet Corn', subtitle: 'Frozen Fresh', category: 'iqf', image: '/assets/products/iqf/sweetcorn.webp', description: 'Frozen sweet corn kernels', featured: 0 },

    // Animal Feed
    { title: 'Groundnut Cake', subtitle: 'High Protein Feed', category: 'feed', image: '/assets/products/animal_feed/groundnutcake.webp', description: 'Nutritious animal feed', featured: 0 },
    { title: 'Soybean Meal', subtitle: 'Protein Supplement', category: 'feed', image: '/assets/products/animal_feed/soybeanmeal.webp', description: 'High-quality soybean meal', featured: 0 },
    { title: 'Dehusked Soybean', subtitle: 'Premium Feed', category: 'feed', image: '/assets/products/animal_feed/dehuskedsoyabean.webp', description: 'Processed soybean feed', featured: 0 },
    { title: 'DDGS', subtitle: 'Dried Grains', category: 'feed', image: '/assets/products/animal_feed/ddgs.webp', description: 'Distillers dried grains with solubles', featured: 0 },

    // Organic Fertilizer
    { title: 'Cow Dung Compost', subtitle: 'Organic Fertilizer', category: 'organic', image: '/assets/products/organic_fertilizer/cowdungcompost.webp', description: 'Natural cow dung compost', featured: 0 },
    { title: 'Organic Manure', subtitle: 'Eco-Friendly', category: 'organic', image: '/assets/products/organic_fertilizer/organicmanure.webp', description: 'Premium organic manure', featured: 0 },

    // Flowers
    { title: 'Roses', subtitle: 'Fresh Cut Flowers', category: 'flowers', image: '/assets/products/flowers/roses.webp', description: 'Beautiful fresh roses', featured: 0 },
    { title: 'Jasmine', subtitle: 'Fragrant Flowers', category: 'flowers', image: '/assets/products/flowers/jasmine.webp', description: 'Aromatic jasmine flowers', featured: 0 },
    { title: 'Marigold', subtitle: 'Vibrant Blooms', category: 'flowers', image: '/assets/products/flowers/marigold.webp', description: 'Bright marigold flowers', featured: 0 },
    { title: 'Lilies', subtitle: 'Elegant Flowers', category: 'flowers', image: '/assets/products/flowers/lilies.webp', description: 'Premium lily flowers', featured: 0 },
    { title: 'Gerberas', subtitle: 'Colorful Blooms', category: 'flowers', image: '/assets/products/flowers/gerberas.webp', description: 'Vibrant gerbera daisies', featured: 0 },
    { title: 'Orchids', subtitle: 'Exotic Flowers', category: 'flowers', image: '/assets/products/flowers/orchids.webp', description: 'Beautiful orchid flowers', featured: 0 }
];

// Create table if not exists
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        subtitle TEXT,
        category TEXT NOT NULL,
        image TEXT,
        description TEXT,
        featured INTEGER DEFAULT 0
    )`);

    // Clear existing products
    db.run('DELETE FROM products');

    // Insert all products
    const stmt = db.prepare('INSERT INTO products (title, subtitle, category, image, description, featured) VALUES (?, ?, ?, ?, ?, ?)');

    products.forEach(product => {
        stmt.run(product.title, product.subtitle, product.category, product.image, product.description, product.featured);
    });

    stmt.finalize();

    // Verify insertion
    db.all('SELECT COUNT(*) as count FROM products', (err, rows) => {
        if (err) {
            console.error('Error:', err);
        } else {
            console.log(`✅ Successfully added ${rows[0].count} products to the database!`);
        }
        db.close();
    });
});
