import {
  useFirestoreDocData,
  useUser,
  useFirestore,
  SuspenseWithPerf,
  useFirestoreCollectionData,
  useFirestoreCollection,
} from 'reactfire';
import React from 'react';
import { Grid, Paper, Typography, List } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import FriendCard from '../../components/FriendCard';
import { IProfile } from '../../../profile/typings';
import { firestore } from 'firebase';
import { useRouteMatch, useHistory } from 'react-router';

const FriendsPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();


  const user: any = useUser();
  const usersRef = useFirestore()
    .collection('users');
  const userDetailsRef = usersRef.doc(user.uid);

  const { friends = ['none'] } = useFirestoreDocData<IProfile>(userDetailsRef);

  const allUsers = useFirestoreCollectionData<IProfile>(usersRef);

  const friendUsers: IProfile[] = [];
  const otherUsers: IProfile[] = [];
  compareWithSet(allUsers, friends);

  function compareWithSet(rows_1: IProfile[], rows_2: string[]) {
    let set = new Set(rows_2);
    rows_1.forEach(row_1 => {
      set.has(row_1.userId) ? friendUsers.push(row_1) : otherUsers.push(row_1);
    });
  };

  // useFirestoreCollection(usersRef.where('userId', 'in', friends)).forEach((doc: firestore.DocumentData) => {
  //   friendUsers.push({ ...doc.data(), id: doc.id })
  // });

  const subscribeUser = (userId: string) => userDetailsRef.set({ friends: [...friends, userId] }, { merge: true })
    .then(() => enqueueSnackbar('Друг добавлен!', { variant: 'success' }))
    .catch((error) => enqueueSnackbar('Произошла ошибка при добавлении друга ' + error, { variant: 'error' }));

  const unsubscribeUser = (userId: string) => userDetailsRef.set({ friends: friends.splice(friends.indexOf(userId) + 1, 1) }, { merge: true })
    .then(() => enqueueSnackbar('Вы успешно отписались!', { variant: 'success' }))
    .catch((error) => enqueueSnackbar('Произошла ошибка при отписке ' + error, { variant: 'error' }));

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
