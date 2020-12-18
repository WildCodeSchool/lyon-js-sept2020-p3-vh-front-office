import React from 'react';
import WelcomeCarousel from './WelcomeCarousel';
import Banner from './Banner';
import Translation from './Translation';
import Sponsors from './Sponsors';

const Home = () => {
  return (
    <div>
      <Translation />
      <Banner />
      <WelcomeCarousel />
      <Sponsors />
    </div>
  );
};

export default Home;
