import firebase from "../../firebase/clientApp";

export const charRefSet = (
    character: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>,
    data: any
) => {
    character.ref.set(data, { merge: true });
};
