import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const ProductCategories = () => {
    const [products, setProducts] = useState({ fruits: [], vegetables: [], rice: [], spices: [], cereals: [] });
    const scrollRefs = useRef({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                const data = await res.json();

                // Sort: Featured first, then by id desc (newest first)
                const sortedData = [...data].sort((a, b) => {
                    if (a.featured === b.featured) return b.id - a.id;
                    return b.featured - a.featured;
                });

                // Group products by category
                const grouped = { fruits: [], vegetables: [], spices: [], cereals: [] };
                sortedData.forEach(product => {
                    let cat = product.category.toLowerCase();
                    if (cat === 'rice') cat = 'cereals';

                    if (grouped[cat]) {
                        grouped[cat].push(product);
                    }
                });

                setProducts(grouped);
            } catch (error) {
                console.error("Failed to fetch products", error);
            }
        };

        fetchProducts();
    }, []);

    const categories = ['fruits', 'vegetables', 'spices', 'cereals'];

    const scroll = (category, direction) => {
        const container = scrollRefs.current[category];
        if (container) {
            const scrollAmount = direction === 'left' ? -350 : 350;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="featured-products-section" style={{ padding: '4rem 0 2rem 0', backgroundColor: '#fff' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1a4d2e', marginBottom: '0.5rem' }}>
                        Featured Products
                    </h2>
                </div>

                {categories.map((category) => (
                    products[category] && products[category].length > 0 && (
                        <div key={category} style={{ marginBottom: '4rem', position: 'relative' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderLeft: '5px solid var(--color-primary, #4caf50)', paddingLeft: '1rem' }}>
                                <h3 style={{
                                    fontSize: '1.8rem',
                                    color: '#333',
                                    textTransform: 'capitalize',
                                    margin: 0
                                }}>
                                    {category === 'cereals' ? 'Quality Cereals' :
                                        category === 'spices' ? 'Whole & Ground Spices' :
                                            `Fresh ${category}`}
                                </h3>
                                <a
                                    href={`/products?category=${category}`}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        color: 'var(--color-primary)',
                                        textDecoration: 'none',
                                        fontWeight: '600',
                                        fontSize: '0.95rem'
                                    }}
                                >
                                    View All <ArrowRight size={16} />
                                </a>
                            </div>

                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                {/* Scroll Buttons */}
                                {products[category].length > 4 && (
                                    <>
                                        <button
                                            onClick={() => scroll(category, 'left')}
                                            style={{
                                                position: 'absolute',
                                                left: '-20px',
                                                zIndex: 10,
                                                background: 'white',
                                                border: 'none',
                                                borderRadius: '50%',
                                                width: '40px',
                                                height: '40px',
                                                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <ChevronLeft size={24} color="var(--color-primary)" />
                                        </button>
                                        <button
                                            onClick={() => scroll(category, 'right')}
                                            style={{
                                                position: 'absolute',
                                                right: '-20px',
                                                zIndex: 10,
                                                background: 'white',
                                                border: 'none',
                                                borderRadius: '50%',
                                                width: '40px',
                                                height: '40px',
                                                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <ChevronRight size={24} color="var(--color-primary)" />
                                        </button>
                                    </>
                                )}

                                <div
                                    ref={el => scrollRefs.current[category] = el}
                                    style={{
                                        display: 'flex',
                                        gap: '1.5rem',
                                        overflowX: 'auto',
                                        scrollBehavior: 'smooth',
                                        padding: '1rem 0.5rem 2rem 0.5rem',
                                        scrollbarWidth: 'none',
                                        msOverflowStyle: 'none'
                                    }}
                                    className="no-scrollbar"
                                >
                                    {products[category].map((product) => (
                                        <div
                                            key={product.id}
                                            className="product-scroll-item"
                                            style={{
                                                flex: '0 0 auto',
                                                backgroundColor: 'white',
                                                borderRadius: '12px',
                                                overflow: 'hidden',
                                                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                                transition: 'transform 0.3s, box-shadow 0.3s',
                                                position: 'relative',
                                                cursor: 'pointer'
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.transform = 'translateY(-8px)';
                                                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                                            }}
                                            onClick={() => window.location.href = `/products/${product.slug || product.id}`}
                                        >
                                            {product.featured === 1 && (
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '1rem',
                                                    right: '1rem',
                                                    backgroundColor: 'var(--color-primary)',
                                                    color: 'white',
                                                    padding: '0.2rem 0.6rem',
                                                    borderRadius: '20px',
                                                    fontSize: '0.7rem',
                                                    fontWeight: 'bold',
                                                    zIndex: 10
                                                }}>
                                                    FEATURED
                                                </div>
                                            )}
                                            <div className="product-image-wrapper product-card-image">
                                                <img
                                                    src={product.image || '/assets/leaf.svg'}
                                                    alt={product.title}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    onError={(e) => {
                                                        e.target.src = '/assets/leaf.svg';
                                                        e.target.style.objectFit = 'contain';
                                                        e.target.style.padding = '2rem';
                                                    }}
                                                />
                                                <div className="product-image-overlay"></div>
                                            </div>
                                            <div className="product-card-body">
                                                <p style={{ fontSize: '0.65rem', color: 'var(--color-primary)', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '0.3rem' }}>
                                                    {category.toUpperCase()}
                                                </p>
                                                <h3 className="product-title">{product.title}</h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                ))}
            </div>
            <style>
                {`
                    .no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .no-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                    .product-scroll-item {
                        width: 280px;
                    }
                    @media (max-width: 600px) {
                        .product-scroll-item {
                            width: calc(50vw - 2rem);
                        }
                        .featured-products-section .container {
                            padding: 0 0.5rem;
                        }
                    }
                `}
            </style>
        </section>
    );
};

export default ProductCategories;
