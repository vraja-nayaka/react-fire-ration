import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { FirebaseAppProvider } from 'reactfire';
import { firebaseConfig } from './firebaseConfig';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          {/* <SuspenseWithPerf
            fallback={<LoadingScreen />}
            traceId={'connecting-to-firebase'}
          > */}
          <App />
          {/* </SuspenseWithPerf> */}
        </FirebaseAppProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
