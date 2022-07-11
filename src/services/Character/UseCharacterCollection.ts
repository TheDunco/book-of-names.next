import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "../../../firebase/clientApp";

export const useCharactersCollection = () => {
    const [characters, charactersLoading, charactersError] = useCollection(
        firebase.firestore().collection("characters")
    );
    return { characters, charactersLoading, charactersError };
};
