import React from 'react';
import { Badge, Box, Avatar, Tooltip, CircularProgress } from '@material-ui/core';
import { withStyles, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { getNextLevelExperience } from './helpers';

interface ProfileCardProps {
    avatar: string;
    experience: number;
    size?: number;
}

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 4px ${theme.palette.background.paper}`,
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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatar: {
            width: (props: { size: number }) => Math.floor(0.9 * props.size),
            height: (props: { size: number }) => Math.floor(0.9 * props.size),
            margin: (props: { size: number }) => Math.ceil(0.05 * props.size),
        },
    }),
);

const ExperienceAvatar = (props: ProfileCardProps) => {
    const { avatar, experience, size = 50 } = props;
    const nextLevelExperience = getNextLevelExperience(experience);
    const classes = useStyles({ size });

    return (
        <Tooltip title={`Опыт: ${experience} / ${nextLevelExperience}`} aria-label="experience">
            <StyledBadge
                overlap="circle"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                variant="dot"
            >
                <Box position="absolute" p="2px">
                    <CircularProgress
                        variant="static"
                        size={size - 4}
                        color="inherit"
                        value={100}
                    />
                </Box>
                <Avatar alt="avatar" src={avatar} className={classes.avatar} />
                <Box position="absolute">
                    <CircularProgress
                        variant="static"
                        size={size}
                        color="secondary"
                        value={experience / nextLevelExperience * 100}
                    />
                </Box>
            </StyledBadge>
        </Tooltip>
    );
};

export default ExperienceAvatar;
