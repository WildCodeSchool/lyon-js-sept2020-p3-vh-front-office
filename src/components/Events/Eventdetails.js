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
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            accumsan nec metus sit amet sollicitudin. Sed blandit eros non nunc
            bibendum, sit amet molestie erat sollicitudin. Nulla facilisi. Sed
            blandit, eros vel tincidunt hendrerit, odio nisi ornare sem, id
            vestibulum ipsum sem non ante. Curabitur et aliquet leo, sed gravida
            erat. Quisque ultrices risus eu velit pharetra hendrerit. Cras
            fermentum sapien sollicitudin, rutrum orci eu, venenatis lorem.
            Vivamus vitae turpis et sapien viverra mattis. Praesent et nisl
            suscipit, porta arcu sed, suscipit lacus. Ut sed arcu vel eros
            sollicitudin tincidunt. Fusce at enim finibus, auctor nunc et,
            laoreet mi. Morbi dolor nunc, consectetur non leo nec, aliquam
            condimentum metus. Donec dignissim sapien sit amet feugiat
            fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et
            ultrices posuere cubilia curae; In nec orci felis. Vivamus sed justo
            consequat, rhoncus dolor sed, aliquet urna. Mauris ornare
            condimentum mollis. In ultricies mauris id ligula molestie
            tincidunt. Integer viverra, quam ac blandit egestas, nisl risus
            interdum neque, vel elementum mauris tellus ac urna. Proin sit amet
            ex lobortis, lobortis magna sed, dictum nibh. Duis nec scelerisque
            libero, gravida fringilla mi. Praesent pretium venenatis tellus,
            vitae feugiat metus venenatis ut.
          </p>
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
