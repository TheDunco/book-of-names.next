import { useLocalStorage, useToggle } from "@mantine/hooks";
import { Tooltip } from "flowbite-react";
import { useState } from "react";
import { CaretDown, Palette } from "tabler-icons-react";
import clsx from "clsx";

import { ThemeButton } from "@/components/Buttons/ThemeSelectButton";
import { ThemesEnum } from "@/templates/Main";
import { AppConfig } from "@/utils/AppConfig";

const flexSyles = "flex flex-1 grow flex-col justify-start";
const textStyles = "text-color-text";
const localStorageThemeEntry = "color-scheme";
const defaultTheme = ThemesEnum.CLASSY;

export const Portfolio: React.FC = () => {
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
                    "scroll-smooth bg-color-bg align-middle md:text-lg lg:text-2xl transition-all ease-in-out duration-300"
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
                                <Tooltip content="Coolers color generator">
                                    <a
                                        href="https://coolors.co/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Palette
                                            size={20}
                                            strokeWidth={2}
                                            color={"white"}
                                        />
                                    </a>
                                </Tooltip>
                            </span>
                            <span className="text-color-bg">Site Theme</span>
                            <span
                                className={clsx(
                                    "ease-in-out transform-gpu duration-200 transition-all",
                                    themeExpandedToggle
                                        ? "rotate-180 mt-1 lg:mt-2"
                                        : "mb-1 lg:mt-2"
                                )}
                            >
                                <CaretDown />
                            </span>
                        </button>
                        <div aria-label="theme-accordion" id="theme-accordion">
                            <div
                                className={clsx(
                                    "flex justify-evenly flex-col my-36 mx-2 md:my-0 md:flex-row py-1 gap-5 ease-in-out transform-gpu duration-300 transition-all",
                                    themeExpandedToggle
                                        ? "block h-14"
                                        : " -translate-y-72 md:-translate-y-20 h-0 opacity-0 my-0"
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
                <div className="py-8 text-center text-sm text-color-text lg:text-base">
                    © Copyright {new Date().getFullYear()} {AppConfig.title}.
                    Powered with{" "}
                    <span role="img" aria-label="Love">
                        ♥
                    </span>{" "}
                    by{" "}
                    <a href="https://creativedesignsguru.com">
                        CreativeDesignsGuru{" "}
                    </a>
                    using NextJS, React, and TailwindCSS. Icons by{" "}
                    <a href="https://icons8.com">Icons8</a>
                </div>
            </div>
        </>
    );
};

export default Portfolio;
