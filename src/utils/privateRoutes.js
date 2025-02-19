import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { tokenExpired } from '../Redux/slice/authSlice';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from './axiosInstance';

const PrivateRoute = ({ element }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token || !isAuthenticated) {
      dispatch(tokenExpired());
      navigate('/login', {
        state: { message: 'Your session has expired. Please log in again.' },
      });
      sessionStorage.setItem(
        'authMessage',
        'Your session has expired. Please log in again.'
      );
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      if (decodedToken.exp < currentTime) {
        const userId =
          decodedToken[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
          ]; // Use userId or identifier in the token
        axiosInstance.put(`/userLog/updateUserLog/${userId}`);
        dispatch(tokenExpired());
        navigate('/login', {
          state: { message: 'Your session has expired. Please log in again.' },
        });
        sessionStorage.setItem(
          'authMessage',
          'Your session has expired. Please log in again.'
        );
      }
    } catch (error) {
      dispatch(tokenExpired());
      navigate('/login', {
        state: { message: 'Invalid session. Please log in again.' },
      });
      sessionStorage.setItem(
        'authMessage',
        'Invalid session. Please log in again.'
      );
    }
  }, [isAuthenticated, token, dispatch, navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Optional loading state
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired,
};

export default PrivateRoute;
