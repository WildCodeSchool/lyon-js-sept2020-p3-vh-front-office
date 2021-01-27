/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

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
    <section className="reviews">
      <Helmet>
        <title>Témoignages</title>
      </Helmet>
      <h1>{t('Reviews.h1')}</h1>

      <div>
        {reviews.map((review) => {
          return (
            <div className="cards" key={review.id}>
              <div className="wrapper">
                <div className="ratings-comments">
                  <p className="title">{review.title} </p>
                  <p className="comments">{review.comment} </p>

                  <div className="ratings">
                    {review.rating === 5 ? (
                      <p>&#9733;&#9733;&#9733;&#9733;&#9733;</p>
                    ) : review.rating === 4 ? (
                      <p>&#9733;&#9733;&#9733;&#9733;</p>
                    ) : review.rating === 3 ? (
                      <p>&#9733;&#9733;&#9733;</p>
                    ) : review.rating === 2 ? (
                      <p>&#9733;&#9733;</p>
                    ) : review.rating === 1 ? (
                      <p>&#9733;</p>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="firstname">{review.firstname} </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
