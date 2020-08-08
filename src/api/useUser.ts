import {
    useFirestoreDocData,
    useFirestore,
    useUser as useUserFire,
    useStorage,
} from 'reactfire';
import { User } from 'firebase';
import { IProfile } from '../features/profile/typings';
import { useParams } from 'react-router';
import { useSnackbar } from 'notistack';

const DEFAULT_IMAGE_PATH = 'userPhotos/default.jpg';
const GET_BASE_IMAGE_PATH = (path: string) => `https://firebasestorage.googleapis.com/v0/b/ration-base.appspot.com/o/avatars%2F${path}?alt=media`;

const useUser = (isMy?: boolean) => {
    const { enqueueSnackbar } = useSnackbar();


    const user = useUserFire<User>();
    const isAuth = user !== null;
    const userId = isAuth ? user.uid : 'none';

    const storage = useStorage();
    const avatarRef = storage.ref('avatars').child(userId);

    const { id } = useParams<{ id: string }>();
    const selectedId = isMy ? userId : id;

    const userDetailsRef = useFirestore()
        .collection('users')
        .doc(selectedId);
    const { name = '', avatar = DEFAULT_IMAGE_PATH, experience = 0 } = useFirestoreDocData(userDetailsRef);

    const editProfile = (data: Partial<IProfile>) => {
        userDetailsRef.set({ ...data, userId, avatar: GET_BASE_IMAGE_PATH(userId) }, { merge: true })
            .then(() => enqueueSnackbar('Информация сохранена', { variant: 'success' }))
            .catch((error) => enqueueSnackbar('Произошла ошибка при сохранении: ' + error, { variant: 'error' }));
    };

    const addExperience = (diffExp: number) => {
        userDetailsRef.set({ experience: experience + diffExp }, { merge: true })
            .then(() => enqueueSnackbar(`${diffExp > 0 ? '+' : ''} ${diffExp} опыта`, { variant: 'info' }))
            .catch((error) => enqueueSnackbar('Произошла ошибка при получении опыта: ' + error, { variant: 'error' }));
    };

    const saveAvatar = (file: Partial<IProfile>['file']) => {
        avatarRef.put(file)
            .then(() => enqueueSnackbar('Аватар сохранен', { variant: 'success' }))
            .catch((error) => enqueueSnackbar('Произошла ошибка при сохранении: ' + error, { variant: 'error' }));
    };

    return { isAuth, id, name, avatar, experience, editProfile, saveAvatar, addExperience };
};

export { useUser };
