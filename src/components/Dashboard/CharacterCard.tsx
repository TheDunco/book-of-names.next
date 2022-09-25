import clsx from "clsx";
import firebase from "../../../firebase/clientApp";
import { Minus } from "tabler-icons-react";
import { deleteCharacter } from "@/services/5e-character/delete-character";
import { useUser } from "@/services/user-service";
import { useRouter } from "next/router";
import { Character } from "@/types/character/5e-character";
import { PrimaryButton } from "../Buttons/PrimaryButton";

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
    const { user } = useUser();
    const router = useRouter();
    return (
        <>
            <div
                className={clsx(
                    "flex flex-col justify-end border border-color-secondary rounded-md min-h-[30rem] w-full min-w-fit mr-5 ml-0 mb-3",
                    dashboardMode ? "cursor-alias" : "",
                    className
                )}
                style={{
                    backgroundImage: `url(${characterData.imageLink || ""})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                }}
                onClick={() => {
                    router.push(characterSheetLink);
                }}
            >
                {dashboardMode ? (
                    <>
                        <div className="flex justify-end">
                            <PrimaryButton
                                className="text-color-primary py-0 bg-transparent justify-end"
                                onClick={() => {
                                    deleteCharacter(
                                        character.id,
                                        character?.data()?.name,
                                        user?.uid
                                    );
                                    router.push("/");
                                }}
                                stopPropagation={true}
                            >
                                <Minus />
                            </PrimaryButton>
                        </div>

                        <div className="bg-color-bg -mb-2 pb-2 border-t border-color-primary px-3">
                            {characterData.name}
                        </div>

                        <div className="bg-color-bg rounded-md px-3">
                            Level {characterData.level} {characterData.class}
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
};
