import React from 'react';

const Certifications = () => {
    return (
        <section style={{ padding: '4rem 0', backgroundColor: '#fdfdfd' }}>
            <div className="container" style={{ textAlign: 'center' }}>

                <h4 style={{ color: '#666', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px', marginBottom: '0.5rem' }}>Our & Our Associates</h4>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#333' }}>Certifications & Accreditation</h2>

                <div style={{ maxWidth: '900px', margin: '0 auto', color: '#555', lineHeight: '1.8', fontSize: '0.95rem', marginBottom: '3rem' }}>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Vansutra Exports is Government of India approved Agricultural Commodities Exporter associated and affiliated with major trade bodies. Vansutra Exports is a member of Federation of Indian Export Organisation (FIEO), Agriculture and Processed Food Products Export Development Authority (APEDA), Spices Board India, The Solvent Extractors Association of India (SEAINDIA).
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        We ensure smooth supply of quality agro products as well as we also ensure that both our buyers and suppliers are time tested, authentic and capable in terms of their commercial capacity as well as financial and economic standing in the market.
                    </p>
                    <p>
                        As a matter of principle we ensure to deal with only those buyers and suppliers who have been operating in the target markets over a period of time and do not experiment with fresh suppliers or buyers to ensure not only quality products from supplier's side but also to ensure timely payment from the buyer's side.
                    </p>
                </div>

                {/* Logos Grid */}
                <div className="certifications-grid" style={{ marginTop: '3rem', padding: '0 1rem' }}>
                    {[
                        { src: '/assets/certifications/apeda.png', alt: 'APEDA' },
                        { src: '/assets/certifications/fssai.png', alt: 'FSSAI' },
                        { src: '/assets/certifications/spices.png', alt: 'Spices Board' },
                        { src: '/assets/certifications/fieo.png', alt: 'FIEO' },
                        { src: '/assets/certifications/iso.png', alt: 'ISO 9001' }
                    ].map((cert, index) => (
                        <div key={index} className="certification-item">
                            <img
                                src={cert.src}
                                alt={cert.alt}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>



            </div>
        </section>
    );
};

export default Certifications;
