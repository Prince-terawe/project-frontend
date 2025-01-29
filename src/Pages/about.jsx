import React from 'react';
import AboutContent from '../Content/about';
import Layout from '../Layout/index';
import { Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import { BoxContainer } from '../Components/styled/styledComponent';
import { styled } from '@mui/material/styles';

const SectionContainer = styled(BoxContainer)({
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  marginLeft: '5rem',
  marginTop: '1rem',
});

const TitleWithListContainer = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  width: '100%',
});

const StyledList = styled(List)({
  paddingLeft: '1rem',
});

const StyledListItem = styled(ListItem)({
  paddingTop: 0,
  paddingBottom: 0,
});

const About = () => {
  return (
    <Layout>
      <Typography variant="h4">{AboutContent.description1}</Typography>
      <Typography variant="body1">{AboutContent.description2}</Typography>
      <BoxContainer>
        {Object.entries(AboutContent.technology).map(([key, section]) => (
          <SectionContainer key={key}>
            <TitleWithListContainer>
              <Typography variant="h5">{section.title}</Typography>
            </TitleWithListContainer>
            <StyledList>
              {Object.values(section.item).map((tech, index) => (
                <StyledListItem key={index}>
                  <ListItemText primary={tech} />
                </StyledListItem>
              ))}
            </StyledList>
          </SectionContainer>
        ))}
      </BoxContainer>
    </Layout>
  );
};

export default About;
