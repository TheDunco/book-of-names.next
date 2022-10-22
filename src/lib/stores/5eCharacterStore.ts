import {
    AbilityScore,
    AbilityScoresEnum,
    AlignmentEnum,
    Health,
    Skill,
    SkillsEnum,
    Summary,
} from "@/types/character/5e-character";
import firebase from "../../../firebase/clientApp";
import create from "zustand";
import { charRefSet } from "../charRefSet";

type SummaryState = { summary: Summary };

type HealthState = {
    health: Health;
    setCurrentHp: (val: number) => void;
    setHpMax: (val: number) => void;
    setDeathSaveSuccesses: (val: number, nat20?: boolean) => void;
    setDeathSaveFails: (val: number) => void;
    unconscious: boolean;
    dead: boolean;
    heal: (val: number) => void;
    damage: (val: number) => void;
    setHitDice: (val: number) => void;
};

type AbilityScoresState = {
    abilityScores: AbilityScore[];
    setProficient: (score: AbilityScore) => void;
};

type SkillsState = {
    skills: Skill[];
    setSkillProficient: (skill: Skill) => void;
    setSkillHalfProficient: (skill: Skill) => void;
    setSkillExpertise: (skill: Skill) => void;
};

type FifthEditionCharacterStore = SummaryState &
    HealthState &
    AbilityScoresState &
    SkillsState & {
        name: string;
        class: string;
        level: number;
        firebaseCharacter: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> | null;
        proficiencyBonus: number;
    };

