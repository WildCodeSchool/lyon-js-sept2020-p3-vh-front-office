import React from 'react';
import './Banner.scss';
import { useTranslation } from 'react-i18next';

const Banner = () => {
  const { t } = useTranslation();
  return (
    <div className="banner">
      <h1>{t('Accueil.titre')}</h1>
      <p>________________________</p>
      <p>
        Consectetur culpa duis labore dolore fugiat nostrud excepteur amet ad
        sunt ex nostrud. Nulla commodo elit do proident ea minim voluptate
        deserunt elit proident anim dolor. Ullamco quis exercitation fugiat aute
        cillum reprehenderit aute excepteur nostrud cillum minim eu minim eu.
        Consectetur culpa duis labore dolore fugiat nostrud excepteur amet ad
        sunt ex nostrud. Nulla commodo elit do proident ea minim voluptate
        deserunt elit proident anim dolor.{' '}
        <span className="Welcome-message-home-page">
          Ullamco quis exercitation fugiat aute cillum reprehenderit aute
          excepteur nostrud cillum minim eu minim eu. Consectetur culpa duis
          labore dolore fugiat nostrud excepteur amet ad sunt ex nostrud. Nulla
          commodo elit do proident ea minim voluptate deserunt elit proident
          anim dolor. Ullamco quis exercitation fugiat aute cillum reprehenderit
          aute excepteur nostrud cillum minim eu minim eu. Consectetur culpa
          duis labore dolore fugiat nostrud excepteur amet ad sunt ex nostrud.
          Nulla commodo elit do proident ea minim voluptate deserunt elit
          proident anim dolor. Ullamco quis exercitation fugiat aute cillum
          reprehenderit aute excepteur nostrud cillum minim eu minim eu.
        </span>
      </p>
    </div>
  );
};

export default Banner;
