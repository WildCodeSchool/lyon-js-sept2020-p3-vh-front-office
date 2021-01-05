import React, { createContext, useState } from 'react';

export const BasketContext = createContext();

export default function BasketProvider({ children }) {
  const [basket, setBasket] = useState([
    {
      id: 1,
      quantity: 4,
    },
    {
      id: 2,
      quantity: 1,
    },
  ]);

  return (
    <BasketContext.Provider value={{ basket, setBasket }}>
      {children}
    </BasketContext.Provider>
  );
}
