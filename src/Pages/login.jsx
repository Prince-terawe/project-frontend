import React, { useEffect, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import loginContent from '../Content/login';
import axiosInstance from '../Utils/axiosInstance';
import {
  FormContainer,
  MainContainer,
  StyledForm,
  StyledTextField,
} from '../Components/styled/styledComponent';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../Redux/slice/authSlice';
import { jwtDecode } from 'jwt-decode';
import { useLocation } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const message =
    location.state?.message || sessionStorage.getItem('authMessage');

  useEffect(() => {
    if (message) {
      toast.error(message);
      sessionStorage.removeItem('authMessage'); // Clear after displaying
    }
  }, [message]);

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = async (formData) => {
    setIsSubmitting(true);

    try {
      const response = await axiosInstance.post('/auth/login', formData);
      // Check if the response contains a token
      if (response.data && response.data.token) {
        var token = response.data.token;
        var user = null;
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
            const userId =
              decodedToken[
                'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
              ]; // Use userId or identifier in the token
            if (userId) {
              // Fetch user details from backend
              const response = await axiosInstance.get(
                `/auth/profile/${userId}`
              );
              if (response.status === 200 && response.data?.name) {
                user = response.data;
              }
            }
          } catch (error) {
            toast.error(error || 'Failed to fetch user information');
          }
        }
        console.log(user);
        dispatch(loginSuccess({ user, token }));

        toast.success('Login successful!...', {
          autoClose: 2000, // close after 2 sec
        });

        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        toast.error('Login failed. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || 'Invalid credentials');
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainContainer>
      <Typography variant="h4" align="center" mt={2}>
        {loginContent.title}
      </Typography>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <StyledTextField
            id="email"
            name="email"
            label={loginContent.labels.email}
            variant="filled"
            placeholder={loginContent.placeHolders.email}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            type="email"
          />
          <StyledTextField
            id="password"
            name="password"
            label={loginContent.labels.password}
            variant="filled"
            placeholder={loginContent.placeHolders.password}
            {...register('password', {
              required: 'Password is required',
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            type="password"
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : loginContent.buttonText}
          </Button>
          <Stack>
            <Typography variant="body2" color="primary" mt={2}>
              <Link to="/sign-up">{loginContent.backToSignUp}</Link>
            </Typography>
            <Typography variant="body2" color="primary" mt={2}>
              <Link to="/reset-password">{loginContent.reset}</Link>
            </Typography>
          </Stack>
        </StyledForm>
      </FormContainer>
      <ToastContainer position="top-right" autoClose={3000} />
    </MainContainer>
  );
};

export default Login;
