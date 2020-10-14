import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { FirebaseAppProvider, SuspenseWithPerf } from 'reactfire';
import { firebaseConfig } from './firebaseConfig';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './theme';
import { BrowserRouter as Router } from 'react-router-dom';
import LoadingScreen from './features/components/LoadingScreen';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <SnackbarProvider maxSnack={3}>
          <FirebaseAppProvider firebaseConfig={firebaseConfig}>
            <SuspenseWithPerf
              fallback={<LoadingScreen />}
              traceId={'connecting-to-firebase'}
            >
              <App />
            </SuspenseWithPerf>
          </FirebaseAppProvider>
        </SnackbarProvider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
