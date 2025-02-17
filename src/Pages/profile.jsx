import React from 'react';
import { Typography } from '@mui/material';
import Layout from '../Layout/index';
import { BoxContainer } from '../Components/styled/styledComponent';
import ProfileContent from '../Content/profile';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

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
