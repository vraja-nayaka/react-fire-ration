import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Typography, Paper, Box, Dialog } from '@material-ui/core';
import { useAuth } from 'reactfire';
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';

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

    const [isSuccess, setIsSuccess] = React.useState(false);
    const [isError, setIsError] = React.useState(false);

    const onSubmit = (values: ILoginForm) => {
        auth.signInWithEmailAndPassword(values.email, values.password).then(val =>
            val.user ? setIsSuccess(true) : setIsError(true));
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
                            {
                                isError &&
                                <Typography variant="body1" color="error">Введен неверный логин или пароль</Typography>
                            }
                            <NavLink to="/signup">Зарегистрироваться</NavLink>

                        </Box>
                    </form>
                </Paper>
            </Box>
            <Dialog open={isSuccess}>
                <Typography variant="body1">Вход выполнен успешно"</Typography>
            </Dialog>
        </>
    );
};
