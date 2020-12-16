import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import API from '../../services/API';

export default function Profile() {
  const [userDatas, setUserDatas] = useState();
  useEffect(() => {
    API.get('/me').then((res) => setUserDatas(res.data));
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

  return (
    <>
      <h1>Profile Page</h1>
      <p>{JSON.stringify(userDatas)}</p>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </>
  );
}
