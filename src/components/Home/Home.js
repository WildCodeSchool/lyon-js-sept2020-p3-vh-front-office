import React from 'react';
import WelcomeCarousel from './WelcomeCarousel';
import Banner from './Banner';
import Sponsors from '../Sponsors/Sponsors';
import Review from './Review';

const Home = () => {
  return (
    <div>
      <Banner />
      <WelcomeCarousel />
      <Review />
      <Sponsors />
    </div>
  );
};

export default Home;
