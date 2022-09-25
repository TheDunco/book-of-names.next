import { CharacterInputValue } from "../CharacterInputValue";
import { use5eCharacterStore } from "@/lib/stores/5eCharacterStore";
import { charRefSet } from "@/lib/charRefSet";
import { Loader } from "../Loader";
import { Checkbox } from "../Checkbox";
import { Tooltip } from "../Tooltip";

export const AbilityScoresContent: React.FC = () => {
    const characterState = use5eCharacterStore();
    const character = characterState.firebaseCharacter;

    if (!character) return <Loader />;

    return (
        <div className="grid grid-cols-3 gap-3">
            <div className="grid gap-2">
                <h2 className="border-b text-center pb-1">Score</h2>
                {characterState.abilityScores.map((score) => (
                    <CharacterInputValue
                        label={score.name}
                        value={score.value}
                        className="w-16"
                        formClassName="justify-center"
                        type="number"
                        onChange={(e) => {
                            charRefSet(character, {
                                abilityScores: {
                                    scores: {
                                        [score.name]: {
                                            name: score.name,
                                            value: parseInt(e.target.value),
                                        },
                                    },
                                },
                            });
                        }}
                    />
                ))}
            </div>
            <div>
                <h2 className="border-b text-center pb-1">Proficient</h2>
                <div className="flex flex-col mt-2 h-full items-center justify-evenly">
                    {Array(...characterState.abilityScores).map((score) => (
                        <span className="flex flex-row">
                            <Tooltip
                                content={"Half Proficiency"}
                                direction="top"
                            >
                                <Checkbox
                                    boxClassName="bg-color-text text-color-text"
                                    checked={score.halfProficient}
                                    onChange={() => {
                                        characterState.setHalfProficient(score);
                                    }}
                                />
                            </Tooltip>

                            <Tooltip content={"Proficiency"} direction="top">
                                <Checkbox
                                    boxClassName="bg-color-primary text-color-primary"
                                    checked={score.proficient}
                                    onChange={() => {
                                        characterState.setProficient(score);
                                    }}
                                />
                            </Tooltip>

                            <Tooltip content={"Expertise"} direction="top">
                                <Checkbox
                                    boxClassName="bg-color-secondary text-color-bg accent-color-primary"
                                    checked={score.expertise}
                                    onChange={() => {
                                        characterState.setExpertise(score);
                                    }}
                                />
                            </Tooltip>
                        </span>
                    ))}
                </div>
            </div>
            <div>
                <h2 className="border-b text-center pb-1">Save</h2>
            </div>
        </div>
    );
};
