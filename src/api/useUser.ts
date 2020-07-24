import {
    useFirestoreDocData,
    useFirestore,
    useUser as useUserFire,
} from 'reactfire';
import { User } from 'firebase';
import { IProfile } from '../features/profile/typings';
import { useParams } from 'react-router';
import { useSnackbar } from 'notistack';

const DEFAULT_IMAGE_PATH = 'userPhotos/default.jpg';

const useUser = (isMy?: boolean) => {
    const { enqueueSnackbar } = useSnackbar();
    
    const user: User = useUserFire();
    const { id } = useParams<{ id: string }>();
    const selectedId = isMy ? user.uid : id;

    const userDetailsRef = useFirestore()
        .collection('users')
        .doc(selectedId);
    const { name = '', avatar = DEFAULT_IMAGE_PATH, experience = 0 } = useFirestoreDocData(userDetailsRef);

    const editProfile = (data: Partial<IProfile>) => userDetailsRef.set({ ...data, userId: user.uid }, { merge: true })
        .then(() => enqueueSnackbar('Информация сохранена', { variant: 'success' }))
        .catch((error) => enqueueSnackbar('Произошла ошибка при сохранении: ' + error, { variant: 'error' }));

    return { id, name, avatar, experience, editProfile };
};

export { useUser };
