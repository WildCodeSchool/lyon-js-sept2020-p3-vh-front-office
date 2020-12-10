import React from 'react';
import Translation from './Translation';
import WelcomeCarousel from './WelcomeCarousel';
import Banner from './Banner';

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
