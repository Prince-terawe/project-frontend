import React, { useState } from 'react';
import { AppBar, Toolbar, Menu, MenuItem, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import NavbarContent from '../Content/headerBar';
import { NavIconButton, NavLogoTypo } from './styled/styledComponent';
import HelpIcon from '@mui/icons-material/Help';
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from 'prop-types';
import { persistor } from '../Redux/store';
import axiosInstance from '../Utils/axiosInstance';

const Navbar = ({ toggleMenu }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.put('/auth/logout');
      persistor.purge();

      toast.success(response.data.message, { autoClose: 2000 });

      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      toast.error(
        `Logout failed: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const handleProjectClick = () => {
    navigate('/');
  };

  const handleAboutClick = () => {
    navigate('/about');
  };

  const handleViewProfile = () => {
    handleClose();
    navigate('/profile');
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <NavIconButton onClick={toggleMenu}>
            <MenuIcon />
          </NavIconButton>
          <NavLogoTypo
            variant="h6"
            component="div"
            onClick={handleProjectClick}
          >
            {NavbarContent.name}
          </NavLogoTypo>
          <NavIconButton onClick={handleAboutClick}>
            <HelpIcon />
          </NavIconButton>
          <NavIconButton onClick={handleProfileClick}>
            <AccountCircleIcon />
          </NavIconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'profile-button',
            }}
          >
            <MenuItem onClick={handleViewProfile}>
              {NavbarContent.menu.item.item1}
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              {NavbarContent.menu.item.item2}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

Navbar.propTypes = {
  toggleMenu: PropTypes.func.isRequired, // Validate that toggleMenu is a function
  user: PropTypes.object.isRequired, // Validate that user is an object
};

export default Navbar;
