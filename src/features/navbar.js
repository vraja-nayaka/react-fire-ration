import React from 'react';
import { Button, Box } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'reactfire';


export function Navbar(props) {
    const auth = useAuth();

    return (<Box>
        <Button onClick={() => auth.signOut()}>Logout</Button>
        <NavLink to="/">Start page</NavLink>
        <NavLink to="/profile">profile</NavLink>
    </Box>);
};
