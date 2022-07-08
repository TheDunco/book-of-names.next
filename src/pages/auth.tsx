import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../../firebase/clientApp";

// Configure FirebaseUI.
const uiConfig = {
    // Redirect to / after sign in successful.
    signInSuccessUrl: "/",
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
};

const SignInScreen: React.FC = () => {
    return (
        <div className="flex flex-col text-center align-middle justify-center">
            <h1 className="font-inter text-xl font-bold mt-10 ">
                Welcome to the Book of Names!
            </h1>
            <p className="font-inter text-lg mt-2">
                To continue, please sign in:
            </p>
            <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
            />
        </div>
    );
};

export default SignInScreen;
