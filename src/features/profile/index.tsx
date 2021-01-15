import {
  SuspenseWithPerf,
} from 'reactfire';
import React from 'react';
import { Grid, Box } from '@material-ui/core';
// import StatsValues from '../components/StatsValues';
import AddHabit from 'features/components/AddHabit';
// import FixingProbability from '../components/FixingProbability';
import Habits from 'features/components/Habits';
import LoadingScreen from 'features/components/LoadingScreen';

import { api } from 'api';

const ProfilePage = () => {
  const { habits, addHabit, editHabit } = api.useHabits(true);
  // const [summ, average, inSuccession] = [22, 2, 1];

  return (
    <Grid container>
      <Grid item xs={12}>
        <Habits habits={habits} editHabit={editHabit} isOwn />
      </Grid>
      {/* <Grid item xs={12}>
          <StatsValues summ={summ} average={average} inSuccession={inSuccession} />
        </Grid> */}
      <Grid item xs={12}>
        <Box alignContent="center" alignItems="center" justifyContent="center">
          <AddHabit addHabit={addHabit} />
        </Box>
      </Grid>
      {/* <Grid item xs={4}>
          <FixingProbability probability={20} />
        </Grid> */}
    </Grid>
  );
}

const ProfilePageContainer = () => <SuspenseWithPerf fallback={<LoadingScreen />} traceId={'load-profile'}><ProfilePage /></SuspenseWithPerf>

export default ProfilePageContainer;
