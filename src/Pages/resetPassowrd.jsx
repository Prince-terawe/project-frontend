import React, { useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import axiosInstance from '../utils/axiosInstance';
import {
  FormContainer,
  StyledForm,
  StyledTextField,
} from '../Components/styled/styledComponent';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import ResetPasswordContent from '../Content/resetPassword';

const ResetPassword = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axiosInstance.put(
        '/auth/reset-password',
        formData
      );
      // Check if the response contains a token
      if (response.status === 200) {
        console.log('Password Reset successful.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };
  return (
    <>
      <Typography variant="h4" align="center" mt={2}>
        {ResetPasswordContent.title}
      </Typography>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
          <StyledTextField
            id="email"
            name="email"
            label={ResetPasswordContent.labels.email}
            variant="filled"
            placeholder={ResetPasswordContent.placeHolders.email}
            value={formData.email}
            onChange={handleChange}
            required
            type="email"
          />
          <StyledTextField
            id="newPassword"
            name="newPassword"
            label={ResetPasswordContent.labels.password}
            variant="filled"
            placeholder={ResetPasswordContent.placeHolders.password}
            value={formData.password}
            onChange={handleChange}
            required
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
    </>
  );
};

export default ResetPassword;
