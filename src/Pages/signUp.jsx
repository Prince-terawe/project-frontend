import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import signUpContent from '../Content/signUp';
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

const SignUp = () => {
  const navigate = useNavigate();
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
      const response = await axiosInstance.post('/auth/signup', formData);

      if (response.status === 200) {
        toast.success('Registration Successful.', {
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || 'Invalid data!');
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
        {signUpContent.title}
      </Typography>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <StyledTextField
            id="name"
            name="name"
            label={signUpContent.labels.name}
            variant="filled"
            placeholder={signUpContent.placeHolders.name}
            {...register('name', { required: 'Name is required' })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <StyledTextField
            id="email"
            name="email"
            label={signUpContent.labels.email}
            variant="filled"
            placeholder={signUpContent.placeHolders.email}
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
            label={signUpContent.labels.password}
            variant="filled"
            placeholder={signUpContent.placeHolders.password}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
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
            {isSubmitting ? 'Signing up...' : signUpContent.buttonText}
          </Button>
          <Typography variant="body2" color="primary" mt={2}>
            <Link to="/login">{signUpContent.backToLogin}</Link>
          </Typography>
        </StyledForm>
      </FormContainer>
      <ToastContainer position="top-right" autoClose={3000} />
    </MainContainer>
  );
};

export default SignUp;
