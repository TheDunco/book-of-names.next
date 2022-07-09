import clsx from "clsx";
import firebase from "../../firebase/clientApp";
import { PrimaryButton } from "./Buttons/PrimaryButton";

interface Props {
    className?: string;
}

export const Dashboard: React.FC<Props> = ({ className }) => {
    return (
        <>
            <div className={clsx(className, "")}>
                <PrimaryButton
                    onClick={() => {
                        firebase.auth().signOut();
                    }}
                >
                    Logout
                </PrimaryButton>
            </div>
        </>
    );
};
