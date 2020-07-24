import React, { useState } from 'react';
import { Typography, Paper, IconButton, Box, Tooltip, Fade, Chip } from '@material-ui/core';
import { IHabit } from '../../../../profile/typings';
import { getFullSuccess } from '../../../../../helpers/utils';
import moment from 'moment';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import BeenhereIcon from '@material-ui/icons/Beenhere';

interface SuccessCardProps {
    habit: IHabit;
}

const SuccessCard = (props: SuccessCardProps) => {
    const { habit } = props;

    const success = getFullSuccess(habit.success);
    const [like, addLike] = useState(false);
    const [comment, addComment] = useState(false);

    return (
        <Paper elevation={3}>
            <form id="progress">
                <Box p={2}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="h5">{habit.name}</Typography>

                        <Box>
                            {
                                habit.promise &&
                                // <Box display="flex" alignItems="center" paddingRight={1}>
                                <Tooltip
                                    TransitionComponent={Fade}
                                    TransitionProps={{ timeout: 600 }}
                                    title={`Обещанное количество (${habit.unit ? habit.unit : 'раз'} в день)`}>
                                    <Chip label={habit.promise} icon={<BeenhereIcon />} color="primary" />
                                </Tooltip>
                                // </Box>
                            }
                            <IconButton onClick={() => addLike(!like)}>
                                {like
                                    ? <FavoriteIcon color="primary" />
                                    : <FavoriteBorderIcon color="inherit" />
                                }
                            </IconButton>
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
