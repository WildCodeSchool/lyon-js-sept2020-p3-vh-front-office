import React from "react";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";

const wait = function (duration = 1000) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
};

const Register = () => {
  const { register, handleSubmit, formState, errors } = useForm({
    mode: 'onBlur'
  });
  const { isSubmitting, isSubmitSuccessful } = formState;

  const onSubmit = async (data) => {
    await wait(1000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isSubmitSuccessful && <div>Merci pour votre inscription</div>}
        <div>
          <TextField
            className="is-invalid"
            id="outlined-basic"
            label="Prénom"
            variant="outlined"
            inputRef={register({
              required: "vous devez renseigner votre prénom", pattern: /^[A-Za-z]+$/i
            })}
            name="firstname"
          />
          {errors.firstname && <span>{errors.firstname.message}</span>}
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Nom"
            variant="outlined"
            inputRef={register({ required: "vous devez renseigner votre nom", pattern: /^[A-Za-z]+$/i })}
            name="lastname"
          />
          {errors.lastname && <span>{errors.lastname.message}</span>}
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            inputRef={register({ required:'invalide email', pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ })}
            name="email"
            // ref={register({ pattern: /^[A-Za-z]+$/i })}
            // /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Téléphone"
            variant="outlined"
            inputRef={register({pattern: /(\+\d+(\s|-))?0\d(\s|-)?(\d{2}(\s|-)?){4}/})}
            name="phone"
          />
        </div>
        <div>
          <TextField
            type="password"
            id="outlined-basic"
            label="Mot de passe"
            variant="outlined"
            inputRef={register({
              required: "vous devez renseigner un mot de passe",
              minLength: {
                value: 8,
                message:
                  "votre mot de passe doit contenir au moins 8 caractères",
              },
            })}
            name="password"
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div>
          <TextField
            type="password"
            id="outlined-basic"
            label="Confirmation mot de passe"
            variant="outlined"
            inputRef={register({
              required: "vous devez confirmer votre mot de passe",
              minLength: {
                value: 8,
                message:
                  "votre mot de passe doit contenir au moins 8 caractères",
              },
            })}
            name="confirm"
          />
          {errors.confirm && <span>{errors.confirm.message}</span>}
        </div>
        <div>
          <Button
            disableElevation={isSubmitting}
            type="submit"
            variant="contained"
            color="primary"
          >
            S'inscrire
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
