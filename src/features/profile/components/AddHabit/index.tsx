import React from 'react';
import { Grid, Typography, Box, Button, Dialog, TextField, Paper } from '@material-ui/core';
import { useFormik } from 'formik';

interface AddHabitProps {
}

const AddHabit = (props: AddHabitProps) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const initialValues = {
        name: '',
        startAt: '',
    };

    type values = typeof initialValues;

    const onSubmit = (values: values) => {
        console.log(values.name);
    };
    const formik = useFormik({ initialValues, onSubmit })

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Button onClick={() => setIsOpen(true)}>+</Button>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Typography>Добавить привычку</Typography>
                </Grid>
            </Grid>
            <Dialog open={isOpen} onBlur={() => setIsOpen(false)}>
                <Box padding={5}>
                    <Paper>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField id="name" name="name" type="text" label="Название" onChange={formik.handleChange}
                                value={formik.values.name} variant="outlined" />
                            <Button type="submit" color="primary" variant="contained" disabled={formik.isValid && formik.dirty}>
                                Добавить
                            </Button>
                        </form>
                    </Paper>
                </Box>
            </Dialog>
        </>
    )
};

export default AddHabit;
