import React from 'react';
import moment from 'moment';
import { Typography, Paper, Box, TextField, Button } from '@material-ui/core';
import { IHabit, ISuccess } from '../../../../typings';
import { useFormik } from 'formik';

interface SuccessCardProps {
    habit: IHabit;
    editHabit: (data: IHabit) => void;
}

const SuccessCard = (props: SuccessCardProps) => {
    const { habit, editHabit } = props;

    const newSuccess = [] as ISuccess[];
    const lastDate = habit.success[habit.success.length - 1].day;
    const difference = moment().diff(moment(lastDate), 'days');

    for (let i = 0; i < difference; i++) {
        newSuccess.push({
            day: moment(lastDate).add(i + 1, 'day').unix() * 1000,
        });
    }

    const initialValues = {
        ...habit,
        success: [...habit.success, ...newSuccess]
    };

    const onSubmit = (values: IHabit) => {
        editHabit({ ...values });
    };

    const formik = useFormik({ initialValues, onSubmit });

    return (
        <Paper>
            <form id="progress">
                <Box display="flex" p={2} justifyContent="space-between">
                    <Button onClick={() => formik.handleSubmit()} id="progress" variant="contained" color="primary">
                        Сохранить
                        </Button>
                    {
                        formik.values.status === 'active'
                            ? <Button onClick={() => formik.setFieldValue('status', 'archive')} variant="contained" color="inherit">
                                Архивировать
                            </Button>
                            : <Button onClick={() => formik.setFieldValue('status', 'active')} variant="contained" color="secondary">
                                Восстановить
                            </Button>
                    }
                </Box>
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
                        formik.values.success.map((data, index) => (
                            <Box padding={1} width="60px" key={index}>
                                <Box>
                                    <Typography variant="body2">{data ? moment(data.day).format('DD.MM') : 'Дата'}</Typography>
                                </Box>
                                <Box>
                                    <TextField
                                        name={`success.${index}.count`}
                                        type="number"
                                        onChange={formik.handleChange}
                                        value={data.count}
                                        id={String(index)}
                                    />
                                </Box>
                            </Box>
                        ))
                    }
                </Box>
            </form>
        </Paper>
    );
};

export default SuccessCard;
