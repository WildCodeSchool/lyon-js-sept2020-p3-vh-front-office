import React from 'react';
import { Helmet } from 'react-helmet';
import Faq from 'react-faq-component';
import './Faq.css';

const data = {
  title: 'FAQ ',
  rows: [
    {
      title: 'Lorem ipsum dolor sit amet?',
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat,
              ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus.
              In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae.
              Fusce sed commodo purus, at tempus turpis.`,
    },
    {
      title: 'Nunc maximus, magna at ultricies elementum?',
      content:
        'Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.',
    },
    {
      title: 'Lorem ipsum dolor sit amet?',
      content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
            Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
            Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
            Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
    },
    {
      title: 'Curabitur laoreet, mauris vel blandit fringilla?',
      content:
        'Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.',
    },

    {
      title: 'Nunc maximus, magna at ultricies elementum?',
      content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
            Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
            Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
            Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
    },

    {
      title: 'Lorem ipsum dolor sit amet?',
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat,
      ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus.
      In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae.
      Fusce sed commodo purus, at tempus turpis.`,
    },
  ],
};

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
  return (
    <div className="faq-container">
      <Helmet>
        <title>FAQ</title>
      </Helmet>
      <h1 className="faq-title">Foire aux questions</h1>
      <Faq data={data} styles={styles} config={config} />
    </div>
  );
}
