import React from 'react';
import WelcomeCarousel from './WelcomeCarousel';
import Banner from './Banner';
import Sponsors from '../Sponsors/Sponsors';
import Review from './Review';
import Reservation from './Reservation';

const Home = () => {
  return (
    <div>
      <Banner />
      <WelcomeCarousel />
      <Review />
      <Reservation />
      <Sponsors />
    </div>
  );
};

export default Home;
