/*eslint-disable */
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './NavBar.scss';
import { slide as Menu } from 'react-burger-menu';
import logo from '../pictures/hypnose_vins_logo.png';
import cross from '../pictures/cross.png';
import calendar from '../pictures/calendar.svg';
import SimpleMenu from './MenuNavBar.js';
import Translation from './Translation.js';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menuOpen: false };
    this.state = { anchorEl: null };
  }

  handleStateChange = (state) => {
    this.setState({ menuOpen: state.isOpen });
  };

  closeMenu = () => {
    this.setState({ menuOpen: false });
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { menuOpen } = this.state;
    const { isLogged } = this.state;
    return (
      <nav className="navbarBody">
        <Link to="/">
          <img src={logo} alt="logo hypnose and wine" className="navbarLogo" />
        </Link>
        <div className="navbarLink">
          <ul>
            <NavLink exact to="/">
              Accueil
            </NavLink>
            <SimpleMenu />
            <NavLink exact to="/aboutme">
              A Propos
            </NavLink>
            <NavLink exact to="/contact">
              Contact
            </NavLink>
          </ul>
        </div>
        <div className="userLink">
          <div className="navbarTranslation">
            <Translation />
          </div>
          <img src={calendar} alt="calendar basket" />
          <NavLink exact to="/register">
            S'inscrire
          </NavLink>
        </div>
        <Menu
          className="menuNavbar"
          isOpen={menuOpen}
          onStateChange={(state) => this.handleStateChange(state)}
          noOverlay
          right
          width="100%"
          customCrossIcon={<img src={cross} alt="cross icon" />}
          disableAutoFocus
        >
          <Link to="/" onClick={this.closeMenu}>
            <img className="burgerLogo" src={logo} alt="logo burger" />
          </Link>
          <Link to="/" onClick={this.closeMenu}>
            Home
          </Link>
          <Link to="/events" onClick={this.closeMenu}>
            Evènements
          </Link>
          <Link to="/animators" onClick={this.closeMenu}>
            Animateurs
          </Link>
          <Link to="/products" onClick={this.closeMenu}>
            Vins & Spiritueux
          </Link>
          <Link to="/aboutme" onClick={this.closeMenu}>
            A Propos
          </Link>
          <Link to="/contact" onClick={this.closeMenu}>
            Contact
          </Link>
        </Menu>
      </nav>
    );
  }
}

export default NavBar;
