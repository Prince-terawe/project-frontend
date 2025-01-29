import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PublicRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem('authToken');

  // If the user is authenticated, redirect them to the home page
  return isAuthenticated ? <Navigate to="/" /> : element;
};

PublicRoute.propTypes = {
  element: PropTypes.node.isRequired,
};

export default PublicRoute;
