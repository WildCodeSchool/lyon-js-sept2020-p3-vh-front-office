import React, { useEffect, useState } from 'react';
import Faq from 'react-faq-component';
import { getCollection } from '../../services/API';
import './Faq.css';

const styles = {
  bgColor: 'white',
  rowTitleColor: '#3c434c',
  rowContentTextSize: 'small',
  rowContentColor: 'grey',
  rowTitleTextSize: 'large',

  rowContentPaddingTop: '10px',
};

const config = {
  animate: true,
  tabFocus: false,
};

export default function FaqPage() {
  const [questions, setQuestions] = useState({});

  useEffect(() => {
    const request = getCollection('faq').then((datas) =>
      setQuestions({
        title: 'FAQ',
        rows: datas.map((item) => ({
          title: item.faq_title,
          content: item.faq_content,
        })),
      })
    );
    return () => {
      request.cancel();
    };
  }, []);

  return (
    <div className="faq-container">
      <h1 className="faq-title">Foire aux questions</h1>
      <Faq data={questions} styles={styles} config={config} />
    </div>
  );
}
