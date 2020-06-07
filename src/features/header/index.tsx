import React from 'react';
import { Grid, Box, makeStyles, Theme, createStyles, Divider, IconButton, Avatar, Typography, Paper } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import BookmarksIcon from '@material-ui/icons/Bookmarks';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            background: theme.background.gradient1,
        },
    }),
);

const Header = () => {
    const classes = useStyles();

    return (
        <Grid container alignItems="center" justify="space-between" className={classes.container}>
            <Grid item>
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
            <Grid item>
                <Paper>
                    <Box padding={2}>
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item>
                                <Avatar alt="Avatar" />
                            </Grid>
                            <Grid item>
                                <Typography variant="inherit">
                                    Имя пользователя
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Header;
