import React from 'react';
import { Typography, Box, Button, Dialog, TextField, IconButton, Avatar, createStyles, makeStyles } from '@material-ui/core';
import { useFormik } from 'formik';
import { IProfile } from '../../profile/typings';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles(() =>
    createStyles({
        input: {
            display: 'none',
        },
    }),
);

interface EditProfileDialogProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    name: string;
    avatar: string;
    editProfile: (data: Partial<IProfile>) => void;
    saveAvatar: (data: Partial<IProfile>['file']) => void;
}

type Values = {
    name: string;
    avatar: string;
    file: any;
}

const EditProfileDialog = (props: EditProfileDialogProps) => {
    const { isOpen, setIsOpen, name, avatar, editProfile, saveAvatar } = props;
    const classes = useStyles();

    const initialValues = {
        name: name || '',
        avatar: avatar || '',
        file: undefined,
    };

    const onSubmit = (values: Values) => {
        editProfile({ name: values.name, avatar: values.avatar});
        saveAvatar(values.file);
        setIsOpen(false);
    };

    const handleBlur = (name === '') ? () => false : () => setIsOpen(false);
    const formik = useFormik({ initialValues, onSubmit })

    return (
        <Dialog open={isOpen} onClose={handleBlur}>
            <form onSubmit={formik.handleSubmit}>
                <Box display="flex" padding={3} flexDirection="column" justifyContent="space-between" alignItems="center" minHeight="300px">
                    {
                        name === '' ?
                            <>
                                <Typography variant="h6">Давайте знакомится!</Typography>
                                <Typography variant="inherit">Для продолжения укажите имя, под которым вас будут знать друзья</Typography>
                            </> : <Typography>Изменение информации профиля</Typography>
                    }
                    <Avatar alt="avatar" src={formik.values.avatar} />
                    <input accept="image/*" id="file" name="file" type="file" className={classes.input}
                        onChange={(event) => {
                            formik.setFieldValue('file', event.currentTarget.files ? event.currentTarget.files[0] : undefined)
                        }}
                    />
                    <label htmlFor="file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>

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
