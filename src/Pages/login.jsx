import React, { useState } from 'react';
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

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        // Store the token in localStorage
        localStorage.setItem('authToken', response.data.token);

        console.log('Login successful, token stored in localStorage.');
        // alert('Login successful!');
        navigate('/'); // Ensure you are using the correct path
      } else {
        console.error('Token not found in response.');
        setErrorMessage('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);

      // Handle specific error responses
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Invalid credentials');
      } else {
        setErrorMessage('An error occurred. Please try again.');
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
          {errorMessage && (
            <Typography variant="body2" color="error" mt={2}>
              {errorMessage}
            </Typography>
          )}
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
    </MainContainer>
  );
};

export default Login;
