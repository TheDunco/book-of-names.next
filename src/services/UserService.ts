import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import firebase from "../../firebase/clientApp";

export const useUser = () => {
    const [user, userLoading, userError] = useAuthState(firebase.auth());

    const [usersCollection] = useCollection(
        firebase.firestore().collection("users")
    );
    return { user, userLoading, userError, usersCollection };
};

export const useUserDocument = (userId: string) => {
    const [userDocument, userDocumentLoading, userDocumentError] = useDocument(
        firebase.firestore().collection("users").doc(userId)
    );
    return { userDocument, userDocumentLoading, userDocumentError };
};
