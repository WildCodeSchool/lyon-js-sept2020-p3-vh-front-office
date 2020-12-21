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
              <div className="nom-image-paragraph-animator">
                <div className="nom-image-animator">
                  <h2>
                    {animator.firstname}
                    {animator.lastname}
                  </h2>
                  <img src={animator.image} alt={animator.firstname} />
                </div>
                <div className="biography-animators">
                  <p>{animator.biographie}</p>
                </div>
              </div>
              <div className="socialMedia-animators">
                <ul className="icon-bar-animators">
                  <div>
                    <li className="list">
                      <a href="http://www.google.com">
                        <AiOutlineMail size={26} color="white" />
                      </a>
                    </li>
                  </div>
                  <div>
                    <li className="list">
                      <a href="http://www.google.com">
                        <AiFillFacebook size={26} color="white" />
                      </a>
                    </li>
                  </div>
                  <div>
                    <li className="list">
                      <a href="http://www.google.com">
                        <AiOutlineTwitter size={26} color="white" />
                      </a>
                    </li>
                  </div>
                  <div>
                    <li className="list">
                      <a href="http://www.google.com">
                        <AiOutlineInstagram size={26} color="white" />
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
