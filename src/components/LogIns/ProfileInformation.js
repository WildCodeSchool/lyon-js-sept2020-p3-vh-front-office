/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CornerDownLeft } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { useToasts } from 'react-toast-notifications';
import { LoginContext } from '../Contexts/LoginContext';
import API from '../../services/API';
import './Profile.scss';

export default function ProfileInformation() {
  const { userLogged, setUserLogged } = useContext(LoginContext);
  const history = useHistory();
  const [isClicked, setIsClicked] = useState(false);
  const [changeFirstname, setChangeFirstname] = useState('');
  const [changeLastname, setChangeLastname] = useState('');
  const [changePhoneNumber, setChangePhoneNumber] = useState('');
  const [changeEmail, setChangeEmail] = useState('');
  const { addToast } = useToasts();
  const { t } = useTranslation();

  useEffect(() => {
    if (userLogged) {
      setChangeFirstname(userLogged.firstname);

      setChangeLastname(userLogged.lastname);
      setChangePhoneNumber(userLogged.phone_number);
      setChangeEmail(userLogged.email);
    }
  }, [userLogged]);

  const changeFirstNameInput = (e) => {
    setChangeFirstname(e.target.value);
  };

  const changeLastNameInput = (e) => {
    setChangeLastname(e.target.value);
  };

  const changePhoneNumberInput = (e) => {
    setChangePhoneNumber(e.target.value);
  };

  const changeEmailInput = (e) => {
    setChangeEmail(e.target.value);
  };

  const clickToEdit = () => {
    setIsClicked(true);
  };

  const clickToSave = async () => {
    try {
      const res = await API.put(`/users/${userLogged.id}`, {
        firstname: changeFirstname,
        lastname: changeLastname,
        phone_number: changePhoneNumber,
        email: changeEmail,
      });

      setUserLogged(res.data);
      setIsClicked(false);
      addToast('Votre compte a été modifié', {
        appearance: 'success',
        autoDismiss: true,
      });
    } catch (err) {
      if (err.response.status === 500) {
        addToast(
          'Erreur lors de la modification, veuillez rééssayer plus tard',
          {
            appearance: 'error',
            autoDismiss: true,
          }
        );
      } else {
        err.response.data.errorsByField[0].message.map((things) => {
          return addToast(things, {
            appearance: 'error',
            autoDismiss: true,
          });
        });
      }
    }
  };

  const backToProfile = () => {
    history.push('/profile');
  };

  return (
    <div>
      <div className="backToProfile-button">
        <CornerDownLeft onClick={backToProfile} />
        <h1>{t('ProfileInfo.h1')}</h1>
      </div>
      <div className="myinfo-section">
        {isClicked ? (
          <div className="change-main-fields">
            <div className="change-info">
              <b>{t('ProfileInfo.b_1')}: </b>
              <input
                name="firstname"
                value={changeFirstname}
                onChange={changeFirstNameInput}
              />
            </div>

            <div className="change-info">
              <b>{t('ProfileInfo.b_2')}: </b>
              <input
                name="lastname"
                value={changeLastname}
                onChange={changeLastNameInput}
              />
            </div>

            <div className="change-info">
              <b>{t('ProfileInfo.b_3')}: </b>
              <input
                name="phone_number"
                value={changePhoneNumber}
                onChange={changePhoneNumberInput}
              />
            </div>

            <div className="change-info">
              <b>{t('ProfileInfo.b_4')}: </b>
              <input
                name="email"
                value={changeEmail}
                onChange={changeEmailInput}
              />
            </div>

            <div>
              <button
                className="button"
                type="submit"
                method="put"
                action="/me"
                onClick={clickToSave}
              >
                {t('ProfileInfo.button_1')}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="main-fields">
              <p>
                <b>{t('ProfileInfo.b_1')}: </b>
                {changeFirstname}
              </p>
              <p>
                {' '}
                <b>{t('ProfileInfo.b_2')}: </b>
                {changeLastname}
              </p>
              <p>
                <b>{t('ProfileInfo.b_3')}: </b>
                {changePhoneNumber}
              </p>
              <p>
                <b>{t('ProfileInfo.b_4')}: </b>
                {changeEmail}
              </p>

              <button className="button" type="submit" onClick={clickToEdit}>
                {t('ProfileInfo.button_2')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
