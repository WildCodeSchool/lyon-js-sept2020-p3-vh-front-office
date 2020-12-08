import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';
import "./Login.scss";
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

function Login() {
  const { register, handleSubmit, errors } = useForm({ mode: "onBlur" });
  
  const onSubmit = () => {
    // AXIOS et reset form 
  }

  return (
    <>
      <div>
        <div>
          <img src="/src/logo.jpg"/>
        </div>
        <div>
        <h1 className='login'>Login</h1>
        </div>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <TextField
              className="is-invalid"
              name="email"
              inputRef={register({
                required: "Rentrez votre email",
                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              })}
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />
          </div>
          <div>{errors.email && <span>{errors.email.message}</span>}</div>
          <div>
            <TextField
              name="password"
              inputRef={register({
                required: "Rentrez votre mot de passe",
                minLength: {
                  value: 8,
                  message:
                    "Votre mot de passe doit contenir au moins 8 caractères",
                },
              })}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
            />
          </div>
          <div>{errors.password && <span>{errors.password.message}</span>}</div>
          <p>Mot de passe oublié</p>
          <Link to='/register'>
          <p>Inscription</p>
          </Link>
    
          <div>
            <Button variant="contained" color="primary">
              Login
            </Button>
          </div>
        </form>
        <div className="facebook_login">
        <FacebookLogin
    appId="1088597931155576"
    autoLoad={true}
    fields="name,email,picture"/>
        </div>
        <div className="google">
        <GoogleLogin
    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
    buttonText="Login"
    cookiePolicy={'single_host_origin'}
  />
        </div>
      </div>
    </>
  );
}

export default Login;
