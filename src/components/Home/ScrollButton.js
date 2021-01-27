import React from 'react';
import ScrollUpButton from 'react-scroll-up-button';
import './ScrollButton.scss';

const ScrollButton = () => {
  return (
    <div>
      <ScrollUpButton
        ContainerClassName="scrollButton"
        TransitionClassName="transitionedScrollButton"
      />
    </div>
  );
};

export default ScrollButton;
