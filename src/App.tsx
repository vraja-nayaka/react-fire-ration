import React from 'react';
import ProfilePage from './features/profile';
import { Collections } from './features/collections';
import { LoginPage } from './features/loginization/login';
import { AuthCheck } from 'reactfire';
import { NotFoundPage } from './features/notFound';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Navbar } from './features/navbar';
import Header from './features/header';
import { CreateUserPage } from './features/loginization/signup';
import FriendsPage from './features/friends/pages/list';
import FriendsViewPage from './features/friends/pages/view';
import Layout from './features/components/Layout/Layout';
import { MyPageViewLogger } from './features/viewLogger';

function App() {
  const location = useLocation();

  return (
    <Layout
      header={<Header />}
      navbar={<Navbar />}
      content={
        <>
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
          <MyPageViewLogger location={location} />
        </>
      }
    />
  );
}

export default App;
