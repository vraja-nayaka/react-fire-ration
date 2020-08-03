import React from 'react';
import moment from 'moment';
import { Typography, Paper, Box, TextField, IconButton } from '@material-ui/core';
import { IHabit, ISuccess } from '../../../../profile/typings';
import { useFormik } from 'formik';
import ArchiveIcon from '@material-ui/icons/Archive';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import SaveIcon from '@material-ui/icons/Save';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Chip from '../../../common/Chip';

interface SuccessCardEditProps {
    habit: IHabit;
    editHabit: (data: IHabit) => void;
}

const SuccessCardEdit = (props: SuccessCardEditProps) => {
    const { habit, editHabit } = props;
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

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
                    <Box display="flex" justifyContent="space-between" flexDirection={smDown ? 'column' : 'row'}>
                        <Typography variant="h5">{habit.name}</Typography>
                        <Box display="flex" >
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
                                    label={moment(habit.endsAt).diff(habit.startAt, 'days')}
                                    icon={<TimelapseIcon htmlColor="#616161" />}
                                    bgcolor={theme.background.gradient1}
                                />
                            }
                            <IconButton onClick={() => formik.handleSubmit()} >
                                <SaveIcon color="primary" />
                            </IconButton>
                            {
                                formik.values.status === 'active'
                                    ? <IconButton onClick={() => formik.setFieldValue('status', 'archive')}>
                                        <ArchiveIcon color="inherit" />
                                    </IconButton>
                                    : <IconButton onClick={() => formik.setFieldValue('status', 'active')}>
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
                                <Typography variant="body1">{habit.unit ? habit.unit : 'Значение'}</Typography>
                            </Box>
                        </Box>
                        <Box display="flex" overflow="auto">
                            {
                                formik.values.success.map((data, index) => (
                                    <Box
                                        padding={1}
                                        flex="0 0 45px"
                                        key={index}
                                        bgcolor={data.count && data.count >= habit.promise ? theme.background.gradientSuccess : theme.palette.background.paper}
                                        borderRadius={3}
                                    >
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
                                ))
                            }
                        </Box>
                    </Box>
                </Box>
            </form>
        </Paper >
    );
};

export default SuccessCardEdit;
