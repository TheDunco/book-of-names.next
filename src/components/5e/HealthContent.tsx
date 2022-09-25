import firebase from "../../../firebase/clientApp";

import { use5eCharacterStore } from "@/lib/stores/5eCharacterStore";
import { charRefSet } from "@/lib/charRefSet";
import { Health } from "@/types/character/5e-character";
import { Equal, Plus } from "tabler-icons-react";
import { Checkbox } from "../Checkbox";
import { PrimaryButton } from "../Buttons/PrimaryButton";
import { KeyboardEvent, useState } from "react";
import { Divider } from "../Divider";

//TODO: Add health history - a calculation of how the health reached what it is currently

interface Props {
    character: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>;
}

interface IndexProp {
    index: number;
}

export const HealthContent: React.FC<Props> = ({ character }) => {
    const characterState = use5eCharacterStore();
    const staticHealth = character.data()?.health as Health;
    const [granularHealthValue, setGranularHealthValue] = useState(0);
    const [showGranularButtons, setShowGranularButtons] = useState(false);

    const SuccessValCheck: React.FC<IndexProp> = ({ index }) => {
        return (
            <Checkbox
                checked={characterState.health.deathSaveSuccesses >= index + 1}
                onChange={(e) => {
                    if (!e.target.checked) {
                        characterState.setDeathSaveSuccesses(index);
                    } else {
                        characterState.setDeathSaveSuccesses(index + 1);
                    }
                }}
            />
        );
    };

    const FailValCheck: React.FC<IndexProp> = ({ index }) => {
        return (
            <Checkbox
                checked={characterState.health.deathSaveFails >= index + 1}
                onChange={(e) => {
                    if (!e.target.checked) {
                        characterState.setDeathSaveFails(index);
                    } else {
                        characterState.setDeathSaveFails(index + 1);
                    }
                }}
            />
        );
    };

    const preventSubmission = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    return (
        <>
            {!characterState.unconscious ? (
                <div className="flex flex-col items-start">
                    <div>
                        <h1>Take Damage/Heal</h1>
                        <form className="flex flex-row">
                            <input
                                className="py-1 transition-all duration-200 text-center bg-color-special border-color-primary text-lg font-bold focus:ring-color-primary w-20 mt-0.5 rounded-md px-2"
                                type="number"
                                value={granularHealthValue}
                                onChange={(e) => {
                                    setGranularHealthValue(
                                        parseInt(e.target.value)
                                    );
                                }}
                                onFocus={() => {
                                    setShowGranularButtons(true);
                                }}
                            />
                        </form>
                        <span>
                            {showGranularButtons ? (
                                <>
                                    <PrimaryButton
                                        onClick={() => {
                                            characterState.damage(
                                                granularHealthValue
                                            );
                                            // TODO: Setting
                                            // setGranularHealthValue(0);
                                            setShowGranularButtons(false);
                                        }}
                                        className="my-2 mr-2"
                                    >
                                        Damage
                                    </PrimaryButton>
                                    <PrimaryButton
                                        className="text-color-primary bg-color-secondary"
                                        onClick={() => {
                                            characterState.heal(
                                                granularHealthValue
                                            );
                                            // setGranularHealthValue(0);
                                            setShowGranularButtons(false);
                                        }}
                                    >
                                        Heal
                                    </PrimaryButton>
                                </>
                            ) : null}
                        </span>
                    </div>

                    <Divider />

                    <form onKeyDownCapture={preventSubmission}>
                        <input
                            className="py-1 text-left bg-color-bg border-color-primary text-lg font-bold focus:ring-color-primary w-20 mt-0.5 rounded-md px-2"
                            type="number"
                            value={staticHealth.hpCurrent}
                            id="hp-current"
                            aria-label="Current HP"
                            onChange={(e) => {
                                characterState.setCurrentHp(
                                    parseInt(e.target.value)
                                );
                            }}
                        />
                        <label htmlFor="hp-current">&nbsp;HP</label>
                    </form>

                    <Plus className="ml-6 my-1" />
                    <form onKeyDownCapture={preventSubmission}>
                        <input
                            className="text-color-special font-thin py-1 text-left bg-color-bg border-color-special text-lg focus:ring-color-special w-20 mt-0.5 rounded-md px-2"
                            type="number"
                            value={staticHealth.hpTemp}
                            id="temp"
                            aria-label="Temporary hit points"
                            onChange={(e) => {
                                charRefSet(character, {
                                    health: {
                                        hpTemp: parseInt(e.target.value),
                                    },
                                });
                            }}
                        />
                        <label
                            htmlFor="temp"
                            className="text-color-special font-thin"
                        >
                            &nbsp;Temp
                        </label>
                    </form>
                    <Equal className="ml-6 my-1" />

                    <span className="inline-flex">
                        <form onKeyDownCapture={preventSubmission}>
                            <input
                                className="text-color-secondary py-1 text-left bg-color-bg border-color-primary text-lg font-extrabold focus:ring-color-secondary w-20 mt-0.5 rounded-md px-2"
                                type="text"
                                disabled={true}
                                id="hp-total"
                                aria-label="Total hit points including temp"
                                value={
                                    staticHealth.hpCurrent + staticHealth.hpTemp
                                }
                            />
                            <label
                                htmlFor="hp-total"
                                className="text-color-secondary font-extrabold"
                            >
                                &nbsp;HP
                            </label>
                        </form>

                        <h2 className="text-4xl font-bold mx-3 -mt-2 text-color-secondary">
                            /
                        </h2>

                        <form onKeyDownCapture={preventSubmission}>
                            <input
                                className="py-1 text-left bg-color-bg border-color-primary text-lg font-bold focus:ring-color-primary w-20 mt-0.5 rounded-md px-2"
                                type="number"
                                value={staticHealth.hpMax}
                                id="max"
                                aria-label="Max health"
                                onChange={(e) => {
                                    charRefSet(character, {
                                        health: {
                                            hpMax: parseInt(e.target.value),
                                        },
                                    });
                                }}
                            />
                            <label htmlFor="max">&nbsp;Max</label>
                        </form>
                    </span>

                    <Divider />

                    <form
                        className="inline-flex items-center"
                        onKeyDownCapture={preventSubmission}
                    >
                        <label htmlFor="hit-dice" className="text-xl mr-2">
                            Hit Dice Used:
                        </label>
                        <input
                            id="hit-dice"
                            className="py-1 text-left bg-color-bg border-color-primary text-lg font-bold focus:ring-color-primary w-20 rounded-md px-2"
                            type="number"
                            value={staticHealth.hitDiceCurrent}
                            onChange={(e) => {
                                characterState.setHitDice(
                                    parseInt(e.target.value)
                                );
                            }}
                        />
                        <h2 className="text-4xl font-bold mx-3 text-color-secondary">
                            /
                        </h2>
                        <h2 className="text-lg font-bold text-color-text">
                            {characterState.level}
                        </h2>
                    </form>
                </div>
            ) : (
                <>
                    <h1>Death Saves</h1>
                    <h2>
                        Successes: {characterState.health.deathSaveSuccesses}
                    </h2>
                    <span className="inline-flex">
                        {[...Array(3)].map((_, i) => (
                            <SuccessValCheck key={i} index={i} />
                        ))}
                    </span>

                    <h2>Fails: {characterState.health.deathSaveFails}</h2>

                    <span className="inline-flex">
                        {[...Array(3)].map((_, i) => (
                            <FailValCheck key={i} index={i} />
                        ))}
                    </span>
                    <div>
                        <PrimaryButton
                            onClick={() => {
                                characterState.setDeathSaveSuccesses(3, true);
                            }}
                            className="mr-2"
                        >
                            NAT 20
                        </PrimaryButton>
                        <PrimaryButton
                            onClick={() => {
                                const currentFails =
                                    characterState.health.deathSaveFails + 2 >=
                                    3
                                        ? 3
                                        : characterState.health.deathSaveFails +
                                          2;
                                const deadState = currentFails >= 3;

                                charRefSet(character, {
                                    health: {
                                        deathSaveFails: currentFails,
                                    },
                                    dead: deadState,
                                });
                            }}
                            className="text-color-special bg-color-secondary"
                        >
                            NAT 1
                        </PrimaryButton>
                    </div>
                    {characterState.dead ? (
                        <h1>Your character has died</h1>
                    ) : null}
                </>
            )}
        </>
    );
};
