import {SuspenseWithPerf} from 'reactfire';
import React from 'react';
import { Grid, Paper, Typography, List } from '@material-ui/core';
import FriendCard from '../../components/FriendCard';
import { useHistory } from 'react-router-dom';
import { api } from '../../../../api';

const FriendsPage = () => {
  const history = useHistory();

  const { friendUsers, otherUsers, subscribeUser, unsubscribeUser } = api.useUsers();

  return (
    <Paper>
      <Grid container >
        <Grid item xs={12}>
          <Typography align="center" variant="h6">Друзья</Typography>
        </Grid>
        <Grid item xs={12}>
          {
            friendUsers.length !== 0
              ? friendUsers.map((user) => (
                <List key={user.userId}>
                  <FriendCard {...user} userId={user.userId} level={'1'}
                    unsubscribeUser={unsubscribeUser}
                    onClick={() => history.push(`/friends/${user.userId}`)} />
                </List>
              ))
              : <Typography align="center">Нажмите "+", чтобы добавить друга</Typography>
          }
        </Grid>
        <Grid item xs={12}>
          <Typography align="center" variant="h6">Все пользователи</Typography>
          {
            otherUsers.map((user) => (
              <List key={user.userId}>
                <FriendCard {...user} userId={user.userId} level={'1'} subscribeUser={subscribeUser}
                  onClick={() => history.push(`/friends/${user.userId}`)} />
              </List>
            ))
          }
        </Grid>
      </Grid>
    </Paper>
  );
};

const FriendsPageContainer = () => <SuspenseWithPerf fallback={'loading profile...'} traceId={'load-profile'}><FriendsPage /></SuspenseWithPerf>;

export default FriendsPageContainer;
