import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Menu,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeContent from '../Content/home';
import { MainContainer } from '../Components/styled/styledComponent';
import ToastModel from '../Components/toastModel';
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    toast.success('Login successful! Redirecting...', {
      autoClose: 2000, // close after 2 sec
    });

    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  const handleViewProfile = () => {
    handleClose();
    // Add navigation to profile page when ready
    console.log('View Profile clicked');
  };

  return (
    <MainContainer sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {HomeContent.title}
          </Typography>
          <Button
            color="inherit"
            onClick={handleProfileClick}
            startIcon={<AccountCircleIcon />}
          >
            {HomeContent.menu.title}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'profile-button',
            }}
          >
            <MenuItem onClick={handleViewProfile}>
              {HomeContent.menu.item.item1}
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              {HomeContent.menu.item.item2}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {HomeContent.desccription}
        </Typography>
        <ToastModel />
        {/* Add your main content here */}
      </Container>
      <ToastContainer position="top-right" autoClose={3000} />
    </MainContainer>
  );
};

export default Home;
