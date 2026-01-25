import React from 'react';
import { Globe, Award, Leaf } from 'lucide-react';

const GlobalReach = () => {
    return (
        <section style={{ padding: '5rem 0', backgroundColor: '#fff' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333', marginBottom: '1rem' }}>
                        Serving India's Finest Produce Globally
                    </h2>
                    <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
                        We are committed to delivering high-quality agricultural products to markets worldwide.
                    </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    {/* Card 1 */}
                    <div style={{
                        flex: '1 1 300px',
                        maxWidth: '350px',
                        textAlign: 'center',
                        padding: '2.5rem 2rem',
                        borderRadius: '12px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                        backgroundColor: 'white',
                        transition: 'transform 0.3s'
                    }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <div style={{ marginBottom: '1.5rem', display: 'inline-block', padding: '1rem', backgroundColor: '#e3f2fd', borderRadius: '50%' }}>
                            <Globe size={40} color="#1565c0" />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#333' }}>Global Reach</h3>
                        <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.6' }}>
                            Exporting to international markets with strict adherence to quality standards.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div style={{
                        flex: '1 1 300px',
                        maxWidth: '350px',
                        textAlign: 'center',
                        padding: '2.5rem 2rem',
                        borderRadius: '12px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                        backgroundColor: 'white',
                        transition: 'transform 0.3s'
                    }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <div style={{ marginBottom: '1.5rem', display: 'inline-block', padding: '1rem', backgroundColor: '#fff8e1', borderRadius: '50%' }}>
                            <Award size={40} color="#ff8f00" />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#333' }}>Quality Assured</h3>
                        <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.6' }}>
                            All our products undergo rigorous quality checks at every stage.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div style={{
                        flex: '1 1 300px',
                        maxWidth: '350px',
                        textAlign: 'center',
                        padding: '2.5rem 2rem',
                        borderRadius: '12px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                        backgroundColor: 'white',
                        transition: 'transform 0.3s'
                    }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <div style={{ marginBottom: '1.5rem', display: 'inline-block', padding: '1rem', backgroundColor: '#e8f5e9', borderRadius: '50%' }}>
                            <Leaf size={40} color="#2e7d32" />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#333' }}>Sustainable Practices</h3>
                        <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.6' }}>
                            Promoting eco-friendly and sustainable agricultural practices.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GlobalReach;
