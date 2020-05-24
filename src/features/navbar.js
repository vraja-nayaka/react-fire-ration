import React from 'react';
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

export function Navbar(props) {

    return (<Box>
        <Button onClick={() => auth.signOut()}>Logout</Button>
        <NavLink to="/">Start page</NavLink>
        <NavLink to="/profile">profile</NavLink>
    </Box>);
};
