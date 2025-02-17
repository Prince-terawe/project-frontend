import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorBoundary from './Components/errorBoundary';
import { ThemeProvider } from '@mui/material/styles';
import theme from './Theme/theme';
import { Provider } from 'react-redux';
import { store, persistor } from './Redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </ThemeProvider>
  </React.StrictMode>
);
