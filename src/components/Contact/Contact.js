import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useForm, Controller } from 'react-hook-form';
import './Contact.scss';
import { useToasts } from 'react-toast-notifications';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from 'react-i18next';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import API from '../../services/API';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    '& > *': {
      width: '25ch',
    },
  },
  formControl: {
    width: 200,
  },
  input: {
    width: '100%',
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
  btn: {
    backgroundColor: '#6d071a',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#6d071a',
    },
  },
}));

const Contact = () => {
  const { t } = useTranslation();
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
      e.target.reset();
    } catch (err) {
      if (err.response) {
        err.response.data.errorsByField[0].message.map((things) => {
          return addToast(things, {
            appearance: 'error',
            autoDismiss: true,
          });
        });
      } else {
        addToast(
          "Erreur lors de l'envoi de votre message, veuillez rééssayer plus tard",
          {
            appearance: 'error',
            autoDismiss: true,
          }
        );
      }
    }
  };

  return (
    <div className="container-contact-form">
      <Helmet>
        <title>Contact</title>
      </Helmet>
      <form className="contactForm" onSubmit={handleSubmit(onSubmit)}>
        <h1>{t('Contact.h1')}</h1>
        <div className="input-contact-form">
          <TextField
            className={classes.input}
            id="outlined-basic"
            label={t('Contact.label1')}
            name="lastname"
            variant="outlined"
            inputRef={register({
              required: "Merci d'indiquer votre nom",
            })}
          />
        </div>

        <div className="input-contact-form">
          <TextField
            className={classes.input}
            id="outlined-basic"
            label={t('Contact.label2')}
            name="firstname"
            variant="outlined"
            inputRef={register({
              required: "Merci d'indiquer votre prénom",
            })}
          />
        </div>

        <div className="input-contact-form">
          <TextField
            className={classes.input}
            id="outlined-basic"
            label={t('Contact.label3')}
            name="email"
            variant="outlined"
            inputRef={register({
              required: "Merci d'indiquer votre adresse mail",
            })}
          />
        </div>

        <div className="input-contact-form">
          <InputLabel>{t('Contact.select')}</InputLabel>
          <Controller
            as={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <Select
                ref={register({
                  required: 'select one option',
                })}
              >
                <MenuItem value="J'ai une question">
                  {t('Contact.subject1')}
                </MenuItem>
                <MenuItem value="Je souhaite devenir partenaire">
                  {t('Contact.subject2')}
                </MenuItem>
                <MenuItem value="Je souhaite devenir animateur">
                  {t('Contact.subject3')}
                </MenuItem>
              </Select>
            }
            control={control}
            name="purpose"
            defaultValue=""
            rules={{ required: 'Merci de choisir un sujet' }}
            className={classes.input}
          />
        </div>
        <div className="input-contact-form">
          <TextField
            id="outlined-multiline-static"
            className={classes.input}
            label={t('Contact.label4')}
            placeholder="Message"
            multiline
            rows={10}
            name="message"
            variant="outlined"
            inputRef={register({
              required: 'Merci de saisir un message',
            })}
          />
        </div>

        <div className="button-contact-form">
          <Button
            className={classes.btn}
            disableElevation={isSubmitting}
            type="submit"
            variant="contained"
            color="primary"
          >
            {t('Contact.button')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
