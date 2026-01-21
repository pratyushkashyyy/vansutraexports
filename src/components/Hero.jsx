import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <section id="home" style={{ position: 'relative', height: '90vh', display: 'flex', alignItems: 'center', color: 'white' }}>
            {/* Background Image Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'url(/assets/products/vegetables/banner.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.6)',
                zIndex: -1
            }} />

            <div className="container">
                <div style={{ maxWidth: '800px' }}>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                        Leading Indian <br />
                        <span style={{ color: 'var(--color-accent)' }}>Agricultural Exporter</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', marginBottom: '2rem', maxWidth: '600px', opacity: 0.9 }}>
                        Bringing the finest quality Indian Spices, Fresh Vegetables, Fruits, and Grains to the global market.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <a href="#products" className="btn">
                            Explore Products
                        </a>
                        <a href="#contact" className="btn" style={{ backgroundColor: 'white', color: 'var(--color-primary)' }}>
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
