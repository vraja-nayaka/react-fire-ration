import {
    useFirestoreDocData,
    useFirestore,
    useFirestoreCollection,
    useFirestoreCollectionData,
    useUser as useUserFire,
} from 'reactfire';
import { firestore } from 'firebase';
import { IHabit, IProfile } from '../features/profile/typings';
import { useParams } from 'react-router';
import { useSnackbar } from 'notistack';

const DEFAULT_IMAGE_PATH = 'userPhotos/default.jpg';

const useHabits = () => {
    const { id } = useParams<{ id: string }>()

    const habitsRef = useFirestore()
        .collection('habits');

    const habits: IHabit[] = [];
    useFirestoreCollection(habitsRef.where('userId', '==', id).where('status', '==', 'active')).forEach((doc: firestore.DocumentData) => {
        habits.push({ ...doc.data(), id: doc.id })
    });
    return habits;
};

const useUser = () => {
    const { id } = useParams<{ id: string }>()

    const userDetailsRef = useFirestore()
        .collection('users')
        .doc(id);
    const { name = '', avatar = DEFAULT_IMAGE_PATH, experience = 0 } = useFirestoreDocData(userDetailsRef);

    return { id, name, avatar, experience };
};

const useUsers = () => {
    const { enqueueSnackbar } = useSnackbar();

    const user: any = useUserFire();
    const usersRef = useFirestore()
        .collection('users');
    const userDetailsRef = usersRef.doc(user.uid);

    const { friends = ['none'] } = useFirestoreDocData<IProfile>(userDetailsRef);

    const allUsers = useFirestoreCollectionData<IProfile>(usersRef);

    const friendUsers: IProfile[] = [];
    const otherUsers: IProfile[] = [];
    compareWithSet(allUsers, friends);

    function compareWithSet(rows_1: IProfile[], rows_2: string[]) {
        let set = new Set(rows_2);
        rows_1.forEach(row_1 => {
            set.has(row_1.userId) ? friendUsers.push(row_1) : otherUsers.push(row_1);
        });
    };

    const subscribeUser = (userId: string) => userDetailsRef.set({ friends: [...friends, userId] }, { merge: true })
        .then(() => enqueueSnackbar('Друг добавлен!', { variant: 'success' }))
        .catch((error) => enqueueSnackbar('Произошла ошибка при добавлении друга ' + error, { variant: 'error' }));

    const unsubscribeUser = (userId: string) => userDetailsRef.set({ friends: friends.splice(friends.indexOf(userId) + 1, 1) }, { merge: true })
        .then(() => enqueueSnackbar('Вы успешно отписались!', { variant: 'success' }))
        .catch((error) => enqueueSnackbar('Произошла ошибка при отписке ' + error, { variant: 'error' }));

    return { friendUsers, otherUsers, allUsers, subscribeUser, unsubscribeUser };
}


export const api = {
    useHabits,
    useUser,
    useUsers,
};
