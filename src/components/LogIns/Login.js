import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function Login() {


  const { register, handleSubmit, errors } = useForm({mode: 'onBlur'});
  const onSubmit = data => console.log(data);


  return (
    <>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <TextField
            className="is-invalid"
            name='email'
              inputRef={register({
                required: "Rentrez votre email",
                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              })}
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />
            </div>
            <div>
              {errors.email && <span>{errors.email.message}</span>}
              </div>
          <div>
            <TextField
            name='password'
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
              type='password'
            />
          </div>
          <div>
              {errors.password && <span>{errors.password.message}</span>}
              </div>
          <p>Mot de passe oublié</p>
          <div>
            <Button variant="contained" color="primary">
              Login
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
