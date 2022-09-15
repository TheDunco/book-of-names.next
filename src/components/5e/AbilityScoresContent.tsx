import { CharacterInputValue } from "../CharacterInputValue";
import { use5eCharacterStore } from "@/lib/stores/5eCharacterStore";
import { charRefSet } from "@/lib/charRefSet";
import { AbilityScoresEnum } from "@/types/character/5e-character";
import { Loader } from "../Loader";

export const AbilityScoresContent: React.FC = () => {
    const characterState = use5eCharacterStore();
    const character = characterState.firebaseCharacter;

    if (!character) return <Loader />;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <CharacterInputValue
                label="Charisma:"
                value={characterState.abilityScores.charisma.value}
                className="w-10"
                formClassName="justify-center"
                onChange={(e) => {
                    charRefSet(character, {
                        abilityScores: {
                            scores: {
                                Charisma: {
                                    name: AbilityScoresEnum.CHARISMA,
                                    value: parseInt(e.target.value),
                                },
                            },
                        },
                    });
                }}
            />

            <CharacterInputValue
                label="Constitution:"
                value={characterState.abilityScores.constitution.value}
                className="w-10"
                formClassName="justify-center"
                onChange={(e) => {
                    charRefSet(character, {
                        abilityScores: {
                            scores: {
                                Constitution: {
                                    name: AbilityScoresEnum.CONSTITUTION,
                                    value: parseInt(e.target.value),
                                },
                            },
                        },
                    });
                }}
            />

            <CharacterInputValue
                label="Dexterity:"
                value={characterState.abilityScores.dexterity.value}
                className="w-10"
                formClassName="justify-center"
                onChange={(e) => {
                    charRefSet(character, {
                        abilityScores: {
                            scores: {
                                Dexterity: {
                                    name: AbilityScoresEnum.DEXTERITY,
                                    value: parseInt(e.target.value),
                                },
                            },
                        },
                    });
                }}
            />

            <CharacterInputValue
                label="Intelligence:"
                value={characterState.abilityScores.intelligence.value}
                className="w-10"
                formClassName="justify-center"
                onChange={(e) => {
                    charRefSet(character, {
                        abilityScores: {
                            scores: {
                                Intelligence: {
                                    name: AbilityScoresEnum.INTELLIGENCE,
                                    value: parseInt(e.target.value),
                                },
                            },
                        },
                    });
                }}
            />

            <CharacterInputValue
                label="Strength:"
                value={characterState.abilityScores.strength.value}
                className="w-10"
                formClassName="justify-center"
                onChange={(e) => {
                    charRefSet(character, {
                        abilityScores: {
                            scores: {
                                Strength: {
                                    name: AbilityScoresEnum.STRENGTH,
                                    value: parseInt(e.target.value),
                                },
                            },
                        },
                    });
                }}
            />

            <CharacterInputValue
                label="Wisdom:"
                value={characterState.abilityScores.wisdom.value}
                className="w-10"
                formClassName="justify-center"
                onChange={(e) => {
                    charRefSet(character, {
                        abilityScores: {
                            scores: {
                                Wisdom: {
                                    name: AbilityScoresEnum.WISDOM,
                                    value: parseInt(e.target.value),
                                },
                            },
                        },
                    });
                }}
            />
        </div>
    );
};
