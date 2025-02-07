import React, { useState, useEffect } from 'react';
import {
  BoxContainer,
  ContentContainer,
  MainContainer,
} from '../Components/styled/styledComponent';
import HeaderBar from '../Components/headerBar';
import PropTypes from 'prop-types';
import SideNav from '../Components/sideNav';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../Utils/axiosInstance';

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  console.log('prince');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('authToken');
      console.log(token);
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

  console.log(user);

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };
  return (
    <MainContainer>
      <HeaderBar toggleMenu={toggleMenu} user={user} />
      <ContentContainer>
        {user && <SideNav collapsed={collapsed} user={user} />}
        <BoxContainer collapsed={collapsed}>{children}</BoxContainer>
      </ContentContainer>
    </MainContainer>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
