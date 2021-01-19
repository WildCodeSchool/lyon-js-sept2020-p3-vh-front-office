import React from 'react';
import { Helmet } from 'react-helmet';
import Wines from './Wines';

export default function Products() {
  return (
    <>
      <Helmet>
        <title>Vins</title>
      </Helmet>
      <Wines />
    </>
  );
}
