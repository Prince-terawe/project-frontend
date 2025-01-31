import { createTheme } from '@mui/material/styles';
import { deepPurple, green, grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[500],
    },
    secondary: {
      main: green[500],
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '5rem',
      fontWeight: 'bold',
    },
    h4: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: grey[600],
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 'semibold',
      color: grey[600],
    },
    h6: {
      color: 'whitesmoke',
      fontSize: '1rem',
      fontWeight: 'semibold',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 'bold',
      color: grey[600],
    },
    body2: {
      color: 'whitesmoke',
    },
  },
});

export default theme;
