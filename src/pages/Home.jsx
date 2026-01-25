import React from 'react';
import Slideshow from '../components/Slideshow';
import ProductCategories from '../components/ProductCategories';
import WhyChooseUs from '../components/WhyChooseUs';
import GlobalReach from '../components/GlobalReach';
import ConnectBanner from '../components/ConnectBanner';
import Certifications from '../components/Certifications';

const Home = () => {
    return (
        <div>
            <Slideshow />
            <ProductCategories />
            <WhyChooseUs />
            <GlobalReach />
            <ConnectBanner />
            <Certifications />
        </div>
    );
};

export default Home;
