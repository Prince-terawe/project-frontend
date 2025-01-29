import React from 'react';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Layout from '../Layout/index';
import { BoxContainer } from '../Components/styled/styledComponent';
import ProfileContent from '../Content/profile';

const Profile = () => {
  const location = useLocation();
  const user = location.state?.user; // Access user data from navigate state

  if (!user) {
    return (
      <Layout>
        <Typography variant="h4" gutterBottom>
          {ProfileContent.noUser}
        </Typography>
      </Layout>
    );
  }

  return (
    <Layout>
      <BoxContainer>
        <Typography variant="h4" gutterBottom>
          {ProfileContent.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Name:</strong> {user.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Email:</strong> {user.email}
        </Typography>
      </BoxContainer>
    </Layout>
  );
};

export default Profile;
