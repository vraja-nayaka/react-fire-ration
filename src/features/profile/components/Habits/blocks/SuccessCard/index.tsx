import React from 'react';
import moment from 'moment';
import { Typography, Paper, Box } from '@material-ui/core';
import { IHabit, ITime } from '../../../../typings';

interface SuccessCardProps {
    habit: IHabit<ITime>;
}

const SuccessCard = (props: SuccessCardProps) => {
    const { habit } = props;
    const success = habit.success;
    const lastDate = new Date(success[success.length - 1].day.seconds * 1000);
    const difference = moment().diff(moment(lastDate), 'days');
    for (let i = 1; i <= difference; i++) {
        success.push({
            day: {
                seconds: moment(lastDate).add(i, 'day').unix(),
                nanoseconds: 0
            },
            count: 0,
        });
    }

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
                    success.map(data => (
                        <Box padding={1}>
                            <Box>
                                <Typography variant="body2">{data ? moment(data.day.seconds * 1000).format('DD.MM') : 'Дата'}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body2">{data.count ? data.count : '+ add'}</Typography>
                            </Box>
                        </Box>
                    ))
                }
            </Box>
        </Paper>
    );
};

export default SuccessCard;
