import { Character } from "@/types/character/5e-character";
import { RecursivePartial } from "@/types/character/RecursivePartial";
import firebase from "../../firebase/clientApp";

export const charRefSet = (
    character: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>,
    data: RecursivePartial<Character>
) => {
    character.ref.set(data, { merge: true });
};
