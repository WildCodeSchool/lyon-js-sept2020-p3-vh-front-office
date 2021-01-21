import React from 'react';
import WelcomeCarousel from './WelcomeCarousel';
import Banner from './Banner';
// import Translation from './Translation';
import Sponsors from './Sponsors';
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
