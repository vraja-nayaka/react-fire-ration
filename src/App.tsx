import React from 'react';
import ProfilePage from './features/profile';
import { Collections } from './features/collections';
import { LoginPage } from './features/loginization/login';
import { AuthCheck, SuspenseWithPerf } from 'reactfire';
import { NotFoundPage } from './features/notFound';
import { MyPageViewLogger } from './features/viewLogger';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Navbar } from './features/navbar';
import { Grid, Container, CssBaseline, Box } from '@material-ui/core';
import Header from './features/header';
import { CreateUserPage } from './features/loginization/signup';
import FriendsPage from './features/friends/pages/list';
import FriendsViewPage from './features/friends/pages/view';
import LoadingScreen from './features/components/LoadingScreen';

function App() {
  const location = useLocation();

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <SuspenseWithPerf
          fallback={<LoadingScreen />}
          traceId={'connecting-to-firebase'}
        >
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
                  <Route exact path="/signup" children={<CreateUserPage />} />
                  <Route exact path="/login" children={<LoginPage />} />
                  <AuthCheck fallback={<LoginPage />}>
                    <Route exact path="/" children={<ProfilePage />} />
                    <Route path="/profile" children={<ProfilePage />} />
                    <Route exact path="/collections" children={<Collections />} />
                    <Route exact path="/friends/:id" children={<FriendsViewPage />} />
                    <Route exact path="/friends" children={<FriendsPage />} />
                  </AuthCheck>
                  <Route path="*" children={NotFoundPage} />
                </Switch>
              </Box>
            </Grid>
            <MyPageViewLogger location={location} />
          </Grid>
        </SuspenseWithPerf>
      </Container>
    </>
  );
}

export default App;
