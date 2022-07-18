import firebase from "../../../firebase/clientApp";

export const deleteCharacter = (
    characterId: string,
    characterName: string,
    userId: string | undefined
) => {
    if (!userId) {
        throw new Error("User ID is required to delete a character");
    }
    if (confirm(`Are you sure you want to delete ${characterName}?`)) {
        firebase.firestore().collection("characters").doc(characterId).delete();
        firebase
            .firestore()
            .collection("users")
            .doc(userId)
            .update({
                characters:
                    firebase.firestore.FieldValue.arrayRemove(characterId),
            });
    }
};
