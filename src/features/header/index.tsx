import React, { useEffect } from 'react';

import { Grid, makeStyles, Theme, createStyles, AppBar, Toolbar, Typography } from '@material-ui/core';
import EditProfileDialog from 'features/components/EditProfile';
import { SwipeableDrawer } from 'features/components/SwipeableDrawer';
import { api } from 'api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      background: theme.palette.primary.main,
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const Header = () => {
  const classes = useStyles();
  const [isOpenEdit, setIsOpenEdit] = React.useState<boolean>(false);
  const { isAuth, name, avatar, editProfile, saveAvatar } = api.useUser(true);

  useEffect(() => {
    if (name === '') {
      setIsOpenEdit(true);
    }
  }, [name]);

  return (
    <Grid container alignItems="center" justify="space-between" className={classes.container}>
      <Grid item xs={12}>
        {isAuth &&
          <AppBar position="fixed" >
            <Toolbar>
              <SwipeableDrawer setIsOpenEdit={setIsOpenEdit} />
              <Typography variant="h6" className={classes.title}>
                TeamHabit
              </Typography>
            </Toolbar>
          </AppBar>
        }
      </Grid>
      <EditProfileDialog isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} name={name} avatar={avatar} editProfile={editProfile} saveAvatar={saveAvatar} />
    </Grid>
  );
}

export default Header;
