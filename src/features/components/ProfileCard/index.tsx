import React, { useMemo } from 'react';
import { Box, LinearProgress, Paper, ListItemText } from '@material-ui/core';
import { withStyles, lighten } from '@material-ui/core/styles';
import { theme } from '../../../theme';

import ExperienceAvatar from './ExperienceAvatar';
import { getNextLevelExperience } from './helpers';

interface ProfileCardProps {
  name: string;
  avatar: string;
  experience: number;
  children?: React.ReactNode;
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
  const { name, experience, avatar, children } = props;
  const { experienceProgress, level } = useMemo(() => getNextLevelExperience(experience), [experience]);

  return (
    <Paper>
      <Box display="flex" alignItems="center" justifyContent="space-between" padding={1} minWidth={200}>
        <Box display="flex" alignItems="center">
          <ExperienceAvatar experience={experience} avatar={avatar} />
          <Box marginX={2}>
            <ListItemText
              primary={name}
              secondary={`Уровень: ${level}`}
            />
          </Box>
        </Box>
        {children}
      </Box>
      <BorderLinearProgress
        variant="determinate"
        color="secondary"
        value={experienceProgress}
      />
    </Paper >
  );
};

export default ProfileCard;
