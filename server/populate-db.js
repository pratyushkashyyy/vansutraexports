import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new sqlite3.Database(join(__dirname, 'database.sqlite'));

// --- Detailed Product Data from User Request ---

const detailedProducts = {
    'Potato': {
        hs_code: '070190',
        subtitle: 'Premium Potato from India',
        description: `We are a reliable supplier & exporter of Fresh Indian Potatoes for domestic and international markets. Our potatoes are carefully sorted and packed to meet export standards, ensuring safe transit and consistent quality.\n\nWe can supply:\n- Fresh harvest potatoes\n- Uniform size grading\n- Export-grade packing\n- Bulk / container orders`,
        highlights: JSON.stringify([
            "Export quality grading (size wise)",
            "Cleaned / sorted potatoes for long shelf life",
            "Strong packaging options (mesh / jute / PP)",
            "Bulk supply + container loading supported"
        ]),
        specifications: JSON.stringify({
            "Type": "Table Potato / Export Potato",
            "Quality": "Domestic & Export Quality",
            "Size / Grade": "35mm+ to 70mm+ (as per requirement)",
            "Skin Color": "White / Light Brown / Red (as per availability)",
            "Flesh": "Firm / good texture",
            "Shelf Life": "Depends on storage & season",
            "Origin": "India",
            "Packing": "Mesh Bag / Jute Bag / PP Bag",
            "Supply Ability": "Bulk / Container Orders",
            "Loading": "India (container loading supported)"
        }),
        grading_options: JSON.stringify({
            export: ["55mm+", "45mm+", "40mm+"],
            domestic: ["35mm+ (Small / Processing Grade)"]
        }),
        packing_options: JSON.stringify({
            standard: ["10 KG Mesh Bag", "20 KG Mesh Bag", "25 KG Mesh Bag"],
            bulk: ["50 KG Bag (PP/Jute)"]
        }),
        export_markets: JSON.stringify(["UAE", "Saudi Arabia", "Qatar", "Kuwait", "Oman", "Sri Lanka", "Malaysia", "Vietnam", "Europe"]),
        documents: JSON.stringify(["Commercial Invoice", "Packing List", "Certificate of Origin (COO)", "Phytosanitary Certificate", "Bill of Lading"])
    },

    'Tomato': {
        hs_code: '070200',
        subtitle: 'Premium Quality Fresh Tomato',
        description: `We supply premium quality Fresh Indian Tomatoes for domestic and export markets. Tomatoes are sorted and packed as per customer requirements to ensure freshness, safe transit, and consistent grading.\n\nWe supply:\n- Fresh tomato for wholesale/importers\n- Uniform grading & packing\n- Regular bulk supply`,
        highlights: JSON.stringify([
            "Fresh farm supply with export grading",
            "Strong packaging for safe transit",
            "Bulk orders & regular supply",
            "Delivery as per destination requirements"
        ]),
        specifications: JSON.stringify({
            "Type / Variety": "Round / Hybrid / Local (as per availability)",
            "Quality": "Domestic & Export Quality",
            "Color": "Green to Red (as required)",
            "Grade": "A / B / Commercial grades",
            "Size / Count": "As per requirement",
            "Shelf Life": "Depends on season, variety & storage",
            "Origin": "India",
            "Packing": "Plastic crate / Carton box / Mesh bag",
            "Supply Ability": "Bulk / Container Orders",
            "Loading": "India (container loading supported)"
        }),
        grading_options: JSON.stringify({
            size: ["Small", "Medium", "Large"],
            color: ["Green", "Turning", "Red"]
        }),
        packing_options: JSON.stringify({
            standard: ["Plastic Crates", "Carton Boxes"],
            custom: ["Proper ventilation packaging available"]
        }),
        export_markets: JSON.stringify(["UAE", "Qatar", "Saudi Arabia", "Kuwait", "Oman", "Sri Lanka", "Malaysia", "Vietnam"]),
        documents: JSON.stringify(["Commercial Invoice", "Packing List", "Certificate of Origin (COO)", "Phytosanitary Certificate", "Bill of Lading"])
    },

    'Green Chilli': { // Mapping Key
        title: 'Green Chilli / Capsicum', // Actual displayed Title
        hs_code: '070960',
        subtitle: 'Fresh Green Chilli / Capsicum (Bell Pepper)',
        description: `We supply premium quality Fresh Green Chilli and Capsicum (Bell Pepper) for domestic and export markets. Our products are carefully sorted, graded, and packed to meet buyer requirements, ensuring freshness and safe transit.\n\nWe supply:\n- Green Chilli (export grade)\n- Capsicum / Bell Pepper (green & color)\n- Bulk & regular supply`,
        highlights: JSON.stringify([
            "Fresh harvest & export quality sorting",
            "Uniform size grading available",
            "Strong export packaging for safe transit",
            "Bulk supply & regular availability"
        ]),
        specifications: JSON.stringify({
            "Type": "Fresh Green Chilli / Bell Pepper",
            "Quality": "Domestic & Export Quality",
            "Color": "Green (also red/yellow capsicum as per availability)",
            "Size / Grade": "Small / Medium / Large (as per requirement)",
            "Shape": "Uniform shape & fresh appearance",
            "Shelf Life": "Depends on season & storage",
            "Origin": "India",
            "Packing": "Carton Box / Plastic Crates",
            "Supply Ability": "Bulk / Container Orders",
            "Loading": "India (container loading supported)"
        }),
        grading_options: JSON.stringify({
            chilli: ["Length (small/medium/long)", "Thickness", "Freshness"],
            capsicum: ["Size: Small/Medium/Large", "Color: Green/Red/Yellow", "Uniform size packs"]
        }),
        packing_options: JSON.stringify({
            export: ["Carton Boxes (ventilated)"],
            domestic: ["Plastic Crates"]
        }),
        export_markets: JSON.stringify(["UAE", "Qatar", "Saudi Arabia", "Kuwait", "Oman", "Sri Lanka", "Malaysia", "Vietnam", "Europe"]),
        documents: JSON.stringify(["Commercial Invoice", "Packing List", "Certificate of Origin (COO)", "Phytosanitary Certificate", "Bill of Lading"])
    },
    'Cucumber / Gherkins': {
        hs_code: '070700',
        subtitle: 'Fresh Cucumber / Gherkins',
        description: `We supply premium quality Fresh Cucumbers and Gherkins for domestic and international markets. Our cucumbers/gherkins are carefully sorted, graded, and packed to meet export standards, ensuring freshness and safe transit.\n\nWe supply:\n- Fresh cucumbers for wholesale buyers/importers\n- Gherkins (small size export grade)\n- Bulk & container orders supported`,
        highlights: JSON.stringify([
            "Fresh farm supply with export sorting",
            "Uniform size grading & quality packing",
            "Bulk orders & regular supply",
            "Packing as per destination requirement"
        ]),
        specifications: JSON.stringify({
            "Type": "Cucumber / Gherkins",
            "Quality": "Domestic & Export Quality",
            "Color": "Fresh green",
            "Size / Grade": "Small / Medium / Large (as per requirement)",
            "Shape": "Straight, uniform, fresh",
            "Shelf Life": "Depends on storage & season",
            "Origin": "India",
            "Packing": "Carton Box / Plastic Crates",
            "Supply Ability": "Bulk / Container Orders",
            "Loading": "India (container loading supported)"
        }),
        grading_options: JSON.stringify({
            cucumber: ["Small size", "Medium size", "Large size"],
            gherkins: ["Small export size", "Uniform length & thickness"]
        }),
        packing_options: JSON.stringify({
            export: ["Carton Boxes (Export cartons)", "Custom packing available"],
            domestic: ["Plastic Crates"]
        }),
        export_markets: JSON.stringify(["UAE", "Qatar", "Saudi Arabia", "Kuwait", "Oman", "Sri Lanka", "Malaysia", "Vietnam", "Europe"]),
        documents: JSON.stringify(["Commercial Invoice", "Packing List", "Certificate of Origin (COO)", "Phytosanitary Certificate", "Bill of Lading"])
    },

    'Garlic': {
        hs_code: '070320',
        subtitle: 'Premium Quality Fresh Garlic',
        description: `We supply premium quality Indian Fresh Garlic for both domestic and export markets. Our garlic is carefully sorted, cleaned, and packed as per export standards to ensure safe delivery and long shelf life.\n\nWe supply:\n- Fresh garlic bulbs (export quality)\n- Cleaned and graded garlic\n- Bulk supply for importers & wholesalers`,
        highlights: JSON.stringify([
            "Fresh & dried garlic supply",
            "Export quality grading & sorting",
            "Strong packing for long transit",
            "Bulk orders & regular supply available"
        ]),
        specifications: JSON.stringify({
            "Type": "Whole Garlic Bulbs",
            "Quality": "Domestic & Export Quality",
            "Color": "White / Off-white",
            "Grade": "A / B / Commercial grades",
            "Size": "30mm+ to 60mm+ (as per requirement)",
            "Moisture": "As per export standard",
            "Shelf Life": "Depends on storage conditions",
            "Origin": "India",
            "Packing": "Mesh Bag / Jute Bag / Carton",
            "Supply Ability": "Bulk / Container Orders",
            "Loading": "India (container loading supported)"
        }),
        grading_options: JSON.stringify({
            export: ["55mm+", "50mm+", "45mm+", "40mm+"],
            small: ["30mm+", "35mm+"]
        }),
        packing_options: JSON.stringify({
            standard: ["10 KG Mesh Bag", "20 KG Mesh Bag", "25 KG Mesh Bag"],
            other: ["Jute Bag Packing", "Carton Packing"]
        }),
        export_markets: JSON.stringify(["UAE", "Saudi Arabia", "Qatar", "Kuwait", "Oman", "Sri Lanka", "Malaysia", "Vietnam", "Europe"]),
        documents: JSON.stringify(["Commercial Invoice", "Packing List", "Certificate of Origin (COO)", "Phytosanitary Certificate", "Bill of Lading"])
    },

    'Ginger (fresh)': {
        hs_code: '091011',
        subtitle: 'Premium Quality Fresh Ginger',
        description: `We supply premium quality Fresh Indian Ginger for domestic and export markets. Our ginger is carefully sorted, cleaned, and packed as per buyer requirements to ensure freshness, quality, and safe delivery.\n\nWe supply:\n- Fresh ginger rhizomes (export quality)\n- Cleaned / washed ginger on request\n- Bulk supply for importers, wholesalers & distributors`,
        highlights: JSON.stringify([
            "Fresh farm ginger with export sorting",
            "Cleaned, washed & graded ginger available",
            "Strong packing for long transit",
            "Bulk orders & regular supply supported"
        ]),
        specifications: JSON.stringify({
            "Type": "Fresh Ginger Rhizome",
            "Quality": "Domestic & Export Quality",
            "Color": "Natural light brown",
            "Taste/Aroma": "Strong aroma and freshness",
            "Grade": "A / B / Commercial grades",
            "Size": "Small / Medium / Large (as required)",
            "Moisture": "As per export standard",
            "Shelf Life": "Depends on storage conditions",
            "Origin": "India",
            "Packing": "Mesh Bag / Jute Bag / Carton",
            "Supply Ability": "Bulk / Container Orders",
            "Loading": "India (container loading supported)"
        }),
        grading_options: JSON.stringify({
            export: ["Large ginger (premium)", "Medium ginger"],
            sorting: ["Clean skin", "Low fiber", "Proper maturity"]
        }),
        packing_options: JSON.stringify({
            standard: ["10 KG Mesh Bag", "20 KG Mesh Bag", "25 KG Mesh Bag"],
            other: ["Jute Bag Packing", "Carton Packing"]
        }),
        export_markets: JSON.stringify(["UAE", "Saudi Arabia", "Qatar", "Kuwait", "Oman", "Sri Lanka", "Malaysia", "Vietnam", "Europe"]),
        documents: JSON.stringify(["Commercial Invoice", "Packing List", "Certificate of Origin (COO)", "Phytosanitary Certificate", "Bill of Lading"])
    },
    'Okra / Ladyfinger': {
        hs_code: '070999',
        subtitle: 'Premium Quality Fresh Okra',
        description: `We supply premium quality Fresh Indian Okra (Ladyfinger) for domestic and international markets. Our okra is carefully sorted and packed to maintain tenderness, freshness, and export standards.\n\nWe supply:\n- Tender export-quality okra\n- Proper sorting and grading\n- Bulk orders for importers and wholesalers`,
        highlights: JSON.stringify([
            "Fresh tender okra for export markets",
            "Uniform grading (length/size wise)",
            "Strong packing with ventilation for safe transit",
            "Bulk supply & regular availability"
        ]),
        specifications: JSON.stringify({
            "Type": "Fresh Okra (Bhindi)",
            "Quality": "Domestic & Export Quality",
            "Color": "Fresh green",
            "Grade": "A / B / Commercial grades",
            "Size": "Small / Medium / Large (as required)",
            "Length": "As per requirement",
            "Texture": "Tender, fresh, non-fibrous",
            "Shelf Life": "Depends on storage and transit",
            "Origin": "India",
            "Packing": "Carton Box / Plastic Crates",
            "Supply Ability": "Bulk / Container Orders",
            "Loading": "India (container loading supported)"
        }),
        grading_options: JSON.stringify({
            length: ["Small length (premium)", "Medium length", "Large length"],
            quality: ["Tender okra only", "No fibrous / over-mature", "Fresh green color"]
        }),
        packing_options: JSON.stringify({
            export: ["Carton Boxes (Export ventilated cartons)", "Custom packing available"],
            domestic: ["Plastic Crates"]
        }),
        export_markets: JSON.stringify(["UAE", "Saudi Arabia", "Qatar", "Kuwait", "Oman", "Sri Lanka", "Malaysia", "Vietnam", "Europe"]),
        documents: JSON.stringify(["Commercial Invoice", "Packing List", "Certificate of Origin (COO)", "Phytosanitary Certificate", "Bill of Lading"])
    }
};


