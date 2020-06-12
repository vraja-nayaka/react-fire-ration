import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Typography, Paper, Box } from '@material-ui/core';
import { useAuth } from 'reactfire';
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';

interface ILoginForm {
    email: string;
    password: string;
}

const initialValues = {
    email: '',
    password: '',
};

export function LoginPage() {
    const auth = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    const onSubmit = (values: ILoginForm) => {
        auth.signInWithEmailAndPassword(values.email, values.password)    
        .then(() => enqueueSnackbar('Вход выполнен успешно!', { variant: 'success' }))
        .catch((error) => enqueueSnackbar('Произошла ошибка при входе: ' + error, { variant: 'error' }));
    };

    const formik = useFormik({ initialValues, onSubmit })

    return (
        <>
            <Box marginTop={5} width="350px">
                <Paper>
                    <form onSubmit={formik.handleSubmit} >
                        <Box display="flex" padding={3} flexDirection="column" justifyContent="space-between" alignItems="center" height="300px">
                            <Typography variant="h4">Войти</Typography>
                            <TextField id="email" name="email" type="email" label="email" onChange={formik.handleChange}
                                value={formik.values.email} variant="outlined" />
                            <TextField id="password" name="password" type="password" label="password" onChange={formik.handleChange}
                                value={formik.values.password} variant="outlined" />
                            <Button type="submit" variant="contained">LOGIN</Button>
                            <NavLink to="/signup">Зарегистрироваться</NavLink>
                        </Box>
                    </form>
                </Paper>
            </Box>
        </>
    );
};