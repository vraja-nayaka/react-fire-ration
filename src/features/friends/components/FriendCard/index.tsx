import React from 'react';
import { IconButton, ListItem, Avatar, ListItemAvatar, ListItemText, ListItemSecondaryAction, Paper, makeStyles } from '@material-ui/core';
import ControlPointDuplicateIcon from '@material-ui/icons/ControlPointDuplicate';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

interface FriendCardProps {
    avatar: string;
    name: string;
    userId: string;
    level: string;
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
    const { avatar, name, userId, level, subscribeUser, unsubscribeUser, onClick } = props;
    const classes = useStyles(!!onClick);
    return (
        <Paper elevation={3} className={classes.pointer}>
            <ListItem onClick={() => onClick ? onClick() : false}>
                <ListItemAvatar>
                    <Avatar src={avatar} />
                </ListItemAvatar>
                <ListItemText
                    primary={name}
                    secondary={`Id: ${userId.substr(-8, 8)}`}
                />
                {/* <ListItemText
                primary={`level: ${level}`}
            /> */}
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
