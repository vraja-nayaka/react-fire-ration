import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
import { useAuth } from 'reactfire';
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';

export function LoginPage() {
    const auth = useAuth();
    const initialValues = {
        email: '',
        password: '',
    };
    const onSubmit = (values) => {
        auth.signInWithEmailAndPassword(values.email, values.password).then(val =>
            val.user.uid);
    };
    const formik = useFormik({ initialValues, onSubmit })

    return <div>
        <form onSubmit={formik.handleSubmit} >
            <Typography>Sign in</Typography>
            <TextField id="name" name="name" type="text" label="Ваше имя" onChange={formik.handleChange}
                value={formik.values.email} variant="outlined" />
            <TextField id="email" name="email" type="email" label="email" onChange={formik.handleChange}
                value={formik.values.email} variant="outlined" />
            <TextField id="password" name="password" type="password" label="password" onChange={formik.handleChange}
                value={formik.values.password} variant="outlined" />
            <Button type="submit">LOGIN</Button>
            <NavLink to="/signup">Haven't account? Sign up here</NavLink>
        </form>
    </div>
}

export function CreateUserPage() {
    const auth = useAuth();
    const initialValues = {
        email: '',
        password: '',
    };
    const onSubmit = (values) => {
        auth.createUserWithEmailAndPassword(values.email, values.password);
    };
    const formik = useFormik({ initialValues, onSubmit })

    return <div>
        <form onSubmit={formik.handleSubmit} >
            <Typography>Sign up</Typography>
            <TextField id="email" name="email" type="email" label="email" onChange={formik.handleChange}
                value={formik.values.email} variant="outlined" />
            <TextField id="password" name="password" type="password" label="password" onChange={formik.handleChange}
                value={formik.values.password} variant="outlined" />
            <Button type="submit">SUBMIT</Button>
            <NavLink to="/login">Have account? Sign in here</NavLink>
        </form>
    </div>
}