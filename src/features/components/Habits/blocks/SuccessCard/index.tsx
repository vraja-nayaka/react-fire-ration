import React, { useState } from 'react';
import { Typography, Paper, IconButton, Box, useTheme } from '@material-ui/core';
import { IHabit } from '../../../../profile/typings';
import { getFullSuccess } from '../../../../../helpers/utils';
import moment from 'moment';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import Chip from '../../../common/Chip';

interface SuccessCardProps {
    habit: IHabit;
    editHabit: (data: Partial<IHabit>) => void;
}

const SuccessCard = (props: SuccessCardProps) => {
    const { habit, editHabit } = props;
    const theme = useTheme();

    const success = getFullSuccess(habit.success);
    const [comment, addComment] = useState(false);

    return (
        <Paper elevation={3}>
            <form id="progress">
                <Box p={2}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="h5">{habit.name}</Typography>

                        <Box display="flex" alignItems="center">
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
                                    label={moment(habit.endsAt).diff(new Date(), 'days')}
                                    icon={<TimelapseIcon htmlColor="#616161" />}
                                    bgcolor={theme.background.gradient1}
                                />
                            }
                            <Chip
                                tooltip="Осталось дней"
                                label={habit.likes.length}
                                icon={(
                                    <IconButton onClick={() => editHabit({id: habit.id, likes: habit.likes})}>
                                        {habit.likes
                                            ? <FavoriteIcon color="primary" />
                                            : <FavoriteBorderIcon color="inherit" />
                                        }
                                    </IconButton>
                                )}
                                bgcolor={theme.background.gradient1}
                            />
                            <IconButton onClick={() => addComment(!comment)} >
                                {comment
                                    ? <InsertCommentIcon color="primary" />
                                    : <InsertCommentIcon color="inherit" />
                                }
                            </IconButton>
                        </Box>
                    </Box>
                    <Box display="flex" overflow="auto">
                        <Box padding={1}>
                            <Box>
                                <Typography variant="body1">Дата</Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1">{habit.unit ? habit.unit : 'Значение'}</Typography>
                            </Box>
                        </Box>
                        {
                            success.map((data, index) => (
                                <Box
                                    padding={1}
                                    flex="0 0 45px"
                                    key={index}
                                    bgcolor={data.count && data.count >= habit.promise ? theme.background.gradientSuccess : theme.palette.background.paper}
                                    borderRadius={3}
                                >
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
