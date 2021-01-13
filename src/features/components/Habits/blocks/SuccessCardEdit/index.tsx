import React from 'react';
import moment from 'moment';
import { useFormik } from 'formik';
import { api } from 'api';
import { Typography, Paper, Box, TextField, IconButton } from '@material-ui/core';
import { IHabit } from 'features/profile/typings';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { getNewSucces } from 'features/components/Habits/helpers';

import SaveIcon from '@material-ui/icons/Save';
import ArchiveIcon from '@material-ui/icons/Archive';
import UnarchiveIcon from '@material-ui/icons/Unarchive';

import { ChipsBlock } from '../ChipsBlock';

interface SuccessCardEditProps {
  habit: IHabit;
  editHabit: (data: Partial<IHabit>) => void;
}

const SuccessCardEdit = (props: SuccessCardEditProps) => {
  const { habit, editHabit } = props;
  const { addExperience } = api.useUser(true);

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const initialValues = {
    ...habit,
    success: getNewSucces(habit.success),
  };

  const onSubmit = (values: IHabit) => {
    const nextHabitExp = values.success.filter((value) => value.count && value.count >= values.promise).length * 2;
    addExperience(nextHabitExp - values.experience);
    editHabit({ ...values, experience: nextHabitExp });
  };

  const getBackgroundColor = (count?: number) => {
    if (!count) {
      return theme.palette.background.paper;
    }

    const isSuccess = count >= habit.promise;

    return isSuccess ? theme.background.gradientSuccess : theme.background.gradient1;
  };

  const formik = useFormik({ initialValues, onSubmit, enableReinitialize: true });

  const isActive = formik.values.status === 'active';
  const onStatusChangeHandler = () => formik.setFieldValue('status', isActive ? 'archive' : 'active');
  const archiveIcon = isActive ? <ArchiveIcon color="inherit" /> : <UnarchiveIcon color="primary" />;

  return (
    <Paper elevation={3}>
      <form id="progress">
        <Box p={2}>
          <Box display="flex" justifyContent="space-between" flexDirection={smDown ? 'column' : 'row'}>
            <Typography variant="h5">{habit.name}</Typography>
            <Box display="flex">

              <ChipsBlock habit={habit} editHabit={editHabit} />

              <IconButton onClick={() => formik.handleSubmit()} style={{ boxShadow: '19px' }}>
                <SaveIcon color="primary" />
              </IconButton>
              <IconButton onClick={onStatusChangeHandler}>
                {archiveIcon}
              </IconButton>
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
                    bgcolor={getBackgroundColor(data.count)}
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

export { SuccessCardEdit };
