import { SuspenseWithPerf } from 'reactfire';
import React from 'react';
import { Grid } from '@material-ui/core';
import FriendCard from 'features/components/FriendCard';
import Habits from 'features/components/Habits';
import LoadingScreen from 'features/components/LoadingScreen';
import { api } from 'api';

const FriendsViewPage = () => {
  const { name, avatar, id, experience, lastOnlineTime } = api.useUser();
  const { habits, editHabit } = api.useHabits();

  return (
    <Grid container>
      <Grid item xs={12}>
        <FriendCard name={name} avatar={avatar} experience={experience} lastOnlineTime={lastOnlineTime} userId={id} />
      </Grid>
      <Grid item xs={12}>
        <Habits habits={habits} editHabit={editHabit} />
      </Grid>
    </Grid>
  );
};

const FriendsViewPageContainer = () => <SuspenseWithPerf fallback={<LoadingScreen />} traceId={'load-FriendsViewPage'}><FriendsViewPage /></SuspenseWithPerf>;

export default FriendsViewPageContainer;
