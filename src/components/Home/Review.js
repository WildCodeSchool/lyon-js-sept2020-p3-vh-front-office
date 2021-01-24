import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { getCollection } from '../../services/API';
import './Review.scss';

const useStyles = makeStyles(() => ({
  rating: {
    marginBottom: 0,
  },
}));

const Review = () => {
  const classes = useStyles();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const request = getCollection('reviews').then((data) => setReviews(data));
    return () => {
      request.cancel();
    };
  }, []);
  return (
    <section className="reviews-carousel-wrapper">
      <h1>Ils ont tenté l'expérience</h1>
      <p>________________________</p>
      <div className="carrousel-reviews">
        {reviews && reviews.length !== 0 ? (
          <Carousel
            showThumbs={false}
            showStatus={false}
            autoPlay
            interval={6000}
            transitionTime={600}
            showArrows={false}
          >
            {reviews.map((review) => (
              <div key={review.id} className="container-slide-reviews">
                <div className="slide-reviews">
                  <h3>{review.title}</h3>
                  <p style={{ marginTop: '20px', marginBottom: '10px' }}>
                    {review.comment}
                  </p>
                  <div className="rating-and-name">
                    <Box
                      className={classes.rating}
                      component="fieldset"
                      mb={3}
                      borderColor="transparent"
                    >
                      <Typography component="legend" />
                      <Rating name="read-only" value={review.rating} readOnly />
                    </Box>
                    <p>par {review.firstname}</p>
                  </div>
                </div>
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
    </section>
  );
};

export default Review;
