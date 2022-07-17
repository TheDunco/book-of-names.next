import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";

import { capitalizeFirstLetter } from "@/lib/capitalizeFirstLetter";
import type { ThemesEnum } from "@/templates/Main";
import { Loader } from "../Loader";

export interface ThemeButtonProps {
    className?: string;
    theme: ThemesEnum;
    themeSet: (
        val: ThemesEnum | ((prevState: ThemesEnum) => ThemesEnum)
    ) => void;
    fontSet: Dispatch<SetStateAction<string>>;
    font: string;
    onClick?: () => void;
}

export const ThemeButtonStyles =
    "bg-color-bg text-color-text rounded-lg px-2 py-1 border-color-primary hover:bg-color-primary hover:text-color-special w-full max-w-lg";

export const ThemeButton: React.FC<ThemeButtonProps> = ({
    className,
    theme,
    themeSet,
    font,
    fontSet,
    onClick,
}) => {
    const badClickFunctionToAvoidHavingToClickThemeButtonTwice = () => {
        themeSet(theme);
        fontSet(font);
    };
    const [loading, setLoading] = useState(false);
    return (
        <button
            data-theme={theme}
            className={clsx(
                className,
                ThemeButtonStyles,
                font,
                "font-theme-font"
            )}
            onClick={() => {
                if (onClick) {
                    onClick();
                    setLoading(true);
                    setTimeout(() => {
                        badClickFunctionToAvoidHavingToClickThemeButtonTwice();
                        setLoading(false);
                    }, 500);
                }
                badClickFunctionToAvoidHavingToClickThemeButtonTwice();
            }}
        >
            {loading ? (
                <div className="flex justify-center">
                    <Loader className="w-10 h-10" />
                </div>
            ) : (
                capitalizeFirstLetter(theme)
            )}
        </button>
    );
};
