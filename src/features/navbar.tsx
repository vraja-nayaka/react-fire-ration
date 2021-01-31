import React, { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import AccountIcon from "@material-ui/icons/AccountCircleSharp";
import PeopleIcon from "@material-ui/icons/People";
import { getSwipeableIndexByPath } from "helpers/getSwipeablePath";
import { LinearProgress } from "./components/LinearProgress";
import { api } from "api";
import { getNextLevelExperience } from "helpers/getNextLevelExperience";

function a11yProps(index: string) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
    component: NavLink,
    to: `/${index}`,
  };
}

export const Navbar = () => {
  const location = useLocation();

  const currentIndex = getSwipeableIndexByPath(location.pathname);

  const { experience } = api.useUser(true);
  const { experienceProgress, nextLevelExperience } = useMemo(
    () => getNextLevelExperience(experience),
    [experience]
  );

  return (
    <>
      <LinearProgress
        percent={experienceProgress}
        current={experience}
        next={nextLevelExperience}
      />
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
          {...a11yProps("profile")}
        />
        <BottomNavigationAction
          label="Friends"
          icon={<PeopleIcon />}
          {...a11yProps("friends")}
        />
      </BottomNavigation>
    </>
  );
};
