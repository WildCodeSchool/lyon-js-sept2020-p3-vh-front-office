import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import './Contact.scss';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import _ from 'lodash/fp';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    width: 215,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const wait = function (duration = 1000) {
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

  const onSubmit = async (data) => {
    await wait(1000);
    console.log(data);
  };

  return (
    <div className='contactContainer'>
      <h1>Contactez Nous</h1>

      <form className='contactForm' onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id='outlined-basic'
          label='Nom'
          name='lastname'
          variant='outlined'
          inputRef={register({
            required: 'Champ obligatoire',
          })}
        />
        <div className='contactErrorMessage'>
          {errors.lastname && <span>{errors.lastname.message}</span>}
        </div>
        <TextField
          id='outlined-basic'
          label='Prénom'
          name='firstname'
          variant='outlined'
          inputRef={register({
            required: 'Champ obligatoire',
            maxLength: {
              value: 20,
              message: 'Maximum 20 caractères',
            },
          })}
        />
        <div className='contactErrorMessage'>
          {errors.firstname && <span>{errors.firstname.message}</span>}
        </div>
        <TextField
          id='outlined-basic'
          label='Email'
          name='email'
          variant='outlined'
          inputRef={register({
            required: 'Champ obligatoire',
            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Email invalide',
          })}
        />
        {_.get('email.type', errors) === 'required' && (
          <span>{errors.email.message}</span>
        )}
        {_.get('email.type', errors) === 'pattern' && <p>Email invalide</p>}
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-simple-select-label'>
            Motif de Contact
          </InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            inputRef={register}
          >
            <MenuItem value={'client'}>
              Question/Participation Evènement
            </MenuItem>
            <MenuItem value={'partenaire'}>Partenariat</MenuItem>
            <MenuItem value={'animateur'}>Animer un Evènement</MenuItem>
          </Select>
        </FormControl>

        <TextareaAutosize
          aria-label='minimum height'
          rowsMin={4}
          placeholder='Message'
        />
        {/* <TextField
          id='outlined-basic'
          label='Message'
          name='message'
          variant='outlined'
          inputRef={register({
            required: 'Champ obligatoire',
          })}
        />
        <div className='contactErrorMessage'>
          {errors.message && <span>{errors.message.message}</span>}
        </div> */}
        <div className='footerButton'>
          <input type='button' value='Retour' />
          <input type='submit' value='Envoyer' />
        </div>
        <div className=''>
          {isSubmitSuccessful && <div className=''>Biatch</div>}
        </div>
      </form>
    </div>
  );
};

export default Contact;