// --- Generic Template for other products ---
const genericTemplate = {
    origin: 'Nashik, Maharashtra – India',
    supply_type: 'Domestic + Export Orders',
    quality: 'Domestic & Export Quality',
    size_grade: 'As per requirement',
    packing: 'Mesh Bag / Jute Bag / PP Bag',
    loading_location: 'Nashik (Container Loading Available)',
    highlights: JSON.stringify([
        "Export quality grading",
        "Strong packing options",
        "Container loading available",
        "Regular supply for bulk orders"
    ]),
    grading_options: JSON.stringify({
        standard: ["Size based grading", "Quality based grading"]
    }),
    packing_options: JSON.stringify({
        standard: ["Standard Bag Packing", "Bulk Packing"]
    }),
    export_markets: JSON.stringify(["UAE", "Saudi Arabia", "Vietnam", "Malaysia"]),
    documents: JSON.stringify(["Commercial Invoice", "Packing List", "COO", "Phytosanitary", "BL"])
};

// --- Product List ---
const products = [
    // Vegetables
    { title: 'Onion', hs_code: '070310', category: 'vegetables', image: '/assets/products/vegetables/onion.webp' },
    { title: 'Potato', hs_code: '070190', category: 'vegetables', image: '/assets/products/vegetables/potato.webp' },
    { title: 'Tomato', hs_code: '070200', category: 'vegetables', image: '/assets/products/vegetables/tomato.webp' },
    { title: 'Green Chilli / Capsicum', hs_code: '070960', category: 'vegetables', image: '/assets/products/vegetables/greenchilly.webp' },
    { title: 'Cucumber / Gherkins', hs_code: '070700', category: 'vegetables', image: '/assets/products/vegetables/cucumber.webp' },
    { title: 'Garlic', hs_code: '070320', category: 'vegetables', image: '/assets/products/spices/garlic.webp' },
    { title: 'Ginger (fresh)', hs_code: '091011', category: 'vegetables', image: '/assets/products/spices/ginger.webp' },
    { title: 'Okra / Ladyfinger', hs_code: '070999', category: 'vegetables', image: '/assets/products/vegetables/okra.webp' },
    { title: 'Brinjal / Eggplant', hs_code: '070930', category: 'vegetables', image: '/assets/products/vegetables/brinjal.webp' },
    { title: 'Cauliflower & Broccoli', hs_code: '070410', category: 'vegetables', image: '/assets/products/vegetables/cauliflower.webp' },
    { title: 'Cabbage', hs_code: '070490', category: 'vegetables', image: '/assets/products/vegetables/cabbage.webp' },
    { title: 'Carrot & Turnip', hs_code: '070690', category: 'vegetables', image: '/assets/products/vegetables/carrot.webp' },
    { title: 'Beans', hs_code: '070820', category: 'vegetables', image: '/assets/products/vegetables/beans.webp' },
    { title: 'Peas', hs_code: '070810', category: 'vegetables', image: '/assets/products/vegetables/greenpea.webp' },
    { title: 'Mushroom', hs_code: '070959', category: 'vegetables', image: '/assets/products/vegetables/mushroom.webp' },

    // Fruits
    { title: 'Banana', hs_code: '080390', category: 'fruits', image: '/assets/products/fruits/banana.webp' },
    { title: 'Grapes', hs_code: '080610', category: 'fruits', image: '/assets/products/fruits/grapes.webp' },
    { title: 'Mango', hs_code: '080450', category: 'fruits', image: '/assets/products/fruits/mango.webp' },
    { title: 'Pomegranate', hs_code: '081090', category: 'fruits', image: '/assets/products/fruits/pomegranate.webp' },
    { title: 'Orange / Citrus', hs_code: '080510', category: 'fruits', image: '/assets/products/fruits/orange.png' },
    { title: 'Apple', hs_code: '080810', category: 'fruits', image: '/assets/products/fruits/apple.png' },
    { title: 'Papaya', hs_code: '080720', category: 'fruits', image: '/assets/products/fruits/papaya.png' },
    { title: 'Watermelon', hs_code: '080711', category: 'fruits', image: '/assets/products/fruits/watermelon.png' },
    { title: 'Guava', hs_code: '080450', category: 'fruits', image: '/assets/products/fruits/guava.webp' },

    // Cereals
    { title: 'Rice (semi/wholly milled)', hs_code: '100630', category: 'cereals', image: '/assets/products/cereals/rice.webp' },
    { title: 'Basmati rice (common line)', hs_code: '10063020', category: 'cereals', image: '/assets/products/cereals/basmati.png' },
    { title: 'Wheat / Meslin', hs_code: '100199', category: 'cereals', image: '/assets/products/cereals/wheat.webp' },
    { title: 'Maize / Corn', hs_code: '100590', category: 'cereals', image: '/assets/products/cereals/corn.webp' },
    { title: 'Sorghum / Jowar', hs_code: '100790', category: 'cereals', image: '/assets/products/cereals/jwari.webp' },
    { title: 'Pearl Millet / Bajra', hs_code: '100821', category: 'cereals', image: '/assets/products/cereals/bajra.webp' },
    { title: 'Ragi / Finger millet', hs_code: '100850', category: 'cereals', image: '/assets/products/cereals/ragi.png' },

    // Pulses
    { title: 'Chickpeas / Chana', hs_code: '071320', category: 'pulses', image: '/assets/products/pulses/chickpe.webp' },
    { title: 'Pigeon pea / Toor', hs_code: '071360', category: 'pulses', image: '/assets/products/pulses/pigeonpea.webp' },
    { title: 'Lentils / Masoor', hs_code: '071340', category: 'pulses', image: '/assets/products/pulses/lentil.webp' },
    { title: 'Kidney beans / Rajma', hs_code: '071333', category: 'pulses', image: '/assets/products/pulses/rajma.png' },
    { title: 'Moong beans', hs_code: '071331', category: 'pulses', image: '/assets/products/pulses/greengram.webp' },

    // Oil Seeds & Pulses Mixed
    { title: 'Groundnut / Peanut (in shell)', hs_code: '120242', category: 'pulses', image: '/assets/products/spices/peanut_shell.webp' },
    { title: 'Groundnut / Peanut (shelled)', hs_code: '120220', category: 'pulses', image: '/assets/products/spices/peanut_shelled.webp' },
    { title: 'Sesame seed (Til)', hs_code: '120740', category: 'spices', image: '/assets/products/spices/sesame.webp' },
    { title: 'Mustard seed (Sarso)', hs_code: '120750', category: 'spices', image: '/assets/products/spices/mustard.webp' },
    { title: 'Soybean', hs_code: '120190', category: 'pulses', image: '/assets/products/pulses/soyabean.webp' },
    { title: 'Castor seed', hs_code: '120730', category: 'spices', image: '/assets/products/spices/castor.webp' },
    { title: 'Cashew nut (shelled)', hs_code: '080132', category: 'fruits', image: '/assets/products/fruits/cashew.png' },

    // Spices
    { title: 'Turmeric', hs_code: '091030', category: 'spices', image: '/assets/products/spices/turmeric.webp' },
    { title: 'Cumin (Jeera)', hs_code: '090930', category: 'spices', image: '/assets/products/spices/cumin.webp' },
    { title: 'Coriander seeds (Dhania)', hs_code: '090920', category: 'spices', image: '/assets/products/spices/coriander.png' },
    { title: 'Fennel (Saunf)', hs_code: '090961', category: 'spices', image: '/assets/products/spices/fennel.png' },
    { title: 'Fenugreek (Methi)', hs_code: '091099', category: 'spices', image: '/assets/products/spices/fenugreek.png' },
    { title: 'Black Pepper', hs_code: '090411', category: 'spices', image: '/assets/products/spices/black_pepper.webp' },
    { title: 'Cardamom', hs_code: '090831', category: 'spices', image: '/assets/products/spices/cardamom.png' }
];

