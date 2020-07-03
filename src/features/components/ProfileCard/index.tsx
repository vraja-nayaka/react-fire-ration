import React, { useMemo } from 'react';
import { Box, Typography, LinearProgress, Paper, IconButton } from '@material-ui/core';
import { withStyles, lighten } from '@material-ui/core/styles';
import { theme } from '../../../theme';
import EditIcon from '@material-ui/icons/Edit';
import ExperienceAvatar from './ExperienceAvatar';
import { getNextLevelExperience } from './helpers';

interface ProfileCardProps {
    name: string;
    avatar: string;
    experience: number;
    setIsOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

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
    const { name, setIsOpenEdit, experience, avatar } = props;
    const nextLevelExperience = useMemo(() => getNextLevelExperience(experience), [experience]);

    return (
        <Paper>
            <Box display="flex" alignItems="center" justifyContent="space-between" padding={1}>
                <ExperienceAvatar experience={experience} avatar={avatar} />
                <Typography variant="h5">{name}</Typography>
                <IconButton onClick={() => setIsOpenEdit(true)}>
                    <EditIcon />
                </IconButton>
            </Box>
            <BorderLinearProgress
                variant="determinate"
                color="secondary"
                value={experience / nextLevelExperience * 100}
            />
        </Paper >
    );
};

export default ProfileCard;
