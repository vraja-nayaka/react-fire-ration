import React from 'react';
import moment from 'moment';
import { Typography, Paper, Box } from '@material-ui/core';
import { IHabit, ITime } from '../../../../typings';

interface SuccessCardProps {
    habit: IHabit<ITime>;
}

const SuccessCard = (props: SuccessCardProps) => {
    const { habit } = props;
    console.log({ habit })
    return (
        <Paper>
            <Typography>Прогресс</Typography>
            <Box display="flex">
                <Box>
                    <Box>
                        <Typography variant="body1">Дата</Typography>
                    </Box>
                    <Box>
                        <Typography variant="body1">Значение</Typography>
                    </Box>
                </Box>
                {
                    habit.success.map(data => (
                        <Box>
                            <Box>
                                <Typography variant="body2">{data ? moment(data.day.seconds*1000).format('DD.MM') : 'Дата'}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body2">{data.count ? data.count : '+'}</Typography>
                            </Box>
                        </Box>
                    ))
                }
            </Box>
        </Paper>
    )
};

export default SuccessCard;
