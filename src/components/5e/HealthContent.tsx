import firebase from "../../../firebase/clientApp";

import { use5eCharacterStore } from "@/lib/stores/5eCharacterStore";
import { charRefSet } from "@/lib/charRefSet";
import { Health } from "@/types/character/5e-character";
import { Equal, Plus } from "tabler-icons-react";

interface Props {
    character: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>;
}

export const HealthContent: React.FC<Props> = ({ character }) => {
    const characterState = use5eCharacterStore();
    const staticHealth = character.data()?.health as Health;

    return (
        <>
            <div className="flex flex-col items-start">
                <form>
                    <input
                        className="py-0 text-left bg-color-bg border-color-primary text-3xl font-bold focus:ring-color-primary w-32 mt-0.5 rounded-md px-2"
                        type="number"
                        value={staticHealth.hpCurrent}
                        onChange={(e) => {
                            const currentHp = characterState.setCurrentHp(
                                parseInt(e.target.value)
                            );
                            charRefSet(character, {
                                health: { hpCurrent: currentHp },
                            });
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
                                health: { hpTemp: parseInt(e.target.value) },
                            });
                        }}
                    />
                    <label className="text-color-special font-thin">
                        &nbsp;Temp
                    </label>
                </form>
                <Equal className="ml-12 my-1" />
                <form>
                    <input
                        className="text-color-secondary py-0 text-left bg-color-bg border-color-primary text-3xl font-extrabold focus:ring-color-secondary w-32 mt-0.5 rounded-md px-2"
                        type="text"
                        disabled={true}
                        value={staticHealth.hpCurrent + staticHealth.hpTemp}
                    />
                    <label className="text-color-secondary font-extrabold">
                        &nbsp;HP
                    </label>
                </form>
                <div className="border-t border-color-primary w-full pt-3 mt-3"></div>
                <form>
                    <input
                        className="py-0 text-left bg-color-bg border-color-primary text-3xl font-bold focus:ring-color-primary w-32 mt-0.5 rounded-md px-2"
                        type="number"
                        value={staticHealth.hpMax}
                        onChange={(e) => {
                            charRefSet(character, {
                                health: { hpMax: parseInt(e.target.value) },
                            });
                        }}
                    />
                    <label>&nbsp;Max</label>
                </form>
            </div>
        </>
    );
};
