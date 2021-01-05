import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Events.scss';
import API from '../../services/API';

const Events = () => {
  const [events, setEvents] = useState();

  useEffect(() => {
    API.get('/events').then((res) => setEvents(res.data));
  }, []);

  // const getModerator = (id) => {
  //   const result = API.get(`/users/${id}`).then((res) => res.data);
  //   return result.firstname;
  // };

  // console.log(getModerator(1));

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
                <p>
                  {/* {API.get(`/users/${event.address_id}`).then(
                    (res) => res.data.city
                  )} */}
                  City
                </p>
                <p>
                  {/* {getModerator(event.moderator_id)} */}
                  Animator
                </p>
                <p>
                  {/* {API.get(`/products/${event.wine_id}`).then(
                    (res) => res.data.name
                  )} */}
                  Wine
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Events;
