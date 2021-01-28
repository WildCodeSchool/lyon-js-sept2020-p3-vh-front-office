import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './Footer.scss';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import logo from '../pictures/hypnose_vins_logo_web.png';

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

  const { register, formState } = useForm({
    mode: 'onBlur',
  });

  const { isSubmitting } = formState;

  return (
    <footer className="footerBody">
      <div className="footerTop">
        <div className="footerSignUp">
          <h2>{t('Footer.email')}</h2>
          <form className="footerForm">
            <TextField
              className={classes.input}
              id="outlined-basic"
              label="Email"
              name="email"
              variant="outlined"
              inputRef={register({
                required: 'Champ obligatoire',
                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Email invalide',
              })}
            />
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
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Morgane Pardo Hypnose</p>
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
              <p>{t('Footer.link3')}</p>
            </Link>
          </div>
          <div className="footerLanguage">
            <h2> {t('Footer.link5')} </h2>
            <div className="langue">
              <p>FR|</p>
              <p>EN</p>
            </div>
          </div>
        </div>
      </div>
      <div className="footerLogo">
        <Link to="/">
          <img src={logo} alt="logo Hypnose & Vins" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
