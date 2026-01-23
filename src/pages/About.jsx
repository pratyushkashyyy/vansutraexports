import React from 'react';

const About = () => {
    return (
        <div className="about-page">
            {/* Banner */}
            <section style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '4rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>About Vansutra Exports</h1>
                    <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '1rem auto' }}>
                        Government of India Approved Agricultural Commodities Exporter
                    </p>
                </div>
            </section>

            {/* Content */}
            <section style={{ padding: '4rem 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', gap: '4rem', flexDirection: 'column' }}>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center' }}>
                            <div>
                                <h2 style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '1.5rem' }}>About Vansutra Exports</h2>
                                <p style={{ lineHeight: '1.8', color: '#444', marginBottom: '1rem' }}>
                                    Vansutra Exports is Government of India approved Agricultural Commodities Exporter associated and affiliated with major trade bodies. Vansutra Exports is a member of Federation of Indian Export Organisation (FIEO), Agriculture and Processed Food Products Export Development Authority (APEDA), Spices Board India, The Solvent Extractors Association of India (SEAINDIA).
                                </p>
                                <p style={{ lineHeight: '1.8', color: '#444', marginBottom: '1rem' }}>
                                    We ensure smooth supply of quality agro products as well as we also ensure that both our buyers and suppliers are time tested, authentic and capable in terms of their commercial capacity as well as financial and economic standing in the market.
                                </p>
                                <p style={{ lineHeight: '1.8', color: '#444' }}>
                                    As a matter of principle we ensure to deal with only those buyers and suppliers who have been operating in the target markets over a period of time and do not experiment with fresh suppliers or buyers to ensure not only quality products from supplier's side but also to ensure timely payment from the buyer's side.
                                </p>

                                {/* Certifications Logos */}
                                <div style={{ marginTop: '2rem' }}>
                                    <h4 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Accredited By</h4>
                                    <img src="/assets/certifications_logos.png" alt="APEDA FSSAI ISO" style={{ maxWidth: '100%', height: 'auto' }} />
                                </div>
                            </div>
                            <div>
                                <img src="/assets/products/vegetables/banner.webp" alt="Farmers Field" style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                            </div>
                        </div>

                        <div style={{ backgroundColor: '#f9f9f9', padding: '3rem', borderRadius: '12px' }}>
                            <h2 style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>Our Values</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem' }}>
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
