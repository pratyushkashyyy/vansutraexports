import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

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

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>

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
            <div className="container" style={{ padding: '3rem 0' }}>
                {products.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem 0', color: '#666' }}>
                        <p style={{ fontSize: '1.2rem' }}>No products found in this category.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                        {products.map(product => (
                            <div key={product.id} style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', transition: 'transform 0.3s, box-shadow 0.3s' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)'; }}>
                                <div className="product-image-wrapper" style={{ height: '280px', overflow: 'hidden', position: 'relative' }}>
                                    <img
                                        src={product.image && product.image.startsWith('http') ? product.image : product.image ? product.image : '/assets/leaf.svg'}
                                        alt={product.title}
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
                                <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#333', marginBottom: '0.5rem' }}>{product.title}</h3>
                                    <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1rem' }}>{product.subtitle}</p>

                                    {/* WhatsApp Inquiry Button */}
                                    <a
                                        href={`https://wa.me/917879743528?text=${encodeURIComponent(`Hello! I'm interested in *${product.title}* from your ${product.category} category. Can you please provide more details?`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            padding: '0.6rem 1.2rem',
                                            backgroundColor: '#25D366',
                                            color: 'white',
                                            borderRadius: '8px',
                                            textDecoration: 'none',
                                            fontSize: '0.9rem',
                                            fontWeight: '600',
                                            transition: 'all 0.3s',
                                            boxShadow: '0 2px 8px rgba(37, 211, 102, 0.3)'
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.backgroundColor = '#20BA5A';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.5)';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.backgroundColor = '#25D366';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(37, 211, 102, 0.3)';
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                        Inquire on WhatsApp
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
