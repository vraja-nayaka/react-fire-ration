import React from 'react';
import { Grid, Typography, Box, Button, Dialog, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import { IHabit } from '../../profile/typings';

interface AddHabitProps {
    addHabit: (data: IHabit) => Promise<React.ReactText>;
}

const AddHabit = (props: AddHabitProps) => {
    const { addHabit } = props;
    const [isOpen, setIsOpen] = React.useState(false);

    const initialValues: IHabit = {
        id: '',
        // ! прокинуть имя сюда
        name: '',
        startAt: new Date().getTime(),
        success: [{
            day: new Date().getTime(),
        }],
        status: 'active',
    };

    const onSubmit = (values: IHabit) => {
        addHabit({ ...values });
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
                        <TextField id="name" name="name" type="text" label="Название" onChange={formik.handleChange}
                            value={formik.values.name} variant="outlined" />
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
