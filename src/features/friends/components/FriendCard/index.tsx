import React from 'react';
import moment from 'moment';
import { Typography, Paper, Box, TextField, Button, IconButton, ListItem, Avatar, ListItemAvatar, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import { useFormik } from 'formik';
import ControlPointDuplicateIcon from '@material-ui/icons/ControlPointDuplicate';

interface FriendCardProps {
    avatar: string;
    name: string;
    userId: string;
    level: string;
    subscribeUser: (id: string) => void;
}

const FriendCard = (props: FriendCardProps) => {
    const { avatar, name, userId, level, subscribeUser } = props;

            // {/* // <Paper elevation={3}> */}

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar src={avatar}/>
            </ListItemAvatar>
            <ListItemText
                primary={name}
                secondary={userId}
            />
            <ListItemText
                primary={level}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="subscribe" onClick={() => subscribeUser(userId)}>
                    <ControlPointDuplicateIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default FriendCard;
