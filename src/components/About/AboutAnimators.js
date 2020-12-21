import React, { useState, useEffect } from 'react';
import {
  AiOutlineMail,
  AiFillFacebook,
  AiOutlineTwitter,
  AiOutlineInstagram,
} from 'react-icons/ai';
import API from '../../services/API';
import './AboutAnimators.scss';

const AboutAnimators = () => {
  const [animators, setAnimators] = useState();

  useEffect(() => {
    API.get('/animators').then((res) => setAnimators(res.data));
  }, [animators]);

  return (
    <div className="container-all-cards-animators">
      <h1>Animateurs</h1>
      {animators &&
        animators.map((animator) => {
          return (
            <div className="cards-animators">
              <div className="nom-image-animator">
                <h2>
                  {animator.firstname}
                  {animator.lastname}
                </h2>
                <img src={animator.image} alt={animator.firstname} />
              </div>
              <p>{animator.biographie}</p>
              <div className="socialMedia">
                <ul className="icon-bar">
                  <div>
                    <li className="list">
                      <a href="http://www.google.com">
                        <AiOutlineMail size={32} color="black" />
                      </a>
                    </li>
                  </div>
                  <div>
                    <li className="list">
                      <a href="http://www.google.com">
                        <AiFillFacebook size={32} color="black" />
                      </a>
                    </li>
                  </div>
                  <div>
                    <li className="list">
                      <a href="http://www.google.com">
                        <AiOutlineTwitter size={32} color="black" />
                      </a>
                    </li>
                  </div>
                  <div>
                    <li className="list">
                      <a href="http://www.google.com">
                        <AiOutlineInstagram size={32} color="black" />
                      </a>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default AboutAnimators;
