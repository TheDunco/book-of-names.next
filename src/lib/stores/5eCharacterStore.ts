import { AlignmentEnum, Summary } from "@/types/character/5e-character";
import create from "zustand";

type SummaryState = { summary: Summary };

type FifthEditionCharacterStore = SummaryState & {
    name: string;
    class: string;
};

export const use5eCharacterStore = create<FifthEditionCharacterStore>(
    //(set, get)
    () => ({
        name: "",
        class: "",
        summary: {
            age: "",
            background: "",
            class: "",
            eyes: "",
            hair: "",
            height: "",
            alignment: AlignmentEnum.TRUE_NEUTRAL,
            race: "",
            skin: "",
            speed: 30,
            weight: "100lbs",
        },
    })
);
