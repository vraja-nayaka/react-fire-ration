import React from 'react';
import moment from 'moment';
import { api } from 'api';

import { Box, IconButton, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import Chip from 'features/components/common/Chip';
import { IHabit } from 'features/profile/typings';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import TimelapseIcon from '@material-ui/icons/Timelapse';

interface ChipsBlockProps {
  habit: IHabit;
  editHabit: (data: Partial<IHabit>) => void;
}

export const ChipsBlock = ({ habit, editHabit }: ChipsBlockProps) => {
  const theme = useTheme();
  const { id: currentUserId } = api.useUser(true);

  const daysLeft = Math.max(0, moment(habit.endsAt).diff(new Date(), 'days'));

  const hasMyLike = habit.likes?.includes(currentUserId);

  const likesCount = habit.likes ? habit.likes.length : 0;

  const switchLike = () => {
    if (hasMyLike) {
      editHabit({ id: habit.id, likes: habit.likes?.filter((likeBy) => likeBy !== currentUserId) });
    } else {
      editHabit({ id: habit.id, likes: habit.likes ? [...habit.likes, currentUserId] : [currentUserId] });
    }
  }

  return (
    <>
      {
        habit.promise &&
        <Chip
          tooltip={`Обещанное количество (${habit.unit ?? 'раз'} в день)`}
          icon={<BeenhereIcon htmlColor="#616161" />}
          label={habit.promise}
          bgcolor={theme.background.gradientSuccess}
        />
      }
      {
        habit.endsAt &&
        <Chip
          tooltip="Осталось дней"
          label={daysLeft}
          icon={<TimelapseIcon htmlColor="#616161" />}
          bgcolor={theme.background.gradient1}
        />
      }
      <IconButton onClick={switchLike}>
        {hasMyLike
          ? <FavoriteIcon color="primary" />
          : <FavoriteBorderIcon htmlColor="#616161" />
        }
        <Box marginLeft={1}>
          <Typography variant="body1">{likesCount}</Typography>
        </Box>
      </IconButton>
    </>
  );
};
