import React from 'react';
import { Button, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useAuth } from 'reactfire';

export const Navbar = () => {
    const auth = useAuth();

    return (
        <Box display="flex" flexDirection="column" bgcolor="#999" marginRight={4}>
            <Box padding={1}>
                <Button variant="contained" color="secondary" onClick={() => auth.signOut()}>
                    Logout
                </Button>
            </Box>
            <Box padding={1}>
                <Button variant="contained" color="secondary">
                    <Link to="/">Start</Link>
                </Button>
            </Box>
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
