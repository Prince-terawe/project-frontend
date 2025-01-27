import { styled } from '@mui/material/styles';
import { Box, TextField } from '@mui/material';

export const MainContainer = styled(Box)({
  height: 'auto',
  // backgroundColor: 'crimson',
});

export const FormContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '2rem',
});

export const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '30%',
});

export const StyledTextField = styled(TextField)({
  '& .MuiFilledInput-root': {
    backgroundColor: '#f5f5f5',
    '&:hover': {
      backgroundColor: '#e8e8e8',
    },
  },
});

export const NotFoundContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  textAlign: 'center',
  backgroundColor: '#f4f4f4',
});
