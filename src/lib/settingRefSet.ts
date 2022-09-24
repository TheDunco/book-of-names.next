import { User } from "@/services/user-service";
import { RecursivePartial } from "@/types/character/RecursivePartial";
import firebase from "../../firebase/clientApp";

export const settingRefSet = (
    user: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>,
    data: RecursivePartial<User>
) => {
    user.ref.set(data, { merge: true });
};
