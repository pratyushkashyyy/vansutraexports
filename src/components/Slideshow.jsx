import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    {
        id: 1,
        title: 'Premium Quality, Global Standards',
        subtitle: 'Exporting the sweetest and juiciest fruits worldwide.',
        buttonText: 'Discover Fruits',
        category: 'fruits',
        bgImage: '/assets/products/fruits/banner.webp'
    },
    {
        id: 2,
        title: 'Authentic Indian Spices',
        subtitle: 'The aroma and taste of India, delivered to your doorstep.',
        buttonText: 'View Spices',
        category: 'spices',
        bgImage: '/assets/products/spices/banner.webp'
    },
    {
        id: 3,
        title: "Serving India's Finest Produce Globally",
        subtitle: 'Fresh Vegetables sourced directly from Indian farms.',
        buttonText: 'Explore Vegetables',
        category: 'vegetables',
        bgImage: '/assets/products/vegetables/banner.webp'
    },
    {
        id: 4,
        title: 'Premium Cereals & Pulses',
        subtitle: 'Nutritious and high-quality grains for global markets.',
        buttonText: 'Explore Pulses',
        category: 'pulses',
        bgImage: '/assets/products/vegetables/banner.webp' // Using vegetables as fallback
    }
];

const Slideshow = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    return (
        <div style={{ position: 'relative', height: isMobile ? '400px' : '600px', overflow: 'hidden' }}>
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: currentSlide === index ? 1 : 0,
                        transition: 'opacity 1s ease-in-out',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: currentSlide === index ? 1 : 0
                    }}
                >
                    {/* Background Image for LCP Optimization */}
                    <img
                        src={slide.bgImage}
                        alt={slide.title}
                        fetchPriority={index === 0 ? "high" : "low"}
                        loading={index === 0 ? "eager" : "lazy"}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            zIndex: -2
                        }}
                    />

                    {/* Gradient Overlay */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))',
                            zIndex: -1
                        }}
                    />
                    <div style={{ textAlign: 'center', color: 'white', maxWidth: '800px', padding: isMobile ? '1rem' : '2rem' }}>
                        <h1 style={{ fontSize: isMobile ? '1.75rem' : '3.5rem', fontWeight: 'bold', marginBottom: '1rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                            {slide.title}
                        </h1>
                        <p style={{ fontSize: isMobile ? '1rem' : '1.5rem', marginBottom: '2rem', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                            {slide.subtitle}
                        </p>
                        <a
                            href={`/products?category=${slide.category}`}
                            style={{
                                display: 'inline-block',
                                padding: isMobile ? '0.75rem 1.5rem' : '1rem 2.5rem',
                                backgroundColor: 'var(--color-primary)',
                                color: 'white',
                                textDecoration: 'none',
                                borderRadius: '30px',
                                fontSize: isMobile ? '0.9rem' : '1.1rem',
                                fontWeight: '600',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
                            }}
                        >
                            {slide.buttonText}
                        </a>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                style={{
                    position: 'absolute',
                    left: isMobile ? '0.5rem' : '2rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    border: 'none',
                    borderRadius: '50%',
                    width: isMobile ? '35px' : '50px',
                    height: isMobile ? '35px' : '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
            >
                <ChevronLeft size={30} color="white" />
            </button>

            <button
                onClick={nextSlide}
                style={{
                    position: 'absolute',
                    right: isMobile ? '0.5rem' : '2rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    border: 'none',
                    borderRadius: '50%',
                    width: isMobile ? '35px' : '50px',
                    height: isMobile ? '35px' : '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
            >
                <ChevronRight size={30} color="white" />
            </button>

            {/* Dot Indicators */}
            <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.8rem' }}>
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        style={{
                            width: currentSlide === index ? '40px' : '12px',
                            height: '12px',
                            borderRadius: '6px',
                            border: 'none',
                            backgroundColor: currentSlide === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slideshow;
