import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import { AppConfig } from "@/utils/AppConfig";
import { ThemeLayout } from "@/layouts/ThemeLayout";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase/clientApp";

export const Index = () => {
    const [user, loading, error] = useAuthState(firebase.auth());
    console.log(
        "Loading:",
        loading,
        "|",
        "Current user:",
        user,
        "|",
        "Error:",
        error
    );
    return (
        <Main
            meta={
                <Meta
                    title={AppConfig.title}
                    description={AppConfig.description}
                />
            }
        >
            <ThemeLayout>I work!</ThemeLayout>
        </Main>
    );
};

export default Index;
