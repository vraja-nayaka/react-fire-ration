import React from 'react';
import './App.css';
import ProfilePage from './features/profile';
import { Collections } from './features/collections';
import { LoginPage } from './features/loginization/login';
import { AuthCheck, SuspenseWithPerf } from 'reactfire';
import { NotFoundPage } from './features/notFound';
import { MyPageViewLogger } from './features/viewLogger';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history'
import { Navbar } from './features/navbar';
import { Grid, Container, CssBaseline, Box } from '@material-ui/core';
import Header from './features/header';
import { CreateUserPage } from './features/loginization/signup';
import FriendsPage from './features/friends/pages/list';
import FriendsViewPage from './features/friends/pages/view';
import LoadingScreen from './features/components/LoadingScreen';

function App() {
  const history = createBrowserHistory();

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <SuspenseWithPerf
          fallback={<LoadingScreen />}
          traceId={'connecting-to-firebase'}
        >
          <Router history={history}>
            <Grid container>
              <Grid item xs={12}>
                <Header />
              </Grid>
              <Grid item xs={12} md={12}>
                <Navbar />
              </Grid>
              <Grid item xs={12} md={12}>
                <Box minHeight="85vh" bgcolor="#CCC" display="flex" alignItems="center" justifyContent="center">
                  <Switch>
                    <Route exact path="/signup" component={CreateUserPage} />
                    <Route exact path="/login" component={LoginPage} />
                    <AuthCheck fallback={<LoginPage />}>
                      <Route exact path="/" component={ProfilePage} />
                      <Route path="/profile" component={ProfilePage} />
                      <Route exact path="/collections" component={Collections} />
                      <Route exact path="/friends/:id" component={FriendsViewPage} />
                      <Route exact path="/friends" component={FriendsPage} />
                    </AuthCheck>
                    <Route component={NotFoundPage} />
                  </Switch>
                </Box>
              </Grid>
              <MyPageViewLogger location={history.location} />
            </Grid>
          </Router>
        </SuspenseWithPerf>
      </Container>
    </>
  );
}

export default App;
