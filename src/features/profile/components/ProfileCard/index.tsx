import React from 'react';
import { Badge, Box, Grid, Typography, Avatar, LinearProgress, Paper } from '@material-ui/core';
import { withStyles, lighten } from '@material-ui/core/styles';

interface ProfileCardProps {
    name: string;
    avatar: string;
    profileImagePath?: string;
    experience: number;
}

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

const BorderLinearProgress = withStyles({
    root: {
        height: 10,
        backgroundColor: lighten('#ff6c5c', 0.5),
    },
    bar: {
        borderRadius: 20,
        backgroundColor: '#ff6c5c',
    },
})(LinearProgress);

const ProfileCard = (props: ProfileCardProps) => {
    const { name, avatar, profileImagePath, experience } = props;

    return (
        <Paper>
            <Box alignItems="center" justifyItems="center">
                <Box>
                    <StyledBadge
                        overlap="circle"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        variant="dot"
                    >
                        <Avatar alt="avatar" src={avatar} />
                    </StyledBadge>
                </Box>
                <Box flexDirection="colum">
                    <Box>
                        <Typography variant="h5">{name}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="h5">Опыт: {experience} / 80</Typography>
                    </Box>
                    <Box>
                        <BorderLinearProgress
                            variant="determinate"
                            color="secondary"
                            value={experience / 80}
                        />
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};

export default ProfileCard;