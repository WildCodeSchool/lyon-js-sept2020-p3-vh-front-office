import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import {
  AiOutlineMail,
  AiFillFacebook,
  AiOutlineInstagram,
} from 'react-icons/ai';
import './AboutMorgane.scss';

export default function AboutMorgane() {
  const { t } = useTranslation();
  return (
    <div className="presentationContainer">
      <Helmet>
        <title>{t('About.helmet')}</title>
      </Helmet>
      <h1 className="titleAbout"> {t('About.h1')}</h1>
      <p className="line">________________________</p>
      <div className="squareAboutGrey">
        <div className="imageText">
          <img
            className="imageMorgane"
            alt=""
            src="https://lirp-cdn.multiscreensite.com/82a74c83/dms3rep/multi/opt/morgane_pardo-400w.jpg"
            width="290"
            height="290"
          />
          <h2 className="whoTitle">{t('About.h2')}</h2>
          <div className="paragraphs">
            <div className="first-part">
              <p className="first-paragraph">
                {t('About.content1')}
                <br />
                <br />
                <br />
                <img
                  className="first-picture"
                  alt=""
                  src="https://lirp-cdn.multiscreensite.com/md/unsplash/dms3rep/multi/opt/photo-1506102383123-c8ef1e872756-1920w.jpg"
                  width="100%"
                  height="100%"
                />
              </p>
            </div>
            <div className="second-part">
              <p className="second-paragraph">
                <br />
                <img
                  className="second-picture"
                  alt=""
                  src="https://lirp-cdn.multiscreensite.com/82a74c83/dms3rep/multi/opt/morgane-pardo-hypnose2-1920w.jpg"
                  width="100%"
                  height="100%"
                />
                <br />
                {t('About.content2')}
                <br />
                <br />
                <img
                  className="third-picture"
                  alt=""
                  src="https://lirp-cdn.multiscreensite.com/82a74c83/dms3rep/multi/opt/morgane-pardo-hypnose2-1920w.jpg"
                  width="100%"
                  height="100%"
                />
              </p>
            </div>
          </div>
        </div>
        <div>
          <h2>{t('About.h3')}</h2>
        </div>
        <div className="socialMedia">
          <ul className="icon-bar">
            <div>
              <li className="list">
                <a
                  href="mailto:morgane.pardo@yahoo.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiOutlineMail size={40} color="#8c0226" />
                </a>
              </li>
            </div>
            <div>
              <li className="list">
                <a
                  href="https://fr-fr.facebook.com/hypnose.villeurbanne/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillFacebook size={40} color="#8c0226" />
                </a>
              </li>
            </div>
            <div>
              <li className="list">
                <a
                  href="https://www.instagram.com/?hl=fr"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiOutlineInstagram size={40} color="#8c0226" />
                </a>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
