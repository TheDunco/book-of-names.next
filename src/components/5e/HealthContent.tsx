import firebase from "../../../firebase/clientApp";

import { use5eCharacterStore } from "@/lib/stores/5eCharacterStore";
import { charRefSet } from "@/lib/charRefSet";
import { Health } from "@/types/character/5e-character";
import { Equal, Plus } from "tabler-icons-react";
import { Checkbox } from "../Checkbox";
import { PrimaryButton } from "../Buttons/PrimaryButton";
import { useState } from "react";

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
                    console.log(e);
                    if (!e.target.checked) {
                        characterState.setDeathSaveFails(index);
                    } else {
                        characterState.setDeathSaveFails(index + 1);
                    }
                }}
            />
        );
    };

    return (
        <>
            {!characterState.unconscious ? (
                <div className="flex flex-col items-start">
                    <div>
                        <h1>Take Damage/Heal</h1>
                        <form className="flex flex-col">
                            <input
                                className="py-0 text-center bg-color-special border-color-primary text-3xl font-bold focus:ring-color-primary w-32 mt-0.5 rounded-md px-2"
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
                                            console.log("damage");
                                            characterState.damage(
                                                granularHealthValue
                                            );
                                            // it could be a setting in the future to do this
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

                    <div className="border-t border-color-primary w-full pt-3 mt-3"></div>

                    <form>
                        <input
                            className="py-0 text-left bg-color-bg border-color-primary text-3xl font-bold focus:ring-color-primary w-32 mt-0.5 rounded-md px-2"
                            type="number"
                            value={staticHealth.hpCurrent}
                            onChange={(e) => {
                                characterState.setCurrentHp(
                                    parseInt(e.target.value)
                                );
                            }}
                        />
                        <label>&nbsp;HP</label>
                    </form>
                    <Plus className="ml-12 my-1" />
                    <form>
                        <input
                            className="text-color-special font-thin py-0 text-left bg-color-bg border-color-special text-3xl focus:ring-color-special w-32 mt-0.5 rounded-md px-2"
                            type="number"
                            value={staticHealth.hpTemp}
                            onChange={(e) => {
                                charRefSet(character, {
                                    health: {
                                        hpTemp: parseInt(e.target.value),
                                    },
                                });
                            }}
                        />
                        <label className="text-color-special font-thin">
                            &nbsp;Temp
                        </label>
                    </form>
                    <Equal className="ml-12 my-1" />

                    <span className="inline-flex">
                        <form>
                            <input
                                className="text-color-secondary py-0 text-left bg-color-bg border-color-primary text-3xl font-extrabold focus:ring-color-secondary w-32 mt-0.5 rounded-md px-2"
                                type="text"
                                disabled={true}
                                value={
                                    staticHealth.hpCurrent + staticHealth.hpTemp
                                }
                            />
                            <label className="text-color-secondary font-extrabold">
                                &nbsp;HP
                            </label>
                        </form>
                        <h1 className="text-4xl font-bold mx-3 -mt-2 text-color-secondary">
                            /
                        </h1>
                        <form>
                            <input
                                className="py-0 text-left bg-color-bg border-color-primary text-3xl font-bold focus:ring-color-primary w-32 mt-0.5 rounded-md px-2"
                                type="number"
                                value={staticHealth.hpMax}
                                onChange={(e) => {
                                    charRefSet(character, {
                                        health: {
                                            hpMax: parseInt(e.target.value),
                                        },
                                    });
                                }}
                            />
                            <label>&nbsp;Max</label>
                        </form>
                    </span>
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
                                    unconscious: deadState,
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
