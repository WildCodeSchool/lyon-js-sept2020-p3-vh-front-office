import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';
import logo from '../pictures/hypnose_vins_logo.png';
import facebook from '../pictures/facebook.svg';

const Footer = () => {
  return (
    <div className="footerBody">
      <img
        src={logo}
        alt="logo"
        className="footerLogo"
        // onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        // onKeyDown={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />
      <div className="footerText">
        <div className="footerLink">
          <Link to="/contact">
            <p>Contact</p>
          </Link>
          <Link to="faq">
            <p>FAQ</p>
          </Link>
          <Link to="mentions-legales">
            {' '}
            <p>Mentions légales</p>
          </Link>
        </div>
        <div className="footerCopyright">
          <p>Wild Code School © 2020. All rights reserved</p>
        </div>
      </div>
      <div className="footerIcon">
        <img src={facebook} alt="facebookIcon" className="footerFacebook" />
      </div>
    </div>
  );
};

export default Footer;
