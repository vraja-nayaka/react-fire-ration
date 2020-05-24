import {
  useFirestoreDocData,
  useUser,
  useFirestore,
} from 'reactfire';
import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import StatsValues from './components/StatsValues';
import AddHabbit from './components/AddHabbit';
import ProfileCard from './components/ProfileCard';
import FixingProbability from './components/FixingProbability';

const DEFAULT_IMAGE_PATH = 'userPhotos/default.jpg';

export function ProfilePage() {
  // get the current user.
  // this is safe because we've wrapped this component in an `AuthCheck` component.
  const user: any = useUser();
  const userDetailsRef = useFirestore()
    .collection('users')
    .doc(user.uid);
  let { name, avatar, habbits, experience } = useFirestoreDocData(
    userDetailsRef
  );

  // defend against null field(s)
  avatar = avatar || DEFAULT_IMAGE_PATH;
  experience = experience || 0;
  
  if (!name || !avatar) {
    throw new Error('MissingProfileInfoError');
  }
  const [summ, average, inSuccession] = [22, 2, 1];
  
  return (
    <Grid container>
      <Grid item xs={3}>
        <ProfileCard  name={name} avatar={avatar} experience={experience}/>
      </Grid>
      <Grid item xs={3}>

      </Grid>
      <Grid item xs={3}>
        menu
      </Grid>
      <Grid item xs={8}>
        Graph
      </Grid>
      <Grid item xs={4}>
        <StatsValues summ={summ} average={average} inSuccession={inSuccession}/>
      </Grid>
      <Grid item xs={4}>
        Сферы
      </Grid>
      <Grid item xs={4}>
        <AddHabbit />
      </Grid>
      <Grid item xs={4}>
        <FixingProbability probability={20}/>
      </Grid>
    </Grid>
  );
}


