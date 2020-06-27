import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Typography, Paper, Box } from '@material-ui/core';
import { useAuth } from 'reactfire';
import { useFormik } from 'formik';
import { NavLink, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { redirect } from '../../helpers/redirect';

interface ISignupForm {
    email: string;
    password: string;
}

const initialValues = {
    email: '',
    password: '',
};

export function CreateUserPage() {
    const auth = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    const onSubmit = (values: ISignupForm) => {
        auth.createUserWithEmailAndPassword(values.email, values.password)
            .then(() => {

                
                enqueueSnackbar('Регистрация прошла успешно, можете войти', { variant: 'success' });
                history.push(redirect.login);
            })
            .catch((error) => enqueueSnackbar('Произошла ошибка при регистрации: ' + error, { variant: 'error' }));
    };

    const formik = useFormik({ initialValues, onSubmit });

    return (
        <Box marginTop={5} width="350px">
            <Paper>
                <form onSubmit={formik.handleSubmit} >
                    <Box display="flex" padding={3} flexDirection="column" justifyContent="space-between" alignItems="center" height="300px">
                        <Typography variant="h4">Создать аккаунт</Typography>
                        <TextField id="email" name="email" type="email" label="email" onChange={formik.handleChange}
                            value={formik.values.email} variant="outlined" />
                        <TextField id="password" name="password" type="password" label="password" onChange={formik.handleChange}
                            value={formik.values.password} variant="outlined" />
                        <Button type="submit" variant="contained">Отправить</Button>
                        <NavLink to="/login">Войти в свой аккаунт</NavLink>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};
