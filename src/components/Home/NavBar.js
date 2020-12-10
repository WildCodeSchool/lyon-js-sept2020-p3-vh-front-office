/*eslint-disable */
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './NavBar.scss';
import { slide as Menu } from 'react-burger-menu';
import logo from '../pictures/hypnose_vins_logo.png';
import cross from '../pictures/cross.png';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menuOpen: false };
  }

  handleStateChange = (state) => {
    this.setState({ menuOpen: state.isOpen });
  };

  closeMenu = () => {
    this.setState({ menuOpen: false });
  };

  render() {
    const { menuOpen } = this.state;
    return (
      <div className="navbarBody">
        <Link to="/">
          <img src={logo} alt="logo hypnose and wine" className="navbarLogo" />
        </Link>
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
            <img className="navbarLogo" src={logo} alt="logo burger" />
          </Link>
          <Link to="/" onClick={this.closeMenu}>
            Home
          </Link>
          <Link to="/events" onClick={this.closeMenu}>
            Evenements
          </Link>
          <Link to="/aboutme" onClick={this.closeMenu}>
            A Propos
          </Link>
          <Link to="/animators" onClick={this.closeMenu}>
            Animateurs
          </Link>
          <Link to="/products" onClick={this.closeMenu}>
            Vins & Spiritueux
          </Link>
          <Link to="/contact" onClick={this.closeMenu}>
            Contact
          </Link>
        </Menu>
      </div>
    );
  }
}

export default NavBar;
