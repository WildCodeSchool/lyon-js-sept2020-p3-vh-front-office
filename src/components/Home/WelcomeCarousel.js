import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useTranslation } from 'react-i18next';
import { Carousel } from 'react-responsive-carousel';
import './WelcomeCarrousel.scss';
import API from '../../services/API';

const WelcomeCarousel = () => {
  const { t } = useTranslation();
  const [slides, setSlides] = useState();

  useEffect(() => {
    API.get('/carrousel').then((res) => setSlides(res.data));
  }, []);

  return (
    <div className="welcome-carrousel-wrapper">
      {slides && slides.length !== 0 ? (
        <Carousel
          showThumbs={false}
          showStatus={false}
          autoPlay
          interval={6000}
          transitionTime={600}
          showArrows
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
            <p className="legend"> {t('Slide.alert')} </p>
          </div>
        </Carousel>
      )}
    </div>
  );
};

export default WelcomeCarousel;
