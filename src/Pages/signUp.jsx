import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import signUpContent from '../Content/signUp';
import axiosInstance from '../utils/axiosInstance';
import {
  FormContainer,
  StyledForm,
  StyledTextField,
} from '../Components/styled/styledComponent';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/signup', formData);
      console.log('Form data submitted:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  return (
    <>
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
          />
          <StyledTextField
            id="email"
            name="email"
            label={signUpContent.labels.email}
            variant="filled"
            placeholder={signUpContent.placeHolders.email}
            value={formData.email}
            onChange={handleChange}
          />
          <StyledTextField
            id="password"
            name="password"
            label={signUpContent.labels.password}
            variant="filled"
            placeholder={signUpContent.placeHolders.password}
            value={formData.password}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" type="submit">
            {signUpContent.buttonText}
          </Button>
        </StyledForm>
      </FormContainer>
    </>
  );
};

export default SignUp;
