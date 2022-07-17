import clsx from "clsx";
import { CharacterInputValue } from "../CharacterInputValue";
import firebase from "../../../firebase/clientApp";
import { useState } from "react";
import { Minus } from "tabler-icons-react";
import { deleteCharacter } from "@/services/character/delete-character";
import { useUser } from "@/services/user-service";
import { SecondaryButton } from "../Buttons/SecondaryButton";
import { useRouter } from "next/router";
import { Character } from "@/types/character/characterTypes";

interface Props {
    className?: string;
    character:
        | firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
        | firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>;
    dashboardMode?: boolean;
}

export const CharacterCard: React.FC<Props> = ({
    className,
    character,
    dashboardMode = false,
}) => {
    const characterData = character.data() as Character;
    const characterSheetLink = `/${characterData.gameVersion}/character-sheet/${character.id}`;
    const [name, setName] = useState(characterData.name);
    const { user } = useUser();
    const router = useRouter();
    return (
        <>
            <div
                className={clsx(
                    "flex flex-col justify-end border border-color-secondary rounded-md p-5 min-h-[30rem] w-full min-w-fit mr-5 ml-0 mb-3",
                    dashboardMode ? "cursor-alias" : "",
                    className
                )}
                style={{
                    backgroundImage: `url(${characterData.imageLink})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                }}
                onClick={() => {
                    router.push(characterSheetLink);
                }}
            >
                {dashboardMode ? (
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
                                        character?.data()?.name,
                                        user?.uid
                                    );
                                }}
                            >
                                <Minus />
                            </SecondaryButton>
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </>
    );
};
