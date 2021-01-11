import React, { createContext, useEffect } from 'react';
import useLocalStorage from 'react-use-localstorage';
import API from '../../services/API';

export const LoginContext = createContext();

export default function LoginProvider({ children }) {
  const [userLogged, setUserLogged] = useLocalStorage('user');

  useEffect(() => {
    API.get('/me').then((res) => setUserLogged(JSON.stringify(res.data)));
  }, []);

  return (
    <LoginContext.Provider value={{ userLogged, setUserLogged }}>
      {children}
    </LoginContext.Provider>
  );
}
