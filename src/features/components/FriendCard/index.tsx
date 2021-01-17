import React, { useMemo } from 'react';
import moment from 'moment';

import { IconButton, ListItem, Avatar, ListItemAvatar, ListItemText, ListItemSecondaryAction, Paper, makeStyles } from '@material-ui/core';
import ControlPointDuplicateIcon from '@material-ui/icons/ControlPointDuplicate';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import { getNextLevelExperience } from 'helpers/getNextLevelExperience';

interface FriendCardProps {
  avatar: string;
  name: string;
  userId: string;
  lastOnlineTime: number;
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
  const { avatar, name, userId, experience, lastOnlineTime, subscribeUser, unsubscribeUser, onClick } = props;
  const classes = useStyles(!!onClick);
  const { level } = useMemo(() => getNextLevelExperience(experience), [experience]);


  const getUserLastOnlineMessage = (timestamp: number) => {
    const isUserOnline = timestamp ? moment(moment.now()).diff(timestamp, 'minutes') < 3 : false;

    if (isUserOnline) {
      const userOnlineMessage = 'Онлайн';

      return userOnlineMessage;
    }

    const lastOnlineMessage = `Был в сети ${timestamp ? moment(timestamp).fromNow() : 'очень давно'}`;

    return lastOnlineMessage;
  }

  return (
    <Paper elevation={3} className={classes.pointer}>
      <ListItem onClick={() => onClick ? onClick() : false}>
        <ListItemAvatar>
          <Avatar src={avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={`Уровень: ${level}, ${getUserLastOnlineMessage(lastOnlineTime)}`}
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
