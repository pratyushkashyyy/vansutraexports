import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetchFeaturedProducts();
    }, []);

    const fetchFeaturedProducts = async () => {
        try {
            const res = await fetch('/api/products?featured=true');
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching featured products:', error);
        }
    };

    const nextProducts = () => {
        setCurrentIndex((prev) => (prev + 1) % Math.max(1, products.length - 3));
    };

    const prevProducts = () => {
        setCurrentIndex((prev) => (prev - 1 + Math.max(1, products.length - 3)) % Math.max(1, products.length - 3));
    };

    const visibleProducts = products.slice(currentIndex, currentIndex + 4);
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    if (products.length === 0) return null;

    return (
        <section style={{ padding: '5rem 0', backgroundColor: 'white' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333', marginBottom: '0.5rem' }}>
                        Featured Products
                    </h2>
                    <p style={{ color: '#666', fontSize: '1.1rem' }}>
                        Discover our premium selection of agricultural products
                    </p>
                </div>

                <div style={{ position: 'relative' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {visibleProducts.map((product) => (
                            <div
                                key={product.id}
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    position: 'relative'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                                }}
                            >
                                {/* Featured Badge */}
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    backgroundColor: 'var(--color-primary)',
                                    color: 'white',
                                    padding: '0.3rem 0.8rem',
                                    borderRadius: '20px',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold',
                                    zIndex: 10
                                }}>
                                    FEATURED
                                </div>

                                {/* Product Image */}
                                <div className="product-image-wrapper" style={{ height: '220px', overflow: 'hidden' }}>
                                    <img
                                        src={product.image && product.image.startsWith('http') ? product.image : product.image ? product.image : '/assets/leaf.svg'}
                                        alt={product.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        onError={(e) => { e.target.src = '/assets/leaf.svg'; e.target.style.objectFit = 'contain'; e.target.style.padding = '2rem'; }}
                                    />
                                    <div className="product-image-overlay"></div>
                                </div>

                                {/* Product Info */}
                                <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '0.5rem' }}>
                                        FRESH {product.category.toUpperCase()}
                                    </p>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333', marginBottom: '1rem' }}>
                                        {product.title}
                                    </h3>
                                    <a
                                        href={`/products?category=${product.category}`}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            color: 'var(--color-primary)',
                                            textDecoration: 'none',
                                            fontWeight: '600',
                                            transition: 'gap 0.3s'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.gap = '0.8rem'}
                                        onMouseOut={(e) => e.currentTarget.style.gap = '0.5rem'}
                                    >
                                        Know More <ArrowRight size={18} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    {products.length > 4 && !isMobile && (
                        <>
                            <button
                                onClick={prevProducts}
                                style={{
                                    position: 'absolute',
                                    left: '-60px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    backgroundColor: 'var(--color-primary)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '45px',
                                    height: '45px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                                    transition: 'transform 0.3s'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
                            >
                                <ChevronLeft size={24} color="white" />
                            </button>

                            <button
                                onClick={nextProducts}
                                style={{
                                    position: 'absolute',
                                    right: '-60px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    backgroundColor: 'var(--color-primary)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '45px',
                                    height: '45px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                                    transition: 'transform 0.3s'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
                            >
                                <ChevronRight size={24} color="white" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
