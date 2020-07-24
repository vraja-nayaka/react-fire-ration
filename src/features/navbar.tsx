import React from 'react';
import { Button, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const Navbar = () => {

    return (
        <Box display="flex" justifyContent="center" bgcolor="#999" flexWrap="wrap">
            {/* <Box padding={1}>
                <Button variant="contained" color="secondary">
                    <Link to="/">Start</Link>
                </Button>
            </Box> */}
            <Box padding={1}>
                <Button variant="contained" color="secondary">
                    <Link to="/profile">Profile</Link>
                </Button>
            </Box>
            <Box padding={1}>
                <Button variant="contained" color="secondary">
                    <Link to="/friends">Friends</Link>
                </Button>
            </Box>
        </Box>
    );
};
