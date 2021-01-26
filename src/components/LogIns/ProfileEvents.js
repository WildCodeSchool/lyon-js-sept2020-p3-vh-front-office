/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CornerDownLeft } from 'react-feather';
import moment from 'moment';
import { LoginContext } from '../Contexts/LoginContext';

import './Profile.scss';
import API from '../../services/API';

export default function ProfileEvents() {
  const { userLogged } = useContext(LoginContext);
  const [fetchEvents, setFetchEvents] = useState([]);
  const history = useHistory();
  const [goToRatings, setGoToRatings] = useState(false);
  const [rateEvent, setRateEvent] = useState([]);
  const [writeComment, setWriteComment] = useState('');
  const [saveReview, setSaveReview] = useState(false);

  const leaveReview = (e) => {
    setWriteComment(e.target.value);
  };

  const sendReviewToDB = () => {
    API.post('/reviews/', {
      comment: writeComment,
      rating: 3,
      event_id: 1,
      user_id: 2,
      id: 3,
    }).then((res) => {
      setRateEvent(res.data);
    });
  };

  const clickToSaveReview = () => {
    setSaveReview(true);
    sendReviewToDB();
  };

  useEffect(() => {
    API.get(`/order/user/${userLogged.id}`).then((res) => {
      setFetchEvents(res.data);
    });
  }, []);

  const backToProfile = () => {
    history.push('/profile');
  };

  const selectToRate = () => {
    setGoToRatings(true);
  };

  return (
    <>
      <div>
        <div>
          <CornerDownLeft
            onClick={backToProfile}
            className="backToProfile-button"
          >
            Retour au profil
          </CornerDownLeft>
        </div>
        <h1>My Events</h1>
        <div className="myEvents">
          <div className="upcoming-events">
            <h3>À venir</h3>
            {fetchEvents
              .filter(
                (fetchEvent) =>
                  Date.parse(fetchEvent.date) > Date.parse(new Date())
              )
              .map((futureOrder) => {
                return (
                  <div className="myevent-details">
                    <p key={futureOrder.order_id}>{futureOrder.title}</p>
                    <p>{moment(futureOrder.date).format('MMM Do YY')}</p>
                  </div>
                );
              })}
          </div>
          <div onClick={selectToRate}>Évaluez cet événement</div>
          {goToRatings ? (
            <div>
              <div>Donne une etoile yo</div>
              <textarea
                name="comment"
                value={writeComment}
                onChange={leaveReview}
              >
                commentaire
              </textarea>
              <button onClick={clickToSaveReview} type="submit">
                click to leave review
              </button>
            </div>
          ) : (
            ''
          )}
          <div>
            <span className="vertical-line" />
          </div>

          <div className="past-events">
            <h3>Passés</h3>
            {fetchEvents
              .filter(
                (fetchEvent) =>
                  Date.parse(fetchEvent.date) < Date.parse(new Date())
              )
              .map((futureOrder) => {
                return (
                  <div>
                    <p key={futureOrder.order_id}>{futureOrder.title}</p>
                    <p>{moment(futureOrder.date).format('MMM Do YY')}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
