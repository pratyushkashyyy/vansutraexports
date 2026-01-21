import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { verbose } = sqlite3;
const sqlite3Verbose = verbose();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));

// Sitemap route
app.get('/sitemap.xml', (req, res) => {
    const baseUrl = 'https://vansutraexports.com';
    const categories = ['vegetables', 'fruits', 'spices', 'cereals', 'pulses', 'iqf', 'feed', 'organic', 'flowers'];
    const urls = [
        { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'daily' },
        { loc: `${baseUrl}/about`, priority: '0.8', changefreq: 'monthly' },
        { loc: `${baseUrl}/products`, priority: '0.9', changefreq: 'daily' },
        { loc: `${baseUrl}/contact`, priority: '0.7', changefreq: 'monthly' },
        ...categories.map(cat => ({ loc: `${baseUrl}/products?category=${cat}`, priority: '0.8', changefreq: 'weekly' }))
    ];
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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


// Database Setup
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3Verbose.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to SQLite database');
        initDb();
    }
});

function initDb() {
    db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    subtitle TEXT,
    category TEXT NOT NULL,
    image TEXT,
    description TEXT,
    featured INTEGER DEFAULT 0
  )`, (err) => {
        if (err) console.error('Error creating table:', err);
        else seedDb();
    });
}

function seedDb() {
    db.get("SELECT count(*) as count FROM products", (err, row) => {
        if (err) return;
        if (row.count === 0) {
            console.log('Seeding database...');
            const stmt = db.prepare("INSERT INTO products (title, subtitle, category, image, description, featured) VALUES (?, ?, ?, ?, ?, ?)");
            const seeds = [
                ['Onion', 'Fresh Red Onion', 'vegetables', '/assets/products/vegetables/onion.webp', 'High quality fresh red onions.', 1],
                ['Green Chilli', 'Spicy Green Chilli', 'vegetables', '/assets/products/vegetables/green_chilli.webp', 'Fresh spicy green chillies.', 1],
                ['Green Pea', 'Fresh Green Peas', 'vegetables', '/assets/products/vegetables/green_pea.webp', 'Sweet and tender green peas.', 0],
                ['Grapes', 'Export Quality Grapes', 'fruits', '/assets/products/fruits/grapes.webp', 'Sweet and juicy seedless grapes.', 1]
            ];
            seeds.forEach(s => stmt.run(s));
            stmt.finalize();
        }
    });
}

// Multer Setup for Image Upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../public/assets/products/uploads');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Routes

// Get all products
app.get('/api/products', (req, res) => {
    const category = req.query.category;
    const featured = req.query.featured;
    let query = "SELECT * FROM products";
    let params = [];
    let conditions = [];

    if (category) {
        conditions.push("category = ?");
        params.push(category);
    }

    if (featured === 'true') {
        conditions.push("featured = 1");
    }

    if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Add new product
app.post('/api/products', upload.single('image'), (req, res) => {
    const { title, subtitle, category, description, featured } = req.body;
    const image = req.file ? `/assets/products/uploads/${req.file.filename}` : null;
    const isFeatured = featured === 'true' || featured === true ? 1 : 0;

    const stmt = db.prepare("INSERT INTO products (title, subtitle, category, image, description, featured) VALUES (?, ?, ?, ?, ?, ?)");
    stmt.run([title, subtitle, category, image, description, isFeatured], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, title, subtitle, category, image, description, featured: isFeatured });
    });
    stmt.finalize();
});

// Delete product
app.delete('/api/products/:id', (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM products WHERE id = ?", id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Product deleted", changes: this.changes });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
