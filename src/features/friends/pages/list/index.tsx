import React, { useState } from 'react';
import { SuspenseWithPerf } from 'reactfire';
import { useHistory } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { Box, Grid, Paper, Typography, List, Tabs, Tab } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import FriendCard from 'features/components/FriendCard';
import LoadingScreen from 'features/components/LoadingScreen';
import { api } from 'api';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box height="calc(100vh - 180px)"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const FriendsPage = () => {
  const history = useHistory();
  const theme = useTheme();
  const { friendUsers, otherUsers, subscribeUser, unsubscribeUser } = api.useUsers();

  const [value, setValue] = useState(0);

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

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
            <Tab label="Подписки" {...a11yProps(0)} />
            <Tab label="Все пользователи" {...a11yProps(1)} />
          </Tabs>
        </Grid>
        <Grid item xs={12}>

          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              {friendUsers.length !== 0
                ? friendUsers.map((user) => (
                  <List key={user.userId}>
                    <FriendCard {...user} unsubscribeUser={unsubscribeUser} onClick={() => history.push(`/friends/${user.userId}`)} />
                  </List>
                ))
                : <Typography align="center">Нажмите "+", чтобы подписаться</Typography>
              }
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              {otherUsers.map((user) => (
                <List key={user.userId}>
                  <FriendCard {...user} subscribeUser={subscribeUser} onClick={() => history.push(`/friends/${user.userId}`)} />
                </List>
              ))}
            </TabPanel>
          </SwipeableViews>
        </Grid>
      </Grid>
    </Paper>
  );
};

const FriendsPageContainer = () => <SuspenseWithPerf fallback={<LoadingScreen />} traceId={'load-profile'}><FriendsPage /></SuspenseWithPerf>;

export default FriendsPageContainer;
