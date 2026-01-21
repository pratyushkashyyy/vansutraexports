import React from 'react';

const About = () => {
    return (
        <div className="about-page">
            {/* Banner */}
            <section style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '4rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>About VR AGRICO</h1>
                    <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '1rem auto' }}>
                        We are dedicated to bridging the gap between Indian farmers and the global market.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section style={{ padding: '4rem 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', gap: '4rem', flexDirection: 'column' }}>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
                            <div>
                                <h2 style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '1.5rem' }}>Our Story</h2>
                                <p style={{ lineHeight: '1.8', color: '#444', marginBottom: '1rem' }}>
                                    Founded with a vision to deliver the freshness of Indian farms to the world, VR AGRICO has established itself as a premier exporter of agricultural commodities. Located in Nashik, the agricultural hub of India, we have direct access to the finest quality produce.
                                </p>
                                <p style={{ lineHeight: '1.8', color: '#444' }}>
                                    Our journey began with a simple mission: to ensure that farmers get fair value for their produce while international clients receive only the best quality products. Today, we export to over 20 countries.
                                </p>
                            </div>
                            <div>
                                <img src="/assets/products/vegetables/banner.webp" alt="Farmers Field" style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                            </div>
                        </div>

                        <div style={{ backgroundColor: '#f9f9f9', padding: '3rem', borderRadius: '12px' }}>
                            <h2 style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>Our Values</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <h3 style={{ color: 'var(--color-accent)', marginBottom: '0.5rem' }}>Integrity</h3>
                                    <p>Honest and transparent business practices.</p>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <h3 style={{ color: 'var(--color-accent)', marginBottom: '0.5rem' }}>Quality</h3>
                                    <p>Uncompromised standards in every shipment.</p>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <h3 style={{ color: 'var(--color-accent)', marginBottom: '0.5rem' }}>Sustainability</h3>
                                    <p>Supporting eco-friendly farming methods.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
