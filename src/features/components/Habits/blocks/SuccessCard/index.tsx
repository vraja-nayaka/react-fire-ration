import React from 'react';
import { Typography, Paper, Box } from '@material-ui/core';
import { IHabit } from '../../../../profile/typings';
import { getFullSuccess } from '../../../../../helpers/utils';
import moment from 'moment';

interface SuccessCardProps {
    habit: IHabit;
}

const SuccessCard = (props: SuccessCardProps) => {
    const { habit } = props;

    const success = getFullSuccess(habit.success)

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
                            success.map((data, index) => (
                                <Box padding={1} width="60px" key={index}>
                                    <Box>
                                        <Typography variant="body1">{moment(data.day).format('DD.MM')}</Typography>
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
