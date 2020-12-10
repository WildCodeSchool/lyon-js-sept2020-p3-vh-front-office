import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';
// import { slide as Menu } from 'react-burger-menu';
import logo from '../pictures/hypnose_vins_logo.png';

const NavBar = () => {
  return (
    <div className="navbarBody">
      <img src={logo} alt="logo hypnose and wine" className="navbarLogo" />
      <div className="navbarLink">
        <Link to="/contact">
          <p>Contact</p>
        </Link>
        <Link to="/contact">
          <p>Contact</p>
        </Link>
        <Link to="/contact">
          <p>Contact</p>
        </Link>
        <Link to="/contact">
          <p />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
