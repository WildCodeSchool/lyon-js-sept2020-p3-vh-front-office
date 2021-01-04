import React, { createContext, useState } from 'react';

export const LoginContext = createContext();

export default function LoginProvider({ children }) {
  const [userLogged, setUserLogged] = useState([]);

  return (
    <LoginContext.Provider value={{ userLogged, setUserLogged }}>
      {children}
    </LoginContext.Provider>
  );
}
