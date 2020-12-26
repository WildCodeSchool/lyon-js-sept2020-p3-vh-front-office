import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import './WelcomeCarrousel.scss';
import API from '../../services/API';

const WelcomeCarousel = () => {
  const [slides, setSlides] = useState();

  useEffect(() => {
    API.get('/carrousel').then((res) => setSlides(res.data));
  }, []);

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
        {slides
          ? slides.map((slide) => (
              // eslint-disable-next-line react/jsx-indent
              <div>
                <img src={slide.image} alt={slide.description} />
                <p className="legend">{slide.description}</p>
              </div>
            ))
          : 'prout'}
      </Carousel>
    </div>
  );
};

export default WelcomeCarousel;
