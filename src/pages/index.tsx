import dynamic from "next/dynamic";

import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import { AppConfig } from "@/utils/AppConfig";

// dynamic required for theme switching
const DynamicThemeLayout = dynamic(() => import("@/layouts/ThemeLayout"), {
    ssr: false,
});

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
            <DynamicThemeLayout>I work!</DynamicThemeLayout>
        </Main>
    );
};

export default Index;
