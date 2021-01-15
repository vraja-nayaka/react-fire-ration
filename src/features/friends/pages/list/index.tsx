import React, { useState } from 'react';
import { SuspenseWithPerf } from 'reactfire';
import { Box, Grid, Paper, Typography, List, Tabs, Tab } from '@material-ui/core';
import FriendCard from 'features/components/FriendCard';
import LoadingScreen from 'features/components/LoadingScreen';
import { useHistory } from 'react-router-dom';
import { api } from 'api';

const FriendsPage = () => {
  const history = useHistory();
  const { friendUsers, otherUsers, subscribeUser, unsubscribeUser } = api.useUsers();

  const [value, setValue] = useState(0);

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }

  return (
    <Paper>
      <Grid container >
        <Grid item xs={12}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Подписки" />
            <Tab label="Все пользователи" />
          </Tabs>
        </Grid>

        {/* <Typography align="center" variant="h6">Друзья</Typography> */}
        <Grid item xs={12}>
          <Box minHeight="calc(100vh - 180px)">
            {value === 0 && friendUsers.length !== 0
              ? friendUsers.map((user) => (
                <List key={user.userId}>
                  <FriendCard {...user} unsubscribeUser={unsubscribeUser} onClick={() => history.push(`/friends/${user.userId}`)} />
                </List>
              ))
              : <Typography align="center">Нажмите "+", чтобы подписаться</Typography>
            }
            {value === 1 && otherUsers.map((user) => (
              <List key={user.userId}>
                <FriendCard {...user} subscribeUser={subscribeUser} onClick={() => history.push(`/friends/${user.userId}`)} />
              </List>
            ))
            }
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

const FriendsPageContainer = () => <SuspenseWithPerf fallback={<LoadingScreen />} traceId={'load-profile'}><FriendsPage /></SuspenseWithPerf>;

export default FriendsPageContainer;
