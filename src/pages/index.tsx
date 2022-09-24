import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import { AppConfig } from "@/utils/AppConfig";
import { SignInScreen } from "../components/Auth";
import { ThemeLayout } from "@/layouts/ThemeLayout";
import { Dashboard } from "../components/Dashboard/Dashboard";
import { Loader } from "@/components/Loader";
import { useUser } from "@/services/user-service";

export const Index = () => {
    const { user, userLoading, userError } = useUser();
    return (
        <Main
            meta={
                <Meta
                    title={AppConfig.title}
                    description={AppConfig.description}
                />
            }
        >
            <ThemeLayout backgroundImage={user && user.photoURL}>
                {!user && userLoading && (
                    <div className="w-full flex justify-center align-center">
                        <Loader />
                    </div>
                )}
                {user && <Dashboard />}
                {!user && !userLoading && <SignInScreen />}
                {userError && (
                    <>
                        {userError.code}: {userError.message}
                    </>
                )}
            </ThemeLayout>
        </Main>
    );
};

export default Index;
