import type { ReactNode } from "react";

type IMainProps = {
    meta: ReactNode;
    children: ReactNode;
};

export enum ThemesEnum {
    CLASSIC = "classic",
    CHERRY = "cherry",
    PACIFIC = "pacific",
    DOLCH = "dolch",
    DESERT = "desert",
    FOREST = "forest",
}

const Main = (props: IMainProps) => (
    <div className="w-full antialiased">
        {props.meta}
        <div className="content flex w-full overflow-x-hidden font-inter text-xl font-thin">
            {props.children}
        </div>
    </div>
);

export { Main };
