import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import './Contact.scss';
import { useToasts } from 'react-toast-notifications';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import API from '../../services/API';

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

const Contact = () => {
  const classes = useStyles();

  const { register, handleSubmit, formState, errors, control } = useForm({
    mode: 'onBlur',
  });

  const { isSubmitting } = formState;
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

  const onSubmit = async (data, e) => {
    try {
      await API.post('/contact', data);
      addToast('Votre message a bien été envoyé', {
        appearance: 'success',
        autoDismiss: true,
      });
    } catch (err) {
      addToast("Votre message n'a pu être envoyé", {
        appearance: 'error',
        autoDismiss: true,
      });
    }
    e.target.reset();
  };

  return (
    <div className="container-register-form">
      <form className="contactForm" onSubmit={handleSubmit(onSubmit)}>
        <h1>Contactez-nous</h1>

        <div className="input-register-form">
          <TextField
            className={classes.input}
            id="outlined-basic"
            label="Nom"
            name="lastname"
            variant="outlined"
            inputRef={register({
              required: "Merci d'indiquer votre nom",
            })}
          />
        </div>

        <div className="input-register-form">
          <TextField
            className={classes.input}
            id="outlined-basic"
            label="Prénom"
            name="firstname"
            variant="outlined"
            inputRef={register({
              required: "Merci d'indiquer votre prénom",
            })}
          />
        </div>

        <div className="input-register-form">
          <TextField
            className={classes.input}
            id="outlined-basic"
            label="Email"
            name="email"
            variant="outlined"
            inputRef={register({
              required: "Merci d'indiquer votre adresse mail",
              pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Votre adresse mail est invalide',
            })}
          />
        </div>

        <div className="input-register-form">
          <InputLabel>Choisissez un sujet</InputLabel>
          <Controller
            as={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <Select
                ref={register({
                  required: 'select one option',
                })}
              >
                <MenuItem value="J'ai une question">
                  Question/Participation Evènement
                </MenuItem>
                <MenuItem value="Je souhaite devenir partenaire">
                  Devenir partenaire
                </MenuItem>
                <MenuItem value="Je souhaite devenir animateur">
                  Animer un événement
                </MenuItem>
              </Select>
            }
            control={control}
            name="purpose"
            defaultValue=""
            rules={{ required: 'Merci de choisir un sujet' }}
          />
        </div>
        <div className="input-register-form">
          <TextField
            id="outlined-basic"
            className={classes.input}
            label="Message"
            multiline
            rows={4}
            name="message"
            variant="outlined"
            inputRef={register({
              required: 'Merci de saisir un message',
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
      </form>
    </div>
  );
};

export default Contact;
