import React, { createContext, useEffect, useState } from 'react';

export const BasketContext = createContext();

export default function BasketProvider({ children }) {
  const simulatedBasket = [
    {
      id: 1,
      quantity: 4,
    },
    {
      id: 2,
      quantity: 1,
    },
  ];

  const [basket, setBasket] = useState(
    JSON.parse(localStorage.getItem('events')) || simulatedBasket
  );

  // We'll use this useState when booking events feature will be developped

  // const [basket, setBasket] = useState(
  //   JSON.parse(localStorage.getItem('events')) || simulatedBasket
  // );

  useEffect(() => {
    if (basket.length === 0) {
      localStorage.removeItem('events');
    } else {
      localStorage.setItem('events', JSON.stringify(basket));
    }
  }, [basket]);

  return (
    <BasketContext.Provider value={{ basket, setBasket }}>
      {children}
    </BasketContext.Provider>
  );
}
