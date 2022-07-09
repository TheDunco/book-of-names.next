import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import { AppConfig } from "@/utils/AppConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase/clientApp";
import { SignInScreen } from "../components/Auth";
import { ThemeLayout } from "@/layouts/ThemeLayout";
import { Dashboard } from "../components/Dashboard";

export const Index = () => {
    const [user, loading, error] = useAuthState(firebase.auth());
    return (
        <Main
            meta={
                <Meta
                    title={AppConfig.title}
                    description={AppConfig.description}
                />
            }
        >
            <ThemeLayout>
                {loading && <div className="m-10 text-center">Loading...</div>}
                {!user && <SignInScreen />}
                {error && (
                    <>
                        {error.code}: {error.message}
                    </>
                )}
                {user && <Dashboard />}
            </ThemeLayout>
        </Main>
    );
};

export default Index;
