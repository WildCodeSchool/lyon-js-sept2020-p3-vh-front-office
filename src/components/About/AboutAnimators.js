import React, { useState, useEffect } from 'react';
import API from '../../services/API';

const AboutAnimators = () => {
  const [animators, setAnimators] = useState('');

  useEffect(() => {
    API.get('/animators').then((res) => setAnimators(res.data));
  }, [animators]);

  return (
    <div>
      {animators &&
        animators.map((animator) => {
          return (
            <div>
              <h1>{animator.firstname}</h1>
            </div>
          );
        })}
    </div>
  );
};

export default AboutAnimators;
