import React from 'react';
import { Grid, Box, makeStyles, Theme, createStyles, Divider, IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import BookmarksIcon from '@material-ui/icons/Bookmarks';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            background: theme.background.gradient1,
            padding: theme.spacing(2),
        },
    }),
);

const Header = () => {
    const classes = useStyles();

    return (
        <Grid container alignItems="center" className={classes.container}>
            <IconButton>
                <AddCircleIcon />
            </IconButton>
            <IconButton>
                <NotificationsIcon />
            </IconButton>
            <IconButton>
                <BookmarksIcon />
            </IconButton>
        </Grid>
    );
}

export default Header;
