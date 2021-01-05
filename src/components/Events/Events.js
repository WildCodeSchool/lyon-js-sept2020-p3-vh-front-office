import React, { useEffect, useState } from 'react';
import './Events.scss';
import API from '../../services/API';

const Events = () => {
  const [events, setEvents] = useState();

  useEffect(() => {
    API.get('/events').then((res) => setEvents(res.data));
  }, [events]);

  return (
    <div className="eventBody">
      {events &&
        events.map((event) => {
          return (
            <div className="event">
              <div className="eventCard">
                <img src={event.main_picture_url} alt={event.title} />
                <div>
                  <h2>{event.title}</h2>
                  <p>{event.description}</p>
                </div>
              </div>
              <div className="underCard">
                <p>{event.address_id}</p>
                <p>{event.moderator_id}</p>
                <p>{event.wine_id}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Events;
