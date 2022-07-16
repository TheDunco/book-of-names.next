import { useDocumentOnce } from "react-firebase-hooks/firestore";
import firebase from "../../../firebase/clientApp";

export const useCharacter = (characterId: string) => {
    const [character, characterLoading, characterError] = useDocumentOnce(
        firebase.firestore().collection("characters").doc(characterId)
    );
    return { character, characterLoading, characterError };
};
