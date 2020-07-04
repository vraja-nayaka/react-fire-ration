import {
  useFirestoreDocData,
  useUser,
  useFirestore,
  SuspenseWithPerf,
  useFirestoreCollection,
} from 'reactfire';
import React, { useEffect } from 'react';
import { Grid, Box } from '@material-ui/core';
import StatsValues from '../components/StatsValues';
import AddHabit from '../components/AddHabit';
import ProfileCard from '../components/ProfileCard';
import FixingProbability from '../components/FixingProbability';
import Habits from '../components/Habits';
import EditProfileDialog from '../components/EditProfile';
import { IProfile, IHabit } from './typings';
import { useSnackbar } from 'notistack';
import { firestore, User } from 'firebase';

const DEFAULT_IMAGE_PATH = 'userPhotos/default.jpg';

const ProfilePage = () => {
  const [isOpenEdit, setIsOpenEdit] = React.useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const user: User = useUser();
  const userDetailsRef = useFirestore()
    .collection('users')
    .doc(user.uid);
  const habitsRef = useFirestore()
    .collection('habits');

  const habits: IHabit[] = [];
  const { name = '', avatar = DEFAULT_IMAGE_PATH, experience = 0 } = useFirestoreDocData(userDetailsRef);
  useFirestoreCollection(habitsRef.where('userId', '==', user.uid).where('status', '==', 'active')).forEach((doc: firestore.DocumentData) => {
    habits.push({ ...doc.data(), id: doc.id })
  });

  const editProfile = (data: Partial<IProfile>) => userDetailsRef.set({...data, userId: user.uid}, { merge: true })
    .then(() => enqueueSnackbar('Информация сохранена', { variant: 'success' }))
    .catch((error) => enqueueSnackbar('Произошла ошибка при сохранении: ' + error, { variant: 'error' }));

  const addHabit = (data: IHabit) => habitsRef.add({ ...data, userId: user.uid })
    .then(() => enqueueSnackbar('Информация сохранена', { variant: 'success' }))
    .catch((error) => enqueueSnackbar('Произошла ошибка при сохранении: ' + error, { variant: 'error' }));

  const editHabit = (data: IHabit) => habitsRef.doc(data.id).set(data, { merge: true })
    .then(() => enqueueSnackbar('Информация сохранена', { variant: 'success' }))
    .catch((error) => enqueueSnackbar('Произошла ошибка при сохранении: ' + error, { variant: 'error' }));

  useEffect(() => {
    if (name === '') {
      setIsOpenEdit(true);
    }
  }, [name]);

  const [summ, average, inSuccession] = [22, 2, 1];

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <ProfileCard name={name} avatar={avatar} experience={experience} setIsOpenEdit={setIsOpenEdit} />
        </Grid>
        <Grid item xs={12}>
          <Habits habits={habits} editHabit={editHabit} />
        </Grid>
        {/* <Grid item xs={12}>
          <StatsValues summ={summ} average={average} inSuccession={inSuccession} />
        </Grid> */}
        {/* <Grid item xs={4}>
          Сферы
      </Grid> */}
        <Grid item xs={12}>
          <Box alignContent="center" alignItems="center" justifyContent="center">
          <AddHabit addHabit={addHabit} />
          </Box>
        </Grid>
        {/* <Grid item xs={4}>
          <FixingProbability probability={20} />
        </Grid> */}
      </Grid>
      <EditProfileDialog isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} name={name} avatar={avatar} editProfile={editProfile} />
    </>
  );
}

const ProfilePageContainer = () => <SuspenseWithPerf fallback={'loading profile...'} traceId={'load-profile'}><ProfilePage /></SuspenseWithPerf>

export default ProfilePageContainer;
