/* eslint no-underscore-dangle: 0 */
import * as React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MdShare } from 'react-icons/md';
import './Eventdetail.scss';
import { IconContext } from 'react-icons/lib';
import 'leaflet/dist/leaflet.css';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';

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

const EventDetails = () => {
  return (
    <>
      <div>
        <h1 className="title">Réserver un évènement</h1>
      </div>
      <div className="description">
        <div className="left_part">
          <img
            src="data:image/jpeg;base64,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"
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
          center={[51.505, -0.09]}
          zoom={13}
          style={{ height: '351px', width: '100%', zIndex: '0' }}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[51.505, -0.09]}
            icon={new Icon({ iconUrl: markerIconPng })}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  );
};

export default EventDetails;
