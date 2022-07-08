import dynamic from "next/dynamic";

import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";

// dynamic required for theme switching
const DynamicPortfolio = dynamic(() => import("@/page-components/portfolio"), {
    ssr: false,
});

export const Index = () => {
    return (
        <Main
            meta={
                <Meta
                    title="Duncan Van Keulen"
                    description="A personal project portfolio site."
                />
            }
        >
            <DynamicPortfolio></DynamicPortfolio>
        </Main>
    );
};

export default Index;
