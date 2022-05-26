import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import Banner from './Banner';
import BusinessSummary from './BusinessSummary';
import Reviews from './Reviews';
import Tools from './Tools';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <BusinessSummary></BusinessSummary>
            <Tools></Tools>
            <Reviews></Reviews>
            <Footer></Footer>
        </div>
    );
};

export default Home;