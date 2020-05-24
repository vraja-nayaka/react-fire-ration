import React from 'react';
import { Grid, Typography, Button, Dialog, TextField } from '@material-ui/core';
import { useFormik } from 'formik';

interface AddHabbitProps {
}

const AddHabbit = (props: AddHabbitProps) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const initialValues = {
        name: '',
        startAt: '',
    };

    type values = typeof initialValues;

    const onSubmit = (values: values) => {
        // auth.signInWithEmailAndPassword(values.email, values.password);
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
                <form onSubmit={formik.handleSubmit}>

                </form>
                <TextField id="name" name="name" type="text" label="Название" onChange={formik.handleChange}
                    value={formik.values.name} variant="outlined" />
                <Button type="submit" disabled={formik.isValid && formik.dirty}>Добавить</Button>
            </Dialog>
        </>
    )
};

export default AddHabbit;
