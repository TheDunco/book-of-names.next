import clsx from "clsx";
import ReactTooltip from "react-tooltip";
import { CharacterInputValue } from "../CharacterInputValue";
import firebase from "../../../firebase/clientApp";
import { useState } from "react";

interface Props {
    className?: string;
    character: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;
}

export const CharacterCard: React.FC<Props> = ({ className, character }) => {
    const characterData = character.data();
    const [name, setName] = useState(characterData.name);
    return (
        <>
            <ReactTooltip id={character.id} delayShow={500} type="dark">
                <span>To {characterData.name}'s character sheet</span>
            </ReactTooltip>
            <div
                data-tip
                data-for={character.id}
                className={clsx(
                    className,
                    "border border-color-secondary rounded-md p-5 cursor-pointer w-fit h-fit mr-5"
                )}
            >
                <CharacterInputValue
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        character.ref.set(
                            { name: e.target.value },
                            { merge: true }
                        );
                    }}
                />
            </div>
        </>
    );
};
