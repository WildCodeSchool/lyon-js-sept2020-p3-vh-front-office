import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from 'react-share';
import './Events.scss';
import API from '../../services/API';

const Events = () => {
  const [events, setEvents] = useState();

  useEffect(() => {
    API.get('/events').then((res) => setEvents(res.data));
  }, []);

  return (
    <div className="eventBody">
      <Helmet>
        <title>Événements</title>
      </Helmet>
      {events &&
        events.map((event) => {
          return (
            <div className="eventCard" key={event.id}>
              <div className="eventDetail">
                <img src={event.main_picture_url} alt={event.title} />
                <div className="eventDescription">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <div className="button">
                    <div className="share">
                      <FacebookShareButton
                        className="facebook"
                        url="https://www.youtube.com/"
                      >
                        <FacebookIcon size={30} borderRadius={50}>
                          Facebook
                        </FacebookIcon>
                      </FacebookShareButton>

                      <TwitterShareButton
                        className="twitter"
                        url="https://twitter.com/"
                      >
                        <TwitterIcon size={30} borderRadius={50}>
                          Twitter
                        </TwitterIcon>
                      </TwitterShareButton>
                    </div>
                    <Link to={`/events/${event.id}`}>
                      <button className="reserver" type="button">
                        Réserver
                      </button>
                    </Link>
                  </div>
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
