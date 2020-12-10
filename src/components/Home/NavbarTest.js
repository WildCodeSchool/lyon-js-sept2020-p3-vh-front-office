/*eslint-disable */
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './NavBar.scss';
import { slide as Menu } from 'react-burger-menu';
import logo from '../pictures/hypnose_vins_logo.png';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="navbarBody">
      <Link to="/">
        <img src={logo} alt="logo hypnose and wine" className="navbarLogo" />
      </Link>
      <div className="navbarLink">
        <ul>
          <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink exact to="/events">
            Evenements
          </NavLink>
          <NavLink exact to="/aboutme">
            A propos
          </NavLink>
          <NavLink exact to="/animators">
            Animateurs
          </NavLink>
          <NavLink exact to="/products">
            Vins & Spiritueux
          </NavLink>
          <NavLink exact to="/contact">
            Contact
          </NavLink>
        </ul>
      </div>
      <Menu
        className="menuNavbar"
        isOpen={true}
        // onStateChange={setIsMenuOpen(true)}
        noOverlay
        right
        width="100%"
        // customCrossIcon={<img src={cross} alt="cross icon" />}
        disableAutoFocus
      >
        <Link to="/" onClick={setIsMenuOpen(false)}>
          <img className="burgerLogo" src={logo} alt="logo burger" />
        </Link>
        <Link to="/" onClick={setIsMenuOpen(false)}>
          Home
        </Link>
        <Link to="/events" onClick={setIsMenuOpen(false)}>
          Evenements
        </Link>
        <Link to="/aboutme" onClick={setIsMenuOpen(false)}>
          A Propos
        </Link>
        <Link to="/animators" onClick={setIsMenuOpen(false)}>
          Animateurs
        </Link>
        <Link to="/products" onClick={setIsMenuOpen(false)}>
          Vins & Spiritueux
        </Link>
        <Link to="/contact" onClick={setIsMenuOpen(false)}>
          Contact
        </Link>
      </Menu>
    </div>
  );
};

export default NavBar;
