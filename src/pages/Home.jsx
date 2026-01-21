import React from 'react';
import Slideshow from '../components/Slideshow';
import WelcomeSection from '../components/WelcomeSection';
import FeaturedProducts from '../components/FeaturedProducts';
import ConnectBanner from '../components/ConnectBanner';
import Certifications from '../components/Certifications';

const Home = () => {
    return (
        <div>
            <Slideshow />
            <WelcomeSection />
            <FeaturedProducts />
            <ConnectBanner />
            <Certifications />
        </div>
    );
};

export default Home;
