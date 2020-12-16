import React from 'react';
import { useForm } from 'react-hook-form';
import './Contact.scss';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

// import _ from 'lodash/fp';

const useStyles = makeStyles(() => ({
  root: {
    '& > *': {
      width: '25ch',
    },
  },
  formControl: {
    width: 200,
  },

  btn: {
    backgroundColor: '#6d071a',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#6d071a',
    },
  },
}));

const wait = function name(duration = 1000) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
};

const Contact = () => {
  const classes = useStyles();

  const { register, handleSubmit, formState, errors } = useForm({
    mode: 'onBlur',
  });

  const { isSubmitting, isSubmitSuccessful } = formState;

  const onSubmit = async (data, e) => {
    await wait(1000);
    e.target.reset();
  };

  return (
    <div className="container-register-form">
      <form className="contactForm" onSubmit={handleSubmit(onSubmit)}>
        <h1>Contactez Nous</h1>

        <div className="input-register-form">
          <div className="contactErrorMessage">
            {errors.lastname && <span>{errors.lastname.message}</span>}
          </div>
          <TextField
            className={classes.input}
            id="outlined-basic"
            label="Nom"
            name="lastname"
            variant="outlined"
            inputRef={register({
              required: 'Champ obligatoire',
            })}
          />
        </div>

        <div className="input-register-form">
          <div className="contactErrorMessage">
            {errors.firstname && <span>{errors.firstname.message}</span>}
          </div>
          <TextField
            className={classes.input}
            id="outlined-basic"
            label="Prénom"
            name="firstname"
            variant="outlined"
            inputRef={register({
              required: 'Champ obligatoire',
              maxLength: {
                value: 20,
                message: 'Maximum 20 caractères',
              },
            })}
          />
        </div>

        <div className="input-register-form">
          <div className="contactErrorMessage">
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <TextField
            className={classes.input}
            id="outlined-basic"
            label="Email"
            name="email"
            variant="outlined"
            inputRef={register({
              required: 'Champ obligatoire',
              pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Email invalide',
            })}
          />
        </div>

        <div className="input-register-form">
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">
              Motif de Contact
            </InputLabel>
            <Select
              className={classes.input}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              inputRef={register({
                required: 'Champ obligatoire',
                message: 'Email invalide',
              })}
            >
              <MenuItem value="client">
                Question/Participation Evènement
              </MenuItem>
              <MenuItem value="partenaire">Partenariat</MenuItem>
              <MenuItem value="animateur">Animer un Evènement</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="input-register-form">
          <div className="contactErrorMessage">
            {errors.message && <span>{errors.message.message}</span>}
          </div>
          <TextField
            id="outlined-basic"
            className={classes.input}
            label="Message"
            multiline
            rows={4}
            name="message"
            variant="outlined"
            inputRef={register({
              required: 'Champ obligatoire',
            })}
          />
        </div>

        <div className="button-register-form">
          <Button
            className={classes.btn}
            disableElevation={isSubmitting}
            type="submit"
            variant="contained"
            color="primary"
          >
            Envoyer
          </Button>
        </div>
        <div className="button-register-form">
          {isSubmitSuccessful && (
            <div className="message-envoie-form">
              <p>Merci pour votre inscription</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Contact;