db.serialize(() => {
    // Drop existing table to enforce new schema
    db.run("DROP TABLE IF EXISTS products", (err) => {
        if (err) console.error("Error dropping table:", err);
        else console.log("Table dropped successfully.");
    });

    db.run(`CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT UNIQUE,
        subtitle TEXT,
        category TEXT NOT NULL,
        image TEXT,
        description TEXT,
        featured INTEGER DEFAULT 0,
        hs_code TEXT,
        origin TEXT,
        supply_type TEXT,
        quality TEXT,
        size_grade TEXT,
        packing TEXT,
        loading_location TEXT,
        highlights TEXT,
        grading_options TEXT,
        packing_options TEXT,
        export_markets TEXT,
        documents TEXT,
        specifications TEXT
    )`);

    const stmt = db.prepare(`INSERT INTO products (
        title, slug, subtitle, category, image, description, featured,
        hs_code, origin, supply_type, quality, size_grade, packing, loading_location,
        highlights, grading_options, packing_options, export_markets, documents, specifications
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

    products.forEach(p => {
        // Fallback images for now
        const imagePath = p.image || '/assets/leaf.svg';

        // Generate slug
        const slug = p.title.toLowerCase()
            .replace(/ \/ /g, '-')
            .replace(/\s+/g, '-')
            .replace(/&/g, 'and')
            .replace(/[^a-z0-9-]/g, '')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');

        // Check for specific data
        let pData = genericTemplate;
        let titleToUse = p.title;
        let subTitleToUse = `Premium ${p.title} from India`;
        let descriptionToUse = `High quality ${p.title} for export markets. We ensure best quality, grading and packing.`;

        // Match Logic
        if (p.title === 'Potato') {
            pData = detailedProducts['Potato'];
        } else if (p.title === 'Tomato') {
            pData = detailedProducts['Tomato'];
        } else if (p.title === 'Green Chilli / Capsicum') {
            pData = detailedProducts['Green Chilli'];
            titleToUse = detailedProducts['Green Chilli'].title;
        } else if (p.title === 'Cucumber / Gherkins') {
            pData = detailedProducts['Cucumber / Gherkins'];
        } else if (p.title === 'Garlic') {
            pData = detailedProducts['Garlic'];
        } else if (p.title === 'Ginger (fresh)') {
            pData = detailedProducts['Ginger (fresh)'];
        } else if (p.title === 'Okra / Ladyfinger') {
            pData = detailedProducts['Okra / Ladyfinger'];
        }

        if (detailedProducts[p.title] || p.title === 'Green Chilli / Capsicum' || p.title === 'Cucumber / Gherkins' || p.title === 'Garlic' || p.title === 'Ginger (fresh)' || p.title === 'Okra / Ladyfinger') {
            subTitleToUse = pData.subtitle || subTitleToUse;
            descriptionToUse = pData.description || descriptionToUse;
        }

        stmt.run(
            titleToUse,
            slug,
            subTitleToUse,
            p.category,
            imagePath,
            descriptionToUse,
            (p.title === 'Onion' || p.title === 'Potato' || p.title === 'Grapes' || p.title === 'Tomato') ? 1 : 0,
            pData.hs_code || p.hs_code,
            pData.origin || genericTemplate.origin,
            pData.supply_type || genericTemplate.supply_type,
            pData.quality || genericTemplate.quality,
            pData.size_grade || genericTemplate.size_grade,
            pData.packing || genericTemplate.packing,
            pData.loading_location || genericTemplate.loading_location,
            pData.highlights,
            pData.grading_options,
            pData.packing_options,
            pData.export_markets,
            pData.documents,
            pData.specifications || null
        );
    });

    stmt.finalize();

    db.all('SELECT COUNT(*) as count FROM products', (err, rows) => {
        if (err) console.error(err);
        else console.log(`✅ Populate: Added ${rows[0].count} products.`);
        db.close();
    });
});
