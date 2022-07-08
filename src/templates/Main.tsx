import type { ReactNode } from "react";

type IMainProps = {
    meta: ReactNode;
    children: ReactNode;
};

export enum ThemesEnum {
    CLASSY = "classy",
    CHERRY = "cherry",
    PULSE = "pulse",
    PACIFIC = "pacific",
    PASTEL = "pastel",
    DOLCH = "dolch",
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
