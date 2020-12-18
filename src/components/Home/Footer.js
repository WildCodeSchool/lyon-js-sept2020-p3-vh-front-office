import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './Footer.scss';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import logo from '../pictures/hypnose_vins_logo_web.png';

const useStyles = makeStyles(() => ({
  btn: {
    width: '50px',
    height: '30px',
    backgroundColor: '#6d071a',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#6d071a',
    },
  },
}));

const Footer = () => {
  const classes = useStyles();

  const { register, formState } = useForm({
    mode: 'onBlur',
  });

  const { isSubmitting } = formState;

  return (
    <footer className="footerBody">
      <div className="footerTop">
        <div className="footerSignUp">
          <h2>Inscrivez-vous aux évènements à venir</h2>
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
              Envoyer
            </Button>
          </form>
        </div>
        <div className="footerMainLink">
          {' '}
          <Link to="/contact">
            <p>CONTACT</p>
          </Link>
          <Link to="/aboutme">
            <p>A PROPOS</p>
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
            <h2>Hypnose & Vins</h2>
            <Link to="/animators">
              <p>Nos animateurs</p>
            </Link>
            <Link to="/reviews">
              <p>Ils ont tenté l'expérience</p>
            </Link>
            <Link to="/mentions-legales">
              <p>Mentions Légales</p>
            </Link>
          </div>
          <div className="footerLanguage">
            <h2>Langue</h2>
            <div className="langue">
              {' '}
              <p>FR | </p>
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
