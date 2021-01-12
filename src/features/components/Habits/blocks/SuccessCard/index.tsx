import React, { useState } from 'react';
import { Typography, Paper, IconButton, Box, useTheme } from '@material-ui/core';
import { IHabit } from 'features/profile/typings';
import { getFullSuccess } from 'helpers/utils';
import moment from 'moment';
import Chip from 'features/components/common/Chip';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import BeenhereIcon from '@material-ui/icons/Beenhere';

interface SuccessCardProps {
  habit: IHabit;
  editHabit: (data: Partial<IHabit>) => void;
}

const SuccessCard = (props: SuccessCardProps) => {
  const { habit, editHabit } = props;
  const theme = useTheme();

  const successArray = getFullSuccess(habit.success);
  const [comment, addComment] = useState(false);

  // ! TODO: refactor common on SuccessCard and SuccessCardEdit

  // ! TODO: change likes logic
  const switchLike = () => editHabit({ id: habit.id, likes: habit.likes ? [...habit.likes, 'Add like'] : ['My like!'] });

  const getBackgroundColor = (count?: number) => {
    if (!count) {
      return theme.palette.background.paper;
    }

    const isSuccess = count >= habit.promise;

    return isSuccess ? theme.background.gradientSuccess : theme.background.gradient1;
  };

  return (
    <Paper elevation={3}>
      <form id="progress">
        <Box p={2}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">{habit.name}</Typography>

            <Box display="flex" alignItems="center">
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
                  label={moment(habit.endsAt).diff(new Date(), 'days')}
                  icon={<TimelapseIcon htmlColor="#616161" />}
                  bgcolor={theme.background.gradient1}
                />
              }
              <Chip
                tooltip="Нравится"
                label={habit.likes ? habit.likes.length : 0}
                icon={(
                  <IconButton onClick={switchLike}>
                    {habit.likes
                      ? <FavoriteIcon color="primary" />
                      : <FavoriteBorderIcon htmlColor="#616161" />
                    }
                  </IconButton>
                )}
                bgcolor={theme.background.gradient1}
              />
              <IconButton onClick={() => addComment(!comment)} >
                {comment
                  ? <InsertCommentIcon color="primary" />
                  : <InsertCommentIcon htmlColor="#616161" />
                }
              </IconButton>
            </Box>
          </Box>
          <Box display="flex" overflow="auto">
            <Box padding={1}>
              <Box>
                <Typography variant="body1">Дата</Typography>
              </Box>
              <Box>
                <Typography variant="body1">{habit.unit ? habit.unit : 'Значение'}</Typography>
              </Box>
            </Box>
            {
              successArray.map((data, index) => (
                <Box
                  padding={1}
                  flex="0 0 45px"
                  key={index}
                  bgcolor={getBackgroundColor(data.count)}
                  borderRadius={3}
                >
                  <Box>
                    <Typography variant="body1">{moment(data.day).format('DD.MM')}</Typography>
                    <Typography variant="body1">{data.count}</Typography>
                  </Box>
                </Box>
              ))
            }
          </Box>
        </Box>
      </form>
    </Paper>
  );
};

export default SuccessCard;
