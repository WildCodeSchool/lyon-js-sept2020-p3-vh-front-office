/*eslint-disable */

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const SimpleMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <p aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Concept
      </p>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <NavLink exact to="/events">
          <MenuItem onClick={handleClose}>Evènements</MenuItem>
        </NavLink>
        <NavLink exact to="/animators">
          <MenuItem onClick={handleClose}>Animateurs</MenuItem>
        </NavLink>
        <NavLink exact to="/products">
          <MenuItem onClick={handleClose}>Vins & Spiritueux</MenuItem>
        </NavLink>
      </Menu>
    </div>
  );
};

export default SimpleMenu;
