import React from 'react';
import { Box, Grid, Typography, Paper } from '@material-ui/core';
import { IHabit } from '../../profile/typings';
import SuccessCardEdit from './blocks/SuccessCardEdit';
import SuccessCard from './blocks/SuccessCard';

export interface HabitsProps {
  habits: IHabit[];
  editHabit: (data: Partial<IHabit>) => void;
  isOwn?: boolean;
}

const Habits = (props: HabitsProps) => {
  const { habits, editHabit, isOwn } = props;

  return (
    <Paper>
      <Box p={2}>
        <Typography>Отслеживаемые привычки:</Typography>
        <Grid container spacing={2}>
          {
            habits.length > 0
              ? habits.map((habit) => (
                <Grid item xs={12} key={habit.id}>
                  {isOwn
                    ? <SuccessCardEdit habit={habit} editHabit={editHabit} />
                    : <SuccessCard habit={habit} editHabit={editHabit} />
                  }
                </Grid>
              ))
              : <Typography variant="inherit">У вас до сих пор нет отслеживаемых привычек, пора это исправить!</Typography>
          }
        </Grid>
      </Box>
    </Paper >
  )
};

export default Habits;
