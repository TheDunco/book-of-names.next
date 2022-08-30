import firebase from "../../../firebase/clientApp";
import { useDocument } from "react-firebase-hooks/firestore";

export const useCharacter = (characterId: string) => {
    const [character, characterLoading, characterError] = useDocument(
        firebase.firestore().doc(`characters/${characterId}`)
    );
    if (!character) {
        return { character: null, characterLoading, characterError };
    }
    return { character, characterLoading, characterError };
};
