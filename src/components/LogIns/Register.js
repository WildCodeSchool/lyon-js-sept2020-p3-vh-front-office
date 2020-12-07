import React from "react";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";

const wait = function (duration = 1000){
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration)
  })
}

const Register = () => {
  const { register, handleSubmit, formState, errors } = useForm();
  const {isSubmitting} = formState

  const onSubmit = async data => {
    await wait(1000)
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            className="is-invalid"
            id="outlined-basic"
            label="Prénom"
            variant="outlined"
            inputRef={register({required : 'vous devez renseigner votre prénom'})}
            name="firstname"
          />
          {errors.firstname && <span>{errors.firstname.message}</span>}
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Nom"
            variant="outlined"
            inputRef={register({required : 'vous devez renseigner votre nom'})}
            name="lastname"
          />
          {errors.lastname && <span>{errors.lastname.message}</span>}
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            inputRef={register}
            name="email"
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Téléphone"
            variant="outlined"
            inputRef={register}
            name="phone"
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Mot de passe"
            variant="outlined"
            inputRef={register({required : 'vous devez renseigner un mot de passe', minLength:{value : 8, message: 'votre mot de passe doit contenir au moins 8 caractères'}})}
            name="password"
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Confirmation mot de passe"
            variant="outlined"
            inputRef={register({required : 'vous devez confirmer votre mot de passe', minLength:{value:8, message:'votre mot de passe doit contenir au moins 8 caractères'}})}
            name="confirm"
          />
          {errors.confirm && <span>{errors.confirm.message}</span>}
        </div>
        <div>
          <Button disableElevation={isSubmitting} type="submit" variant="contained" color="primary">
            Envoyer
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
