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
      {slides ? (
        <Carousel
          showThumbs={false}
          showStatus={false}
          autoPlay
          interval={6000}
          transitionTime={600}
          showArrows={false}
        >
          {slides.map((slide) => (
            <div key={slide.image}>
              <img src={slide.image} alt={slide.description} />
              <p className="legend">{slide.description}</p>
            </div>
          ))}
        </Carousel>
      ) : (
        <Carousel showThumbs={false} showStatus={false} showArrows={false}>
          <div>
            <p className="legend">Aucun contenu disponible !</p>
          </div>
        </Carousel>
      )}
    </div>
  );
};

export default WelcomeCarousel;
