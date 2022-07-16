import { ThemesEnum } from "@/templates/Main";
import { Character } from "@/types/character/character";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import firebase from "../../firebase/clientApp";

export interface UserSettings {
    currentTheme: ThemesEnum;
    currentCharacter: string;
    currentLayout: string;
}

export interface User {
    characters: Character[] | undefined;
    customClaims?: {} | undefined;
    disabled?: boolean;
    displayName: string;
    email: string;
    emailVerified: boolean;
    metadata?: {
        creationTime: string;
        lastSignInTime: string;
    };
    pashwordHash?: string | null;
    passwordSalt?: string | null;
    phoneNumber?: string | null;
    photoURL: string;
    providerData: [
        {
            displayName: string;
            email: string;
            photoURL: string;
            providerId: string;
            uid: string;
        }
    ];
    tokensValidAfterTime?: string | null;
    uid: string;
    settings?: UserSettings;
}

export const useUser = () => {
    const [user, userLoading, userError] = useAuthState(firebase.auth());

    const [usersCollection] = useCollection(
        firebase.firestore().collection("users")
    );
    return { user, userLoading, userError, usersCollection };
};

export const useUserDocument = (userId: string) => {
    if (!userId) {
        return { userDocument: undefined, userDocumentLoading: true };
    }
    const [userDocument, userDocumentLoading, userDocumentError] = useDocument(
        firebase.firestore().collection("users").doc(userId)
    );
    return { userDocument, userDocumentLoading, userDocumentError };
};

export const useCurrentUserSnapshot = (): User => {
    const { user } = useUser();
    const { userDocument } = useUserDocument(user?.uid ?? "");

    return userDocument?.data() as User;
};
