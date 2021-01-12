import React, { useEffect } from 'react';
import { useAuth } from 'reactfire';
import { useHistory } from 'react-router-dom';

import { Grid, makeStyles, Theme, createStyles, IconButton, Menu, MenuItem, Box } from '@material-ui/core';
import ProfileCard from 'features/components/ProfileCard';
import EditProfileDialog from '../components/EditProfile';
import { api } from '../../api';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      background: theme.background.gradient1,
    },
  }),
);

const Header = () => {
  const classes = useStyles();
  const auth = useAuth();
  const history = useHistory();
  const [isOpenEdit, setIsOpenEdit] = React.useState<boolean>(false);
  const { isAuth, name, avatar, experience, editProfile, saveAvatar } = api.useUser(true);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (name === '') {
      setIsOpenEdit(true);
    }
  }, [name]);

  const menuItems = [
    {
      label: 'Профиль',
      onClick: () => {
        history.push("/profile");
        handleClose();
      },
    },
    {
      label: 'Выйти',
      onClick: () => {
        auth.signOut();
        handleClose();
      },
    },
  ];

  const menuElements = menuItems.map(({ label, onClick }) => <MenuItem onClick={onClick}>{label}</MenuItem>);

  return (
    <Grid container alignItems="center" justify="space-between" className={classes.container}>
      <Grid item xs={12}>
        {isAuth &&
          <ProfileCard name={name} avatar={avatar} experience={experience}>
            <Box>
              <IconButton onClick={() => setIsOpenEdit(true)}>
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                anchorEl={anchorEl}
                keepMounted
                closeAfterTransition
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {menuElements}
              </Menu>
            </Box>
          </ProfileCard>
        }
      </Grid>
      <EditProfileDialog isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} name={name} avatar={avatar} editProfile={editProfile} saveAvatar={saveAvatar} />
    </Grid>
  );
}

export default Header;
