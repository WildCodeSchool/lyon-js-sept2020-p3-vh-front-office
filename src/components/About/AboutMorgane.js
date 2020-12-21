import React from 'react';
import {
  AiOutlineMail,
  AiFillFacebook,
  AiOutlineTwitter,
  AiOutlineInstagram,
} from 'react-icons/ai';
import './AboutMorgane.scss';

export default function AboutMorgane() {
  return (
    <div className="presentationContainer">
      <h1 className="titleAbout"> Presentation Morgane</h1>
      <div className="squareAboutGrey">
        <h2 className="whoTitle">Qui suis je?</h2>
        <div className="imageText">
          <img
            className="imageMorgane"
            alt=""
            src="https://www.pngfind.com/pngs/m/5-52768_girl-avatar-download-transparent-png-image-png-download.png"
            width="200"
            height="200"
          />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div>
          <ul>
            <div>
              <li>
                <a href="http://www.google.com">
                  <AiOutlineMail size={32} color="black" />
                </a>
              </li>
            </div>
            <div>
              <li>
                <a href="http://www.google.com">
                  <AiFillFacebook size={32} color="black" />
                </a>
              </li>
            </div>
            <div>
              <li>
                <a href="http://www.google.com">
                  <AiOutlineTwitter size={32} color="black" />
                </a>
              </li>
            </div>
            <div>
              <li>
                <a href="http://www.google.com">
                  <AiOutlineInstagram size={32} color="black" />
                </a>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
