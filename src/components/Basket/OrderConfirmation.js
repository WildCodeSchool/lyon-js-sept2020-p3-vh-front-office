/* eslint-disable no-unused-vars */
import React, { useEffect, useContext } from 'react';
import './OrderConfirmation.scss';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import API from '../../services/API';
import { BasketContext } from '../Contexts/BasketContext';

const OrderConfirmation = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { basket, setBasket } = useContext(BasketContext);

  useEffect(() => {
    API.post('/order', basket);
    setBasket([]);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      history.push('/');
    }, 5000);
  });

  return (
    <div className="orderconfirmation-wrapper">
      <div className="h1-hr">
        <h1>{t('Confirmation.title')}</h1>
        <p>_______</p>
      </div>
      <p className="p-orderconfirmation">
        {t('Confirmation.sentence1')}
        <br /> {t('Confirmation.sentence2')}
        <br />
        {t('Confirmation.sentence3')} <a href="/">{t('Confirmation.click')}</a>
      </p>
    </div>
  );
};

export default OrderConfirmation;
