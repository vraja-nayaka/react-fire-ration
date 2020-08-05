import * as functions from 'firebase-functions';
// import {firestore} from 'firebase';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});

type Timestamp = number;

interface ISuccess {
    day: Timestamp;
    count?: number;
}

exports.expCount = functions.firestore.document('/habits/{documentId}')
    .onUpdate((snap, context) => {
        // Grab the current value of what was written to Cloud Firestore.
        const successBefore: ISuccess[] = snap.before.data().original.success;
        const successAfter: ISuccess[] = snap.after.data().original.success;
        const experience = (successAfter.filter((value) => value.count).length - successBefore.filter((value) => value.count).length) * 2;
        // Access the parameter `{documentId}` with `context.params`
        functions.logger.log('expCounting', context.params.documentId, experience);
        // const userRef = firestore().doc(`/users/${context.auth?.uid}`);

        // You must return a Promise when performing asynchronous tasks inside a Functions such as
        // writing to Cloud Firestore.
        // Setting an 'uppercase' field in Cloud Firestore document returns a Promise.
        return snap.after.data().set({ experience }, { merge: true });
    });