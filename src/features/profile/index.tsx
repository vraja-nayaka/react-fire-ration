import {
  useFirestoreDocData,
  useUser,
  useFirestore,
  SuspenseWithPerf,
  useFirestoreCollectionData,
} from 'reactfire';
import React from 'react';
import { Grid } from '@material-ui/core';
import StatsValues from './components/StatsValues';
import AddHabit from './components/AddHabit';
import ProfileCard from './components/ProfileCard';
import FixingProbability from './components/FixingProbability';
import Habits from './components/Habits';
import EditProfileDialog from './components/EditProfile';
import { IProfile, IHabit, ITime } from './typings';
import { useSnackbar } from 'notistack';

const DEFAULT_IMAGE_PATH = 'userPhotos/default.jpg';

const ProfilePage = () => {
  const [isOpenEdit, setIsOpenEdit] = React.useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const user: any = useUser();
  const userDetailsRef = useFirestore()
    .collection('users')
    .doc(user.uid);
  const habitsRef = useFirestore()
    .collection('habits');
    
  const { name = '', avatar = DEFAULT_IMAGE_PATH, experience = 0 } = useFirestoreDocData(userDetailsRef);

  const habits = useFirestoreCollectionData<IHabit<ITime>>(habitsRef.where("userId", "==", user.uid));

  const editProfile = (data: Partial<IProfile>) => userDetailsRef.set(data, { merge: true })
    .then(() => enqueueSnackbar('Информация сохранена', { variant: 'success' }))
    .catch((error) => enqueueSnackbar('Произошла ошибка при сохранении: ' + error, { variant: 'error' }));

  const addHabit = (data: IHabit<Date>) => habitsRef.add({...data, userId: user.uid})
    .then(() => enqueueSnackbar('Информация сохранена', { variant: 'success' }))
    .catch((error) => enqueueSnackbar('Произошла ошибка при сохранении: ' + error, { variant: 'error' }));

  if (!name) {
    setIsOpenEdit(true);
  }

  const [summ, average, inSuccession] = [22, 2, 1];

  console.log({ name, avatar, experience});

  return (
    <>
      <Grid container>
        <Grid item xs={3}>
          <ProfileCard name={name} avatar={avatar} experience={experience} setIsOpenEdit={setIsOpenEdit}/>
        </Grid>
        <Grid item xs={3}>

        </Grid>
        <Grid item xs={8}>
          <Habits habits={habits} />
        </Grid>
        <Grid item xs={4}>
          <StatsValues summ={summ} average={average} inSuccession={inSuccession} />
        </Grid>
        <Grid item xs={4}>
          Сферы
      </Grid>
        <Grid item xs={4}>
          <AddHabit addHabit={addHabit}/>
        </Grid>
        <Grid item xs={4}>
          <FixingProbability probability={20} />
        </Grid>
      </Grid>
      <EditProfileDialog isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} name={name} avatar={avatar} editProfile={editProfile} />
    </>
  );
}

const ProfilePageContainer = () => <SuspenseWithPerf fallback={'loading profile...'} traceId={'load-profile'}><ProfilePage /></SuspenseWithPerf>

export default ProfilePageContainer;
