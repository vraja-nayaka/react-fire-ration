import React from 'react';
import { Badge, Box, Typography, Avatar, LinearProgress, Paper, IconButton } from '@material-ui/core';
import { withStyles, lighten } from '@material-ui/core/styles';
import { theme } from '../../../../theme';
import EditIcon from '@material-ui/icons/Edit';

interface ProfileCardProps {
    name: string;
    avatar: string;
    experience: number;
    setIsOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
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
        backgroundColor: lighten(theme.palette.primary.main, 0.5),
    },
    bar: {
        borderRadius: 20,
        backgroundColor: theme.palette.primary.main,
    },
})(LinearProgress);

const ProfileCard = (props: ProfileCardProps) => {
    const { name, avatar, experience, setIsOpenEdit } = props;

    return (
        <Paper>
            <Box display="flex" flexDirection="column" alignItems="center" justifyItems="center" padding={2}>
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
                    <Box>
                        <Typography variant="h5">{name}</Typography>
                    </Box>
                    <IconButton onClick={() => setIsOpenEdit(true)}>
                        <EditIcon />
                    </IconButton>
                </Box>
                <Typography variant="inherit">Опыт: {experience} / 80</Typography>
                <BorderLinearProgress
                    variant="determinate"
                    color="secondary"
                    value={experience / 80}
                />
            </Box>
        </Paper>
    );
};

export default ProfileCard;
