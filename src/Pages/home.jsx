import React from 'react';
import HomeContent from '../Content/home';
import Layout from '../Layout/index';
import { Typography } from '@mui/material';

const Home = () => {
  return (
    <Layout>
      <Typography variant="h4">{HomeContent.description}</Typography>
    </Layout>
  );
};

export default Home;
