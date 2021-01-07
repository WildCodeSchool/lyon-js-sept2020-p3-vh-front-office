import React, { useState, useEffect } from 'react';

import './Reviews.css';
import { User } from 'react-feather';
// import Rating from '@material-ui/lab/Rating';
// import Box from '@material-ui/core/Box';
import API from '../../services/API';

export default function Reviews() {
  // const [value, setValue] = useState();

  const [review, setReview] = useState();

  useEffect(() => {
    API.get('/reviews').then((res) => setReview(res.data));
  }, [review]);

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

      <div className="cards">
        <div className="avatar-text">
          <div className="avatar">
            <User width="80" />
          </div>
          <div className="text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </div>
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
        {review &&
          review.map((rev) => {
            return (
              <div className="test" key={rev.id}>
                {rev.comment} {rev.rating}
              </div>
            );
          })}
      </div>
    </>
  );
}
