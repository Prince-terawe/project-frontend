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

const SignUp = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
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
      const response = await axiosInstance.post('/auth/signup', formData);

      if (response.status === 200) {
        console.log('Form data submitted:', response.data);
        navigate('/login');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };
  return (
    <MainContainer>
      <Typography variant="h3" align="center" mt={2}>
        {signUpContent.title}
      </Typography>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
          <StyledTextField
            id="name"
            name="name"
            label={signUpContent.labels.name}
            variant="filled"
            placeholder={signUpContent.placeHolders.name}
            value={formData.name}
            onChange={handleChange}
            required
          />
          <StyledTextField
            id="email"
            name="email"
            label={signUpContent.labels.email}
            variant="filled"
            placeholder={signUpContent.placeHolders.email}
            value={formData.email}
            onChange={handleChange}
            required
            type="email"
          />
          <StyledTextField
            id="password"
            name="password"
            label={signUpContent.labels.password}
            variant="filled"
            placeholder={signUpContent.placeHolders.password}
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
            {isSubmitting ? '' : signUpContent.buttonText}
          </Button>
          {errorMessage && (
            <Typography variant="body2" color="error" mt={2}>
              {errorMessage}
            </Typography>
          )}
          <Typography variant="body2" color="primary" mt={2}>
            <Link to="/login">{signUpContent.backToLogin}</Link>
          </Typography>
        </StyledForm>
      </FormContainer>
    </MainContainer>
  );
};

export default SignUp;
