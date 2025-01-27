import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axiosInstance from './axiosInstance';
import PropTypes from 'prop-types';

const PrivateRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const validateToken = async () => {
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      try {
        const response = await axiosInstance.post('/auth/validate-token', {
          token,
        });

        if (response.status === 200) {
          setIsAuthenticated(response.data.valid);
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        setIsAuthenticated(false);
      }
    };
    validateToken();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Optional loading state
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired,
};

export default PrivateRoute;
