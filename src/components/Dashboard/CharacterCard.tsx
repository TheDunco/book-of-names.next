import clsx from "clsx";
import { CharacterInputValue } from "../CharacterInputValue";
import firebase from "../../../firebase/clientApp";
import { useState } from "react";
import { Minus } from "tabler-icons-react";
import { deleteCharacter } from "@/services/character/delete-character";
import { useUser } from "@/services/user-service";
import { SecondaryButton } from "../Buttons/SecondaryButton";

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
                    "flex flex-col justify-end border border-color-secondary rounded-md p-5 cursor-pointer min-h-[30rem] w-full min-w-fit mr-5 ml-0 mb-3",
                    className
                )}
                style={{
                    backgroundImage: `url(${characterData.imageLink})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="flex justify-between">
                    <CharacterInputValue
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            character.ref.set(
                                {
                                    name: e.target.value,
                                },
                                { merge: true }
                            );
                        }}
                        formClassName="w-1/2"
                        className="bg-opacity-40"
                    />
                    <div className="">
                        <SecondaryButton
                            className="text-color-primary py-0 bg-transparent"
                            onClick={() => {
                                deleteCharacter(
                                    character.id,
                                    character.data().name,
                                    user?.uid
                                );
                            }}
                        >
                            <Minus />
                        </SecondaryButton>
                    </div>
                </div>
            </div>
        </>
    );
};
