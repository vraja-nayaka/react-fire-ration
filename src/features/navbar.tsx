import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import AccountIcon from '@material-ui/icons/AccountCircleSharp';
import PeopleIcon from '@material-ui/icons/People';
import { getSwipeableIndexByPath } from 'helpers/getSwipeablePath';

function a11yProps(index: string) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
    component: NavLink,
    to: `/${index}`,
  };
}

export const Navbar = () => {
  const location = useLocation();

  const currentIndex = getSwipeableIndexByPath(location.pathname);

  return (
    <BottomNavigation
      value={currentIndex}
      // onChange={(event, newValue) => {
      //   setValue(newValue);
      // }}
      showLabels
    >
      <BottomNavigationAction
        label="Profile"
        icon={<AccountIcon />}
        {...a11yProps('profile')}
      />
      <BottomNavigationAction
        label="Friends"
        icon={<PeopleIcon />}
        {...a11yProps('friends')}
      />
    </BottomNavigation>
  );
};
