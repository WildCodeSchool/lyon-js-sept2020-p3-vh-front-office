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
  const [tab, setTab] = useState('first');

  useEffect(() => {
    API.get(`/order/user/${userLogged.id}`).then((res) => {
      setFetchEvents(res.data);
    });
  }, []);

  const backToProfile = () => {
    history.push('/profile');
  };

  return (
    <>
      <div>
        <div className="backToProfile-button">
          <CornerDownLeft onClick={backToProfile} />
          <h1>My Events</h1>
        </div>
        <div className="switch-tabs-buttons">
          <button
            className={`tab ${tab === 'first' ? 'tab-active' : ''}`}
            type="button"
            onClick={() => {
              setTab('first');
            }}
          >
            À venir
          </button>
          <button
            className={`tab ${tab === 'second' ? 'tab-active' : ''}`}
            type="button"
            onClick={() => {
              setTab('second');
            }}
          >
            Passés
          </button>
        </div>
      </div>
      <div className="all-events">
        <div className="events-list upcoming-events">
          {fetchEvents
            .filter((fetchEvent) => {
              if (tab === 'first') {
                return Date.parse(fetchEvent.date) > Date.parse(new Date());
              }
              return Date.parse(fetchEvent.date) <= Date.parse(new Date());
            })
            .map((event) => {
              return (
                <MyEvent
                  key={event.order_id}
                  event={event}
                  isPast={tab === 'second'}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}

function MyEvent({ event, isPast }) {
  const { userLogged } = useContext(LoginContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!userLogged) {
      return;
    }

    API.get(`/reviews/user/${userLogged.id}/event/${event.event_id}`).then(
      (res) => {
        setReviews(res.data);
      }
    );
  }, [event.event_id, userLogged]);

  const handleClose = (reviewCreated) => {
    setReviews(reviewCreated);
    setModalOpen(false);
  };

  return (
    <div className="myevent-details">
      <p key={event.order_id}>{event.title}</p>
      <p key={event.event_id}>{moment(event.date).format('MMM Do YY')}</p>

      <ReviewModal show={modalOpen} event={event} handleClose={handleClose} />

      {isPast && reviews.length === 0 ? (
        <button type="button" onClick={() => setModalOpen(true)}>
          Rate this event
        </button>
      ) : null}
    </div>
  );
}
