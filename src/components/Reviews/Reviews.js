/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import FacebookIcon from '@material-ui/icons/Facebook';
import Box from '@material-ui/core/Box';
import './Reviews.scss';
import API from '../../services/API';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const { t } = useTranslation();
  const history = useHistory();

  useEffect(() => {
    API.get('/reviews').then((res) => {
      setReviews(res.data);
    });
  }, []);

  function handleClick() {
    history.push(`${reviews.facebook_url}`);
  }

  return (
    <div className="container-page-reviews">
      <Helmet>
        <title>Témoignages</title>
      </Helmet>
      <h1>{t('Reviews.h1')}</h1>

      <div className="cards-container">
        {reviews &&
          reviews.map((review) => {
            return (
              <div className="cards" key={review.id}>
                <img src={review.photo_url} alt={review.firstname} />
                <div className="fb-icons-reviews" onClick={handleClick}>
                  <FacebookIcon style={{ color: '#8c0226' }} />
                </div>
                <div className="content-card">
                  <h3>
                    {review.firstname} {review.lastname}
                  </h3>
                  <p className="date-reviews">{review.created_at}</p>
                  <p className="comment-reviews">{review.comment}</p>
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography component="legend" />
                    <Rating name="read-only" value={review.rating} readOnly />
                  </Box>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
