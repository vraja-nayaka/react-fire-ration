import React from 'react';
import moment from 'moment';
import { Typography, Paper, Box, TextField, Button, IconButton } from '@material-ui/core';
import { IHabit, ISuccess } from '../../../../typings';
import { useFormik } from 'formik';
import ArchiveIcon from '@material-ui/icons/Archive';
import UnarchiveIcon from '@material-ui/icons/Unarchive';

interface SuccessCardProps {
    habit: IHabit;
    editHabit: (data: IHabit) => void;
}

const SuccessCard = (props: SuccessCardProps) => {
    const { habit, editHabit } = props;

    const newSuccess = [] as ISuccess[];
    const lastDate = habit.success[habit.success.length - 1].day;
    const difference = moment().startOf('day').diff(moment(lastDate).startOf('day'), 'day');

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
        <Paper elevation={3}>
            <form id="progress">
                <Box p={2}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="h5">{habit.name}</Typography>
                        <Box>
                            <Button onClick={() => formik.handleSubmit()} id="progress" variant="contained" color="primary">
                                Сохранить
                        </Button>
                            {
                                formik.values.status === 'active'
                                    ? <IconButton onClick={() => formik.setFieldValue('status', 'archive')}>
                                        <ArchiveIcon color="inherit" />
                                    </IconButton>
                                    : <IconButton onClick={() => formik.setFieldValue('status', 'active')} >
                                        <UnarchiveIcon color="primary" />
                                    </IconButton>
                            }
                        </Box>
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
                                        <TextField
                                            name={`success.${index}.count`}
                                            label={moment(data.day).format('DD.MM')}
                                            InputLabelProps={{ shrink: true }}
                                            inputProps={{ style: { textAlign: 'center' } }}
                                            onChange={formik.handleChange}
                                            value={data.count}
                                            id={`input-${formik.values.id}-${index}`}
                                        />
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
