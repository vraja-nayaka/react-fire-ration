import React from 'react';
import moment from 'moment';
import { Typography, Paper, Box, TextField } from '@material-ui/core';
import { IHabit, ISuccess } from '../../../../typings';
import { useFormik } from 'formik';

interface SuccessCardProps {
    habit: IHabit;
    editHabit: (data: IHabit) => void;
}

const SuccessCard = (props: SuccessCardProps) => {
    const { habit, editHabit } = props;
    const success = [] as ISuccess[];
    const lastDate = habit.success[habit.success.length - 1].day;
    const difference = moment().diff(moment(lastDate), 'days');

    for (let i = 0; i <= difference; i++) {
        success.push({
            day: moment(lastDate).add(i, 'day').unix() * 1000,
            count: 0,
        });
    }

    // const initialValues: IHabit<Date> = {...habit, 
    //     startAt: habit.startAt.toDate(),
    //     expiredAt: habit.expiredAt ? habit.expiredAt.toDate() : undefined,
    //     success: [...success, {day: P;
    // count?: number;
    //     }]
    // }

    const onSubmit = (values: IHabit) => {
        editHabit({ ...values });
    };

    // const formik = useFormik({ initialValues, onSubmit });

    return (
        <Paper>
            <Typography>Прогресс</Typography>
            <Box display="flex" >
                <Box padding={1}>
                    <Box>
                        <Typography variant="body1">Дата</Typography>
                    </Box>
                    <Box>
                        <Typography variant="body1">Значение</Typography>
                    </Box>
                </Box>
                {
                    success.map((data, index) => (
                        <Box padding={1} width="60px">
                            <Box>
                                <Typography variant="body2">{data ? moment(data.day).format('DD.MM') : 'Дата'}</Typography>
                            </Box>
                            <Box>
                                <TextField
                                    id={String(index)}
                                />
                            </Box>
                        </Box>
                    ))
                }
            </Box>
        </Paper>
    );
};

export default SuccessCard;
