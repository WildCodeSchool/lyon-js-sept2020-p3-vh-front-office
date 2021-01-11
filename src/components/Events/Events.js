import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import './Calendar.scss';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import './Events.scss';
import API from '../../services/API';

const Events = () => {
  const [events, setEvents] = useState();
  const [value, onChange] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const currentDateString = moment(currentDate).format('YYYY-MM-DD');
    API.get(
      `/events?after=${currentDateString}&before=${currentDateString}`
    ).then((res) => setEvents(res.data));
    console.log(currentDateString);
  }, [currentDate]);

  return (
    <div className="eventBody">
      <div className="calendar-container">
        <Calendar
          onChange={onChange}
          value={value}
          onClickDay={setCurrentDate}
          onClickWeekNumber={currentDate}
        />
      </div>
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
                <p>{event.city}</p>
                <p>
                  {event.firstname} {event.lastname}
                </p>
                <p>{event.name}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Events;
