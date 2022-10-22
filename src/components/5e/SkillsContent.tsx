import { use5eCharacterStore } from "@/lib/stores/5eCharacterStore";
import { Loader } from "../Loader";
import { Checkbox } from "../Checkbox";
import { toMod } from "@/services/5e-character/toMod";
import { Tooltip } from "../Tooltip";

export const SkillsContent: React.FC = () => {
    const characterState = use5eCharacterStore();
    const character = characterState.firebaseCharacter;

    if (!character) return <Loader />;

    return (
        <div className="grid grid-cols-[2.5fr_1fr_1fr] mb-6">
            <div className="grid gap-4">
                <h2 className="border-b text-center pb-1">Skill</h2>
                {characterState.skills.map((skill) => (
                    <div>{skill.name}</div>
                ))}
            </div>
            <div>
                <h2 className="border-b text-center pb-1">Proficiency</h2>
                <div className="flex flex-col mt-2 h-full items-center justify-evenly">
                    {Array(...characterState.skills).map((skill) => (
                        <span className="flex flex-row">
                            <Tooltip
                                content={"Half Proficiency"}
                                direction="top"
                            >
                                <Checkbox
                                    boxClassName="bg-color-text text-color-text"
                                    checked={skill.halfProficient}
                                    onChange={() => {
                                        characterState.setSkillHalfProficient(
                                            skill
                                        );
                                    }}
                                />
                            </Tooltip>

                            <Checkbox
                                boxClassName="bg-color-primary text-color-primary"
                                checked={skill.proficient}
                                onChange={() => {
                                    characterState.setSkillProficient(skill);
                                }}
                            />

                            <Tooltip content={"Expertise"} direction="top">
                                <Checkbox
                                    boxClassName="bg-color-secondary text-color-bg accent-color-primary"
                                    checked={skill.expertise}
                                    onChange={() => {
                                        characterState.setSkillExpertise(skill);
                                    }}
                                />
                            </Tooltip>
                        </span>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="border-b text-center pb-1">Modifier</h2>
                <div className="flex flex-col h-full items-center justify-evenly">
                    {Array(...characterState.skills).map((skill) => (
                        <div className="flex flex-row rounded-full w-10 h-10 border-color-secondary border  items-center justify-center pr-0.5 text-color-text bg-color-bg slashed-zero">
                            {skill.proficient
                                ? toMod(skill.value) +
                                  characterState.proficiencyBonus
                                : toMod(skill.value)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
