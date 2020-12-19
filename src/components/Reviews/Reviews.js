import React from 'react';
import './Reviews.css';
import { User } from 'react-feather';

export default function Reviews() {
  return (
    <>
      <h1>Ratings</h1>

      <div className="stars">&#9733; &#9733; &#9733; &#9733;&#9733;</div>
      <div className="cards">
        <div className="avatar-text">
          <div className="avatar">
            <User width="80" />
          </div>
          <div className="text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </div>
        <div className="stars">&#9733; &#9733; &#9733; &#9733;&#9733;</div>
      </div>
    </>
  );
}
