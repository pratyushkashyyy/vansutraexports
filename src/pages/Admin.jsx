import React, { useState, useEffect } from 'react';
import { Trash2, Plus, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        category: 'vegetables',
        description: '',
        image: null,
        featured: false
    });
    const [loading, setLoading] = useState(false);

    // Check if already authenticated
    useEffect(() => {
        const auth = sessionStorage.getItem('adminAuth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchProducts();
        }
    }, [isAuthenticated]);

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple password authentication
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

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setFormData({ ...formData, image: e.target.files[0] });
        } else if (e.target.name === 'featured') {
            setFormData({ ...formData, featured: e.target.checked });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        data.append('title', formData.title);
        data.append('subtitle', formData.subtitle);
        data.append('category', formData.category);
        data.append('description', formData.description);
        data.append('featured', formData.featured);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                body: data
            });
            if (res.ok) {
                setFormData({ title: '', subtitle: '', category: 'vegetables', description: '', image: null, featured: false });
                fetchProducts();
                alert('Product added successfully!');
            }
        } catch (error) {
            console.error('Error adding product:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await fetch(`/api/products/${id}`, {
                    method: 'DELETE'
                });
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Login Screen
    if (!isAuthenticated) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%)'
            }}>
                <div style={{
                    backgroundColor: 'white',
                    padding: '3rem',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                    width: '100%',
                    maxWidth: '400px'
                }}>
                    <h1 style={{
                        fontSize: '2rem',
                        marginBottom: '0.5rem',
                        color: 'var(--color-primary)',
                        textAlign: 'center'
                    }}>Admin Login</h1>
                    <p style={{
                        textAlign: 'center',
                        color: '#666',
                        marginBottom: '2rem'
                    }}>Vansutra Exports Admin Panel</p>

                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password"
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    borderRadius: '6px',
                                    border: '2px solid #e0e0e0',
                                    fontSize: '1rem',
                                    transition: 'border-color 0.3s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn"
                            style={{
                                width: '100%',
                                padding: '1rem',
                                fontSize: '1rem',
                                fontWeight: 'bold'
                            }}
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // Admin Panel
    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary)' }}>Admin Panel</h1>
                <button
                    onClick={handleLogout}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.8rem 1.5rem',
                        backgroundColor: '#ff4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600'
                    }}
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem' }}>

                {/* Add Product Form */}
                <div>
                    <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-accent)' }}>Add New Product</h2>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input type="text" name="title" placeholder="Product Title (e.g. Onion)" value={formData.title} onChange={handleChange} required style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd' }} />
                        <input type="text" name="subtitle" placeholder="Subtitle (e.g. Fresh Red Onion)" value={formData.subtitle} onChange={handleChange} style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd' }} />

                        <select name="category" value={formData.category} onChange={handleChange} style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd' }}>
                            <option value="vegetables">Vegetables</option>
                            <option value="fruits">Fruits</option>
                            <option value="spices">Spices</option>
                            <option value="cereals">Cereals</option>
                            <option value="pulses">Pulses</option>
                            <option value="iqf">IQF</option>
                            <option value="feed">Animal Feed</option>
                            <option value="organic">Organic Fertilizer</option>
                            <option value="flowers">Flowers</option>
                        </select>

                        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} rows="4" style={{ padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd' }}></textarea>

                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem', cursor: 'pointer' }}>
                            <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
                            <span>Featured Product</span>
                        </label>

                        <div style={{ padding: '0.8rem', border: '1px dashed #ddd', borderRadius: '4px', cursor: 'pointer' }}>
                            <input type="file" name="image" onChange={handleChange} accept="image/*" />
                        </div>

                        <button type="submit" className="btn" disabled={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            {loading ? 'Adding...' : <><Plus size={18} /> Add Product</>}
                        </button>
                    </form>
                </div>

                {/* Product List with Pagination */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ color: 'var(--color-accent)' }}>Existing Products</h2>
                        <span style={{ color: '#666', fontSize: '0.9rem' }}>
                            Total: {products.length} products
                        </span>
                    </div>

                    <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                        {currentProducts.map(product => (
                            <div key={product.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid #eee', borderRadius: '8px', backgroundColor: 'white' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    {product.image && <img src={product.image} alt={product.title} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />}
                                    <div>
                                        <h4 style={{ fontWeight: 'bold' }}>
                                            {product.title}
                                            {product.featured === 1 && <span style={{ marginLeft: '0.5rem', fontSize: '0.7rem', backgroundColor: 'var(--color-primary)', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>FEATURED</span>}
                                        </h4>
                                        <span style={{ fontSize: '0.8rem', color: '#666', textTransform: 'capitalize' }}>{product.category}</span>
                                    </div>
                                </div>
                                <button onClick={() => handleDelete(product.id)} style={{ color: '#ff4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginTop: '2rem'
                        }}>
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                style={{
                                    padding: '0.5rem 1rem',
                                    border: '1px solid #ddd',
                                    borderRadius: '6px',
                                    backgroundColor: currentPage === 1 ? '#f5f5f5' : 'white',
                                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.3rem'
                                }}
                            >
                                <ChevronLeft size={16} />
                                Previous
                            </button>

                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => paginate(index + 1)}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            border: '1px solid #ddd',
                                            borderRadius: '6px',
                                            backgroundColor: currentPage === index + 1 ? 'var(--color-primary)' : 'white',
                                            color: currentPage === index + 1 ? 'white' : '#333',
                                            cursor: 'pointer',
                                            fontWeight: currentPage === index + 1 ? 'bold' : 'normal'
                                        }}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                style={{
                                    padding: '0.5rem 1rem',
                                    border: '1px solid #ddd',
                                    borderRadius: '6px',
                                    backgroundColor: currentPage === totalPages ? '#f5f5f5' : 'white',
                                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.3rem'
                                }}
                            >
                                Next
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    )}

                    <div style={{
                        textAlign: 'center',
                        marginTop: '1rem',
                        color: '#666',
                        fontSize: '0.9rem'
                    }}>
                        Showing {indexOfFirstProduct + 1} - {Math.min(indexOfLastProduct, products.length)} of {products.length}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Admin;
