import React from "react";
import { Box, Grid, Typography, Paper } from "@material-ui/core";
import { IHabit } from "../../profile/typings";
import { SuccessCardEdit } from "./blocks/SuccessCardEdit";
import { SuccessCard } from "./blocks/SuccessCard";

export interface HabitsProps {
  habits: IHabit[];
  editHabit: (data: Partial<IHabit>) => void;
  isOwn?: boolean;
}

const Habits = (props: HabitsProps) => {
  const { habits, editHabit, isOwn } = props;

  return (
    <Paper>
      <Box py={2}>
        <Typography variant="subtitle2" align="center" color="textSecondary">
          Отслеживаемые привычки:
        </Typography>
        <Box py={1}>
          {habits.length > 0 ? (
            habits.map((habit) => (
              <Box py={1} key={habit.id}>
                {isOwn ? (
                  <SuccessCardEdit habit={habit} editHabit={editHabit} />
                ) : (
                  <SuccessCard habit={habit} editHabit={editHabit} />
                )}
              </Box>
            ))
          ) : (
            <Typography variant="inherit">
              У вас до сих пор нет отслеживаемых привычек, пора это исправить!
            </Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default Habits;
