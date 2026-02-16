import React from 'react';
import Slideshow from '../components/Slideshow';
import ProductCategories from '../components/ProductCategories';
import WhyChooseUs from '../components/WhyChooseUs';
import GlobalReach from '../components/GlobalReach';
import ConnectBanner from '../components/ConnectBanner';
import Certifications from '../components/Certifications';
import { ArrowRight } from 'lucide-react';

const Home = () => {
    return (
        <div>
            <Slideshow />
            <ProductCategories />

            {/* Global View All Products Button */}
            <div style={{ textAlign: 'center', padding: '0 0 4rem 0', backgroundColor: '#fff' }}>
                <a
                    href="/products"
                    className="btn"
                    style={{
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        padding: '1rem 3rem',
                        fontSize: '1.2rem',
                        borderRadius: '30px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                    }}
                >
                    View All Products <ArrowRight size={20} />
                </a>
            </div>

            <WhyChooseUs />
            <GlobalReach />
            <ConnectBanner />
            <Certifications />
        </div>
    );
};

export default Home;
