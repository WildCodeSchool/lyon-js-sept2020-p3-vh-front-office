import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import Wines from './Wines';

export default function Products() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('Products.helmet')} </title>
      </Helmet>
      <Wines />
    </>
  );
}
