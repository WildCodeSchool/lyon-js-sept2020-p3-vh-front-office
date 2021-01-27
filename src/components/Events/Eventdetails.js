/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint no-underscore-dangle: 0 */
import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MdShare } from 'react-icons/md';
import './Eventdetail.scss';
import Button from '@material-ui/core/Button';
import { IconContext } from 'react-icons/lib';
import 'leaflet/dist/leaflet.css';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useToasts } from 'react-toast-notifications';
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from 'react-share';
import { useTranslation } from 'react-i18next';
import SpinnerLoader from '../../services/Loader';
import { BasketContext } from '../Contexts/BasketContext';
import API from '../../services/API';

const L = require('leaflet');

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.imagePath = 'node_modules/leaflet';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const EventDetails = (props) => {
  const [eventData, setEventData] = useState();
  const [eventCoordinate, setEventCoordinate] = useState();
  const [quantity, setQuantity] = useState(1);
  const [userData, setUserData] = useState();
  const { addToast } = useToasts();
  const { t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const { basket, setBasket } = useContext(BasketContext);

  const { match } = props;
  const eventId = match.params.id;
  const userId = match.params.id;

  useEffect(() => {
    API.get(`/events/${eventId}`).then((res) => setEventData(res.data));
  }, []);

  useEffect(() => {
    API.get(`/users/${userId}`).then((res) => setUserData(res.data));
  }, []);

  useEffect(() => {
    if (eventData) {
      const apiUrl = `https://api-adresse.data.gouv.fr/search/?q=${eventData.street.replace(
        / /g,
        '+'
      )}&postcode=${eventData.zipcode}`;
      axios
        .get(apiUrl)
        .then((res) =>
          setEventCoordinate([
            res.data.features[0].geometry.coordinates[1],
            res.data.features[0].geometry.coordinates[0],
          ])
        );
    }
  }, [eventData]);

  const useStyles = makeStyles(() => ({
    btn: {
      height: '50%',
      backgroundColor: '#6d071a',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#6d071a',
      },
    },
  }));

  const classes = useStyles();

  const handleClick = () => {
    const currentBasket = basket;
    const isEventExistingInBasket = currentBasket.findIndex(
      (event) => event.id === parseInt(eventId, 10)
    );
    if (isEventExistingInBasket !== -1) {
      if (
        currentBasket[isEventExistingInBasket].quantity +
          parseInt(quantity, 10) <=
        eventData.availabilities
      ) {
        currentBasket[isEventExistingInBasket].quantity += parseInt(
          quantity,
          10
        );
        setBasket(currentBasket);
      } else {
        addToast(
          `Votre réservation dépasse le nombre de places disponibles (déjà ${currentBasket[isEventExistingInBasket].quantity} places dans votre panier)`,
          {
            appearance: 'error',
            autoDismiss: true,
          }
        );
      }
      setBasket(currentBasket);
    } else {
      const newEvent = {
        id: parseInt(eventId, 10),
        quantity: parseInt(quantity, 10),
      };
      const newBasket = [newEvent, ...currentBasket];
      setBasket(newBasket);
    }
  };

  return eventCoordinate ? (
    <section className="event-details-container">
      <Helmet>
        <title>{eventData.title}</title>
      </Helmet>

      <h1 className="title">{eventData.title}</h1>
      <div className="main-page">
        <div className="top-part">
          <img src={userData.photo_url} alt="animator_image" />
          <img src={eventData.main_picture_url} alt="event_image" />
        </div>
        <div className="middle-part">
          <p>{userData.bio}</p>
          <p>{eventData.description}</p>
        </div>
        <div className="bottom-part">
          <div className="logo-event">
            <FacebookShareButton
              className="facebook"
              url="https://www.youtube.com/"
            >
              <FacebookIcon size={30} borderRadius={50}>
                Facebook
              </FacebookIcon>
            </FacebookShareButton>

            <TwitterShareButton className="twitter" url="https://twitter.com/">
              <TwitterIcon size={30} borderRadius={50}>
                Twitter
              </TwitterIcon>
            </TwitterShareButton>
          </div>
          {eventData.availabilities ? (
            <p>
              {eventData.availabilities} {t('EventsDetails.p')}
            </p>
          ) : (
            <p style={{ color: 'red' }}>{t('EventsDetails.pWithoutPlace')}</p>
          )}
          <p>
            {eventData.price} €/u
            <br />
            {eventData.duration_seconds} secondes
          </p>
          {!!eventData.availabilities && ( // need to use this expression, because React return a 0 with eventData.availabilities &&
            <div className="quantity-book">
              <TextField
                className={classes.input}
                id="standard-number"
                type="number"
                label="Places"
                value={quantity}
                InputProps={{
                  inputProps: { min: 0, max: eventData.availabilities },
                }}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
            </div>
          )}
          <Button
            // eslint-disable-next-line react/jsx-boolean-value
            onClick={(event) => handleClick(event)}
            className={classes.btn}
            type="button"
            variant="contained"
            color="primary"
          >
            {t('EventsDetails.button')}
          </Button>
        </div>
      </div>
      <hr />
      <h2>Lieu de l'évènement</h2>
      <div className="map">
        <MapContainer
          center={eventCoordinate}
          zoom={13}
          style={{ height: '351px', width: '80%', zIndex: '0', margin: 'auto' }}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={eventCoordinate}
            icon={new Icon({ iconUrl: markerIconPng })}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </section>
  ) : (
    <SpinnerLoader />
  );
};

export default EventDetails;
