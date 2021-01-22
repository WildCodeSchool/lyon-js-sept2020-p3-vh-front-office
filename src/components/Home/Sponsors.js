import React, { useEffect, useState } from 'react';
import { getCollection } from '../../services/API';
import './Sponsors.scss';

const Sponsors = () => {
  const [sponsors, setSponsors] = useState();

  useEffect(() => {
    const request = getCollection('sponsors').then((data) => setSponsors(data));
    return () => {
      request.cancel();
    };
  }, []);

  return (
    <div className="sponsors-main">
      <h1>Nos partenaires :</h1>
      <div className="cards">
        {sponsors &&
          sponsors.map((sponsor) => {
            return (
              <div className="sponsor">
                <img
                  src={`${process.env.REACT_APP_API_BASE_URL}/${sponsor.image}`}
                  alt={sponsor.name}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Sponsors;
