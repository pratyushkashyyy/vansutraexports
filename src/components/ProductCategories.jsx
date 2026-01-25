import React, { useState, useEffect } from 'react';

const ProductCategories = () => {
    const [products, setProducts] = useState({ fruits: [], vegetables: [], rice: [], spices: [] });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products?featured=true');
                const data = await res.json();

                // Group products by category
                const grouped = { fruits: [], vegetables: [], spices: [], cereals: [] };
                data.forEach(product => {
                    let cat = product.category.toLowerCase();
                    if (cat === 'rice') cat = 'cereals'; // Map legacy rice to cereals

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

    return (
        <section className="featured-products-section" style={{ padding: '4rem 0', backgroundColor: '#fff' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1a4d2e', marginBottom: '0.5rem' }}>
                        Featured Products
                    </h2>
                </div>

                {categories.map((category) => (
                    products[category] && products[category].length > 0 && (
                        <div key={category} style={{ marginBottom: '4rem' }}>
                            <h3 style={{
                                fontSize: '1.8rem',
                                color: '#333',
                                marginBottom: '1.5rem',
                                textTransform: 'capitalize',
                                borderLeft: '5px solid var(--color-primary, #4caf50)',
                                paddingLeft: '1rem'
                            }}>
                                {category === 'cereals' ? 'Quality Cereals' :
                                    category === 'spices' ? 'Whole & Ground Spices' :
                                        `Fresh ${category}`}
                            </h3>

                            <div className="product-grid">
                                {products[category].slice(0, 4).map((product) => (
                                    <div
                                        key={product.id}
                                        style={{
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
                    )
                ))}
            </div>
        </section>
    );
};

export default ProductCategories;
