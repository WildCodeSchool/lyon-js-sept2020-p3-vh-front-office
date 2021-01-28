import React, { useState } from 'react';
import './Disclaimer.scss';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Disclaimer = () => {
  const [isChecked, setIsChecked] = useState(false);
  const history = useHistory();
  const { t } = useTranslation();

  const handleChange = (value) => {
    setIsChecked(value);
  };

  const useStyles = makeStyles(() => ({
    button: {
      marginTop: '30px',
      marginBottom: '30px',
      backgroundColor: '#6d071a',
      color: 'white',
      textTransform: 'none',
      '&$button:hover': {
        backgroundColor: '#6d071a',
      },
      '&$button:focus': {
        outline: 'none',
      },
    },
  }));

  const CustomizedCheckbox = withStyles({
    root: {
      color: '#8c0226',
      '&$checked': {
        color: '#8c0226',
      },
    },
    checked: {},
    // eslint-disable-next-line react/jsx-props-no-spreading
  })((props) => <Checkbox color="default" {...props} />);

  const redirectToConfirmation = () => {
    history.push('/order-confirmation');
  };

  const classes = useStyles();

  return (
    <div className="disclaimer-wrapper">
      <div className="h1-hr">
        <h1>{t('Disclaimer.title')}</h1>
        <p>_______</p>
      </div>
      <p>
        Elit do id commodo reprehenderit duis adipisicing voluptate sit velit
        nisi. Nostrud et enim dolor ipsum laboris veniam cupidatat consequat
        Lorem cillum irure amet proident reprehenderit. Ullamco incididunt in in
        in et ea esse do in eu minim do veniam. Velit adipisicing sit deserunt
        adipisicing laborum amet amet et nulla laborum elit ipsum. Sint
        voluptate cillum sit ullamco irure aliqua velit id tempor quis dolor ea.
        Id cupidatat nisi anim sint consectetur elit magna aliqua excepteur
        proident. Commodo eu sunt sunt ipsum tempor pariatur ipsum labore et
        dolor in ex fugiat. Dolore fugiat consectetur adipisicing fugiat culpa
        Lorem. Magna sit elit tempor minim tempor fugiat nostrud quis deserunt
        Lorem dolore. Incididunt velit elit officia labore magna occaecat
        consequat dolor amet deserunt sunt. In non ea esse dolore magna aliquip.
        Ad nostrud sunt laboris fugiat ex minim proident adipisicing amet do.
      </p>
      <div className="confirm-section">
        <CustomizedCheckbox
          checked={isChecked}
          onChange={(event) => handleChange(event.target.checked)}
          name="validDisclaimer"
        />
        <p>{t('Disclaimer.button')}</p>
      </div>
      <Button
        className={classes.button}
        onClick={() => {
          redirectToConfirmation();
        }}
        variant="contained"
        type="button"
        disabled={isChecked === false}
      >
        {t('Disclaimer.button2')}
      </Button>
    </div>
  );
};

export default Disclaimer;
