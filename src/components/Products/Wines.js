import React, { useState, useCallback, useEffect } from 'react';
import { Carousel } from '3d-react-carousal';
import { useTranslation } from 'react-i18next';
import WineModal from './WineModal';
import './Wines.scss';
import API from '../../services/API';

const Wines = () => {
  const { t } = useTranslation();
  const [wineClicked, setWineClicked] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [winesCollection, setWinesCollection] = useState([]);
  useEffect(() => {
    API.get('/products').then((res) => setWinesCollection(res.data));
  }, []);

  const handleClick = useCallback((wineId) => {
    setModalShow(true);
    setWineClicked(wineId);
  }, []);

  return (
    <>
      {wineClicked && (
        <WineModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          winedata={
            winesCollection.filter((wine) => wine.id === wineClicked)[0]
          }
        />
      )}
      <main className="wines">
        {winesCollection.length !== 0 ? (
          <>
            <h1> {t('Wines.h1')}</h1>
            <p className="line">________________________</p>

            <CarrouselWrapper
              winesList={winesCollection}
              handleClick={handleClick}
            />

            <h2>{t('Wines.h2')}</h2>
          </>
        ) : (
          <h2 className="empty-wines-array">Aucun vin disponible</h2>
        )}
      </main>
    </>
  );
};

const CarrouselWrapper = React.memo(({ handleClick, winesList }) => {
  return (
    <Carousel
      slides={winesList.map((wine) => (
        <>
          <img
            role="presentation"
            src={wine.image}
            alt={wine.image}
            onClick={() => handleClick(wine.id)}
            onKeyDown={() => handleClick(wine.id)}
          />
          <p>{wine.winery}</p>
        </>
      ))}
      autoplay={false}
    />
  );
});

export default Wines;
