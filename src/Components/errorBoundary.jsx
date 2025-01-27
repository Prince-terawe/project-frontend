import React, { Component } from 'react';
import PropTypes from 'prop-types'; // For prop types validation
import { Container, Typography, Button, Box } from '@mui/material'; // Import MUI components

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    // No need to use 'error' here if you're not utilizing it.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Logging the error
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm">
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h4" color="error">
              Something went wrong.
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {this.state.error?.message || 'An unexpected error has occurred.'}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </Button>
          </Box>
        </Container>
      );
    }

    return this.props.children; // Render children as expected
  }
}

// PropTypes validation for 'children' prop
ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
