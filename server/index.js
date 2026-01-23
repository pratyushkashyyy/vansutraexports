import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import compression from 'compression'; // New dependency
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { verbose } = sqlite3;
const sqlite3Verbose = verbose();

const app = express();
const PORT = 3000;

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Middleware
app.use(compression()); // Compress all responses
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increased limit for detailed blog posts
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));

// Sitemap route
app.get('/sitemap.xml', (req, res) => {
    const baseUrl = 'https://vansutraexports.com';
    const categories = ['vegetables', 'fruits', 'spices', 'cereals', 'pulses', 'iqf', 'feed', 'organic', 'flowers'];

    // Fetch products to add to sitemap
    db.all("SELECT slug FROM products", [], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error generating sitemap");
            return;
        }

        let urls = [
            { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'daily' },
            { loc: `${baseUrl}/about`, priority: '0.8', changefreq: 'monthly' },
            { loc: `${baseUrl}/products`, priority: '0.9', changefreq: 'daily' },
            { loc: `${baseUrl}/contact`, priority: '0.7', changefreq: 'monthly' },
            ...categories.map(cat => ({ loc: `${baseUrl}/products?category=${cat}`, priority: '0.8', changefreq: 'weekly' }))
        ];

        // Add product URLs
        if (rows && rows.length > 0) {
            const productUrls = rows.map(p => ({
                loc: `${baseUrl}/products/${p.slug}`,
                priority: '0.9',
                changefreq: 'weekly'
            }));
            urls = [...urls, ...productUrls];
        }

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
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            subtitle TEXT,
            category TEXT NOT NULL,
            image TEXT,
            description TEXT,
            featured INTEGER DEFAULT 0,
            featured_order INTEGER DEFAULT 0,
            hs_code TEXT,
            origin TEXT,
            supply_type TEXT,
            quality TEXT,
            size_grade TEXT,
            packing TEXT,
            loading_location TEXT,
            highlights TEXT,        -- JSON string
            grading_options TEXT,   -- JSON string
            packing_options TEXT,   -- JSON string
            export_markets TEXT,    -- JSON string
            documents TEXT,         -- JSON string
            specifications TEXT     -- JSON string
        )`, (err) => {
            if (err) console.error('Error creating products table:', err);
            else {
                // Migration: Add featured_order if missing
                db.all("PRAGMA table_info(products)", (err, rows) => {
                    if (!err && rows) {
                        const hasOrder = rows.some(r => r.name === 'featured_order');
                        if (!hasOrder) {
                            db.run("ALTER TABLE products ADD COLUMN featured_order INTEGER DEFAULT 0", (err) => {
                                if (err) console.error("Error adding featured_order column:", err);
                                else console.log("Added featured_order column");
                            });
                        }
                    }
                });
            }
        });

        db.run(`CREATE TABLE IF NOT EXISTS blogs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT UNIQUE,
            title TEXT,
            author TEXT,
            date TEXT,
            category TEXT,
            image TEXT,
            summary TEXT,
            content TEXT
        )`, (err) => {
            if (err) console.error('Error creating blogs table:', err);
            else seedDb();
        });
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

    query += " ORDER BY featured_order ASC, id DESC";

    db.all(query, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Get single product details by ID or Slug
app.get('/api/products/:idOrSlug', (req, res) => {
    const param = req.params.idOrSlug;
    const isId = /^\d+$/.test(param);

    const query = isId ? "SELECT * FROM products WHERE id = ?" : "SELECT * FROM products WHERE slug = ?";

    db.get(query, [param], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: "Product not found" });
            return;
        }
        res.json(row);
    });
});

// Add new product
app.post('/api/products', upload.single('image'), (req, res) => {
    const { title, subtitle, category, description, featured } = req.body;
    const image = req.file ? `/assets/products/uploads/${req.file.filename}` : null;
    const isFeatured = featured === 'true' || featured === true ? 1 : 0;

    // Auto-generate slug from title
    const slug = title.toLowerCase()
        .replace(/ \/ /g, '-')
        .replace(/\s+/g, '-')
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

    const stmt = db.prepare(`INSERT INTO products (
        title, slug, subtitle, category, image, description, featured,
        hs_code, origin, supply_type, quality, size_grade, packing, loading_location,
        highlights, grading_options, packing_options, export_markets, documents, specifications
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

    stmt.run([
        title, slug, subtitle, category, image, description, isFeatured,
        req.body.hs_code, req.body.origin, req.body.supply_type, req.body.quality,
        req.body.size_grade, req.body.packing, req.body.loading_location,
        req.body.highlights, req.body.grading_options, req.body.packing_options,
        req.body.export_markets, req.body.documents, req.body.specifications
    ], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, title, slug, subtitle, category, image, description, featured: isFeatured });
    });
    stmt.finalize();
});

