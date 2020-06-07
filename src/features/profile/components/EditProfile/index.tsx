import React from 'react';
import { Typography, Box, Button, Dialog, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import { IProfile } from '../typings';

interface EditProfileDialogProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    name: string;
    avatar: string;
    editProfile: (data: Partial<IProfile>) => Promise<React.ReactText>;
}

const EditProfileDialog = (props: EditProfileDialogProps) => {
    const { isOpen, setIsOpen, name, avatar, editProfile } = props;

    const initialValues = {
        name: name || '',
        avatar: avatar || '',
    };

    type Values = typeof initialValues;

    const onSubmit = (values: Values) => {
        editProfile({ name: values.name });
        handleBlur();
    };

    const handleBlur = (name === '') ? () => false : () => setIsOpen(false);
    const formik = useFormik({ initialValues, onSubmit })
    console.log(formik.isValid, formik.dirty)
    return (
        <Dialog open={isOpen} onClose={handleBlur}>
            <form onSubmit={formik.handleSubmit}>
                <Box display="flex" padding={3} flexDirection="column" justifyContent="space-between" alignItems="center" minHeight="200px">
                    <Typography>Изменение информации профиля</Typography>
                    {
                        name === '' &&
                        <>
                            <Typography variant="h6">Давайте знакомится!</Typography>
                            <Typography variant="inherit">Для продолжения укажите имя, под которым вас будут знать друзья</Typography>
                        </>
                    }
                    <TextField id="name" name="name" type="text" label="Ваше имя" onChange={formik.handleChange}
                        value={formik.values.name} variant="outlined" />
                    <Button type="submit" color="primary" variant="contained" disabled={!(formik.isValid && formik.dirty)}>
                        Сохранить
                    </Button>
                </Box>
            </form>
        </Dialog>
    )
};

export default EditProfileDialog;
