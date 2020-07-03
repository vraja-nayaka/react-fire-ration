import React from 'react';
import moment from 'moment';
import { Typography, Paper, Box, IconButton } from '@material-ui/core';
import { IHabit, ISuccess } from '../../../../profile/typings';

interface SuccessCardProps {
    habit: IHabit;
}

const SuccessCard = (props: SuccessCardProps) => {
    const { habit } = props;

    const newSuccess = [] as ISuccess[];
    const lastDate = habit.success[habit.success.length - 1].day;
    const difference = moment().startOf('day').diff(moment(lastDate).startOf('day'), 'day');

    for (let i = 0; i < difference; i++) {
        newSuccess.push({
            day: moment(lastDate).add(i + 1, 'day').unix() * 1000,
        });
    }

    return (
        <Paper elevation={3}>
            <form id="progress">
                <Box p={2}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="h5">{habit.name}</Typography>

                        {/* TODO: Add Like and comment icon
                        
                        <Box>
                            {
                                formik.values.status === 'active'
                                    ? <IconButton onClick={() => formik.setFieldValue('status', 'archive')}>
                                        <ArchiveIcon color="inherit" />
                                    </IconButton>
                                    : <IconButton onClick={() => formik.setFieldValue('status', 'active')} >
                                        <UnarchiveIcon color="primary" />
                                    </IconButton>
                            }
                        </Box> */}
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
                            habit.success.map((data, index) => (
                                <Box padding={1} width="60px" key={index}>
                                    <Box>
                                        <Typography variant="body1">{data.day}</Typography>
                                        <Typography variant="body1">{data.count}</Typography>
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
