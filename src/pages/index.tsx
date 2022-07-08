import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import { AppConfig } from "@/utils/AppConfig";
import { ThemeLayout } from "@/layouts/ThemeLayout";

export const Index = () => {
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
