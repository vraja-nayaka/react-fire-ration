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
import { useRouteMatch, useParams  } from 'react-router';

const DEFAULT_IMAGE_PATH = 'userPhotos/default.jpg';

const FriendsViewPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const {id} = useParams<{id: string}>()

  const user: User = useUser();
  const userDetailsRef = useFirestore()
    .collection('users')
    .doc(id);
  const habitsRef = useFirestore()
    .collection('habits');

  const habits: IHabit[] = [];
  const { name = '', avatar = DEFAULT_IMAGE_PATH, experience = 0 } = useFirestoreDocData(userDetailsRef);
  useFirestoreCollection(habitsRef.where('userId', '==', id).where('status', '==', 'active')).forEach((doc: firestore.DocumentData) => {
    habits.push({ ...doc.data(), id: doc.id })
  });

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
