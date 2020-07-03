import {
  useFirestoreDocData,
  useUser,
  useFirestore,
  SuspenseWithPerf,
  useFirestoreCollection,
} from 'reactfire';
import React, { useEffect } from 'react';
import { Grid, Box } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { firestore, User } from 'firebase';
import FriendCard from '../../components/FriendCard';
import Habits from '../../../components/Habits';
import { IHabit, IProfile } from '../../../profile/typings';

const DEFAULT_IMAGE_PATH = 'userPhotos/default.jpg';

const ProfilePage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const user: User = useUser();
  const userDetailsRef = useFirestore()
    .collection('users')
    .doc(user.uid);
  const habitsRef = useFirestore()
    .collection('habits');

  const habits: IHabit[] = [];
  const { name = '', avatar = DEFAULT_IMAGE_PATH, experience = 0, userId } = useFirestoreDocData(userDetailsRef);
  useFirestoreCollection(habitsRef.where('userId', '==', user.uid).where('status', '==', 'active')).forEach((doc: firestore.DocumentData) => {
    habits.push({ ...doc.data(), id: doc.id })
  });

  return (
      <Grid container>
        <Grid item xs={12}>
          <FriendCard name={name} avatar={avatar} level={'1'} userId={userId} />
        </Grid>
        <Grid item xs={12}>
          <Habits habits={habits} />
        </Grid>
      </Grid>
  );
};

const ProfilePageContainer = () => <SuspenseWithPerf fallback={'loading profile...'} traceId={'load-profile'}><ProfilePage /></SuspenseWithPerf>;

export default ProfilePageContainer;
