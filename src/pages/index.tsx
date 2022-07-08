import dynamic from "next/dynamic";

import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";

// dynamic required for theme switching
const DynamicThemeLayout = dynamic(() => import("@/layouts/ThemeLayout"), {
    ssr: false,
});

export const Index = () => {
    return (
        <Main
            meta={
                <Meta
                    title="Book of Names v2"
                    description="A D&D 5e character sheet"
                />
            }
        >
            <DynamicThemeLayout></DynamicThemeLayout>
        </Main>
    );
};

export default Index;
