import React from 'react';
import { CheckCircle } from 'lucide-react';

const WhyChooseUs = () => {
    return (
        <section style={{ padding: '4rem 0', backgroundColor: '#f9f9f9' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1a4d2e', marginBottom: '0.5rem' }}>
                        Why choose us ?
                    </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                    {/* Block 1: Why Choose Us */}
                    <div style={{
                        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(/assets/field-bg.jpg)',
                        backgroundSize: 'cover',
                        padding: '2rem',
                        borderRadius: '12px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                        border: '1px solid #e0e0e0',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            backgroundColor: 'var(--color-primary, #01275a)',
                            color: 'white',
                            padding: '0.5rem 1.5rem',
                            borderRadius: '25px',
                            display: 'inline-block',
                            marginBottom: '1.5rem',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                        }}>
                            WHY CHOOSE US
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {[
                                'Export-Grade Quality',
                                'Hygienic Sorting & Packaging',
                                'Competitive Pricing',
                                'Timely Shipments',
                                'Global Export Experience'
                            ].map((item, index) => (
                                <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem', fontSize: '1rem', color: '#333' }}>
                                    <CheckCircle size={20} color="var(--color-fresh, #50a525)" fill="#e8f5e9" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div style={{ marginTop: '2rem', borderTop: '1px solid #ddd', paddingTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                            Bulk orders | Private labeling | Long-term supply partnerships
                        </div>
                    </div>

                    {/* Block 2: Quality You Can Trust */}
                    <div style={{
                        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(/assets/sack-bg.jpg)',
                        backgroundSize: 'cover',
                        padding: '2rem',
                        borderRadius: '12px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                        border: '1px solid #e0e0e0',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            backgroundColor: 'var(--color-primary, #01275a)',
                            color: 'white',
                            padding: '0.5rem 1.5rem',
                            borderRadius: '25px',
                            display: 'inline-block',
                            marginBottom: '1.5rem',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                        }}>
                            QUALITY YOU CAN TRUST
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {[
                                'Farm-fresh sourcing',
                                'Careful grading & sorting',
                                'Hygienic handling',
                                'Export-standard quality checks',
                                'Freshness maintained till destination'
                            ].map((item, index) => (
                                <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem', fontSize: '1rem', color: '#333' }}>
                                    <CheckCircle size={20} color="var(--color-fresh, #50a525)" fill="#e8f5e9" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
