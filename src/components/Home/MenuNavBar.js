/*eslint-disable */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(() => ({
  simpleMenu: {
    color: '#8c0226',
    textDecoration: 'none',
  },
}));

const SimpleMenu = () => {
  const classes = useStyles();
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
          <MenuItem onClick={handleClose} className={classes.simpleMenu}>
            Evènements
          </MenuItem>
        </NavLink>
        <NavLink exact to="/animators">
          <MenuItem onClick={handleClose} className={classes.simpleMenu}>
            Animateurs
          </MenuItem>
        </NavLink>
        <NavLink exact to="/products">
          <MenuItem onClick={handleClose} className={classes.simpleMenu}>
            Vins & Spiritueux
          </MenuItem>
        </NavLink>
      </Menu>
    </div>
  );
};

export default SimpleMenu;
