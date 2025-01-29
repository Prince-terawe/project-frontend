import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Menu, MenuItem, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import NavbarContent from '../Content/headerBar';
import axiosInstance from '../Utils/axiosInstance';
import { NavIconButton, NavLogoTypo } from './styled/styledComponent';
import InfoIcon from '@mui/icons-material/Info';

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  //   const [userName, setUserName] = useState('');
  const [user, setUser] = useState(null);

  const open = Boolean(anchorEl);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    toast.success('Logout successful! Redirecting...', {
      autoClose: 2000,
    });

    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const userId =
            decodedToken[
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
            ]; // Use userId or identifier in the token
          if (userId) {
            // Fetch user details from backend
            const response = await axiosInstance.get(`/auth/profile/${userId}`);
            if (response.status === 200 && response.data?.name) {
              console.log('user: ', response.data);
              setUser(response.data);
            }
          }
        } catch (error) {
          console.error('Error decoding token or fetching profile:', error);
          toast.error('Failed to fetch user information');
        }
      }
    };

    fetchProfile();
  }, []);

  const handleProjectClick = () => {
    navigate('/');
  };

  const handleAboutClick = () => {
    navigate('/about');
  };

  const handleViewProfile = () => {
    handleClose();
    console.log(user);
    navigate('/profile', { state: { user } }); // Pass user data as state
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <NavLogoTypo
            variant="h6"
            component="div"
            onClick={handleProjectClick}
          >
            {NavbarContent.name}
          </NavLogoTypo>
          <NavIconButton onClick={handleAboutClick}>
            <InfoIcon />
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

export default Navbar;
