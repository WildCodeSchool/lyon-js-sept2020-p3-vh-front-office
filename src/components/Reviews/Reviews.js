/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './Reviews.scss';
import API from '../../services/API';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    API.get('/reviews').then((res) => {
      setReviews(res.data);
    });
  }, []);

  return (
    <div className="container-page-reviews">
      <Helmet>
        <title>Témoignages</title>
      </Helmet>
      <h1>{t('Reviews.h1')}</h1>
      <p className="line">________________________</p>
      <div className="cards-container">
        {reviews &&
          reviews.map((review) => {
            return (
              <div className="cards" key={review.id}>
                <div className="content-card">
                  <div className="title-rating">
                    <h3>{review.title}</h3>
                    <Box component="fieldset" mb={3} borderColor="transparent">
                      <Typography component="legend" />
                      <Rating name="read-only" value={review.rating} readOnly />
                    </Box>
                  </div>

                  <p className="comment-reviews">“{review.comment}”</p>
                </div>
                <p className="date-reviews">
                  {moment(review.created_at).format('DD-MM-YYYY')}
                  <p>{review.firstname}</p>
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
