import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import { AppConfig } from "@/utils/AppConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase/clientApp";
import { SignInScreen } from "../components/Auth";
import { ThemeLayout } from "@/layouts/ThemeLayout";
import { Dashboard } from "../components/Dashboard";
import { Loader } from "@/components/Loader";

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
            <ThemeLayout authState={user}>
                {!user && loading && (
                    <div className="w-full flex justify-center align-center">
                        <Loader />
                    </div>
                )}
                {user && <Dashboard />}
                {!user && !loading && <SignInScreen />}
                {error && (
                    <>
                        {error.code}: {error.message}
                    </>
                )}
            </ThemeLayout>
        </Main>
    );
};

export default Index;
