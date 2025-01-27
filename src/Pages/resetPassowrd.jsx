import React, { useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import axiosInstance from '../Utils/axiosInstance';
import {
  FormContainer,
  MainContainer,
  StyledForm,
  StyledTextField,
} from '../Components/styled/styledComponent';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import ResetPasswordContent from '../Content/resetPassword';
import { useForm } from 'react-hook-form';

const ResetPassword = () => {
  let navigate = useNavigate();
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
      const response = await axiosInstance.put(
        '/auth/reset-password',
        formData
      );
      // Check if the response status is 200
      if (response.status === 200) {
        console.log('Password Reset successful.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainContainer>
      <Typography variant="h4" align="center" mt={2}>
        {ResetPasswordContent.title}
      </Typography>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <StyledTextField
            id="email"
            name="email"
            label={ResetPasswordContent.labels.email}
            variant="filled"
            placeholder={ResetPasswordContent.placeHolders.email}
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
            id="newPassword"
            name="newPassword"
            label={ResetPasswordContent.labels.password}
            variant="filled"
            placeholder={ResetPasswordContent.placeHolders.password}
            {...register('newPassword', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            type="password"
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Resetting...' : ResetPasswordContent.buttonText}
          </Button>
          {errorMessage && (
            <Typography variant="body2" color="error" mt={2}>
              {errorMessage}
            </Typography>
          )}
          <Stack>
            <Typography variant="body2" color="primary" mt={2}>
              <Link to="/login">{ResetPasswordContent.backToLogin}</Link>
            </Typography>
          </Stack>
        </StyledForm>
      </FormContainer>
    </MainContainer>
  );
};

export default ResetPassword;