export const use5eCharacterStore = create<FifthEditionCharacterStore>(
    (set, get) => ({
        name: "",
        class: "",
        level: 1,
        firebaseCharacter: null,
        proficiencyBonus: 2,

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
                charRefSet(character, {
                    health: { ...health, hpCurrent: -health.hpMax },
                });
                set({ health: { ...health, hpCurrent: -health.hpMax } });
            } else if (val <= 0) {
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

        setDeathSaveSuccesses(val, nat20 = false) {
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
                        hpCurrent: nat20 ? 1 : 0,
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
        heal(val) {
            const health = get().health;
            const character = get().firebaseCharacter;
            if (!character) {
                return;
            }

            if (val <= 0) {
                return;
            }

            if (health.hpCurrent + val > health.hpMax) {
                charRefSet(character, {
                    health: {
                        ...health,
                        hpCurrent: health.hpMax,
                    },
                });
            } else {
                charRefSet(character, {
                    health: {
                        ...health,
                        hpCurrent: health.hpCurrent + val,
                    },
                });
            }
        },
        damage(val) {
            const health = get().health;
            const character = get().firebaseCharacter;
            if (!character) {
                return;
            }

            if (val <= 0) {
                return;
            }

            const trueHp = health.hpCurrent + health.hpTemp;

            if (trueHp - val < -health.hpMax) {
                // instadeath
                charRefSet(character, {
                    health: {
                        ...health,
                        hpCurrent: -health.hpMax,
                        hpTemp: 0,
                    },
                    unconscious: true,
                    dead: true,
                });
            } else if (health.hpTemp - val <= 0) {
                // unconscious
                const rollover = val - health.hpTemp;
                charRefSet(character, {
                    health: {
                        ...health,
                        hpTemp: 0,
                        hpCurrent: health.hpCurrent - rollover,
                    },
                });
                set({
                    health: {
                        ...health,
                        hpTemp: 0,
                        hpCurrent: health.hpCurrent - rollover,
                    },
                });
                const newHealth = get().health;
                if (newHealth.hpCurrent <= -newHealth.hpMax) {
                    charRefSet(character, {
                        unconscious: true,
                        dead: true,
                        health: {
                            ...newHealth,
                            hpCurrent: -newHealth.hpMax,
                            hpTemp: 0,
                        },
                    });
                    set({ unconscious: true });
                } else if (newHealth.hpCurrent <= 0) {
                    charRefSet(character, {
                        unconscious: true,
                        health: {
                            ...newHealth,
                            hpTemp: 0,
                        },
                    });
                    set({ unconscious: true });
                }
            } else if (health.hpTemp - val > 0) {
                // temp damage
                charRefSet(character, {
                    health: {
                        ...health,
                        hpTemp: health.hpTemp - val,
                    },
                });
            } else {
                // normal damage
                charRefSet(character, {
                    health: {
                        ...health,
                        hpCurrent: health.hpCurrent - val,
                    },
                });
            }
        },
        setHitDice(val) {
            const health = get().health;
            const character = get().firebaseCharacter;
            if (!character) {
                return;
            }

            const level = get().level;

            if (val <= 0) {
                charRefSet(character, {
                    health: {
                        ...health,
                        hitDiceCurrent: 0,
                    },
                });
            } else if (val > level) {
                charRefSet(character, {
                    health: {
                        ...health,
                        hitDiceCurrent: level,
                    },
                });
            } else {
                charRefSet(character, {
                    health: {
                        ...health,
                        hitDiceCurrent: val,
                    },
                });
            }
        },
        abilityScores: [
            {
                name: AbilityScoresEnum.CHARISMA,
                value: 9,
                proficient: false,
            },
            {
                name: AbilityScoresEnum.CONSTITUTION,
                value: 9,
                proficient: false,
            },
            {
                name: AbilityScoresEnum.DEXTERITY,
                value: 9,
                proficient: false,
            },
            {
                name: AbilityScoresEnum.INTELLIGENCE,
                value: 9,
                proficient: false,
            },
            {
                name: AbilityScoresEnum.STRENGTH,
                value: 9,
                proficient: false,
            },
            {
                name: AbilityScoresEnum.WISDOM,
                value: 9,
                proficient: false,
            },
        ],
        skills: [
            {
                name: SkillsEnum.ACROBATICS,
                value: 9,
                halfProficient: false,
                proficient: false,
                expertise: false,
            },
            {
                name: SkillsEnum.ANIMAL_HANDLING,
                value: 9,
                halfProficient: false,
                proficient: false,
                expertise: false,
            },
            {
                name: SkillsEnum.ARCANA,
                value: 9,
                halfProficient: false,
                proficient: false,
                expertise: false,
            },
            {
                name: SkillsEnum.ATHLETICS,
                value: 9,
                halfProficient: false,
                proficient: false,
                expertise: false,
            },
            {
                name: SkillsEnum.DECEPTION,
                value: 9,
                halfProficient: false,
                proficient: false,
                expertise: false,
            },
            {
                name: SkillsEnum.HISTORY,
                value: 9,
                halfProficient: false,
                proficient: false,
                expertise: false,
            },
            {
                name: SkillsEnum.INSIGHT,
                value: 9,
                halfProficient: false,
                proficient: false,
                expertise: false,
            },
            {
                name: SkillsEnum.INTIMIDATION,
                value: 9,
                halfProficient: false,
                proficient: false,
                expertise: false,
            },
            {
                name: SkillsEnum.INVESTIGATION,
                value: 9,
                halfProficient: false,
                proficient: false,
                expertise: false,
            },
            {
                name: SkillsEnum.MEDICINE,
                value: 9,
                halfProficient: false,
                proficient: false,
                expertise: false,
            },
            {
                name: SkillsEnum.NATURE,
                value: 9,
                halfProficient: false,
                proficient: false,
                expertise: false,
            },
            {
                name: SkillsEnum.PERCEPTION,
                value: 9,
                halfProficient: false,
                proficient: false,
                expertise: false,
            },
            {
                name: SkillsEnum.PERFORMANCE,
                value: 9,
                halfProficient: false,
                proficient: false,
                expertise: false,
            },
            {
                name: SkillsEnum.PERSUASION,
                value: 9,
                halfProficient: false,
                proficient: false,
                expertise: false,
            },
            {
                name: SkillsEnum.RELIGION,
                value: 9,
                halfProficient: false,
                proficient: false,
                expertise: false,
            },
            {
                name: SkillsEnum.SLEIGHT_OF_HAND,
                value: 9,
                halfProficient: false,
                proficient: false,
                expertise: false,
            },
            {
                name: SkillsEnum.STEALTH,
                value: 9,
                halfProficient: false,
                proficient: false,
                expertise: false,
            },
            {
                name: SkillsEnum.SURVIVAL,
                value: 9,
                halfProficient: false,
                proficient: false,
                expertise: false,
            },
        ],
        setSkillHalfProficient(score) {
            const character = get().firebaseCharacter;
            if (!character) {
                return;
            }

            charRefSet(character, {
                skills: {
                    scores: {
                        [score.name]: {
                            name: score.name,
                            halfProficient: !score.halfProficient,
                            proficient: false,
                            expertise: false,
                        },
                    },
                },
            });
        },
        setSkillProficient(score) {
            const character = get().firebaseCharacter;
            if (!character) {
                return;
            }

            charRefSet(character, {
                skills: {
                    scores: {
                        [score.name]: {
                            name: score.name,
                            halfProficient: false,
                            proficient: !score.proficient,
                            expertise: false,
                        },
                    },
                },
            });
        },
        setSkillExpertise(score) {
            const character = get().firebaseCharacter;
            if (!character) {
                return;
            }

            charRefSet(character, {
                skills: {
                    scores: {
                        [score.name]: {
                            name: score.name,
                            halfProficient: false,
                            proficient: false,
                            expertise: !score.expertise,
                        },
                    },
                },
            });
        },
        setProficient(score) {
            const character = get().firebaseCharacter;
            if (!character) {
                return;
            }

            charRefSet(character, {
                abilityScores: {
                    scores: {
                        [score.name]: {
                            name: score.name,
                            proficient: !score.proficient,
                        },
                    },
                },
            });
        },
    })
);
