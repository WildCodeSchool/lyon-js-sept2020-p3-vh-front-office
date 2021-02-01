/*eslint-disable */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
  simpleMenu: {
    color: '#8c0226',
    textDecoration: 'none',
  },
}));

const SimpleMenu = () => {
  const { t } = useTranslation();
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
        {t('Navbar.lien1')}
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
            {t('Navbar.souslien1')}
          </MenuItem>
        </NavLink>
        <NavLink exact to="/animators">
          <MenuItem onClick={handleClose} className={classes.simpleMenu}>
            {t('Navbar.souslien2')}
          </MenuItem>
        </NavLink>
        <NavLink exact to="/products">
          <MenuItem onClick={handleClose} className={classes.simpleMenu}>
            {t('Navbar.souslien3')}
          </MenuItem>
        </NavLink>
      </Menu>
    </div>
  );
};

export default SimpleMenu;
