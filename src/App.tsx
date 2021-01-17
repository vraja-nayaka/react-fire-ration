import React from 'react';
import { AuthCheck } from 'reactfire';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import 'moment/locale/ru';

import ProfilePage from './features/profile';
import { Collections } from './features/collections';
import { LoginPage } from './features/loginization/login';
import { NotFoundPage } from './features/notFound';
import { Navbar } from './features/navbar';
import Header from './features/header';
import { CreateUserPage } from './features/loginization/signup';
import FriendsPage from './features/friends/pages/list';
import FriendsViewPage from './features/friends/pages/view';
import Layout from './features/components/Layout/Layout';
import { MyPageViewLogger } from './features/viewLogger';
import { getSwipeableIndexByPath, pathsKeys } from 'helpers/getSwipeablePath';

function App() {
  const location = useLocation();
  const history = useHistory();

  const handleChangeIndex = (index: number) => {
    history.push(pathsKeys[index]);
  };

  const currentIndex = getSwipeableIndexByPath(location.pathname);

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
              <SwipeableViews index={currentIndex} onChangeIndex={handleChangeIndex}>
                <Route path="/profile" children={<ProfilePage />} />
                <Route exact path="/friends" children={<FriendsPage />} />
              </SwipeableViews>
              <Route exact path="/friends/:id" children={<FriendsViewPage />} />
              <Route exact path="/collections" children={<Collections />} />
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
