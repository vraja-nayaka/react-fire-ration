import React from 'react';
import moment from 'moment';
import { Typography, Paper, Box, useTheme } from '@material-ui/core';
import { IHabit } from 'features/profile/typings';
import { getFullSuccess } from 'helpers/utils';

import { ChipsBlock } from '../ChipsBlock';

interface SuccessCardProps {
  habit: IHabit;
  editHabit: (data: Partial<IHabit>) => void;
}

const SuccessCard = (props: SuccessCardProps) => {
  const { habit, editHabit } = props;
  const theme = useTheme();

  const successArray = getFullSuccess(habit.success);

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
              <ChipsBlock habit={habit} editHabit={editHabit} />
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
                    <Typography variant="body1" align="center">{data.count}</Typography>
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

export { SuccessCard };
