import type { ReactNode } from "react";

type IMainProps = {
    meta: ReactNode;
    children: ReactNode;
};

export enum ThemesEnum {
    DEFAULT = "default",
    DEFAULT_DARK = "default-dark",
    CLASSIC = "classic",
    CHERRY = "cherry",
    PACIFIC = "pacific",
    DOLCH = "dolch",
    DESERT = "desert",
    FOREST = "forest",
    ARCHFEY = "archfey",
    ABYSS = "abyss",
    ICEBURG = "iceburg",
    OTHERWORLD = "otherworld",
    FIRE = "fire",
}

const Main = (props: IMainProps) => (
    <div className="w-full antialiased">
        {props.meta}
        <div className="content flex w-full overflow-hidden font-inter text-xl font-thin">
            {props.children}
        </div>
    </div>
);

export { Main };
