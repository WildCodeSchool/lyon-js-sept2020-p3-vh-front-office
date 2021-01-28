/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import './Profile.scss';
import { useTranslation } from 'react-i18next';
import { Gift, Info, HelpCircle } from 'react-feather';
import ProfileInformation from './ProfileInformation';
import ProfileEvents from './ProfileEvents';
import { LoginContext } from '../Contexts/LoginContext';

import API from '../../services/API';

export default function Profile() {
  const [fetchedUser, setFetchedUser] = useState([]);
  const { userLogged, setUserLogged } = useContext(LoginContext);
  const history = useHistory();
  const { addToast } = useToasts();
  const [clickedProfileInfo, setClickedProfileInfo] = useState(false);
  const [clickedMyEvents, setClickedMyEvents] = useState(false);
  const [clickedHelp, setClickedHelp] = useState(false);
  const { t } = useTranslation();

  const logout = async () => {
    try {
      await API.get('auth/logout');
      history.push('/login');
      addToast('Vous avez bien été deconnecté', {
        appearance: 'success',
        autoDismiss: true,
      });
      history.push('/login');
      setUserLogged(null);
    } catch (err) {
      addToast("Vous n'avez pas été déconnecté", {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  useEffect(() => {
    API.get('/me').then((res) => {
      setUserLogged(res.data);
      setFetchedUser(res.data);
    });
  }, []);

  const navigateToInformation = () => {
    history.push('/profile/myinformation');
    setClickedProfileInfo(true);
  };

  const navigateToMyEvents = () => {
    history.push('/profile/myevents');
    setClickedMyEvents(true);
  };

  const navigateToHelp = () => {
    history.push('/faq');
    setClickedHelp(true);
  };

  return fetchedUser.length !== 0 ? (
    <main className="profile">
      <h1>
        {t('Profile.h1')} {userLogged.firstname} !
        <hr />
      </h1>
      <div className="profile-navigation">
        {clickedProfileInfo ? (
          <div>
            <ProfileInformation />
          </div>
        ) : (
          <div onClick={navigateToInformation} className="profile-section">
            <Info />
            <h3>{t('Profile.h3_1')}</h3>
          </div>
        )}
        <hr />
        {clickedMyEvents ? (
          <div>
            <ProfileEvents />
          </div>
        ) : (
          <div onClick={navigateToMyEvents} className="profile-section">
            <Gift />
            <h3>{t('Profile.h3_2')}</h3>
          </div>
        )}
        <hr />
        {clickedHelp ? (
          <div>
            <h3>{t('Profile.h3_3')}</h3>
          </div>
        ) : (
          <div onClick={navigateToHelp} className="profile-section">
            <HelpCircle />
            <h3>{t('Profile.h3_3')}</h3>
          </div>
        )}
      </div>
      <div className="logout" onClick={logout}>
        {t('Profile.button')}
      </div>
    </main>
  ) : (
    'Chargement'
  );
}
