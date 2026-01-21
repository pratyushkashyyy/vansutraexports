import React from 'react';
import { Award, ShieldCheck, Leaf, Globe } from 'lucide-react';

const Certifications = () => {
    const certifications = [
        {
            title: 'APEDA Registered',
            description: 'Govt Recognized',
            icon: Award,
            bgColor: '#f0fdf4',
            hoverBgColor: '#dcfce7',
            iconColor: '#16a34a'
        },
        {
            title: 'Top Quality',
            description: 'ISO Certified',
            icon: ShieldCheck,
            bgColor: '#eff6ff',
            hoverBgColor: '#dbeafe',
            iconColor: '#2563eb'
        },
        {
            title: 'MSME Certified',
            description: 'Small Enterprise',
            icon: Leaf,
            bgColor: '#fff7ed',
            hoverBgColor: '#ffedd5',
            iconColor: '#ea580c'
        },
        {
            title: 'Global Standards',
            description: 'HACCP Compliant',
            icon: Globe,
            bgColor: '#faf5ff',
            hoverBgColor: '#f3e8ff',
            iconColor: '#9333ea'
        }
    ];

    return (
        <section style={{ padding: '4rem 0', backgroundColor: '#f8f9fa' }}>
            <div className="container">
                <div style={{
                    display: 'flex',
                    flexDirection: window.innerWidth < 768 ? 'column' : 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: window.innerWidth < 768 ? '2rem' : '4rem',
                    opacity: 0.8,
                    filter: 'grayscale(100%)',
                    transition: 'all 0.5s'
                }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '1';
                        e.currentTarget.style.filter = 'grayscale(0%)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '0.8';
                        e.currentTarget.style.filter = 'grayscale(100%)';
                    }}
                >
                    {certifications.map((cert, index) => {
                        const IconComponent = cert.icon;
                        return (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem'
                                }}
                                className="cert-group"
                            >
                                <div
                                    style={{
                                        padding: '0.75rem',
                                        backgroundColor: cert.bgColor,
                                        borderRadius: '50%',
                                        transition: 'background-color 0.3s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    className="cert-icon-wrapper"
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = cert.hoverBgColor}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = cert.bgColor}
                                >
                                    <IconComponent size={32} color={cert.iconColor} strokeWidth={2} />
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <h4 style={{
                                        fontWeight: 'bold',
                                        color: '#0f172a',
                                        fontSize: '0.875rem',
                                        marginBottom: '0.25rem'
                                    }}>
                                        {cert.title}
                                    </h4>
                                    <p style={{
                                        color: '#64748b',
                                        fontSize: '0.75rem'
                                    }}>
                                        {cert.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
