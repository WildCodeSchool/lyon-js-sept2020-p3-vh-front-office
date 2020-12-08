import React from "react";
import { useTranslation } from "react-i18next";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import './Translation.scss'

const Translation = () => {
  const { t, i18n } = useTranslation();

  const handleClickLanguages = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div>
        <div className="container-btn-trad">
            <ButtonGroup className="btn-trad" disableElevation variant="contained" color="primary">
                <Button onClick={() => handleClickLanguages("fr")}>fr</Button>
                <Button onClick={() => handleClickLanguages("en")}>en</Button>
            </ButtonGroup>
        </div>
        <h1 className="title-test-trad">{t("content.title")}</h1>
    </div>
  );
};

export default Translation;
