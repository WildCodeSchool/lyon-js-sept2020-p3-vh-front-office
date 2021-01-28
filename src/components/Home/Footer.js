import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import './Footer.scss';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import logo from '../pictures/hypnose_vins_logo_web.png';
import Translation from './Translation';
import API from '../../services/API';

const useStyles = makeStyles(() => ({
  btn: {
    marginLeft: '20px',
    width: '50px',
    height: '30px',
    backgroundColor: '#6d071a',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#6d071a',
    },
  },
  input: {
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#6d071a',
    },
    '& .MuiOutlinedInput-input': {
      color: '#6d071a',
    },
    '& .MuiInputLabel-outlined.Mui-focused': {
      color: '#6d071a',
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { addToast } = useToasts();
  const { handleSubmit, register, errors, formState } = useForm({
    mode: 'onBlur',
  });

  const { isSubmitting } = formState;
  const onSubmit = async (data, e) => {
    try {
      await API.post('/contact/newsletter', data);
      addToast(
        "Votre demande d'ajout à la newsletter à bien été pris en compte",
        {
          appearance: 'success',
          autoDismiss: true,
        }
      );
      e.target.reset();
    } catch (err) {
      addToast(
        "Erreur lors de l'envoi de votre email, veuillez rééssayer plus tard",
        {
          appearance: 'error',
          autoDismiss: true,
        }
      );
    }
  };

  return (
    <footer className="footerBody">
      <div className="footerTop">
        <div className="footerSignUp">
          <h2>Inscrivez-vous aux évènements à venir</h2>
          <form className="footerForm" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              className={classes.input}
              id="outlined-basic"
              label="Email"
              name="email"
              variant="outlined"
              inputRef={register()}
            />
            <div>{errors.email && <span>{errors.email.message}</span>}</div>
            <Button
              className={classes.btn}
              disableElevation={isSubmitting}
              type="submit"
              variant="contained"
              color="primary"
            >
              {t('Footer.bouton')}
            </Button>
          </form>
        </div>
        <div className="footerMainLink">
          {' '}
          <Link to="/contact">
            <p>CONTACT</p>
          </Link>
          <Link to="/aboutme">
            <p>{t('Footer.link4')}</p>
          </Link>
          <Link to="/faq">
            <p>FAQ</p>
          </Link>
        </div>
      </div>
      <div className="footerBottom">
        <div className="footerSmallLink">
          <div className="footerSocialMedia">
            <h2>Social</h2>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://fr-fr.facebook.com/hypnose.villeurbanne/"
            >
              Facebook
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://fr-fr.facebook.com/hypnose.villeurbanne/"
            >
              Instagram
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.morgane-pardo-hypnose.com/"
            >
              Morgane Pardo Hypnose
            </a>
          </div>
          <div className="footerLink">
            <h2>{t('Footer.titre')}</h2>
            <Link to="/animators">
              <p>{t('Footer.link1')}</p>
            </Link>
            <Link to="/reviews">
              <p>{t('Footer.link2')}</p>
            </Link>
            <Link to="/mentions-legales">
              <p>Mentions Légales CGV</p>
            </Link>
          </div>
          <div className="footerLanguage">
            <h2> {t('Footer.link5')} </h2>
            <div className="langue">
              <Translation />
            </div>
          </div>
          <div className="footerLogo">
            <Link to="/">
              <img src={logo} alt="logo Hypnose & Vins" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
