import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
import logo from "../pictures/hypnose_vins_logo.png";
import facebook from "../pictures/facebook.svg";

const Footer = () => {
  return (
    <div className="footerBody">
      <div className="footerLink">
        <img
          src={logo}
          alt="logo"
          className="footerLogo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
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
        <img src={facebook} alt="facebookIcon" className="footerFacebook" />
      </div>

      <div className="footerCopyright">
        <p>Wild Code School © 2020. All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
