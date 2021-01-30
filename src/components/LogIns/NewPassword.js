/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import './NewPassword.scss';
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

const NewPassword = (props) => {
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
    const { newPassword } = data;
    const { token, userId } = props.match.params;
    try {
      await API.post('users/store-password', { newPassword, token, userId });
      history.push('/login');
      addToast('Votre compte a été creé, vous pouvez vous connecter', {
        appearance: 'success',
        autoDismiss: true,
      });
    } catch (err) {
      console.log(err);
      // if (err.response.status === 500) {
      //   addToast(
      //     'Erreur lors de votre inscription, veuillez rééssayer plus tard',
      //     {
      //       appearance: 'error',
      //       autoDismiss: true,
      //     }
      //   );
      // } else
      //   err.response.data.errorsByField[0].message.map((things) => {
      //     return addToast(things, {
      //       appearance: 'error',
      //       autoDismiss: true,
      //     });
      //   });
    }
  };

  return (
    <div className="container-newpassword-form">
      <Helmet>
        <title>Réinitialisez votre mot de passe</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1> {t('NewPassword.h1')}</h1>
        <p className="line">________________________</p>
        <div className="input-newpassword-form">
          <TextField
            className={classes.input}
            type="password"
            id="outlined-basic"
            label={t('NewPassword.label1')}
            variant="outlined"
            inputRef={register({
              required: 'Veuillez renseigner un mot de passe',
            })}
            name="newPassword"
          />
        </div>
        <div className="input-newpassword-form">
          <TextField
            className={classes.input}
            type="password"
            id="outlined-basic"
            label={t('NewPassword.label2')}
            variant="outlined"
            inputRef={register({
              required: 'Veuillez confirmer votre mot de passe',
              validate: (value) =>
                value === password.current ||
                'Les mots de passe ne correspondent pas',
            })}
            name="newPasswordConfirmation"
          />
        </div>
        <div className="button-newpassword-form">
          <Button
            className={classes.btn}
            type="submit"
            variant="contained"
            color="primary"
          >
            {t('NewPassword.button')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewPassword;
