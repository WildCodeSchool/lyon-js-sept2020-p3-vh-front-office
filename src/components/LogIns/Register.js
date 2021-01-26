import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import './Register.scss';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useToasts } from 'react-toast-notifications';
import API from '../../services/API';

const useStyles = makeStyles((theme) => ({
  btn: {
    backgroundColor: '#6d071a',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#6d071a',
    },
  },
  input: {
    [theme.breakpoints.up('md')]: {
      width: '400px',
    },
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

const Register = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { register, handleSubmit, errors, watch } = useForm({
    mode: 'onSubmit',
  });
  const { addToast } = useToasts();

  useEffect(() => {
    if (errors) {
      const arrayErrors = Object.values(errors);
      arrayErrors.map((error) =>
        addToast(error.message, {
          appearance: 'error',
          autoDismiss: true,
        })
      );
    }
  }, [errors]);

  const password = useRef({});
  password.current = watch('password', '');

  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      await API.post('users/', data);
      history.push('/login');
      addToast('Votre compte a été creé, vous pouvez vous connecter', {
        appearance: 'success',
        autoDismiss: true,
      });
    } catch (err) {
      if (err.response.status === 500) {
        addToast(
          'Erreur lors de votre inscription, veuillez rééssayer plus tard',
          {
            appearance: 'error',
            autoDismiss: true,
          }
        );
      } else
        err.response.data.errorsByField[0].message.map((things) => {
          return addToast(things, {
            appearance: 'error',
            autoDismiss: true,
          });
        });
    }
  };

  return (
    <div className="container-register-form">
      <Helmet>
        <title>Inscription</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2> {t('Inscription.h1')}</h2>
        <div className="input-register-form">
          <TextField
            className={classes.input}
            id="outlined-basic"
            label={t('Inscription.label1')}
            variant="outlined"
            inputRef={register({
              required: 'Veuiller renseigner votre prénom.',
            })}
            name="firstname"
          />
        </div>
        <div className="input-register-form">
          <TextField
            className={classes.input}
            id="outlined-basic"
            label={t('Inscription.label2')}
            variant="outlined"
            inputRef={register({
              required: 'Veuillez renseigner votre nom',
            })}
            name="lastname"
          />
        </div>

        <div className="input-register-form">
          <TextField
            className={classes.input}
            id="outlined-basic"
            label={t('Inscription.label3')}
            variant="outlined"
            inputRef={register({
              required: 'Veuillez renseigner votre email',
            })}
            name="email"
          />
        </div>
        <div className="input-register-form">
          <TextField
            className={classes.input}
            id="outlined-basic"
            label={t('Inscription.label4')}
            variant="outlined"
            inputRef={register({
              message: 'Votre numéro de téléphone doit contenir 10 caractères',
            })}
            name="phone"
          />
        </div>
        <div className="input-register-form">
          <TextField
            className={classes.input}
            type="password"
            id="outlined-basic"
            label={t('Inscription.label5')}
            variant="outlined"
            inputRef={register({
              required: 'Veuillez renseigner un mot de passe',
            })}
            name="password"
          />
        </div>

        <div className="input-register-form">
          <TextField
            className={classes.input}
            type="password"
            id="outlined-basic"
            label={t('Inscription.label6')}
            variant="outlined"
            inputRef={register({
              required: 'Veuillez confirmer votre mot de passe',
              validate: (value) =>
                value === password.current ||
                'Les mots de passe ne correspondent pas',
            })}
            name="password_confirmation"
          />
        </div>

        <div className="button-register-form">
          <Button
            className={classes.btn}
            type="submit"
            variant="contained"
            color="primary"
          >
            {t('Inscription.button')}
          </Button>
        </div>
        <div className="link-back-to-login">
          <Link to="/login">
            <p>{t('Inscription.link')}</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
