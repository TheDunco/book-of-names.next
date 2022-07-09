import clsx from "clsx";
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../../firebase/clientApp";

interface Props {
    className?: string;
}

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

const SignInScreen: React.FC<Props> = ({ className }) => {
    return (
        <div
            className={clsx(
                "flex flex-col text-center align-middle justify-center",
                className
            )}
        >
            <h1 className="font-inter text-xl font-bold mt-10 ">
                Book of Names Login
            </h1>
            <p className="font-inter text-lg font-semibold mt-2">
                Please sign in:
            </p>
            <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
            />
        </div>
    );
};

export default SignInScreen;
