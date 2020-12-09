import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
import logo from "../pictures/hypnose_vins_logo.png";
import facebook from "../pictures/facebook.svg";

const Footer = () => {
  return (
    <div className="footerBody">
      <img src={logo} alt="logo" className="footerLogo" />
      <div className="footerText">
        <div className="footerLink">
          <Link to="/contact">
            <p>Contact</p>
          </Link>
          <Link to="faq">
            <p>FAQ</p>
          </Link>
          <Link to="mentions-legales">
            {" "}
            <p>Mentions légales</p>
          </Link>
        </div>
        <div className="footerCopyright">
          <p>Lorem ipsum</p>
        </div>
      </div>
      <img src={facebook} alt="facebookIcon" className="footerFacebook" />
    </div>
  );
};

export default Footer;
