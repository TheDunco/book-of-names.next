import * as functions from "firebase-functions";
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

export const createUserDocument = functions.auth.user().onCreate((user) => {
    db.collection("users")
        .doc(user.uid)
        .set(JSON.parse(JSON.stringify(user)));
    db.collection("users")
        .doc(user.uid)
        .collection("characters")
        .set(
            {
                settings: {
                    currentTheme: "CLASSIC",
                    currentCharacter: "",
                    currentLayout: "horizontal",
                },
            },
            { merge: true }
        );
});
