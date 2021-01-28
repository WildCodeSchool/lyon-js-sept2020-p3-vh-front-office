import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import './MentionsLegale.scss';

const MentionLegale = () => {
  const { t } = useTranslation();
  return (
    <div className="page-mentions-légales">
      <Helmet>
        <title>Mentions Légales</title>
      </Helmet>
      <div className="container-mentions-legales">
        <div className="h1-hr">
          <h1 className="titre-mentions-legales">{t('Mentions.h1')}</h1>
          <p className="line">________________________</p>
        </div>
        <h3 className="catégories-mentions-légales">{t('Mentions.h3_1')}</h3>
        <p className="paragraphes-mentions-légales">{t('Mentions.p_1')}</p>
        <h3>{t('Mentions.h3_2')}</h3>
        <p>{t('Mentions.p_2')}</p>
        <h3>{t('Mentions.h3_3')}</h3>
        <p>
          {t('Mentions.p_3')} <br />
          {t('Mentions.p_3_2')}
        </p>
        <h3>RCS</h3>
        <p>
          {t('Mentions.p_4')} <br /> <br />
          {t('Mentions.p_4_2')} <br /> {t('Mentions.p_4_3')} <br />
          {t('Mentions.p_3_4')}
        </p>
        <h3>{t('Mentions.h3_5')}</h3>
        <p>{t('Mentions.p_5')}</p>
        <h3>{t('Mentions.h3_6')}</h3>
        <p>{t('Mentions.p_6')}</p>
        <h3>{t('Mentions.h3_7')}</h3>
        <p>{t('Mentions.p_7')}</p>
        <h3>{t('Mentions.h3_8')}</h3>
        <p>{t('Mentions.p_8')}</p>
        <h3>{t('Mentions.h3_9')}</h3>
        <p>{t('Mentions.p_9')}</p>
        <h3>{t('Mentions.h3_10')}</h3>
        <p>{t('Mentions.p_10')}</p>
        <h3>{t('Mentions.h3_11')}</h3>
        <p>{t('Mentions.p_11')}</p>
        <h3>{t('Mentions.h3_12')}</h3>
        <p>{t('Mentions.p_12')}</p>
      </div>
    </div>
  );
};

export default MentionLegale;
