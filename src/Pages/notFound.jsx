import React from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { NotFoundContainer } from '../Components/styled/styledComponent';
import NotFoundContent from '../Content/notFound';

function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Redirect to Home page
  };

  return (
    <NotFoundContainer>
      <Typography variant="h1" color="#1976d2">
        {NotFoundContent.title}
      </Typography>
      <Typography variant="h4" mt={3} color="#333">
        {NotFoundContent.description1}
      </Typography>
      <Typography variant="body1" my={3} color="#666">
        {NotFoundContent.description2}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoHome}>
        {NotFoundContent.backToHome}
      </Button>
    </NotFoundContainer>
  );
}

export default NotFound;
