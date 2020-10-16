import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { FirebaseAppProvider } from 'reactfire';
import { firebaseConfig } from './firebaseConfig';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './theme';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <SnackbarProvider maxSnack={3}>
          <FirebaseAppProvider firebaseConfig={firebaseConfig}>
              <App />
          </FirebaseAppProvider>
        </SnackbarProvider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
