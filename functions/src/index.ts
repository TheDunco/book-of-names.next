import * as functions from "firebase-functions";
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
const cors = require("cors")({ origin: true });

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

//https://www.youtube.com/watch?v=qZ1EFnFOGvE&ab_channel=Academind
//https://www.youtube.com/watch?v=XeiOnkEI7XI&ab_channel=Academind
export const uploadFile = functions.https.onRequest(
    (req: functions.https.Request, res: functions.Response<any>) => {
        cors(req, res, (request: any, response: any) => {
            if (request.method !== "POST") {
                return response
                    .status(405)
                    .json({ message: "Method not allowed" });
            }
            return response.status(200).json({ message: "success" });
        });
    }
);
