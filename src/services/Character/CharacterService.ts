import firebase from "../../../firebase/clientApp";
import { useUser, useUserDocument } from "../UserService";
import { useCharactersCollection } from "./UseCharacterCollection";

export interface Character {
    name: string;
    id: string;
}

export const useCharacters = () => {
    const { characters, charactersLoading, charactersError } =
        useCharactersCollection();
    const { user, userLoading, userError } = useUser();
    const { userDocument, userDocumentLoading, userDocumentError } =
        useUserDocument(user ? user?.uid : "");
    const usersCharacterIds: string[] = userDocument?.data()?.characters || [];
    const allCharacters = characters?.docs || [];

    const usersCharactersLoading =
        charactersLoading || userLoading || userDocumentLoading;

    const usersCharacters: Character[] = [];
    allCharacters.forEach((characterDoc) => {
        usersCharacterIds.includes(characterDoc.data().id) &&
            usersCharacters.push(characterDoc.data() as Character);
    });

    const characterDocs: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[] =
        [];
    allCharacters.map((character) => {
        characterDocs.push(character);
    });

    return {
        usersCharacters,
        usersCharactersLoading,
        charactersError,
        userError,
        userDocumentError,
        characterDocs,
    };
};
