import React, { useState, useEffect } from 'react';
import Carousel from 'react-spring-3d-carousel';
import { useTranslation } from 'react-i18next';
import WineModal from './WineModal';
import './Wines.scss';
import API from '../../services/API';

const Wines = () => {
  const { t } = useTranslation();
  const [wineClicked, setWineClicked] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [slides, setSlides] = useState([]);
  const [winesCollection, setWinesCollection] = useState([]);

  const handleClick = (wineId) => {
    setModalShow(true);
    setWineClicked(wineId);
  };

  useEffect(() => {
    API.get('/products').then((res) => setWinesCollection(res.data));
  }, []);

  useEffect(() => {
    winesCollection.forEach((wine) =>
      setSlides((prevState) => [
        ...prevState,
        {
          content: (
            <img
              src={`${process.env.REACT_APP_API_BASE_URL}/${wine.image}`}
              alt="1"
            />
          ),
          key: wine.image,
          onClick: () => {
            handleClick(wine.id);
          },
        },
      ])
    );
  }, [winesCollection]);

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
        <h1> {t('Wines.h1')}</h1>
        <p className="line">________________________</p>
        <div style={{ width: '80%', height: '350px', margin: '0 auto' }}>
          <Carousel slides={slides} offsetRadius={1} showNavigation />
        </div>
        <h2>{t('Wines.h2')}</h2>
      </main>
    </>
  );
};

export default Wines;
