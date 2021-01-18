/* eslint-disable no-unused-vars */
/* eslint no-underscore-dangle: 0 */
/* eslint-disable global-require */
import React, { useState, useEffect, useContext } from 'react';
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
  const { addToast } = useToasts();
  // eslint-disable-next-line no-unused-vars
  const { basket, setBasket } = useContext(BasketContext);

  const { match } = props;
  const eventId = match.params.id;

  useEffect(() => {
    API.get(`/events/${eventId}`).then((res) => setEventData(res.data));
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
    <>
      <div>
        <h1 className="title">{eventData.title}</h1>
      </div>
      <div className="description">
        <div className="left_part">
          <img
            className="image_event"
            src={eventData.main_picture_url}
            alt="secondTest"
          />
          <IconContext.Provider value={{ size: 40 }}>
            <MdShare />
          </IconContext.Provider>
        </div>
        <div className="right_part">
          <p>{eventData.description}</p>
          {eventData.availabilities ? (
            <p>{eventData.availabilities} places disponibles</p>
          ) : (
            <p style={{ color: 'red' }}>
              Malheureusement, l'évènement n'est plus disponible
            </p>
          )}
          {!!eventData.availabilities && ( // need to use this expression, because React return a 0 with eventData.availabilities &&
            <div className="quantity-book">
              <Button
                // eslint-disable-next-line react/jsx-boolean-value
                onClick={(event) => handleClick(event)}
                className={classes.btn}
                type="button"
                variant="contained"
                color="primary"
              >
                Réserver
              </Button>
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
        </div>
      </div>
      <div className="map">
        <MapContainer
          center={eventCoordinate}
          zoom={13}
          style={{ height: '351px', width: '100%', zIndex: '0' }}
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
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default EventDetails;
