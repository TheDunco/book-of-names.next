import firebase from "../../../firebase/clientApp";
import create from "zustand";
import { ThemesEnum } from "@/templates/Main";
import { User, UserSettings } from "@/services/user-service";
import { settingRefSet } from "../settingRefSet";

export type SettingsStore = {
    firebaseUser: firebase.User | null;
    toggleSheetAccordionBlur: () => void;
    userDoc?: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>;
    settings: UserSettings;
};

export const useSettingsStore = create<SettingsStore>((set, get) => ({
    settings: {
        sheetAccordionBlur: false,
        firebaseUser: null,
        currentLayout: "",
        dashboardBackgroundImageLink: "",
        currentTheme: ThemesEnum.DEFAULT,
    },
    firebaseUser: null,
    toggleSheetAccordionBlur() {
        const doc = get().userDoc;
        const staticUser = doc?.data() as User;
        const settings = staticUser.settings;
        const current = settings?.sheetAccordionBlur;
        if (doc && settings && current) {
            settingRefSet(doc, {
                settings: {
                    ...settings,
                    sheetAccordionBlur: !current,
                },
            });
            console.log(settings.sheetAccordionBlur);
            set({
                settings: {
                    ...settings,
                    sheetAccordionBlur: current,
                },
            });
        }
    },
}));
