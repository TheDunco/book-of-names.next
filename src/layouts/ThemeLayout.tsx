import { useLocalStorage, useToggle } from "@mantine/hooks";
import clsx from "clsx";
// import { Tooltip } from "flowbite-react";
import { useState } from "react";

import { ThemeButton } from "@/components/Buttons/ThemeSelectButton";
import { ThemesEnum } from "@/templates/Main";
import { AppConfig } from "@/utils/AppConfig";
import { ExpansionCarret } from "@/components/ExpansionCarret";
import { Bullet } from "@/components/Bullet";

const flexSyles = "flex flex-1 grow flex-col justify-start";
const textStyles = "text-color-text";
const localStorageThemeEntry = "color-scheme";
const defaultTheme = ThemesEnum.CLASSY;

interface Props {
    children: React.ReactNode;
}

export const ThemeLayout: React.FC<Props> = ({ children }) => {
    const [theme, setTheme] = useLocalStorage({
        key: localStorageThemeEntry,
        defaultValue: defaultTheme,
    });
    const [fontStyles, setFontStyles] = useState("font-theme-font");
    const [themeExpandedToggle, toggleTheme] = useToggle(false, [true, false]);

    return (
        <>
            <div
                data-theme={theme}
                className={clsx(
                    flexSyles,
                    textStyles,
                    fontStyles,
                    "scroll-smooth bg-color-bg align-middle transition-all duration-300 ease-in-out md:text-lg lg:text-2xl"
                )}
            >
                <header>
                    <div className="flex flex-col justify-end bg-color-primary py-5">
                        <button
                            className="flex flex-row justify-end"
                            onClick={() => {
                                toggleTheme();
                            }}
                        >
                            <span className="pt-1 pr-1 opacity-70">
                                {/* <Tooltip content="Coolers color generator"> */}
                                {/* <a
                                    href="https://coolors.co/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Palette
                                        size={20}
                                        strokeWidth={2}
                                        color={"white"}
                                    />
                                </a> */}
                                {/* </Tooltip> */}
                            </span>
                            <span className="text-color-bg">Site Theme</span>
                            <ExpansionCarret down={themeExpandedToggle} />
                        </button>
                        <div aria-label="theme-accordion" id="theme-accordion">
                            <div
                                className={clsx(
                                    "my-36 mx-2 flex transform-gpu flex-col justify-evenly gap-5 py-1 transition-all duration-300 ease-in-out md:my-0 md:flex-row",
                                    themeExpandedToggle
                                        ? "block h-14"
                                        : " my-0 h-0 -translate-y-72 opacity-0 md:-translate-y-20"
                                )}
                            >
                                <ThemeButton
                                    themeSet={setTheme}
                                    theme={ThemesEnum.CLASSY}
                                    fontSet={setFontStyles}
                                    font="font-roboto-slab"
                                />
                                <ThemeButton
                                    themeSet={setTheme}
                                    theme={ThemesEnum.CHERRY}
                                    fontSet={setFontStyles}
                                    font="font-monsterrat"
                                />
                                <ThemeButton
                                    themeSet={setTheme}
                                    theme={ThemesEnum.PACIFIC}
                                    fontSet={setFontStyles}
                                    font="font-open"
                                />
                                <ThemeButton
                                    themeSet={setTheme}
                                    theme={ThemesEnum.PULSE}
                                    fontSet={setFontStyles}
                                    font="font-inter"
                                />
                                <ThemeButton
                                    themeSet={setTheme}
                                    theme={ThemesEnum.PASTEL}
                                    fontSet={setFontStyles}
                                    font="font-fira"
                                />
                                <ThemeButton
                                    themeSet={setTheme}
                                    theme={ThemesEnum.DOLCH}
                                    fontSet={setFontStyles}
                                    font="font-open"
                                />
                            </div>
                        </div>
                    </div>
                </header>
                <div className="m-5">{children}</div>
                <div className="py-8 text-center text-sm text-color-text lg:text-base">
                    © Copyright {new Date().getFullYear()} {AppConfig.title}.
                    Initial template powered with{" "}
                    <span role="img" aria-label="Love">
                        ♥
                    </span>{" "}
                    by{" "}
                    <a href="https://creativedesignsguru.com">
                        CreativeDesignsGuru{" "}
                    </a>
                    Modified by {AppConfig.author}
                    <Bullet />v{AppConfig.version}
                </div>
            </div>
        </>
    );
};
