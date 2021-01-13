import React from 'react';
import moment from 'moment';
import { api } from 'api';

import { IconButton } from '@material-ui/core';
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

  const switchLike = () => {
    console.log("habit.likes", habit.likes)
    if (hasMyLike) {
      console.log("my", habit.likes?.filter((likeBy) => likeBy !== currentUserId))
      editHabit({ id: habit.id, likes: habit.likes?.filter((likeBy) => likeBy !== currentUserId) });
    } else {
      console.log("no my", habit.likes ? [...habit.likes, currentUserId] : [currentUserId])
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
      <Chip
        tooltip="Нравится"
        label={habit.likes ? habit.likes.length : 0}
        icon={(
          <IconButton onClick={switchLike}>
            {hasMyLike
              ? <FavoriteIcon color="primary" />
              : <FavoriteBorderIcon htmlColor="#616161" />
            }
          </IconButton>
        )}
        bgcolor={theme.background.gradient1}
      />
    </>
  );
};
