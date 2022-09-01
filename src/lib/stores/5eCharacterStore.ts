import { AlignmentEnum, Health, Summary } from "@/types/character/5e-character";
import create from "zustand";

type SummaryState = { summary: Summary };

type FifthEditionCharacterStore = SummaryState & {
    health: Health;
    incrementCurrentHp: (step?: number) => number;
    decrementCurrentHp: (step?: number) => number;
    setCurrentHp: (val: number) => number;
} & {
    name: string;
    class: string;
    level: number;
};

export const use5eCharacterStore = create<FifthEditionCharacterStore>(
    (set, get) => ({
        name: "",
        class: "",
        level: 1,

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

        health: {
            deathSaveFails: 0,
            deathSaveSuccesses: 0,
            hitDiceCurrent: 1,
            hitDiceMax: 1,
            hitDiceType: 8,
            hpCurrent: 10,
            hpMax: 10,
            hpTemp: 0,
        },
        setCurrentHp: (val) => {
            const currentHealth = get().health;

            if (val >= currentHealth.hpMax) {
                set({
                    health: {
                        ...currentHealth,
                        hpCurrent: currentHealth.hpMax,
                    },
                });
            } else if (val <= -currentHealth.hpMax) {
                set({
                    health: {
                        ...currentHealth,
                        hpCurrent: -currentHealth.hpMax,
                    },
                });
            } else {
                set({
                    health: {
                        ...currentHealth,
                        hpCurrent: val,
                    },
                });
            }
            return get().health.hpCurrent;
        },
        incrementCurrentHp: (step = 1) => {
            const currentHealth = get().health;

            if (currentHealth.hpCurrent + step >= currentHealth.hpMax) {
                set({
                    health: {
                        ...currentHealth,
                        hpCurrent: currentHealth.hpMax,
                    },
                });
            } else {
                set({
                    health: {
                        ...currentHealth,
                        hpCurrent: step,
                    },
                });
            }
            return get().health.hpCurrent;
        },
        decrementCurrentHp: (step = 1) => {
            const currentHealth = get().health;

            if (currentHealth.hpCurrent - step <= -currentHealth.hpMax) {
                set({
                    health: {
                        ...currentHealth,
                        hpCurrent: -currentHealth.hpMax,
                    },
                });
            } else {
                set({
                    health: {
                        ...currentHealth,
                        hpCurrent: currentHealth.hpCurrent - step,
                    },
                });
            }
            return get().health.hpCurrent;
        },
    })
);
