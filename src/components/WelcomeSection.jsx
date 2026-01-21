import React from 'react';
import { Globe, Award, Leaf } from 'lucide-react';

const WelcomeSection = () => {
    const features = [
        {
            icon: <Globe size={48} />,
            title: 'Global Reach',
            description: 'Exporting to international markets with reliable logistics and quality assurance.'
        },
        {
            icon: <Award size={48} />,
            title: 'Quality Assured',
            description: 'ISO certified standards ensuring premium quality in every shipment.'
        },
        {
            icon: <Leaf size={48} />,
            title: 'Sustainable Practices',
            description: 'Empowering farmers with sustainable methods and fair trade practices.'
        }
    ];

    return (
        <section style={{ padding: '5rem 0', backgroundColor: '#f8f9fa' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333', marginBottom: '1rem' }}>
                        Serving India's Finest Produce Globally
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '700px', margin: '0 auto' }}>
                        VR AGRICO is committed to delivering the highest quality agricultural products from India to the world.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            style={{
                                backgroundColor: 'white',
                                padding: '2.5rem 2rem',
                                borderRadius: '12px',
                                textAlign: 'center',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                                transition: 'transform 0.3s, box-shadow 0.3s'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
                            }}
                        >
                            <div style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                                {feature.icon}
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#333' }}>
                                {feature.title}
                            </h3>
                            <p style={{ color: '#666', lineHeight: '1.6' }}>
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WelcomeSection;
