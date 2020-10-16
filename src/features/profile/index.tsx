import {
  SuspenseWithPerf,
} from 'reactfire';
import React, { useEffect } from 'react';
import { Grid, Box, IconButton } from '@material-ui/core';
// import StatsValues from '../components/StatsValues';
import AddHabit from '../components/AddHabit';
import ProfileCard from '../components/ProfileCard';
// import FixingProbability from '../components/FixingProbability';
import Habits from '../components/Habits';
import EditProfileDialog from '../components/EditProfile';
import EditIcon from '@material-ui/icons/Edit';
import { api } from '../../api';

const ProfilePage = () => {
  const [isOpenEdit, setIsOpenEdit] = React.useState<boolean>(false);
  const { habits, addHabit, editHabit } = api.useHabits(true);
  const { name, avatar, experience, editProfile, saveAvatar } = api.useUser(true);

  useEffect(() => {
    if (name === '') {
      setIsOpenEdit(true);
    }
  }, [name]);

  // const [summ, average, inSuccession] = [22, 2, 1];

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <ProfileCard name={name} avatar={avatar} experience={experience}>
            <IconButton onClick={() => setIsOpenEdit(true)}>
              <EditIcon />
            </IconButton>
          </ProfileCard>
        </Grid>
        <Grid item xs={12}>
          <Habits habits={habits} editHabit={editHabit} isOwn/>
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
      <EditProfileDialog isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} name={name} avatar={avatar} editProfile={editProfile} saveAvatar={saveAvatar} />
    </>
  );
}

const ProfilePageContainer = () => <SuspenseWithPerf fallback={'loading profile...'} traceId={'load-profile'}><ProfilePage /></SuspenseWithPerf>

export default ProfilePageContainer;
