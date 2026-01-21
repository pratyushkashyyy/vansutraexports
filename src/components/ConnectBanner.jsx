import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const ConnectBanner = () => {
    return (
        <section
            style={{
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/assets/products/vegetables/banner.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '6rem 0',
                textAlign: 'center',
                color: 'white'
            }}
        >
            <div className="container">
                <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                    Connect with VR AGRICO
                </h2>
                <p style={{ fontSize: '1.3rem', marginBottom: '2.5rem', maxWidth: '700px', margin: '0 auto 2.5rem', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                    Join us in bringing the best of Indian agriculture to the world.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <a
                        href="/contact"
                        style={{
                            display: 'inline-block',
                            padding: '1rem 2.5rem',
                            backgroundColor: 'var(--color-primary)',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '30px',
                            fontSize: '1.1rem',
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
                        Contact Us
                    </a>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <a
                            href="#"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '50px',
                                height: '50px',
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                borderRadius: '50%',
                                transition: 'background-color 0.3s, transform 0.3s'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                                e.currentTarget.style.transform = 'scale(1.1)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            <Linkedin size={24} color="white" />
                        </a>
                        <a
                            href="#"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '50px',
                                height: '50px',
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                borderRadius: '50%',
                                transition: 'background-color 0.3s, transform 0.3s'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                                e.currentTarget.style.transform = 'scale(1.1)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            <Facebook size={24} color="white" />
                        </a>
                        <a
                            href="#"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '50px',
                                height: '50px',
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                borderRadius: '50%',
                                transition: 'background-color 0.3s, transform 0.3s'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                                e.currentTarget.style.transform = 'scale(1.1)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            <Instagram size={24} color="white" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConnectBanner;
