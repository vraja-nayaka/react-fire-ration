import React from 'react';
import { Box, Grid, Typography, Paper } from '@material-ui/core';
import { IHabit, IProfile } from '../../profile/typings';
import SuccessCardEdit from './blocks/SuccessCardEdit';
import SuccessCard from './blocks/SuccessCard';

interface HabitsProps {
    habits: IHabit[];
    editHabit?: (data: IHabit) => void;
}

const Habits = (props: HabitsProps) => {
    const { habits, editHabit } = props;

    return (
        <Paper>
            <Box p={2}>
                <Typography>Отслеживаемые привычки:</Typography>
                <Grid container spacing={2}>
                    {
                        habits.length > 0
                            ? habits.map((habit) => (
                                <Grid item xs={12} key={habit.id}>
                                    {editHabit
                                        ? <SuccessCardEdit habit={habit} editHabit={editHabit} />
                                        : <SuccessCard habit={habit} />
                                    }
                                </Grid>
                            ))
                            : <Typography variant="inherit">Привычек пока нет</Typography>
                    }
                </Grid>
            </Box>
        </Paper >
    )
};

export default Habits;
