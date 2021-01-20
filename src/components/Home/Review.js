import React, { useState } from 'react';
import './Review.scss';

function Review() {
  const sliderArr = [1, 2, 3, 4, 5];
  const [changeSlide, setChangeSlide] = useState(0);
  const handleClicLeft = () => {
    // eslint-disable-next-line no-unused-expressions
    changeSlide === 0
      ? setChangeSlide(-100 * (sliderArr.length - 1))
      : setChangeSlide(changeSlide + 100);
  };
  const handleClicRight = () => {
    // eslint-disable-next-line no-unused-expressions
    changeSlide === -100 * (sliderArr.length - 1)
      ? setChangeSlide(0)
      : setChangeSlide(changeSlide - 100);
  };

  return (
    <div>
      <div className="slider">
        {sliderArr.map((item) => {
          return (
            <div
              className="slide-reviews"
              style={{ transform: `translateX(${changeSlide}%)` }}
            >
              {item}
            </div>
          );
        })}
        <button type="button" id="goLeft" onClick={handleClicLeft}>
          <i className="fa fa-chevron-left" aria-hidden="true" />
        </button>
        <button type="button" id="goRight" onClick={handleClicRight}>
          <i className="fa fa-chevron-left" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default Review;
