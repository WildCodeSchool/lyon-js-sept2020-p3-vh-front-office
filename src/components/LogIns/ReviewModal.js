/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import './Profile.scss';
import { XCircle } from 'react-feather';
import API from '../../services/API';
import { LoginContext } from '../Contexts/LoginContext';

export default function ReviewModal({ event, handleClose, show, children }) {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  const { userLogged } = useContext(LoginContext);
  const [writeComment, setWriteComment] = useState('');
  const [rateEvent, setRateEvent] = useState([]);
  const [reviewIsSaved, setReviewIsSaved] = useState(false);

  const sendReviewToDB = () => {
    API.post('/reviews/', {
      comment: writeComment,
      rating: 3,
      event_id: event.event_id,
      user_id: userLogged.id,
      id: 1,
    }).then((res) => {
      setRateEvent(res.data);
    });
  };

  const leaveReview = (e) => {
    setWriteComment(e.target.value);
  };

  const clickToSaveReview = () => {
    setReviewIsSaved(true);
    sendReviewToDB();
  };

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div onClick={handleClose} type="button">
          <XCircle />
        </div>
        {children}
        Comment:
        <textarea name="comment" value={writeComment} onChange={leaveReview} />
        <p>Rating</p>
        <div>
          <p>&#9733;&#9733;&#9733;&#9733;&#9733;</p>
        </div>
        <button onClick={clickToSaveReview} type="submit">
          Save Review
        </button>
      </section>
    </div>
  );
}
