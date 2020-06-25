import {
  useFirestoreDocData,
  useUser,
  useFirestore,
  SuspenseWithPerf,
  useFirestoreCollection,
  useFirestoreCollectionData,
} from 'reactfire';
import React from 'react';
import { Grid, Paper, Typography, List } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import FriendCard from './components/FriendCard';
import { IProfile } from '../profile/typings';

const DEFAULT_IMAGE_PATH = 'userPhotos/default.jpg';

const FriendsPage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const user: any = useUser();
  const usersRef = useFirestore()
    .collection('users');
  const userDetailsRef = usersRef.doc(user.uid);

  const {friends} = useFirestoreDocData<IProfile>(userDetailsRef);

  const allUsers = useFirestoreCollectionData<IProfile>(usersRef);

  // useFirestoreCollection(usersRef.where('userId', 'in', friends)).forEach((doc: firestore.DocumentData) => {
  //   habits.push({ ...doc.data(), id: doc.id })
  // });

  const editProfile = (data: Partial<IProfile>) => userDetailsRef.set(data, { merge: true })
    .then(() => enqueueSnackbar('Информация сохранена', { variant: 'success' }))
    .catch((error) => enqueueSnackbar('Произошла ошибка при сохранении ' + error, { variant: 'error' }));

  const subscribeUser = (userId: string) => userDetailsRef.set({friends: [...friends, userId]}, { merge: true })
    .then(() => enqueueSnackbar('Друг добавлен!', { variant: 'success' }))
    .catch((error) => enqueueSnackbar('Произошла ошибка при добавлении друга ' + error, { variant: 'error' }));

  const unsubscribeUser = (userId: string) => userDetailsRef.set({friends: friends.splice(friends.indexOf(userId), 1)}, { merge: true })
    .then(() => enqueueSnackbar('Друг добавлен!', { variant: 'success' }))
    .catch((error) => enqueueSnackbar('Произошла ошибка при добавлении друга ' + error, { variant: 'error' }));

  return (
    <Paper>
      <Grid container>
        <Grid item xs={12}>
          <Typography>Друзья</Typography>
        </Grid>
        {
          allUsers.map((user) => (
            <Grid item xs={12}>
              <List>
                <FriendCard {...user} userId={'1256'} level={'14'} subscribeUser={subscribeUser} />
              </List>
            </Grid>
          ))
        }
      </Grid>
    </Paper>
  );
}

const FriendsPageContainer = () => <SuspenseWithPerf fallback={'loading profile...'} traceId={'load-profile'}><FriendsPage /></SuspenseWithPerf>

export default FriendsPageContainer;
