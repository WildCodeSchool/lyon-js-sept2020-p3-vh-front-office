import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getCollection } from '../../services/API';
import './Sponsors.scss';

const Sponsors = () => {
  const [sponsors, setSponsors] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    const request = getCollection('sponsors').then((data) => setSponsors(data));
    return () => {
      request.cancel();
    };
  }, []);

  return (
    <div className="sponsors-main">
      <h1>{t('Accueil.partenaires')}</h1>
      <p>________________________</p>
      <div className="cards">
        {sponsors && sponsors.length !== 0 ? (
          sponsors.map((sponsor) => {
            return (
              <div className="sponsor">
                <img
                  src={`${process.env.REACT_APP_API_BASE_URL}/${sponsor.image}`}
                  alt={sponsor.name}
                />
              </div>
            );
          })
        ) : (
          <p className="empty-sponsors">Pas de partenaire disponibles</p>
        )}
      </div>
    </div>
  );
};

export default Sponsors;
