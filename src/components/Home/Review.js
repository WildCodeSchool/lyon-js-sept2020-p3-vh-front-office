import React, { useState, useEffect } from 'react';
import './Review.scss';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { getCollection } from '../../services/API';

function Review() {
  // eslint-disable-next-line no-unused-vars
  const [reviews, setReviews] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [rating, setRating] = useState(2);
  /*   const sliderArr = [1, 2, 3, 4, 5]; */
  const [changeSlide, setChangeSlide] = useState(0);
  const handleClicLeft = () => {
    // eslint-disable-next-line no-unused-expressions
    changeSlide === 0
      ? setChangeSlide(-100 * (reviews.length - 1))
      : setChangeSlide(changeSlide + 100);
  };
  const handleClicRight = () => {
    // eslint-disable-next-line no-unused-expressions
    changeSlide === -100 * (reviews.length - 1)
      ? setChangeSlide(0)
      : setChangeSlide(changeSlide - 100);
  };

  useEffect(() => {
    const request = getCollection('reviews').then((data) => setReviews(data));
    return () => {
      request.cancel();
    };
  }, []);

  return (
    <div className="container-carousel-reviews">
      <div className="slider">
        {reviews.map((review) => {
          return (
            <div
              className="slide-reviews"
              style={{ transform: `translateX(${changeSlide}%)` }}
            >
              <p>{review.comment}</p>
              <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend" />
                <Rating name="read-only" value={review.rating} readOnly />
              </Box>
            </div>
          );
        })}
        <button type="button" id="goLeft" onClick={handleClicLeft}>
          <i className="fa fa-chevron-left" aria-hidden="true" />
        </button>
        <button type="button" id="goRight" onClick={handleClicRight}>
          <i className="fa fa-chevron-right" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default Review;
