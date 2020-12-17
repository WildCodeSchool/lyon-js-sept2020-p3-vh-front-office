import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import API from '../../services/API';
import { LoginContext } from '../Contexts/LoginContext';

export default function Profile() {
  const { userLogged, setUserLogged } = useContext(LoginContext);

  useEffect(() => {
    API.get('/me').then((res) => setUserLogged(res.data));
  }, []);

  const history = useHistory();
  const { addToast } = useToasts();

  const logout = async () => {
    try {
      await API.get('auth/logout');
      history.push('/login');
      addToast('Vous avez bien été deconnecté', {
        appearance: 'success',
        autoDismiss: true,
      });
      history.push('/login');
    } catch (err) {
      addToast("Vous n'avez pas été déconnecté", {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  return userLogged.length !== 0 ? (
    <>
      <h1>Bienvenue {userLogged.firstname}</h1>
      <p>Prénom : {userLogged.firstname}</p>
      <p>Prénom : {userLogged.lastname}</p>
      <p>Téléphone: {userLogged.phone_number}</p>
      <button type="button" onClick={logout}>
        Déconnexion
      </button>
    </>
  ) : (
    'Chargement ...'
  );
}
