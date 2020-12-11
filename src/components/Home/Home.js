import React from 'react';
import WelcomeCarousel from './WelcomeCarousel';
import Banner from './Banner';
import Translation from './Translation';

const Home = () => {
  return (
    <div>
      <Translation />
      <Banner />
      <WelcomeCarousel />
    </div>
  );
};

export default Home;
