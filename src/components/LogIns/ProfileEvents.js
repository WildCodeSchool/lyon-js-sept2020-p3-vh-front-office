/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CornerDownLeft } from 'react-feather';
import moment from 'moment';
import { LoginContext } from '../Contexts/LoginContext';
import ReviewModal from './ReviewModal';

import './Profile.scss';
import API from '../../services/API';

export default function ProfileEvents() {
  const { userLogged } = useContext(LoginContext);
  const [fetchEvents, setFetchEvents] = useState([]);
  const history = useHistory();
  const [goToRatings, setGoToRatings] = useState(false);

  const [writeComment, setWriteComment] = useState('');

  const [modal, setModal] = useState({ show: false });

  useEffect(() => {
    API.get(`/order/user/${userLogged.id}`).then((res) => {
      setFetchEvents(res.data);
    });
  }, []);

  const backToProfile = () => {
    history.push('/profile');
  };

  const showModal = (eventId) => {
    setModal({ show: eventId });
  };

  const hideModal = () => {
    setModal({ show: false });
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
                    <p key={futureOrder.event_id}>
                      {moment(futureOrder.date).format('MMM Do YY')}
                    </p>
                    <p>{futureOrder.event_id}</p>

                    <ReviewModal
                      show={modal.show === futureOrder.event_id}
                      event={futureOrder}
                      handleClose={hideModal}
                    />

                    <button
                      type="button"
                      onClick={() => showModal(futureOrder.event_id)}
                    >
                      Rate this event
                    </button>
                  </div>
                );
              })}
          </div>

          {/* <div>
            <span className="vertical-line" />
          </div> */}

          <div className="past-events">
            <h3>Passés</h3>
            {fetchEvents
              .filter(
                (fetchEvent) =>
                  Date.parse(fetchEvent.date) < Date.parse(new Date())
              )
              .map((pastOrder) => {
                return (
                  <div>
                    <p key={pastOrder.order_id}>{pastOrder.title}</p>
                    <p>{moment(pastOrder.date).format('MMM Do YY')}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
