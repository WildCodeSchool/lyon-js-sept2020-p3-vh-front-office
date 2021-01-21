import React, { createContext } from 'react';
import useLocalStorage from '../../services/useLocalStorage';

export const BasketContext = createContext();

export default function BasketProvider({ children }) {
  const [basket, setBasket] = useLocalStorage('basket', []);

  return (
    <BasketContext.Provider value={{ basket, setBasket }}>
      {children}
    </BasketContext.Provider>
  );
}
