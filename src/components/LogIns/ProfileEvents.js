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
        {tab === 'first' ? (
          <div className="upcoming-events">
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
        ) : (
          'null'
        )}
        {tab === 'second' ? (
          <div className="past-events">
            {fetchEvents
              .filter(
                (fetchEvent) =>
                  Date.parse(fetchEvent.date) < Date.parse(new Date())
              )
              .map((pastOrder) => {
                return (
                  <div>
                    <p key={pastOrder.order_id}>
                      <b>{pastOrder.title}</b>
                    </p>
                    <p>{moment(pastOrder.date).format('MMM Do YY')}</p>
                  </div>
                );
              })}
          </div>
        ) : null}
      </div>
    </>
  );
}
