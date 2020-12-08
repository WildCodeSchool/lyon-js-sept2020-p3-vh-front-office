import React from "react";
import { useTranslation } from 'react-i18next';

const Translation = () => {

const { t, i18n } = useTranslation();

const handleClickLanguages = (lang) => {
    i18n.changeLanguage(lang)
}

  return (
      <div>
        <button onClick={() => handleClickLanguages('fr')}>Francais</button>
        <button onClick={() => handleClickLanguages('en')}>Anglais</button>
        <p>Bonjour</p>
      </div>
  )
};

export default Translation;
