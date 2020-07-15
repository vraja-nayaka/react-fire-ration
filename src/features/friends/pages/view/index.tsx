import {SuspenseWithPerf} from 'reactfire';
import React from 'react';
import { Grid } from '@material-ui/core';
import FriendCard from '../../components/FriendCard';
import Habits from '../../../components/Habits';
import { api } from '../../../../api';

const FriendsViewPage = () => {
  const {name, avatar, id} = api.useUser();
  const habits = api.useHabits();

  return (
      <Grid container>
        <Grid item xs={12}>
          <FriendCard name={name} avatar={avatar} level={'1'} userId={id} />
        </Grid>
        <Grid item xs={12}>
          <Habits habits={habits} />
        </Grid>
      </Grid>
  );
};

const FriendsViewPageContainer = () => <SuspenseWithPerf fallback={'loading Friends View Page...'} traceId={'load-FriendsViewPage'}><FriendsViewPage /></SuspenseWithPerf>;

export default FriendsViewPageContainer;
