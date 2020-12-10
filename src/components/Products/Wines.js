/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useCallback } from 'react';
import { Carousel } from '3d-react-carousal';
import WineModal from './WineModal';
import './Wines.scss';

const winesList = [
  {
    id: 1,
    image:
      'https://medias.nicolas.com/media/sys_master/images/h41/h90/9020507750430.png',
    vintage: 'Vintage 2014',
    grapeVariety: 'Syrah',
    winemaker: 'Pierre',
    wineWaiter: 'John',
    winery: 'Château Patache d’Aux',
    aromas: 'Fruits rouges',
    specificities: '',
    price: '10',
    producerUrl: 'http://www.google.fr',
  },
  {
    id: 2,
    image:
      'https://medias.nicolas.com/media/sys_master/hff/hd4/9224492711966.png',
    vintage: 'Vintage 2015',
    grapeVariety: 'Pinot',
    winemaker: 'Thomas',
    wineWaiter: 'Brieuc',
    winery: 'Château Machin',
    aromas: 'Orange',
    specificities: 'Blablabla',
    price: '8',
    producerUrl: 'http://www.google.fr',
  },
  {
    id: 3,
    image:
      'https://medias.nicolas.com/media/sys_master/images/h07/h92/9169233117214.png',
    vintage: 'Vintage 2016',
    grapeVariety: 'Muscat',
    winemaker: 'Matthieu',
    wineWaiter: 'Aymeric',
    winery: 'Château Truc',
    aromas: 'Cuir',
    price: '15',
    producerUrl: 'http://www.google.fr',
  },
];

const Wines = () => {
  const [wineClicked, setWineClicked] = useState('');
  const [modalShow, setModalShow] = useState(false);

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
          winedata={winesList.filter((wine) => wine.id === wineClicked)}
        />
      )}
      <main className="wines">
        <h1>Les vins dégustés</h1>
        <CarrouselWrapper winesList={winesList} handleClick={handleClick} />
      </main>
    </>
  );
};

// eslint-disable-next-line no-shadow
const CarrouselWrapper = React.memo(({ handleClick, winesList }) => {
  return (
    <Carousel
      slides={winesList.map((wine) => (
        <>
          <img
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
