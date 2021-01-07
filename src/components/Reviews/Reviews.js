import React, { useState, useEffect } from 'react';

import './Reviews.css';
import { User } from 'react-feather';
// import Rating from '@material-ui/lab/Rating';
// import Box from '@material-ui/core/Box';
import API from '../../services/API';

export default function Reviews() {
  // const [value, setValue] = useState();

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    API.get('/reviews').then((res) => {
      setReviews(res.data);
    });
  }, []);

  return (
    <>
      <h1>Témoignages</h1>

      {/* <Box
        className="box"
        component="fieldset"
        mb={3}
        borderColor="transparent"
      >
        <Rating
          name="read-only"
          value={value}
          readOnly
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Box> */}

      <div>
        {reviews.map((review) => {
          return (
            <div className="cards">
              <div className="avatar-text">
                <div className="avatar">
                  <User width="80" />
                </div>
                <div key={review.id}>
                  <p className="text">{review.comment}</p>
                  <p className="test">{review.rating}</p>
                </div>
              </div>
            </div>
          );
        })}

        {/* <Box component="fieldset" mb={3} borderColor="transparent">
          <Rating
            name="read-only"
            value={value}
            readOnly
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Box> */}
      </div>
    </>
  );
}
