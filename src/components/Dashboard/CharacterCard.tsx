import clsx from "clsx";
import { CharacterInputValue } from "../CharacterInputValue";
import firebase from "../../../firebase/clientApp";
import { useState } from "react";
import { Minus } from "tabler-icons-react";
import { deleteCharacter } from "@/services/character/delete-character";
import { useUser } from "@/services/UserService";

interface Props {
    className?: string;
    character: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;
}

export const CharacterCard: React.FC<Props> = ({ className, character }) => {
    const characterData = character.data();
    const [name, setName] = useState(characterData.name);
    const { user } = useUser();
    return (
        <>
            <div
                className={clsx(
                    "flex flex-col justify-center border border-color-secondary rounded-md p-5 cursor-pointer w-fit h-fit mr-5 ml-0 mb-3",
                    className
                )}
            >
                <div className="flex mb-5">
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
                    <div className="-mt-3 ml-2">
                        <button
                            className="text-color-primary py-0 rounded-sm hover:bg-color-special"
                            onClick={() => {
                                deleteCharacter(
                                    character.id,
                                    character.data().name,
                                    user?.uid
                                );
                            }}
                        >
                            <Minus />
                        </button>
                    </div>
                </div>
                <img
                    src={characterData.imageLink}
                    alt={characterData.name}
                    className="rounded-md"
                />
            </div>
        </>
    );
};
