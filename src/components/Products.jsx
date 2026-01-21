import React from 'react';
import { ArrowRight } from 'lucide-react';

const products = [
    {
        id: 'vegetables',
        title: 'Fresh Vegetables',
        image: '/assets/products/vegetables/banner.webp',
        description: 'Farm fresh vegetables exported daily to global markets.',
    },
    {
        id: 'fruits',
        title: 'Premium Fruits',
        image: '/assets/products/fruits/banner.webp',
        description: 'High-quality seasonal and exotic fruits.',
    },
    {
        id: 'spices',
        title: 'Indian Spices',
        image: '/assets/products/spices/banner.webp',
        description: 'Authentic aromatic spices sourced from best regions.',
    }
];

const Products = () => {
    return (
        <section id="products" style={{ padding: '4rem 0', backgroundColor: 'var(--color-secondary)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>Our Products</h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto', color: '#666' }}>
                        Explore our wide range of premium agricultural products sourced directly from farmers.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {products.map((product) => (
                        <div key={product.id} style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.3s' }}>
                            <div style={{ height: '200px', overflow: 'hidden' }}>
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                    onError={(e) => { e.target.src = '/assets/products/vegetables/banner.webp'; }} // Fallback
                                />
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>{product.title}</h3>
                                <p style={{ color: '#666', marginBottom: '1rem' }}>{product.description}</p>
                                <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-accent)', fontWeight: '600' }}>
                                    Learn More <ArrowRight size={16} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;
