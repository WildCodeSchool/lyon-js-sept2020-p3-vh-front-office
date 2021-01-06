import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Events.scss';
import API from '../../services/API';

const Events = () => {
  const [events, setEvents] = useState();

  useEffect(() => {
    API.get('/events').then((res) => setEvents(res.data));
  }, []);

  return (
    <div className="eventBody">
      {events &&
        events.map((event) => {
          return (
            <div className="eventCard" key={event.id}>
              <div className="eventDetail">
                <img src={event.main_picture_url} alt={event.title} />
                <div className="eventDescription">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <Link to={`/events/${event.id}`}>
                    <button type="button">Réserver</button>
                  </Link>
                </div>
              </div>
              <div className="underCard">
                <p>City</p>
                <p>Animator</p>
                <p>Wine</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Events;
