import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { useFirestore } from 'reactfire';

interface IHabit {
    name: string;
    startAt: Date;
    success?: { date: Date, value: number }[];
}

interface HabitsProps {
    habits: IHabit[];
}

const Habits = (props: HabitsProps) => {
    const { habits } = props;

    return (
        <Paper>
            <Typography>Отслеживаемые привычки:</Typography>
            {habits.length > 0 && habits.map(habit => (
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h5">{habit.name}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>График</Typography>
                    </Grid>
                </Grid>
            ))
            }
        </Paper>
    )
};

export default Habits;
