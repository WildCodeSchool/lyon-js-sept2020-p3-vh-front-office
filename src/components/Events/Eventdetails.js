/* eslint no-underscore-dangle: 0 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MdShare } from 'react-icons/md';
import './Eventdetail.scss';
import { IconContext } from 'react-icons/lib';
import 'leaflet/dist/leaflet.css';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';
import API from '../../services/API';

/* eslint-disable global-require */
const L = require('leaflet');

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.imagePath = 'node_modules/leaflet';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
/* eslint-disable global-require */

const EventDetails = (props) => {
  const [eventsData, setEventsData] = useState();
  const [eventsCoordinate, setEventsCoordinate] = useState();

  const { match } = props;
  const eventId = match.params.id;

  useEffect(() => {
    API.get(`/events/${eventId}`).then((res) => setEventsData(res.data));
  }, []);

  useEffect(() => {
    if (eventsData) {
      const apiUrl = `https://api-adresse.data.gouv.fr/search/?q=${eventsData.street.replace(
        / /g,
        '+'
      )}&postcode=${eventsData.zipcode}`;
      axios
        .get(apiUrl)
        .then((res) =>
          setEventsCoordinate([
            res.data.features[0].geometry.coordinates[1],
            res.data.features[0].geometry.coordinates[0],
          ])
        );
    }
  }, [eventsData]);

  return eventsCoordinate ? (
    <>
      <div>
        <h1 className="title">{eventsData.title}</h1>
      </div>
      <div className="description">
        <div className="left_part">
          <img
            className="image_event"
            src={eventsData.main_picture_url}
            alt="secondTest"
          />
          <IconContext.Provider value={{ size: 40 }}>
            <MdShare />
          </IconContext.Provider>
        </div>
        <div className="right_part">
          <p>{eventsData.description}</p>
          <div className="button">
            <button type="button">Reserver</button>
          </div>
        </div>
      </div>
      <div className="map">
        <MapContainer
          center={eventsCoordinate}
          zoom={13}
          style={{ height: '351px', width: '100%', zIndex: '0' }}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={eventsCoordinate}
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
