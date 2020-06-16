import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { IHabit, ITime } from '../../typings';
import SuccessCard from './blocks/SuccessCard';


interface HabitsProps {
    habits: IHabit<ITime>[];
    editHabit: (data: IHabit<Date>) => void;
}

const Habits = (props: HabitsProps) => {
    const { habits, editHabit } = props;

    return (
        <Paper>
            <Typography>Отслеживаемые привычки:</Typography>
            {
                habits.length > 0
                    ? habits.map(habit => (
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="h5">{habit.name}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <SuccessCard habit={habit} editHabit={editHabit}/>
                            </Grid>
                        </Grid>
                    ))
                    : <Typography>Привычек пока нет</Typography>
            }
        </Paper>
    )
};

export default Habits;
