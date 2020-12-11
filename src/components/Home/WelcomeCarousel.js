import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import './WelcomeCarrousel.scss';

const WelcomeCarousel = () => {
  return (
    <div className="carrousel">
      <Carousel
        showThumbs={false}
        showStatus={false}
        autoPlay
        interval={6000}
        transitionTime={600}
        showArrows={false}
      >
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2017/06/26/12/49/red-wine-2443699_960_720.jpg"
            alt="wine"
          />
          <p className="legend">
            Pariatur do eiusmod laborum sunt in velit et eiusmod ex.
          </p>
        </div>
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2015/10/24/11/09/red-wine-1004255_960_720.jpg"
            alt="wine"
          />
          <p className="legend">
            Pariatur do eiusmod laborum sunt in velit et eiusmod ex.
          </p>
        </div>
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2015/11/26/22/28/girl-1064664_960_720.jpg"
            alt="wine"
          />
          <p className="legend">
            Pariatur do eiusmod laborum sunt in velit et eiusmod ex.
          </p>
        </div>
      </Carousel>
    </div>
  );
};

export default WelcomeCarousel;
