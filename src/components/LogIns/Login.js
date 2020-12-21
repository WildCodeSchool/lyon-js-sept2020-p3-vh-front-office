import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import './Login.scss';

const useStyles = makeStyles((theme) => ({
  btn: {
    color: 'white',
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

function Login() {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (e) => {
    e.target.reset();
  };

  return (
    <>
      <div className="container-login">
        <div>
          <h1 className="login">Login</h1>
        </div>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <TextField
              className={useStyles().input}
              name="email"
              inputRef={register({
                required: 'Rentrez votre email.',
              })}
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />
          </div>
          <div className="errors-messages">
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div className="password">
            <TextField
              className={useStyles().input}
              name="password"
              inputRef={register({
                required: 'Rentrez votre mot de passe.',
                minLength: {
                  value: 8,
                  message:
                    'Votre mot de passe doit contenir au moins 8 caractères.',
                },
              })}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
            />
          </div>
          <div className="errors-messages">
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <div className="register-password">
            <p>Mot de passe oublié ?</p>
            <Link to="/register">
              <p>Inscription</p>
            </Link>
          </div>

          <div className="submit-login">
            <Button
              variant="contained"
              color="default"
              type="submit"
              onClick={handleSubmit}
              className={useStyles().btn}
            >
              Login
            </Button>
          </div>
        </form>
        <div className="facebook_login">
          <button type="button">Se connecter avec Facebook</button>
          <div className="google">
            <button type="button">Se connecter avec Google</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
