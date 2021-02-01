import React from 'react';
import './Reservation.scss';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
  btn: {
    marginTop: '30px',
    width: '20%',
    margin: 'auto',
    padding: '0 50px',
    color: 'white',
    backgroundColor: '#8C0226',
    textTransform: 'none',
  },
}));

const Reservation = () => {
  const { t } = useTranslation();
  return (
    <div className="reservation">
      <h1> {t('Reservation.title')}</h1>
      <p>
        Consectetur culpa duis labore dolore fugiat nostrud excepteur amet ad
        sunt ex nostrud. Nulla commodo elit do proident ea minim voluptate
        deserunt elit proident anim dolor. Ullamco quis exercitation fugiat aute
        cillum reprehenderit aute excepteur nostrud cillum minim eu minim eu.
      </p>

      <Button type="button" className={useStyles().btn}>
        <Link to="/events" Continuer>
          {t('Reservation.button')}
        </Link>
      </Button>
    </div>
  );
};

export default Reservation;
