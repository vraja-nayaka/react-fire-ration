import React from 'react';
import { useAuth } from 'reactfire';
import { useHistory } from 'react-router-dom';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MaterialSwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import EditIcon from '@material-ui/icons/Edit';
import PetsIcon from '@material-ui/icons/Pets';

import ProfileCard from 'features/components/ProfileCard';
import { api } from 'api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 250,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }),
);

interface Props {
  setIsOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SwipeableDrawer = ({setIsOpenEdit}: Props) => {
  const classes = useStyles();
  const { name, avatar, experience} = api.useUser(true);
  const auth = useAuth();
  const history = useHistory();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsOpen(open);
  };

  const menuItems = [
    {
      label: 'Профиль',
      onClick: () => {
        history.push("/profile");
      },
      icon: <AccountCircleIcon/>,
    },
    {
      label: 'Выйти',
      onClick: () => {
        auth.signOut();
      },
      icon: <PetsIcon />
    },
  ];

  const list = (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <ProfileCard name={name} avatar={avatar} experience={experience} />
      <List>
          <ListItem button onClick={() => setIsOpenEdit(true)}>
            <ListItemIcon><EditIcon /></ListItemIcon>
            <ListItemText primary="О себе" />
          </ListItem>
      </List>
      <Divider />
      <List>
        {menuItems.map(({label, icon, onClick}) => (
          <ListItem button key={label} onClick={onClick}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} className={classes.menuButton}>
        <MenuIcon />
      </IconButton>
      <MaterialSwipeableDrawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list}
      </MaterialSwipeableDrawer>
    </>
  );
};
