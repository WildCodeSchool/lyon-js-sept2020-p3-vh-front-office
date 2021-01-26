/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './Profile.scss';

export default function ReviewModal({ handleClose, show, children }) {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <p>Comment</p>
        <p>Rating</p>
        <button onClick={handleClose}>Close</button>
      </section>
    </div>
  );
}
