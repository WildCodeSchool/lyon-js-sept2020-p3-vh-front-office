/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';

import './Reviews.css';
import API from '../../services/API';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    API.get('/reviews').then((res) => {
      setReviews(res.data);
    });
  }, []);

  return (
    <>
      <h1>Témoignages</h1>

      <div>
        {reviews.map((review) => {
          return (
            <div className="cards">
              <div key={review.id} className="ratings-comments">
                <p className="comments"> {review.comment}</p>
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
            </div>
          );
        })}
      </div>
    </>
  );
}
