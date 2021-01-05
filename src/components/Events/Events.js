import React, { useState, useEffect } from 'react';
import API from '../../services/API';
import './Events.scss';

const Events = () => {
  const [events, setEvents] = useState();

  useEffect(() => {
    API.get('/Events').then((res) => setEvents(res.data));
  }, [events]);

  return (
    <>
      <div className="events">
        {events &&
          events.map((event) => {
            return <div key={event.id}>{event.price}</div>;
          })}
      </div>
    </>
  );
};

export default Events;
