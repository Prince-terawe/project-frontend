import React from 'react';
import {
  BoxContainer,
  MainContainer,
} from '../Components/styled/styledComponent';
import HeaderBar from '../Components/headerBar';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <MainContainer>
      <HeaderBar />
      <BoxContainer>{children}</BoxContainer>
    </MainContainer>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
