import firebase from "../../firebase/clientApp";

export const setDocMerge = (
    document:
        | firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
        | undefined,
    data: any
) => {
    document?.ref.set(data, { merge: true });
};
