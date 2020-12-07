import React from "react";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';

const Register = () => {

  const {register, handleSubmit} = useForm()

  const onSubmit = data => {
    console.log(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField id="outlined-basic" label="Prénom" variant="outlined" inputRef={register} name="firstname" />
        </div>
        <div>
          <TextField id="outlined-basic" label="Nom" variant="outlined" inputRef={register} name="lastname" />
        </div>
        <div>
          <TextField id="outlined-basic" label="Email" variant="outlined" inputRef={register} name="email" />
        </div>
        <div>
          <TextField id="outlined-basic" label="Téléphone" variant="outlined" inputRef={register} name="phone" />
        </div>
        <div>
          <TextField id="outlined-basic" label="Mot de passe" variant="outlined" inputRef={register} name="password" />
        </div>
        <div>
          <TextField id="outlined-basic" label="Confirmation mot de passe" variant="outlined" inputRef={register} name="confirm" />
        </div>
        <div>
        <Button type="submit" variant="contained" color="primary">Envoyer</Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
