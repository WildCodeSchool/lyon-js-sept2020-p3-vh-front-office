/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import './ForgotPassword.scss';
import { useHistory } from 'react-router-dom';
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

const ForgotPassword = (props) => {
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

  const history = useHistory();

  const onSubmit = async (data) => {
    const { email } = data;
    try {
      await API.post('users/reset-password', {
        email,
      });
      history.push('/login');
      addToast(
        'Un lien de réinitialisation vous a été envoyé, veuillez consulter votre boîte mail',
        {
          appearance: 'success',
          autoDismiss: true,
        }
      );
    } catch (err) {
      if (err.response.status === 500) {
        addToast('Erreur, veuillez rééssayer plus tard', {
          appearance: 'error',
          autoDismiss: true,
        });
      }
      if (err.response.status === 404) {
        return addToast(err.response.data.collection, {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    }
    return null;
  };

  return (
    <div className="container-forgotpassword-form">
      <Helmet>
        <title>Demande de mot de passe</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1> {t('ForgotPassword.h1')}</h1>
        <p className="line">________________________</p>
        <div className="input-register-form">
          <TextField
            className={classes.input}
            type="email"
            id="outlined-basic"
            label={t('ForgotPassword.label1')}
            variant="outlined"
            inputRef={register({
              required: 'Veuillez renseigner votre email',
            })}
            name="email"
          />
        </div>
        <div className="button-forgotpassword-form">
          <Button
            className={classes.btn}
            type="submit"
            variant="contained"
            color="primary"
          >
            {t('ForgotPassword.button')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
