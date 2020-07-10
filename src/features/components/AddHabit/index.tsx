import React from 'react';
import { Grid, Typography, Box, Button, Dialog, TextField, InputLabel, FormControl, Select, FormControlLabel, Checkbox, MenuItem } from '@material-ui/core';
import { useFormik } from 'formik';
import moment from 'moment';
import { IHabit, IHabitDate } from '../../profile/typings';

interface AddHabitProps {
    addHabit: (data: IHabit) => Promise<React.ReactText>;
}

const AddHabit = (props: AddHabitProps) => {
    const { addHabit } = props;
    const [isOpen, setIsOpen] = React.useState(false);

    const initialValues: IHabitDate = {
        id: '',
        // TODO прокинуть имя сюда
        name: '',
        startAt: moment().format('YYYY-MM-DD'),
        endsAt: new Date().getTime(),
        success: [],
        status: 'active',
        fixingDays: 30,
        inRow: false,
        promise: 1,
    };

    // TODO Валидацию формы сделать

    const onSubmit = (values: IHabitDate) => {
        addHabit({
            ...values,
            startAt: new Date(values.startAt).getTime(),
            success: [{ day: new Date(values.startAt).getTime() }],
            endsAt: moment(values.startAt).add(values.fixingDays, 'days').unix() * 1000,
        });
        setIsOpen(false);
    };

    const formik = useFormik({ initialValues, onSubmit })

    return (
        <>
            <Box display="flex" padding={3} flexDirection="column" justifyContent="space-between" alignItems="center">
                <Button color="primary" variant="contained" onClick={() => setIsOpen(true)}>+</Button>
                <Typography>Добавить привычку</Typography>
            </Box>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <form onSubmit={formik.handleSubmit}>
                    <Box display="flex" padding={3} flexDirection="column" justifyContent="space-between" alignItems="center" minHeight="200px">
                        <Typography>Что вы хотите делать каждый день?</Typography>
                        <Box display="flex" paddingTop={2} justifyContent="space-around" minWidth="300px">
                            <TextField id="name" name="name" type="text" label="Название" onChange={formik.handleChange}
                                value={formik.values.name} variant="outlined" />
                            <Box width="90px" marginLeft={2}>
                                <TextField id="promise" name="promise" type="number" label="Количество в день" onChange={formik.handleChange}
                                    value={formik.values.promise} variant="outlined" />
                            </Box>
                        </Box>
                        <Box display="flex" paddingTop={2} justifyContent="space-around" minWidth="300px">
                            <TextField id="startAt" name="startAt" type="date" label="Дата начала" onChange={formik.handleChange}
                                value={formik.values.startAt} variant="outlined" />
                            <FormControl variant="outlined">
                                <InputLabel id="demo-simple-select-outlined-label">Дней на закрепление</InputLabel>
                                <Select
                                    labelId="fixingDays"
                                    id="fixingDays"
                                    name="fixingDays"
                                    value={formik.values.fixingDays}
                                    onChange={formik.handleChange}
                                    label="Дней на закрепление"
                                >
                                    <MenuItem value={20}>20</MenuItem>
                                    <MenuItem value={30}>30</MenuItem>
                                    <MenuItem value={40}>40</MenuItem>
                                    <MenuItem value={90}>90</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <FormControlLabel
                            control={<Checkbox checked={formik.values.inRow} onChange={formik.handleChange} name="inRow" />}
                            label="Дни подряд"
                        />
                        <Button type="submit" color="primary" variant="contained" disabled={!(formik.isValid && formik.dirty)}>
                            Добавить
                        </Button>
                    </Box>
                </form>
            </Dialog>
        </>
    )
};

export default AddHabit;
