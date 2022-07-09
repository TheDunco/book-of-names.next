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

export const SignInScreen: React.FC<Props> = ({ className }) => {
    return (
        <div
            className={clsx(
                "flex flex-col text-center align-middle justify-center",
                className
            )}
        >
            <h1 className="text-xl lg:text-2xl font-bold mt-10 ">
                Welcome to the Book of Names v2!
            </h1>
            <p className="text-lg lg:text-xl">To continue, please sign in:</p>
            <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
            />
        </div>
    );
};
