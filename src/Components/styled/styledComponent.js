import { styled } from '@mui/material/styles';
import {
  Box,
  // Button,
  TextField,
  Typography,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  TableContainer,
  TableRow,
  TableCell,
} from '@mui/material';

export const MainContainer = styled(Box)({
  height: '100vh',
  flexGrow: 1,
  // backgroundColor: 'crimson',
});

export const ContentContainer = styled(Box)({
  display: 'flex',
  flexgrow: 1,
  transition: 'margin-left 0.3s ease-in-out',
  marginLeft: `${(props) => (props.collapsed ? '60px' : '180px')}`,
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

export const NavLogoTypo = styled(Typography)({
  flexGrow: 1,
  display: 'flex',
  justifyItems: 'flex-start',
  cursor: 'pointer',
  fontSize: '1.5rem',
  fontWeight: 'bold',
});

export const BoxContainer = styled(Box)({
  // marginTop: '1rem',
  // // width: '100%',
  // // display: 'flex',
  flexGrow: 1,
  transition: 'margin-left 0.3s ease-in-out',
  marginLeft: `${(props) => (props.collapsed ? '60px' : '180px')}`,
  padding: '1rem',
  overflowX: 'hidden',
  overflowY: 'auto',
  height: 'calc(100vh - 96px)',
});

export const NavIconButton = styled(Typography)({
  color: 'inherit',
  display: 'flex',
  justifyItems: 'flex-start',
  cursor: 'pointer',
  fontSize: '2rem',
  fontWeight: 'bold',
  marginRight: 8,
});

export const StyledDrawer = styled(Drawer)(({ theme, open }) => ({
  width: open ? '180px' : '60px',
  flexShrink: 0,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  '& .MuiPaper-root': {
    position: 'relative', // Override the default 'fixed'
    height: 'calc(100vh - 64px)', // Keep full height
    width: open ? '180px' : '60px', // Syncing width with state
    borderWidth: 0,
    backgroundColor: '#7e57c2',
    borderRadius: '0px',
  },
}));

export const StyledName = styled(Typography)({
  marginTop: '1.2rem',
  marginBottom: '1.2rem',
  color: 'whitesmoke',
  textAlign: 'center',
});

export const NameLogo = styled(Typography)({
  margin: '14px',
  color: 'whitesmoke',
  borderRadius: '50%',
  backgroundColor: '#00695c',
  height: 32,
  width: 32,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const StyledList = styled(List)({
  color: 'whitesmoke',
});

export const StyledListItemIcon = styled(ListItemIcon)({
  color: 'whitesmoke',
  minWidth: '40px',
});

export const StyledListItemText = styled(ListItemText)({
  color: 'whitesmoke',
  '& .MuiTypography-root': {
    color: 'whitesmoke',
  },
});

export const TableBox = styled(Box)({
  marginTop: -20,
});

export const StyledTableContainer = styled(TableContainer)({
  marginBottom: '1rem',
  marginTop: '0.5rem',
});

export const HeaderRow = styled(TableRow)({
  backgroundColor: '#7e57c2',
});

export const BodyRow = styled(TableRow)({
  // backgroundColor: '#f5f5f5',
});

export const HeaderCell = styled(TableCell)({
  color: 'Whitesmoke',
  fontWeight: 'bold',
  textAlign: 'justify',
});

export const BodyCell = styled(TableCell)({
  fontWeight: 'bold',
});

export const NotFoundCell = styled(TableCell)({
  textAlign: 'center',
});

export const PaginationContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const TotalCount = styled(Typography)({
  marginRight: '1rem',
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: -2,
  paddingRight: 2,
});
