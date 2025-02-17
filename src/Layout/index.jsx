import React, { useState } from 'react';
import {
  BoxContainer,
  ContentContainer,
  MainContainer,
} from '../Components/styled/styledComponent';
import HeaderBar from '../Components/headerBar';
import PropTypes from 'prop-types';
import SideNav from '../Components/sideNav';

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };
  return (
    <MainContainer>
      <HeaderBar toggleMenu={toggleMenu} />
      <ContentContainer>
        <SideNav collapsed={collapsed} />
        <BoxContainer collapsed={collapsed}>{children}</BoxContainer>
      </ContentContainer>
    </MainContainer>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
