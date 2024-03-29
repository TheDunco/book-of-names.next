import { useLocalStorage, useToggle } from "@mantine/hooks";
import firebase from "../../firebase/clientApp";
import clsx from "clsx";
import { useState } from "react";
import { ThemeButton } from "@/components/Buttons/ThemeSelectButton";
import { ThemesEnum } from "@/templates/Main";
import { AppConfig } from "@/utils/AppConfig";
import { Bullet } from "@/components/Bullet";
import {
    BrandFirebase,
    BrandGithub,
    BrandNextjs,
    BrandReactNative,
    Menu2,
    X,
} from "tabler-icons-react";
import { useDocument } from "react-firebase-hooks/firestore";
import { loaderURL } from "@/components/Loader";
import { TextButton } from "@/components/Buttons/TextButton";
import { User, useUser } from "@/services/user-service";
import { setDocMerge } from "@/services/firebase-helpers";
import { twMerge } from "tailwind-merge";
import { useSettingsStore } from "@/lib/stores/SettingsStore";
import { layoutHorizontal } from "@/components/Dashboard/Dashboard";
import { Tooltip } from "@/components/Tooltip";

const flexSyles = "flex flex-1 grow flex-col justify-start";
const textStyles = "text-color-text";
const localStorageThemeEntry = "color-scheme";
const defaultTheme = ThemesEnum.DEFAULT;

interface Props {
    children: React.ReactNode;
    backgroundImage?: string | null;
}

