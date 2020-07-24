import {
    useFirestoreDocData,
    useFirestore,
    useFirestoreCollectionData,
    useUser as useUserFire,
} from 'reactfire';
import { IProfile } from '../features/profile/typings';
import { useSnackbar } from 'notistack';
import { compareWithSet } from '../helpers/utils';

const useUsers = () => {
    const { enqueueSnackbar } = useSnackbar();
    
    const user: any = useUserFire();
    const usersRef = useFirestore()
        .collection('users');
    const userDetailsRef = usersRef.doc(user.uid);

    const { friends = ['none'] } = useFirestoreDocData<IProfile>(userDetailsRef);

    const allUsers = useFirestoreCollectionData<IProfile>(usersRef);

    const {friendUsers, otherUsers} = compareWithSet(allUsers, friends);

    const subscribeUser = (userId: string) => userDetailsRef.set({ friends: [...friends, userId] }, { merge: true })
        .then(() => enqueueSnackbar('Друг добавлен!', { variant: 'success' }))
        .catch((error) => enqueueSnackbar('Произошла ошибка при добавлении друга ' + error, { variant: 'error' }));

    const unsubscribeUser = (userId: string) => userDetailsRef.set({ friends: friends.splice(friends.indexOf(userId) + 1, 1) }, { merge: true })
        .then(() => enqueueSnackbar('Вы успешно отписались!', { variant: 'success' }))
        .catch((error) => enqueueSnackbar('Произошла ошибка при отписке ' + error, { variant: 'error' }));

    return { friendUsers, otherUsers, allUsers, subscribeUser, unsubscribeUser };
}


export { useUsers };
