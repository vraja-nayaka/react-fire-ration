import React, { useMemo } from 'react';
import { Box, Paper, ListItemText } from '@material-ui/core';

import { getNextLevelExperience } from 'helpers/getNextLevelExperience';
import ExperienceAvatar from './ExperienceAvatar';

interface ProfileCardProps {
  name: string;
  avatar: string;
  experience: number;
  children?: React.ReactNode;
}

const ProfileCard = (props: ProfileCardProps) => {
  const { name, experience, avatar, children } = props;
  const { level } = useMemo(() => getNextLevelExperience(experience), [experience]);

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
    </Paper >
  );
};

export default ProfileCard;
