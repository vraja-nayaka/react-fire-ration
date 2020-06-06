import React from 'react';
import './App.css';
import ProfilePage from './features/profile';
import { Collections } from './features/collections';
import { HomePage } from './features/home';
import { LoginPage, CreateUserPage } from './features/login';
import { AuthCheck } from 'reactfire';
import { NotFoundPage } from './features/notFound';
import { MyPageViewLogger } from './features/viewLogger';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history'
import { Navbar } from './features/navbar';
import { Grid, Container, CssBaseline, Typography, Box } from '@material-ui/core';
import Header from './features/header';

function App() {
  const history = createBrowserHistory();

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Router history={history}>
          <Grid container>
            <Grid item xs={12}>
              <Header />
            </Grid>
            <Grid item>
              <Navbar />
            </Grid>
            <Grid item>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/signup" component={CreateUserPage} />
                <Route exact path="/login" component={LoginPage} />
                <AuthCheck fallback={<LoginPage />}>
                  <Route exact path="/profile" component={ProfilePage} />
                  <Route exact path="/collections" component={Collections} />
                </AuthCheck>
                <Route component={NotFoundPage} />
              </Switch>
            </Grid>
            <MyPageViewLogger location={history.location} />
          </Grid>
        </Router>
      </Container>
    </>
  );
}

export default App;
