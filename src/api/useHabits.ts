import {
    useFirestore,
    useFirestoreCollection,
    useUser as useUserFire,
} from 'reactfire';
import { firestore, User } from 'firebase';
import { IHabit } from '../features/profile/typings';
import { useParams } from 'react-router';
import { useSnackbar } from 'notistack';

const useHabits = (isMy?: boolean) => {
    const { enqueueSnackbar } = useSnackbar();

    const user: User = useUserFire();
    const { id } = useParams<{ id: string }>();
    const selectedId = isMy ? user.uid : id;

    const habitsRef = useFirestore()
        .collection('habits');

    const habits: IHabit[] = [];
    useFirestoreCollection(habitsRef.where('userId', '==', selectedId).where('status', '==', 'active')).forEach((doc: firestore.DocumentData) => {
        habits.push({ ...doc.data(), id: doc.id })
    });

    const addHabit = (data: IHabit) => habitsRef.add({ ...data, userId: user.uid })
    .then(() => enqueueSnackbar('Информация сохранена', { variant: 'success' }))
    .catch((error) => enqueueSnackbar('Произошла ошибка при сохранении: ' + error, { variant: 'error' }));
  
  const editHabit = (data: IHabit) => habitsRef.doc(data.id).set(data, { merge: true })
    .then(() => enqueueSnackbar('Информация сохранена', { variant: 'success' }))
    .catch((error) => enqueueSnackbar('Произошла ошибка при сохранении: ' + error, { variant: 'error' }));

    return {habits, addHabit, editHabit};
};

export {useHabits};
