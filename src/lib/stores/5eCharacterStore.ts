import { AlignmentEnum, Health, Summary } from "@/types/character/5e-character";
import firebase from "../../../firebase/clientApp";
import create from "zustand";
import { charRefSet } from "../charRefSet";

type SummaryState = { summary: Summary };

type HealthState = {
    health: Health;
    setCurrentHp: (val: number) => void;
    setHpMax: (val: number) => void;
    setDeathSaveSuccesses: (val: number) => void;
    setDeathSaveFails: (val: number) => void;
    unconscious: boolean;
    dead: boolean;
};

type FifthEditionCharacterStore = SummaryState &
    HealthState & {
        name: string;
        class: string;
        level: number;
        firebaseCharacter: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> | null;
    };

export const use5eCharacterStore = create<FifthEditionCharacterStore>(
    (set, get) => ({
        firebaseCharacter: null,
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

        unconscious: false,
        dead: false,

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
            const health = get().health;
            const character = get().firebaseCharacter;
            if (!character) {
                return;
            }

            if (val > health.hpMax) {
                charRefSet(character, {
                    health: { ...health, hpCurrent: health.hpMax },
                });
                set({ health: { ...health, hpCurrent: health.hpMax } });
            } else if (val < -health.hpMax) {
                console.log("Super dead");
                charRefSet(character, {
                    health: { ...health, hpCurrent: -health.hpMax },
                });
                set({ health: { ...health, hpCurrent: -health.hpMax } });
            } else if (val <= 0) {
                console.log("Unconscious");
                charRefSet(character, {
                    health: { ...health, hpCurrent: val },
                });
                set({ health: { ...health, hpCurrent: val } });
            } else {
                charRefSet(character, {
                    health: { ...health, hpCurrent: val },
                });
                set({ health: { ...health, hpCurrent: val } });
            }

            const trueHp = get().health.hpCurrent + get().health.hpTemp;
            if (trueHp > 0) {
                charRefSet(character, {
                    unconscious: false,
                    dead: false,
                });
                set({ unconscious: false, dead: false });
            } else if (trueHp <= -get().health.hpMax) {
                charRefSet(character, {
                    unconscious: true,
                    dead: true,
                });
                set({ unconscious: true, dead: true });
            } else if (trueHp <= 0) {
                charRefSet(character, {
                    unconscious: true,
                });
                set({ unconscious: true });
            }
        },

        setHpMax: (val) => {
            const health = get().health;
            const character = get().firebaseCharacter;
            if (!character) {
                return;
            }

            if (val < 1) {
                charRefSet(character, {
                    health: { ...health, hpMax: 1 },
                });
            } else {
                charRefSet(character, {
                    health: { ...health, hpMax: val },
                });
            }
        },

        setDeathSaveSuccesses(val) {
            const health = get().health;
            const character = get().firebaseCharacter;
            if (!character) {
                return;
            }

            if (val <= 0) {
                charRefSet(character, {
                    health: { ...health, deathSaveSuccesses: 0 },
                });
            } else if (val >= 3) {
                charRefSet(character, {
                    health: {
                        ...health,
                        hpCurrent: 0,
                        deathSaveSuccesses: 0,
                        deathSaveFails: 0,
                    },
                    unconscious: false,
                    dead: false,
                });
            } else {
                charRefSet(character, {
                    health: { ...health, deathSaveSuccesses: val },
                });
            }
        },
        setDeathSaveFails(val) {
            const health = get().health;
            const character = get().firebaseCharacter;
            if (!character) {
                return;
            }

            if (val <= 0) {
                charRefSet(character, {
                    health: { ...health, deathSaveFails: 0 },
                });
            } else if (val >= 3) {
                charRefSet(character, {
                    health: {
                        ...health,
                        deathSaveFails: 3,
                    },
                    unconscious: true,
                    dead: true,
                });
            } else {
                charRefSet(character, {
                    health: { ...health, deathSaveFails: val },
                });
            }
        },
    })
);
