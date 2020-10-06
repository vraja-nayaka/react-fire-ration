import React from 'react';
import { Grid, makeStyles, Theme, createStyles, IconButton, Menu, MenuItem } from '@material-ui/core';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import BookmarksIcon from '@material-ui/icons/Bookmarks';
import ProfileCard from '../components/ProfileCard';
import { api } from '../../api';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useAuth } from 'reactfire';
import { useHistory } from 'react-router-dom';

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
    const { isAuth, name, avatar, experience } = api.useUser(true);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Grid container alignItems="center" justify="space-between" className={classes.container}>
            <Grid item>
                {/* <IconButton>
                    <AddCircleIcon />
                </IconButton>
                <IconButton>
                    <NotificationsIcon />
                </IconButton>
                <IconButton>
                    <BookmarksIcon />
                </IconButton> */}
            </Grid>
            <Grid item>
                {isAuth &&
                    <ProfileCard name={name} avatar={avatar} experience={experience}>
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
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => history.push("/profile")}>Профиль</MenuItem>
                            <MenuItem onClick={() => auth.signOut()}>Выйти</MenuItem>
                        </Menu>
                    </ProfileCard>
                }
            </Grid>
        </Grid>
    );
}

export default Header;
