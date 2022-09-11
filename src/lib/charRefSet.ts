import { Character } from "@/types/character/5e-character";
import firebase from "../../firebase/clientApp";

// https://stackoverflow.com/questions/41980195/recursive-partialt-in-typescript
type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
        ? RecursivePartial<U>[]
        : T[P] extends object
        ? RecursivePartial<T[P]>
        : T[P];
};

export const charRefSet = (
    character: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>,
    data: RecursivePartial<Character>
) => {
    character.ref.set(data, { merge: true });
};
