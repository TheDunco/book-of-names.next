import firebase from "../../../firebase/clientApp";
import { useUser, useUserDocument } from "../user-service";
import { useCharactersCollection } from "./use-character-collection";

export const useCharacters = () => {
    const {
        characters,
        charactersLoading: charactersCollectionLoading,
        charactersError,
    } = useCharactersCollection();
    const { user, userLoading } = useUser();
    const { userDocument, userDocumentLoading } = useUserDocument(
        user ? user?.uid : ""
    );
    const usersCharacterIds: string[] = userDocument?.data()?.characters || [];
    const allCharacters = characters?.docs || [];

    const charactersLoading =
        charactersCollectionLoading || userLoading || userDocumentLoading;

    const characterDocs: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[] =
        [];
    allCharacters
        .filter((character) => {
            return usersCharacterIds.includes(character.id);
        })
        .map((character) => {
            characterDocs.push(character);
        });

    return {
        characterDocs,
        charactersLoading,
        charactersError,
    };
};
