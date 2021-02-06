import { SuspenseWithPerf } from "reactfire";
import React from "react";
import { Box } from "@material-ui/core";
import AddHabit from "features/components/AddHabit";
import Habits from "features/components/Habits";
import LoadingScreen from "features/components/LoadingScreen";

import { api } from "api";

const ProfilePage = () => {
  const { habits, addHabit, editHabit } = api.useHabits(true);

  return (
    <Box>
      <Box>
        <Habits habits={habits} editHabit={editHabit} isOwn />
      </Box>
      <Box alignContent="center" alignItems="center" justifyContent="center">
        <AddHabit addHabit={addHabit} />
      </Box>
    </Box>
  );
};

const ProfilePageContainer = () => (
  <SuspenseWithPerf fallback={<LoadingScreen />} traceId={"load-profile"}>
    <ProfilePage />
  </SuspenseWithPerf>
);

export default ProfilePageContainer;