// Update product
app.put('/api/products/:id', upload.single('image'), (req, res) => {
    const id = req.params.id;
    const { title, subtitle, category, description, featured } = req.body;

    // Check if new image uploaded, else keep existing (need to handle in frontend or separate call normally, 
    // but here we can check if file exists. If not, we don't update image column or require frontend to send existing path).
    // Better strategy: fetch existing first or use COALESCE in SQL. 
    // SQLite doesn't support COALESCE in UPDATE elegantly for inputs without complex query.
    // We'll trust the logic: if req.file exists, update it. If not, don't update the column (dynamic query).

    const isFeatured = featured === 'true' || featured === true ? 1 : 0;
    const newImage = req.file ? `/assets/products/uploads/${req.file.filename}` : undefined;

    // Generate slug only if title changes? No, keep slug stable or update it? 
    // Let's update slug to match title for consistency.
    const slug = title.toLowerCase()
        .replace(/ \/ /g, '-')
        .replace(/\s+/g, '-')
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

    let query = `UPDATE products SET 
        title = ?, slug = ?, subtitle = ?, category = ?, description = ?, featured = ?,
        hs_code = ?, origin = ?, supply_type = ?, quality = ?, size_grade = ?, packing = ?, loading_location = ?,
        highlights = ?, grading_options = ?, packing_options = ?, export_markets = ?, documents = ?, specifications = ?`;

    const params = [
        title, slug, subtitle, category, description, isFeatured,
        req.body.hs_code, req.body.origin, req.body.supply_type, req.body.quality,
        req.body.size_grade, req.body.packing, req.body.loading_location,
        req.body.highlights, req.body.grading_options, req.body.packing_options,
        req.body.export_markets, req.body.documents, req.body.specifications
    ];

    if (newImage) {
        query += `, image = ?`;
        params.push(newImage);
    }

    query += ` WHERE id = ?`;
    params.push(id);

    const stmt = db.prepare(query);
    stmt.run(params, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Product updated", changes: this.changes });
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

// Toggle featured status
app.patch('/api/products/:id/featured', (req, res) => {
    const id = req.params.id;
    const { featured } = req.body; // Expect boolean or equivalent
    const isFeatured = featured === 'true' || featured === true || featured === 1 || featured === '1' ? 1 : 0;

    db.run("UPDATE products SET featured = ? WHERE id = ?", [isFeatured, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Featured status updated", changes: this.changes });
    });
});

// Update featured products order
app.put('/api/featured-order', (req, res) => {
    const { order } = req.body; // Array of product IDs in order
    if (!Array.isArray(order)) {
        res.status(400).json({ error: "Invalid input" });
        return;
    }

    db.serialize(() => {
        const stmt = db.prepare("UPDATE products SET featured_order = ? WHERE id = ?");
        order.forEach((id, index) => {
            stmt.run(index, id);
        });
        stmt.finalize((err) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ message: "Featured order updated" });
            }
        });
    });
});

// --- Blog API Routes ---
app.get('/api/blogs', (req, res) => {
    db.all("SELECT * FROM blogs ORDER BY id DESC", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Get single blog by slug
app.get('/api/blogs/:slug', (req, res) => {
    const slug = req.params.slug;
    db.get("SELECT * FROM blogs WHERE slug = ?", [slug], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: "Blog post not found" });
            return;
        }
        res.json(row);
    });
});

// Create new blog post
app.post('/api/blogs', (req, res) => {
    // In a real app, we should check auth token here!
    const { title, slug, content, category, summary, image, author } = req.body;
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    // Auto-generate slug if missing
    const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const sql = `INSERT INTO blogs (slug, title, author, date, category, image, summary, content) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [finalSlug, title, author || 'Admin', date, category || 'News', image, summary, content];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: "Blog created successfully",
            id: this.lastID,
            slug: finalSlug
        });
    });
});

// Delete blog post
app.delete('/api/blogs/:id', (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM blogs WHERE id = ?", id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Deleted", changes: this.changes });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
