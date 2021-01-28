/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';
import Calendar from 'react-calendar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import queryString from 'query-string';
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from 'react-share';
import { GoLocation, GoPerson } from 'react-icons/go';
import { GiWineGlass } from 'react-icons/gi';
import { BiTimeFive } from 'react-icons/bi';
import { BsPerson } from 'react-icons/bs';
import './Events.scss';
import { useTranslation } from 'react-i18next';
import API from '../../services/API';

const useStyles = makeStyles((theme) => ({
  btn: {
    width: '50%',
    color: 'white',
    backgroundColor: '#8C0226',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#6d071a',
    },
  },
}));

const Events = () => {
  const [events, setEvents] = useState();
  const [initialEvents, setInitialEvents] = useState([]);
  const [selectedDates, setSelectedDates] = useState();
  const [listOfEventsDates, setListOfEventsDates] = useState();
  const { t } = useTranslation();
  const history = useHistory();

  const classes = useStyles();

  useEffect(() => {
    if (initialEvents.length !== 0) {
      setListOfEventsDates(
        initialEvents.map((event) => moment(event.date).format('DD-MM-YYYY'))
      );
    }
  }, [initialEvents]);

  const getAllEvents = () => {
    const today = moment().format('YYYY-MM-DD');
    return API.get(`/events?after=${today}&before=2150-01-16`).then((res) => {
      setEvents(res.data);
      setInitialEvents(res.data);
    });
  };

  useEffect(() => {
    return events && events.length
      ? setSelectedDates(new Date(events[0].date))
      : new Date();
  }, []);

  useEffect(() => {
    getAllEvents();
  }, []);

  useEffect(() => {
    if (selectedDates && selectedDates.length) {
      const parsedDates = selectedDates.map((date) =>
        moment(date).format('YYYY-MM-DD')
      );
      const queryParams = { after: parsedDates[0], before: parsedDates[1] };
      const clientQueryParams = queryString.stringify(queryParams);
      history.push(`/events?${clientQueryParams}`);
      return API.get(`/events?${clientQueryParams}`).then((res) =>
        setEvents(res.data)
      );
    }
    return null;
  }, [selectedDates]);

  useEffect(() => {
    return events && events.length
      ? setSelectedDates(new Date(events[0].date))
      : setSelectedDates(new Date());
  }, [initialEvents]);

  return (
    <div className="eventBody">
      <div className="calendar-container">
        {listOfEventsDates && (
          <Calendar
            onClickDay={(value, event) => {
              // eslint-disable-next-line no-underscore-dangle
              setSelectedDates([
                moment(value).startOf('isoWeek')._d,
                moment(value).endOf('isoWeek')._d,
              ]);
            }}
            value={selectedDates}
            tileClassName={({ date }) => {
              if (
                listOfEventsDates.find(
                  (item) => item === moment(date).format('DD-MM-YYYY')
                )
              ) {
                return 'highlight';
              }
              return null;
            }}
          />
        )}
        <Button
          style={{ margin: 'auto', marginTop: '30px' }}
          type="button"
          onClick={() => {
            getAllEvents();
            history.push(`/events`);
          }}
          className={classes.btn}
        >
          {t('Events.bouton2')}
        </Button>
      </div>
      <div className="cardOfEvents">
        <Helmet>
          <title> {t('Events.helmet')}</title>
        </Helmet>
        {events &&
          events.map((event) => {
            return (
              <div className="eventCard" key={event.id}>
                <div className="eventDetail">
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL}/${event.main_picture_url}`}
                    alt={event.title}
                  />
                  <div className="eventDescription">
                    <h2>{event.title}</h2>
                    <p>{event.description}</p>
                    <div className="underCard">
                      <p>
                        <GoLocation size={25} color="#8c0226" />
                        &nbsp;
                        {event.city}
                      </p>

                      <p>
                        <BsPerson size={25} color="#8c0226" />
                        &nbsp;
                        {event.firstname}&nbsp;{event.lastname}
                      </p>
                      <p>
                        <GiWineGlass size={25} color="#8c0226" />
                        &nbsp;
                        {event.name}
                      </p>
                      <p>
                        <BiTimeFive size={25} color="#8c0226" />
                        &nbsp;
                        {moment(event.date).format('DD-MMMM-YYYY')}
                      </p>
                    </div>
                    <div className="button">
                      <Button
                        style={{ width: '20%' }}
                        type="button"
                        onClick={() => history.push(`/events/${event.id}`)}
                        className={classes.btn}
                      >
                        {t('Events.bouton1')}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Events;
