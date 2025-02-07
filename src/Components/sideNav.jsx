import React from 'react';
import { ListItem, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PropTypes from 'prop-types';
import Groups2Icon from '@mui/icons-material/Groups2';
import { useNavigate } from 'react-router-dom';
import {
  StyledDrawer,
  StyledList,
  NameLogo,
  StyledListItemIcon,
  StyledListItemText,
  StyledName,
} from './styled/styledComponent';

const SideNav = ({ collapsed, user }) => {
  const navigate = useNavigate();

  return (
    <StyledDrawer variant="permanent" open={!collapsed}>
      {!collapsed && <StyledName variant="h5">{user.name}</StyledName>}
      {collapsed && <NameLogo>{user.name?.slice(0, 2).toUpperCase()}</NameLogo>}
      <Divider />
      <StyledList>
        <ListItem button onClick={() => navigate('/')}>
          <StyledListItemIcon>
            <HomeIcon />
          </StyledListItemIcon>
          {!collapsed && <StyledListItemText primary="Home" />}
        </ListItem>
        <ListItem button onClick={() => navigate('/all_users')}>
          <StyledListItemIcon>
            <Groups2Icon />
          </StyledListItemIcon>
          {!collapsed && <StyledListItemText primary="User List" />}
        </ListItem>
      </StyledList>
    </StyledDrawer>
  );
};

SideNav.propTypes = {
  collapsed: PropTypes.bool.isRequired, // Validate that collapsed is a boolean
  user: PropTypes.object.isRequired, // Validate that user is an object
};

export default SideNav;
