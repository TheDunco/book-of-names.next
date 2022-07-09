import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import { AppConfig } from "@/utils/AppConfig";
import { ThemeLayout } from "@/layouts/ThemeLayout";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase/clientApp";
import Auth from "@/components/Auth";

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
            {loading && <h4>Loading...</h4>}
            {!user && (
                <ThemeLayout>
                    <Auth />
                </ThemeLayout>
            )}
            {error && (
                <>
                    {error.code}: {error.message}
                </>
            )}
            {user && (
                <ThemeLayout>
                    <button
                        onClick={() => {
                            firebase.auth().signOut();
                        }}
                    >
                        Logout
                    </button>
                </ThemeLayout>
            )}
        </Main>
    );
};

export default Index;