export const ThemeLayout: React.FC<Props> = ({ children, backgroundImage }) => {
    const { user } = useUser();
    const [theme, setTheme] = useLocalStorage({
        key: localStorageThemeEntry,
        defaultValue: defaultTheme,
    });
    const [fontStyles, setFontStyles] = useState("font-theme-font");
    const [showSidebar, toggleSidebar] = useToggle(false, [true, false]);
    // const [showThemes, toggleThemes] = useToggle(false, [true, false]);
    const [userDoc, loading] = useDocument(
        firebase.firestore().doc(`users/${user?.uid}`)
    );
    const photoURL: string = userDoc?.data()?.photoURL;
    // const userCurrentTheme = userDoc?.data()?.settings?.currentTheme;
    // useEffect(() => {
    //     if (user) {
    //         setTheme(userCurrentTheme ?? theme);
    //     }
    // }, [user, setTheme, userCurrentTheme, theme]);

    const staticUser = userDoc?.data() as User;
    const settingsStore = useSettingsStore();
    if (user && !!staticUser) {
        settingsStore.firebaseUser = user;
        settingsStore.settings.currentLayout =
            staticUser.settings?.currentLayout || layoutHorizontal;
        settingsStore.settings.currentTheme =
            staticUser.settings?.currentTheme || theme;
        settingsStore.settings.dashboardBackgroundImageLink =
            staticUser.settings?.dashboardBackgroundImageLink ||
            backgroundImage ||
            "";
        settingsStore.settings.sheetAccordionBlur =
            staticUser.settings?.sheetAccordionBlur || true;
        settingsStore.userDoc = userDoc;
    }

    return (
        <>
            <div
                className="fixed w-full -z-10 h-full blur-sm"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                }}
            ></div>
            <div
                data-theme={theme}
                className={twMerge(
                    flexSyles,
                    textStyles,
                    fontStyles,
                    showSidebar ? "grid grid-cols-[0fr_1fr] touch-none" : "",
                    "scroll-smooth transition-all duration-300 ease-in-out text-lg z-0 overflow-hidden"
                )}
            >
                <button
                    className={clsx(
                        showSidebar ? "rotate-90" : "rotate-0",
                        "fixed transition-all duration-[250ms] ease-in-out ml-5 mt-5 z-50"
                    )}
                    onClick={() => {
                        toggleSidebar();
                    }}
                >
                    {showSidebar ? (
                        <X className={clsx(showSidebar ? "" : "opacity-0")} />
                    ) : (
                        <Menu2
                            className={clsx(showSidebar ? "opacity-0" : "")}
                        />
                    )}
                </button>
                <header>
                    <div
                        className={clsx(
                            "fixed w-full bg-color-primary h-16 shadow-lg",
                            showSidebar && "blur-sm"
                        )}
                    >
                        <div className="absolute text-color-primary sm:text-color-bg left-[calc(50%-7rem)] transition-all duration-300 whitespace-nowrap text-2xl top-3 sm:top-2 sm:text-3xl z-0 select-none">
                            {AppConfig.title}
                        </div>
                        <div
                            className={clsx(
                                "relative left-[calc(100%-4rem)] top-1",
                                user ? "visible" : "hidden"
                            )}
                        >
                            <Tooltip content="Sign out" direction="left">
                                <img
                                    id="user-photo"
                                    data-tip
                                    alt="User"
                                    aria-label="user-photo"
                                    src={loading ? loaderURL : photoURL}
                                    height="48px"
                                    width="48px"
                                    className="rounded-full cursor-pointer select-none"
                                    onClick={() => {
                                        firebase.auth().signOut();
                                    }}
                                />
                            </Tooltip>
                        </div>
                    </div>
                </header>
                <aside
                    className={clsx(
                        showSidebar
                            ? "w-72 h-full overflow-y-auto"
                            : "w-72 h-full -ml-80",
                        "fixed transition-all duration-300 ease-in-out bg-color-secondary z-20 shadow-xl"
                    )}
                >
                    <TextButton
                        className={clsx(
                            "flex text-color-bg border-color-special mt-12 text-center justify-center w-[calc(100%-1.5rem)] mx-3 hover:brightness-100 py-0"
                        )}
                    >
                        <div>Change Theme</div>
                    </TextButton>
                    <div
                        className={clsx(
                            "p-3 h-fit opacity-1 transition-[visibility_0.5s,_opacity_0.1s_linear]"
                        )}
                    >
                        <ThemeButton
                            themeSet={setTheme}
                            theme={ThemesEnum.DEFAULT}
                            fontSet={setFontStyles}
                            font="fira"
                            className="mb-3"
                            onClick={() => {
                                setDocMerge(userDoc, {
                                    settings: {
                                        currentTheme: ThemesEnum.DEFAULT,
                                    },
                                });
                            }}
                        />

                        <ThemeButton
                            themeSet={setTheme}
                            theme={ThemesEnum.CLASSIC}
                            fontSet={setFontStyles}
                            font="font-roboto-slab"
                            className="mb-3"
                            onClick={() => {
                                setDocMerge(userDoc, {
                                    settings: {
                                        currentTheme: ThemesEnum.CLASSIC,
                                    },
                                });
                            }}
                        />

                        <ThemeButton
                            themeSet={setTheme}
                            theme={ThemesEnum.DESERT}
                            fontSet={setFontStyles}
                            font="font-roboto-slab"
                            className="mb-3"
                            onClick={() => {
                                setDocMerge(userDoc, {
                                    settings: {
                                        currentTheme: ThemesEnum.DESERT,
                                    },
                                });
                            }}
                        />

                        <ThemeButton
                            themeSet={setTheme}
                            theme={ThemesEnum.FOREST}
                            fontSet={setFontStyles}
                            font="font-monsterrat"
                            className="mb-3"
                            onClick={() => {
                                setDocMerge(userDoc, {
                                    settings: {
                                        currentTheme: ThemesEnum.FOREST,
                                    },
                                });
                            }}
                        />

                        <ThemeButton
                            themeSet={setTheme}
                            theme={ThemesEnum.CHERRY}
                            fontSet={setFontStyles}
                            font="font-monsterrat"
                            className="mb-3"
                            onClick={() => {
                                setDocMerge(userDoc, {
                                    settings: {
                                        currentTheme: ThemesEnum.CHERRY,
                                    },
                                });
                            }}
                        />

                        <ThemeButton
                            themeSet={setTheme}
                            theme={ThemesEnum.PACIFIC}
                            fontSet={setFontStyles}
                            font="font-open"
                            className="mb-3"
                            onClick={() => {
                                setDocMerge(userDoc, {
                                    settings: {
                                        currentTheme: ThemesEnum.PACIFIC,
                                    },
                                });
                            }}
                        />

                        <ThemeButton
                            themeSet={setTheme}
                            theme={ThemesEnum.ARCHFEY}
                            fontSet={setFontStyles}
                            font="font-open"
                            className="mb-3"
                            onClick={() => {
                                setDocMerge(userDoc, {
                                    settings: {
                                        currentTheme: ThemesEnum.ARCHFEY,
                                    },
                                });
                            }}
                        />

                        <ThemeButton
                            themeSet={setTheme}
                            theme={ThemesEnum.ABYSS}
                            fontSet={setFontStyles}
                            font="font-inter"
                            className="mb-3"
                            onClick={() => {
                                setDocMerge(userDoc, {
                                    settings: {
                                        currentTheme: ThemesEnum.ABYSS,
                                    },
                                });
                            }}
                        />

                        <ThemeButton
                            themeSet={setTheme}
                            theme={ThemesEnum.ICEBURG}
                            fontSet={setFontStyles}
                            font="font-inter"
                            className="mb-3"
                            onClick={() => {
                                setDocMerge(userDoc, {
                                    settings: {
                                        currentTheme: ThemesEnum.ICEBURG,
                                    },
                                });
                            }}
                        />

                        <ThemeButton
                            themeSet={setTheme}
                            theme={ThemesEnum.OTHERWORLD}
                            fontSet={setFontStyles}
                            font="font-inter"
                            className="mb-3"
                            onClick={() => {
                                setDocMerge(userDoc, {
                                    settings: {
                                        currentTheme: ThemesEnum.OTHERWORLD,
                                    },
                                });
                            }}
                        />

                        <ThemeButton
                            themeSet={setTheme}
                            theme={ThemesEnum.FIRE}
                            fontSet={setFontStyles}
                            font="font-inter"
                            className="mb-3"
                            onClick={() => {
                                setDocMerge(userDoc, {
                                    settings: {
                                        currentTheme: ThemesEnum.FIRE,
                                    },
                                });
                            }}
                        />
                    </div>
                    <div>
                        <div className="mx-3 pt-5 px-0 text-center text-sm text-color-text lg:text-base border-t border-color-special antialiased">
                            © Copyright {new Date().getFullYear()}{" "}
                            {AppConfig.author}
                            <Bullet />v{AppConfig.version}
                            <span className="flex flex-row justify-center no-underline">
                                <a
                                    href="https://github.com/TheDunco/book-of-names.next"
                                    className="text-color-text no-underline mr-2"
                                >
                                    <BrandGithub />
                                </a>
                                <a
                                    href="https://nextjs.org/"
                                    className="text-color-text no-underline mr-2"
                                >
                                    <BrandNextjs />
                                </a>
                                <a
                                    href="https://reactjs.org/"
                                    className="text-color-text no-underline mr-2"
                                >
                                    <BrandReactNative />
                                </a>
                                <a
                                    href="https://firebase.google.com/"
                                    className="text-color-text no-underline"
                                >
                                    <BrandFirebase />
                                </a>
                            </span>
                        </div>
                    </div>
                </aside>
                <div
                    className={clsx(
                        "flex h-[calc(100vh-4rem)] mt-16 max-h-full justify-start align-start overflow-hidden",
                        showSidebar && "blur-sm"
                    )}
                >
                    {children}
                </div>
            </div>
        </>
    );
};
