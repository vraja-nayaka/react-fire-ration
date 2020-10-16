import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import AccountIcon from '@material-ui/icons/AccountCircleSharp'
import PeopleIcon from '@material-ui/icons/People'

export const Navbar = () => {
    const [value, setValue] = React.useState(0);

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
        >
            <BottomNavigationAction
                label="Profile"
                icon={<AccountIcon />}
                component={NavLink}
                to={'/profile'}
            />
            <BottomNavigationAction
                label="Friends"
                icon={<PeopleIcon />}
                component={NavLink}
                to={'/friends'}
            />
        </BottomNavigation>
    );
};
