import React, { useState, useEffect } from 'react';
import { Package, Plus, Trash2, Save, FileText, Edit3, LogOut, Layout, List, Layers, Globe, CheckSquare, ChevronLeft, ChevronRight, X, ArrowUp, ArrowDown, Star } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const quillModules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean']
    ]
};

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

// --- Helper Components ---

const DynamicListInput = ({ items, onChange, placeholder, title, icon: Icon }) => {
    const handleAdd = () => {
        onChange([...items, '']);
    };

    const handleRemove = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        onChange(newItems);
    };

    const handleChange = (index, value) => {
        const newItems = [...items];
        newItems[index] = value;
        onChange(newItems);
    };

    return (
        <div style={{ marginBottom: '1.5rem', backgroundColor: '#f9f9f9', padding: '1rem', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', color: '#555' }}>
                {Icon && <Icon size={16} />} {title}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {items.map((item, index) => (
                    <div key={index} style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                            type="text"
                            value={item}
                            onChange={(e) => handleChange(index, e.target.value)}
                            placeholder={placeholder}
                            style={{ flex: 1, padding: '0.6rem', borderRadius: '4px', border: '1px solid #ddd' }}
                        />
                        <button type="button" onClick={() => handleRemove(index)} style={{ color: '#ff4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                            <X size={18} />
                        </button>
                    </div>
                ))}
                <button type="button" onClick={handleAdd} style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', marginTop: '0.5rem' }}>
                    <Plus size={16} /> Add Item
                </button>
            </div>
        </div>
    );
};

const DynamicMapInput = ({ items, onChange, title, keyPlaceholder, valPlaceholder }) => {
    const handleAdd = () => {
        onChange({ ...items, '': '' });
    };

    const handleRemove = (key) => {
        const newItems = { ...items };
        delete newItems[key];
        onChange(newItems);
    };

    const handleChangeKey = (oldKey, newKey, val) => {
        if (oldKey === newKey) return;
        const newItems = { ...items };
        newItems[newKey] = val; // Assign to new key
        delete newItems[oldKey]; // Delete old key
        onChange(newItems);
    };

    const handleChangeVal = (key, newVal) => {
        onChange({ ...items, [key]: newVal });
    };

    return (
        <div style={{ marginBottom: '1.5rem', backgroundColor: '#f9f9f9', padding: '1rem', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '0.8rem', fontSize: '0.95rem', color: '#555' }}>{title}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {Object.entries(items).map(([key, val], index) => (
                    <div key={index} style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                            type="text"
                            value={key}
                            onChange={(e) => handleChangeKey(key, e.target.value, val)}
                            placeholder={keyPlaceholder}
                            style={{ flex: 1, padding: '0.6rem', borderRadius: '4px', border: '1px solid #ddd', fontWeight: 'bold' }}
                        />
                        <input
                            type="text"
                            value={val}
                            onChange={(e) => handleChangeVal(key, e.target.value)}
                            placeholder={valPlaceholder}
                            style={{ flex: 2, padding: '0.6rem', borderRadius: '4px', border: '1px solid #ddd' }}
                        />
                        <button type="button" onClick={() => handleRemove(key)} style={{ color: '#ff4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                            <X size={18} />
                        </button>
                    </div>
                ))}
                <button type="button" onClick={handleAdd} style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', marginTop: '0.5rem' }}>
                    <Plus size={16} /> Add Spec Row
                </button>
            </div>
        </div>
    );
};

const TabButton = ({ active, onClick, label, icon: Icon }) => (
    <button
        type="button"
        onClick={onClick}
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '1rem 1.5rem',
            backgroundColor: active ? 'white' : 'transparent',
            border: 'none',
            borderBottom: active ? '3px solid var(--color-primary)' : '3px solid transparent',
            color: active ? 'var(--color-primary)' : '#666',
            fontWeight: active ? 'bold' : 'normal',
            cursor: 'pointer',
            fontSize: '0.95rem',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s'
        }}
    >
        <Icon size={18} /> {label}
    </button>
);



const FeaturedManager = () => {
    const [groupedProducts, setGroupedProducts] = useState({ fruits: [], vegetables: [], spices: [], cereals: [], other: [] });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchFeatured();
    }, []);

    const fetchFeatured = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/products?featured=true');
            const data = await res.json();

            // Group by category (preserving backend order within groups)
            const groups = { fruits: [], vegetables: [], spices: [], cereals: [], other: [] };
            data.forEach(p => {
                let cat = p.category.toLowerCase();
                if (cat === 'rice') cat = 'cereals';

                if (groups[cat]) groups[cat].push(p);
                else groups.other.push(p);
            });
            setGroupedProducts(groups);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const saveOrder = async (newGroups) => {
        setGroupedProducts(newGroups); // Optimistic update

        // Flatten in specific order
        const allProducts = [
            ...newGroups.fruits,
            ...newGroups.vegetables,
            ...newGroups.spices,
            ...newGroups.cereals,
            ...newGroups.other
        ];

        try {
            await fetch('/api/featured-order', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ order: allProducts.map(p => p.id) })
            });
        } catch (e) {
            console.error("Failed to save order", e);
            fetchFeatured(); // Revert on error
        }
    };

    const moveUp = (category, index) => {
        if (index === 0) return;
        const list = [...groupedProducts[category]];
        [list[index - 1], list[index]] = [list[index], list[index - 1]];

        const newGroups = { ...groupedProducts, [category]: list };
        saveOrder(newGroups);
    };

    const moveDown = (category, index) => {
        const list = [...groupedProducts[category]];
        if (index === list.length - 1) return;
        [list[index + 1], list[index]] = [list[index], list[index + 1]];

        const newGroups = { ...groupedProducts, [category]: list };
        saveOrder(newGroups);
    };

    const removeFeatured = async (product) => {
        if (!confirm(`Remove "${product.title}" from Featured?`)) return;
        try {
            const res = await fetch(`/api/products/${product.id}`);
            const fullProduct = await res.json();

            const formData = new FormData();
            formData.append('title', fullProduct.title);
            formData.append('category', fullProduct.category);
            formData.append('featured', 'false');

            Object.keys(fullProduct).forEach(key => {
                if (key !== 'id' && key !== 'featured' && fullProduct[key] !== null) {
                    if (typeof fullProduct[key] === 'object') formData.append(key, JSON.stringify(fullProduct[key]));
                    else formData.append(key, fullProduct[key]);
                }
            });

            await fetch(`/api/products/${product.id}`, { method: 'PUT', body: formData });
            fetchFeatured();
        } catch (e) {
            console.error("Error removing featured", e);
        }
    };

    const categoryTitles = {
        fruits: 'Fresh Fruits',
        vegetables: 'Fresh Vegetables',
        spices: 'Whole & Ground Spices',
        cereals: 'Quality Cereals',
        other: 'Other Products'
    };

    return (
        <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '12px', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <Star size={24} fill="#f88500" stroke="#f88500" /> Featured Products Manager
            </h2>
            <p style={{ marginBottom: '2rem', color: '#666' }}>
                Reorder products within their categories.
            </p>

            {loading ? <p>Loading...</p> : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {Object.entries(groupedProducts).map(([category, items]) => (
                        (items.length > 0 || category !== 'other') && (
                            <div key={category} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '1rem', backgroundColor: '#fafafa' }}>
                                <h3 style={{ marginBottom: '1rem', textTransform: 'capitalize', color: 'var(--color-primary)', borderBottom: '2px solid #eee', paddingBottom: '0.5rem' }}>
                                    {categoryTitles[category] || category}
                                </h3>

                                {items.length === 0 ? (
                                    <p style={{ fontStyle: 'italic', color: '#999', padding: '1rem', textAlign: 'center' }}>No featured products in this category.</p>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {items.map((p, index) => (
                                            <div key={p.id} style={{
                                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                padding: '1rem', border: '1px solid #eee', borderRadius: '8px',
                                                backgroundColor: 'white'
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                    <span style={{ fontWeight: 'bold', color: '#aaa', width: '20px' }}>{index + 1}</span>
                                                    <img src={p.image || '/assets/leaf.svg'} alt={p.title} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                                                    <div>
                                                        <div style={{ fontWeight: '600' }}>{p.title}</div>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <button onClick={() => moveUp(category, index)} disabled={index === 0}
                                                        style={{ padding: '0.5rem', cursor: index === 0 ? 'default' : 'pointer', opacity: index === 0 ? 0.3 : 1, border: '1px solid #ddd', borderRadius: '4px', background: 'white' }}>
                                                        <ArrowUp size={18} />
                                                    </button>
                                                    <button onClick={() => moveDown(category, index)} disabled={index === items.length - 1}
                                                        style={{ padding: '0.5rem', cursor: index === items.length - 1 ? 'default' : 'pointer', opacity: index === items.length - 1 ? 0.3 : 1, border: '1px solid #ddd', borderRadius: '4px', background: 'white' }}>
                                                        <ArrowDown size={18} />
                                                    </button>
                                                    <button onClick={() => removeFeatured(p)}
                                                        style={{ marginLeft: '1rem', color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>
                                                        <X size={20} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    ))}
                    {/* Removed overall no products message since we show empty categories now */}
                </div>
            )}
        </div>
    );
};

const Admin = () => {
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');

    // Global State
    const [activeSection, setActiveSection] = useState('products'); // 'products' or 'blogs'

    // --- Product State ---
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('basic');
    const [editingId, setEditingId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);
    const [existingCategories, setExistingCategories] = useState(['vegetables', 'fruits', 'cereals', 'pulses', 'spices', 'iqf', 'feed', 'organic', 'flowers']);

    const initialProductForm = {
        title: '', subtitle: '', category: 'vegetables', customCategory: '', description: '', image: null, featured: false,
        hs_code: '', origin: 'Nashik, Maharashtra – India', supply_type: 'Domestic + Export Orders', quality: 'Domestic & Export Quality',
        size_grade: 'As per requirement', packing: 'Mesh Bag / Jute Bag / PP Bag', loading_location: 'Nashik (Container Loading Available)',
        specifications: { '': '' }, highlights: ['', '', ''], grading_export: ['', ''], grading_domestic: ['', ''],
        packing_options: { 'domestic': ['50 KG Bag'], 'export': ['25 KG Mesh Bag'] }, newPackingMarket: '',
        export_markets: ['', ''], documents: ['Commercial Invoice', 'Packing List', 'Certificate of Origin (COO)', 'Phytosanitary Certificate', 'Bill of Lading']
    };
    const [formData, setFormData] = useState(initialProductForm);

    // --- Blog State ---
    const [blogs, setBlogs] = useState([]);
    const [isBlogLoading, setIsBlogLoading] = useState(false);
    const [blogForm, setBlogForm] = useState({
        title: '', slug: '', category: 'Market Insights', image: '', summary: '', content: '', author: 'Vansutra Exports Team'
    });

    // --- Effects ---
    useEffect(() => {
        const auth = sessionStorage.getItem('adminAuth');
        if (auth === 'true') setIsAuthenticated(true);
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchProducts();
            fetchBlogs();
        }
    }, [isAuthenticated]);

    // --- Actions ---
    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'Uncharted@6464') {
            setIsAuthenticated(true);
            sessionStorage.setItem('adminAuth', 'true');
            setPassword('');
        } else {
            alert('Incorrect password!');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('adminAuth');
    };

    // --- Product Logic ---
    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data.reverse());
            const cats = new Set(['vegetables', 'fruits', 'cereals', 'pulses', 'spices']);
            data.forEach(p => cats.add(p.category));
            setExistingCategories(Array.from(cats));
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // ... (Keep existing Product Helper Functions abbreviated for rewrite)
    const handleEdit = (product) => {
        setEditingId(product.id);
        setActiveTab('basic');
        const safeJSON = (str, fallback) => { try { return str ? JSON.parse(str) : fallback; } catch (e) { return fallback; } };
        const highlights = safeJSON(product.highlights, ['', '', '']);
        const grading = safeJSON(product.grading_options, { export: [], domestic: [] });
        const packing = safeJSON(product.packing_options, { domestic: [], export: [] });
        const markets = safeJSON(product.export_markets, []);
        const docs = safeJSON(product.documents, []);
        const specs = safeJSON(product.specifications, {});
        if (Object.keys(specs).length === 0) specs[''] = '';

        setFormData({
            title: product.title || '', subtitle: product.subtitle || '', category: product.category || 'vegetables', customCategory: '',
            description: product.description || '', image: product.image || null, featured: !!product.featured, hs_code: product.hs_code || '',
            origin: product.origin || '', supply_type: product.supply_type || '', quality: product.quality || '', size_grade: product.size_grade || '',
            packing: product.packing || '', loading_location: product.loading_location || '', specifications: specs,
            highlights: highlights.length ? highlights : ['', '', ''], grading_export: grading.export || [], grading_domestic: grading.domestic || [],
            packing_options: packing, newPackingMarket: '', export_markets: markets, documents: docs
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => { setEditingId(null); setFormData(initialProductForm); setActiveTab('basic'); };
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'file') setFormData(prev => ({ ...prev, image: files[0] }));
        else if (type === 'checkbox') setFormData(prev => ({ ...prev, [name]: checked }));
        else setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleJsonListChange = (key, newList) => setFormData(prev => ({ ...prev, [key]: newList }));
    const handlePackingChange = (market, newOptions) => setFormData(prev => ({ ...prev, packing_options: { ...prev.packing_options, [market]: newOptions } }));
    const addPackingMarket = () => { if (formData.newPackingMarket) { setFormData(prev => ({ ...prev, packing_options: { ...prev.packing_options, [prev.newPackingMarket]: [''] }, newPackingMarket: '' })); } };
    const removePackingMarket = (market) => { const newPacking = { ...formData.packing_options }; delete newPacking[market]; setFormData(prev => ({ ...prev, packing_options: newPacking })); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (['highlights', 'export_markets', 'documents'].includes(key)) data.append(key, JSON.stringify(formData[key].filter(i => i)));
            else if (key === 'specifications') {
                const clean = {}; Object.entries(formData[key]).forEach(([k, v]) => { if (k.trim()) clean[k] = v; });
                data.append(key, JSON.stringify(clean));
            } else if (key === 'packing_options') data.append(key, JSON.stringify(formData[key]));
            else if (key === 'grading_export' || key === 'grading_domestic') { /* handled via grading_options object construction below */ }
            else if (key === 'category') data.append(key, formData.customCategory || formData.category);
            else if (key !== 'newPackingMarket' && key !== 'customCategory' && key !== 'grading_export' && key !== 'grading_domestic') data.append(key, formData[key]);
        });
        data.append('grading_options', JSON.stringify({ export: formData.grading_export.filter(i => i), domestic: formData.grading_domestic.filter(i => i) }));

        try {
            const url = editingId ? `/api/products/${editingId}` : '/api/products';
            const method = editingId ? 'PUT' : 'POST';
            const res = await fetch(url, { method, body: data });
            if (res.ok) { alert(editingId ? 'Product Updated!' : 'Product Added!'); handleCancelEdit(); fetchProducts(); }
            else alert('Failed to save product');
        } catch (error) { console.error(error); } finally { setLoading(false); }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this product permanently?')) {
            await fetch(`/api/products/${id}`, { method: 'DELETE' });
            fetchProducts();
        }
    };

    // --- Blog Logic ---
    const fetchBlogs = async () => {
        try { const res = await fetch('/api/blogs'); const data = await res.json(); setBlogs(data); } catch (e) { console.error(e); }
    };

    const handleBlogChange = (e) => setBlogForm({ ...blogForm, [e.target.name]: e.target.value });
    const handleBlogContentChange = (content) => setBlogForm({ ...blogForm, content }); // Quill

    const handleBlogSubmit = async (e) => {
        e.preventDefault();
        setIsBlogLoading(true);
        try {
            const res = await fetch('/api/blogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(blogForm)
            });
            if (res.ok) {
                alert('Blog Post Published!');
                setBlogForm({ title: '', slug: '', category: 'Market Insights', image: '', summary: '', content: '', author: 'Vansutra Exports Team' });
                fetchBlogs();
            } else alert('Failed to publish.');
        } catch (e) { console.error(e); } finally { setIsBlogLoading(false); }
    };

    const handleDeleteBlog = async (id) => {
        if (window.confirm('Delete this post?')) {
            await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
            fetchBlogs();
        }
    };


    // --- Render ---
    if (!isAuthenticated) return <LoginScreen onLogin={handleLogin} password={password} setPassword={setPassword} />;

    return (
        <div style={{ backgroundColor: '#f4f6f8', minHeight: '100vh', paddingBottom: '4rem' }}>
            {/* Header */}
            <div style={{ backgroundColor: 'white', padding: '1rem 0', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <h2 style={{ color: 'var(--color-primary)', fontSize: '1.5rem', margin: 0 }}>Vansutra Admin</h2>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => setActiveSection('products')} style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: 'none', backgroundColor: activeSection === 'products' ? '#e8f5e9' : 'transparent', color: activeSection === 'products' ? 'var(--color-primary)' : '#666', fontWeight: 'bold', cursor: 'pointer' }}>Products</button>
                            <button onClick={() => setActiveSection('featured')} style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: 'none', backgroundColor: activeSection === 'featured' ? '#e8f5e9' : 'transparent', color: activeSection === 'featured' ? 'var(--color-primary)' : '#666', fontWeight: 'bold', cursor: 'pointer' }}>Featured</button>
                            <button onClick={() => setActiveSection('blogs')} style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: 'none', backgroundColor: activeSection === 'blogs' ? '#e8f5e9' : 'transparent', color: activeSection === 'blogs' ? 'var(--color-primary)' : '#666', fontWeight: 'bold', cursor: 'pointer' }}>Blog Posts</button>
                        </div>
                    </div>
                    <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ff4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>

            <div className="container">
                {activeSection === 'products' ? (
                    // PRODUCT SECTION (Reused Logic)
                    <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '2rem', alignItems: 'start' }}>
                        <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                            {/* Simplified for brevity - Assume full product form here (using same components as before) */}
                            <div style={{ padding: '2rem' }}>
                                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                                    <h3>{editingId ? 'Edit Product' : 'Add New Product'}</h3>
                                    {editingId && <button onClick={handleCancelEdit}>Cancel</button>}
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                    <TabButton active={activeTab === 'basic'} onClick={() => setActiveTab('basic')} label="Basic" icon={Layout} />
                                    <TabButton active={activeTab === 'specs'} onClick={() => setActiveTab('specs')} label="Specs" icon={List} />
                                    <TabButton active={activeTab === 'logistics'} onClick={() => setActiveTab('logistics')} label="Logistics" icon={Package} />
                                    <TabButton active={activeTab === 'details'} onClick={() => setActiveTab('details')} label="Details" icon={Layers} />
                                </div>
                                <form onSubmit={handleSubmit}>
                                    {activeTab === 'basic' && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            <input className="input" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
                                            <input className="input" name="subtitle" value={formData.subtitle} onChange={handleChange} placeholder="Subtitle" />
                                            <select className="input" name="category" value={formData.category} onChange={handleChange}>{existingCategories.map(c => <option key={c} value={c}>{c}</option>)}<option value="other">Other</option></select>
                                            <textarea className="input" name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows={3} />

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                <input className="input" name="hs_code" value={formData.hs_code} onChange={handleChange} placeholder="HS Code" />
                                                <input className="input" name="origin" value={formData.origin} onChange={handleChange} placeholder="Origin (e.g. Nashik, India)" />
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                <input className="input" name="quality" value={formData.quality} onChange={handleChange} placeholder="Quality Type" />
                                                <input className="input" name="size_grade" value={formData.size_grade} onChange={handleChange} placeholder="Size / Grade Summary" />
                                            </div>

                                            {formData.image && typeof formData.image === 'string' && (
                                                <div style={{ marginBottom: '0.5rem' }}>
                                                    <p className="label">Current Image:</p>
                                                    <img src={formData.image} alt="Current Product" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' }} />
                                                </div>
                                            )}
                                            <input type="file" name="image" onChange={handleChange} style={{ marginTop: '0.5rem' }} />
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                                <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
                                                <span style={{ fontWeight: 'bold' }}>Mark as Featured Product</span>
                                            </label>
                                        </div>
                                    )}
                                    {activeTab === 'specs' && (
                                        <DynamicMapInput items={formData.specifications} onChange={s => setFormData(p => ({ ...p, specifications: s }))} title="Specifications" keyPlaceholder="Attribute" valPlaceholder="Value" />
                                    )}

                                    {activeTab === 'logistics' && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            <input className="input" name="supply_type" value={formData.supply_type} onChange={handleChange} placeholder="Supply Type" />
                                            <input className="input" name="loading_location" value={formData.loading_location} onChange={handleChange} placeholder="Loading Location" />
                                            <input className="input" name="packing" value={formData.packing} onChange={handleChange} placeholder="Packing Summary (e.g. Mesh Bag)" />

                                            <div style={{ marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                                                <h4 style={{ marginBottom: '1rem' }}>Packing Options</h4>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                    <DynamicListInput
                                                        items={formData.packing_options.domestic || []}
                                                        onChange={l => handlePackingChange('domestic', l)}
                                                        title="Domestic Packing"
                                                        placeholder="e.g. 50kg Bag"
                                                    />
                                                    <DynamicListInput
                                                        items={formData.packing_options.export || []}
                                                        onChange={l => handlePackingChange('export', l)}
                                                        title="Export Packing"
                                                        placeholder="e.g. 25kg Mesh Bag"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'details' && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            <h4 style={{ marginBottom: '0.5rem' }}>Features & Markets</h4>
                                            <DynamicListInput items={formData.highlights} onChange={l => handleJsonListChange('highlights', l)} title="Product Highlights" icon={CheckSquare} placeholder="Highlight..." />
                                            <DynamicListInput items={formData.export_markets} onChange={l => handleJsonListChange('export_markets', l)} title="Export Markets" icon={Globe} placeholder="Country / Region" />

                                            <div style={{ marginTop: '1rem' }}>
                                                <h4 style={{ marginBottom: '1rem' }}>Grading Standards</h4>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                    <DynamicListInput
                                                        items={formData.grading_domestic}
                                                        onChange={l => handleJsonListChange('grading_domestic', l)}
                                                        title="Domestic Grading"
                                                        placeholder="e.g. 40mm+"
                                                    />
                                                    <DynamicListInput
                                                        items={formData.grading_export}
                                                        onChange={l => handleJsonListChange('grading_export', l)}
                                                        title="Export Grading"
                                                        placeholder="e.g. 55mm+"
                                                    />
                                                </div>
                                            </div>

                                            <div style={{ marginTop: '1rem' }}>
                                                <DynamicListInput items={formData.documents} onChange={l => handleJsonListChange('documents', l)} title="Required Documents" icon={FileText} placeholder="Document Name" />
                                            </div>
                                        </div>
                                    )}
                                    <button type="submit" className="btn" disabled={loading} style={{ marginTop: '1rem' }}>Save Product</button>
                                </form>
                            </div>
                        </div>

                        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '1.5rem', maxHeight: '800px', overflowY: 'auto' }}>
                            <h3>Existing Products</h3>
                            {products.map(p => (
                                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.8rem', borderBottom: '1px solid #eee' }}>
                                    <span>{p.title}</span>
                                    <div>
                                        <button onClick={() => handleEdit(p)} style={{ marginRight: '0.5rem' }}><Edit3 size={16} /></button>
                                        <button onClick={() => handleDelete(p.id)} style={{ color: 'red' }}><Trash2 size={16} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : activeSection === 'featured' ? (
                    <FeaturedManager />
                ) : (
                    // BLOG SECTION
                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                        {/* Editor */}
                        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Edit3 size={24} color="var(--color-primary)" /> Write New Post
                            </h2>
                            <form onSubmit={handleBlogSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <input className="input" name="title" placeholder="Blog Title" value={blogForm.title} onChange={handleBlogChange} required />
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <input className="input" name="slug" placeholder="Slug (optional)" value={blogForm.slug} onChange={handleBlogChange} />
                                    <select className="input" name="category" value={blogForm.category} onChange={handleBlogChange}>
                                        <option value="Market Insights">Market Insights</option>
                                        <option value="Product Spotlight">Product Spotlight</option>
                                        <option value="Company News">Company News</option>
                                    </select>
                                </div>
                                <input className="input" name="image" placeholder="Cover Image URL" value={blogForm.image} onChange={handleBlogChange} />
                                <textarea className="input" name="summary" placeholder="Summary" rows={3} value={blogForm.summary} onChange={handleBlogChange} />

                                {/* QUILL EDITOR */}
                                <div style={{ height: '400px', marginBottom: '3rem' }}>
                                    <ReactQuill
                                        theme="snow"
                                        value={blogForm.content}
                                        onChange={handleBlogContentChange}
                                        style={{ height: '350px' }}
                                        modules={quillModules}
                                    />
                                </div>

                                <button type="submit" className="btn" disabled={isBlogLoading}>
                                    {isBlogLoading ? 'Publishing...' : 'Publish Post'}
                                </button>
                            </form>
                        </div>

                        {/* Blog List */}
                        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <h3>Published Posts ({blogs.length})</h3>
                            {blogs.map(b => (
                                <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid #eee' }}>
                                    <div>
                                        <div style={{ fontWeight: 'bold' }}>{b.title}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#888' }}>{b.date} • {b.category}</div>
                                    </div>
                                    <button onClick={() => handleDeleteBlog(b.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .label { display: block; margin-bottom: 0.4rem; font-weight: 600; color: #444; font-size: 0.9rem; }
                .input { width: 100%; padding: 0.8rem; border: 1px solid #e0e0e0; border-radius: 6px; font-size: 0.95rem; transition: all 0.2s; }
                .input:focus { border-color: var(--color-primary); outline: none; box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1); }
                .btn { background-color: var(--color-primary); color: white; border: none; padding: 0.8rem 1.2rem; border-radius: 6px; cursor: pointer; font-weight: 600; transition: background 0.2s; }
                .btn:hover { background-color: #1b5e20; }
                .btn:disabled { opacity: 0.7; cursor: not-allowed; }
            `}</style>
        </div>
    );
};

const LoginScreen = ({ onLogin, password, setPassword }) => (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%)' }}>
        <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', width: '100%', maxWidth: '400px' }}>
            <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: 'var(--color-primary)', textAlign: 'center' }}>Admin Access</h1>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>Enter password to continue</p>
            <form onSubmit={onLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required style={{ width: '100%', padding: '0.9rem', borderRadius: '6px', border: '2px solid #e0e0e0', fontSize: '1rem' }} />
                <button type="submit" style={{ width: '100%', padding: '1rem', backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>Login</button>
            </form>
        </div>
    </div>
);

export default Admin;
