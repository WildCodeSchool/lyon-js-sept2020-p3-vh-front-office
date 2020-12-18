// import React, { createContext, useState } from 'react';
// import API from '../services/API';

// export const SponsorsContext = createContext();

// export const SponsorsContextProvider = ({ children }) => {
//   const [sponsors, setSponsors] = useState([]);
//   const apiKey = `${process.env.API_KEY}`;

//   const sponsorsApiUrl = `https://localhost:5000/sponsors?apiKey=${apiKey}`;

//   const getSponsors = async (data) => {
//     await API.get(`${sponsorsApiUrl}`, data)
//       .then((response) => response.data)
//       .then((data) => {
//         if (data.sponsors) setSponsors(data.sponsors);
//       });
//   };

//   return (
//     <SponsorsContext.Provider
//       value={{
//         sponsors,
//         setSponsors,
//       }}
//     >
//       {children}
//     </SponsorsContext.Provider>
//   );
// };
