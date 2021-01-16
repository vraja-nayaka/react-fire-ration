import React, { useMemo } from 'react';
import { IconButton, ListItem, Avatar, ListItemAvatar, ListItemText, ListItemSecondaryAction, Paper, makeStyles } from '@material-ui/core';
import ControlPointDuplicateIcon from '@material-ui/icons/ControlPointDuplicate';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import { getNextLevelExperience } from 'helpers/getNextLevelExperience';

interface FriendCardProps {
  avatar: string;
  name: string;
  userId: string;
  experience: number;
  subscribeUser?: (id: string) => void;
  unsubscribeUser?: (id: string) => void;
  onClick?: () => void;
}

const useStyles = makeStyles({
  pointer: {
    cursor: (props: boolean) => props ? 'pointer' : 'default',
  },
});

const FriendCard = (props: FriendCardProps) => {
  const { avatar, name, userId, experience, subscribeUser, unsubscribeUser, onClick } = props;
  const classes = useStyles(!!onClick);
  const { level } = useMemo(() => getNextLevelExperience(experience), [experience]);

  return (
    <Paper elevation={3} className={classes.pointer}>
      <ListItem onClick={() => onClick ? onClick() : false}>
        <ListItemAvatar>
          <Avatar src={avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={`Уровень: ${level}, Id: ${userId.substr(-4, 4)}`}
        />
        <ListItemSecondaryAction>
          {
            subscribeUser &&
            <IconButton edge="end" aria-label="subscribe" onClick={() => subscribeUser(userId)}>
              <ControlPointDuplicateIcon />
            </IconButton>
          }
          {
            unsubscribeUser &&
            <IconButton edge="end" aria-label="unsubscribe" onClick={() => unsubscribeUser(userId)}>
              <IndeterminateCheckBoxIcon />
            </IconButton>
          }
        </ListItemSecondaryAction>
      </ListItem>
    </Paper>
  );
};

export default FriendCard;