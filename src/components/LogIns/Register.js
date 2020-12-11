import React, { useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import './Register.scss';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const wait = (duration = 1000) => {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
};

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
  },
}));

const Register = () => {
  const classes = useStyles();
  const { register, handleSubmit, formState, errors, watch } = useForm({
    mode: 'onBlur',
  });
  const { isSubmitting, isSubmitSuccessful } = formState;
  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = async (data, e) => {
    await wait(1000);
    e.target.reset();
  };

  return (
    <div className="container-register-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Inscription</h2>
        <div className="input-register-form">
          <TextField
            className={classes.input}
            id="outlined-basic"
            label="Prénom*"
            variant="outlined"
            inputRef={register({
              required: 'Veuiller renseigner votre prénom',
              pattern: /^[A-Za-z]+$/i,
            })}
            name="firstname"
          />
        </div>
        <div className="errors-message-form">
          {errors.firstname && <span>{errors.firstname.message}</span>}
        </div>

        <div className="input-register-form">
          <TextField
            className={classes.input}
            id="outlined-basic"
            label="Nom*"
            variant="outlined"
            inputRef={register({
              required: 'Veuillez renseigner votre nom',
              pattern: /^[A-Za-z]+$/i,
            })}
            name="lastname"
          />
        </div>
        <div className="errors-message-form">
          {errors.lastname && <span>{errors.lastname.message}</span>}
        </div>

        <div className="input-register-form">
          <TextField
            className={classes.input}
            id="outlined-basic"
            label="Email*"
            variant="outlined"
            inputRef={register({
              required: 'Veuillez renseigner votre email',
              pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            })}
            name="email"
          />
        </div>
        <div className="errors-message-form">
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className="input-register-form">
          <TextField
            className={classes.input}
            id="outlined-basic"
            label="Téléphone"
            variant="outlined"
            inputRef={register({
              pattern: /(\+\d+(\s|-))?0\d(\s|-)?(\d{2}(\s|-)?){4}/,
            })}
            name="phone"
          />
        </div>
        <div className="input-register-form">
          <TextField
            defaultValue="aaaaaaaa"
            className={classes.input}
            type="password"
            id="outlined-basic"
            label="Mot de passe*"
            variant="outlined"
            inputRef={register({
              required: 'Veuillez renseigner un mot de passe',
              minLength: {
                value: 8,
                message:
                  'votre mot de passe doit contenir au moins 8 caractères',
              },
            })}
            name="password"
          />
        </div>
        <div className="errors-message-form">
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <div className="input-register-form">
          <TextField
            defaultValue="aaaaaaaa"
            className={classes.input}
            type="password"
            id="outlined-basic"
            label="Confirmation mot de passe*"
            variant="outlined"
            inputRef={register({
              required: 'Veuillez confirmer votre mot de passe',
              validate: (value) =>
                value === password.current ||
                'Le mot de passe ne correspond pas',
              minLength: {
                value: 8,
                message:
                  'votre mot de passe doit contenir au moins 8 caractères',
              },
            })}
            name="confirm"
          />
        </div>
        <div className="errors-message-form">
          {errors.confirm && <span>{errors.confirm.message}</span>}
        </div>

        <div className="button-register-form">
          <Button
            className={classes.btn}
            disableElevation={isSubmitting}
            type="submit"
            variant="contained"
            color="primary"
          >
            S'inscrire
          </Button>
        </div>
        <div className="button-register-form">
          {isSubmitSuccessful && (
            <div className="message-envoie-form">
              <p>Merci pour votre inscription</p>
            </div>
          )}
        </div>
        <div className="link-back-to-login">
          <Link to="/login">
            <p>Déjà inscrit ?</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
