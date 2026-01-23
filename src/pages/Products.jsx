import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'fruits', name: 'Fruits' },
    { id: 'spices', name: 'Spices' },
    { id: 'cereals', name: 'Cereals' },
    { id: 'pulses', name: 'Pulses' },
    { id: 'iqf', name: 'IQF' },
    { id: 'feed', name: 'Animal Feed' },
    { id: 'organic', name: 'Organic Fertilizer' },
    { id: 'flowers', name: 'Flowers' }
];

const Products = () => {
    const [searchParams] = useSearchParams();
    const categoryFromUrl = searchParams.get('category') || 'all';
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState(categoryFromUrl);

    // Category banner images
    const categoryBanners = {
        all: '/assets/products/vegetables/banner.webp',
        vegetables: '/assets/products/vegetables/banner.webp',
        fruits: '/assets/products/fruits/banner.webp',
        spices: '/assets/products/spices/banner.webp',
        cereals: '/assets/products/cereals/banner.webp',
        pulses: '/assets/products/pulses/banner.webp',
        iqf: '/assets/products/iqf/banner.webp',
        feed: '/assets/products/animal_feed/banner.webp',
        organic: '/assets/products/organic_fertilizer/banner.webp',
        flowers: '/assets/products/flowers/banner.webp'
    };

    useEffect(() => {
        fetchProducts();
    }, [activeCategory]);

    const fetchProducts = async () => {
        let url = '/api/products';
        if (activeCategory !== 'all') {
            url += `?category=${activeCategory}`;
        }
        try {
            const res = await fetch(url);
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const getCategoryTitle = () => {
        const category = categories.find(c => c.id === activeCategory);
        return category ? category.name : 'Our Products';
    };

    // Breadcrumbs
    const breadcrumbItems = [
        { label: 'Products', path: '/products' },
        ...(activeCategory !== 'all' ? [{ label: categories.find(c => c.id === activeCategory)?.name || activeCategory, path: `/products?category=${activeCategory}` }] : [])
    ];

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingBottom: '4rem' }}>
            <SEO
                title={activeCategory === 'all' ? 'All Products' : (categories.find(c => c.id === activeCategory)?.name || 'Products')}
                description="Explore our range of premium quality agricultural products including vegetables, fruits, spices, and more."
                keywords="indian vegetables, indian fruits, spices exporter, agricultural products wholesale"
                url={`/products${activeCategory !== 'all' ? `?category=${activeCategory}` : ''}`}
            />

            {/* Dynamic Category Banner */}
            <section style={{
                position: 'relative',
                height: '250px',
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${categoryBanners[activeCategory]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                        {getCategoryTitle()}
                    </h1>
                    <div style={{ width: '80px', height: '3px', backgroundColor: 'var(--color-primary)', margin: '0 auto' }}></div>
                </div>
            </section>

            {/* Category Filter Buttons */}
            <div style={{ backgroundColor: 'white', padding: '1.5rem 0', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <div className="container">
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', padding: '0 1rem' }}>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                style={{
                                    padding: '0.75rem 1.75rem',
                                    borderRadius: '12px',
                                    border: activeCategory === cat.id ? '2px solid var(--color-primary)' : '2px solid rgba(46, 125, 50, 0.2)',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    textTransform: 'capitalize',
                                    transition: 'all 0.3s',
                                    backgroundColor: activeCategory === cat.id ? '#2e7d32' : 'white',
                                    background: activeCategory === cat.id ? 'linear-gradient(to right, #2e7d32, #43a047)' : 'white',
                                    color: activeCategory === cat.id ? 'white' : '#495057',
                                    boxShadow: activeCategory === cat.id ? '0 4px 12px rgba(46, 125, 50, 0.3)' : '0 2px 6px rgba(0,0,0,0.08)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    whiteSpace: 'nowrap'
                                }}
                                onMouseOver={(e) => {
                                    if (activeCategory !== cat.id) {
                                        e.currentTarget.style.background = 'linear-gradient(to right, #e8f5e9, #c8e6c9)';
                                        e.currentTarget.style.color = '#2e7d32';
                                        e.currentTarget.style.borderColor = '#66bb6a';
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
                                    }
                                }}
                                onMouseOut={(e) => {
                                    if (activeCategory !== cat.id) {
                                        e.currentTarget.style.background = 'white';
                                        e.currentTarget.style.color = '#495057';
                                        e.currentTarget.style.borderColor = 'rgba(46, 125, 50, 0.2)';
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.08)';
                                    }
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: activeCategory === cat.id ? 'white' : '#2e7d32' }}>
                                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
                                </svg>
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="container" style={{ padding: '3rem 1.5rem' }}>
                <Breadcrumbs items={breadcrumbItems} />

                {products.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem 0', color: '#666' }}>
                        <p style={{ fontSize: '1.2rem' }}>No products found in this category.</p>
                    </div>
                ) : (

                    <div className="product-grid">
                        {products.map(product => (
                            <div key={product.id} style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', transition: 'transform 0.3s, box-shadow 0.3s' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)'; }}>
                                <div style={{ cursor: 'pointer' }} onClick={() => window.location.href = `/products/${product.slug || product.id}`}>
                                    <div className="product-image-wrapper product-card-image">
                                        <img
                                            src={product.image && product.image.startsWith('http') ? product.image : product.image ? product.image : '/assets/leaf.svg'}
                                            alt={product.title}
                                            loading="lazy"
                                            width="400"
                                            height="300"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            onError={(e) => { e.target.src = '/assets/leaf.svg'; e.target.style.objectFit = 'contain'; e.target.style.padding = '2rem'; }}
                                        />
                                        <div className="product-image-overlay"></div>

                                        {/* Category Banner */}
                                        <div className="category-banner" style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)',
                                            padding: '1.5rem 1rem',
                                            transform: 'translateY(100%)',
                                            transition: 'transform 0.3s ease'
                                        }}>
                                            <h4 style={{ color: 'white', fontSize: '1.1rem', fontWeight: '600', margin: 0, textAlign: 'center', textTransform: 'capitalize' }}>
                                                {product.category}
                                            </h4>
                                            <div style={{ width: '60px', height: '3px', backgroundColor: 'var(--color-primary)', margin: '0.5rem auto 0' }}></div>
                                        </div>
                                    </div>
                                    <div className="product-card-body">
                                        <h3 className="product-title">{product.title}</h3>
                                        <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '0.5rem', lineHeight: '1.3' }}>{product.subtitle}</p>

                                        {/* View Details Button */}
                                        <a
                                            href={`/products/${product.slug || product.id}`}
                                            className="view-details-btn" // Add class for potential global style hook
                                            onClick={(e) => { e.preventDefault(); window.location.href = `/products/${product.slug || product.id}`; }}
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                padding: '0.6rem 1.2rem',
                                                backgroundColor: 'var(--color-primary)',
                                                color: 'white',
                                                borderRadius: '8px',
                                                textDecoration: 'none',
                                                fontSize: '0.9rem',
                                                fontWeight: '600',
                                                transition: 'all 0.3s',
                                                boxShadow: '0 2px 8px rgba(46, 125, 50, 0.3)'
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.backgroundColor = '#1b5e20';
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(46, 125, 50, 0.5)';
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.backgroundColor = 'var(--color-primary)'; // Assuming var exists, or verify
                                                // If var not set in inline style, it inherits. But inline set it.
                                                // However, var usage inside JS string needs existing define.
                                                // Assuming var(--color-primary) is valid due to existing code usage.
                                                // If not, safe fallback #2e7d32
                                                e.currentTarget.style.backgroundColor = '#2e7d32';
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(46, 125, 50, 0.3)';
                                            }}
                                        >
                                            View Details
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div >
    );
};

export default Products;
