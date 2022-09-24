import { Loader } from "../Loader";
import clsx from "clsx";
import { useCharacters } from "../../services/5e-character/use-characters";
import { CharacterCard } from "./CharacterCard";
import { PrimaryButton } from "../Buttons/PrimaryButton";
import {
    LayoutDistributeHorizontal,
    LayoutDistributeVertical,
    LayoutGrid,
    Plus,
} from "tabler-icons-react";
import { newBlankCharacter } from "@/services/5e-character/add-character";
import { useUser } from "@/services/user-service";
import { useLocalStorage } from "@mantine/hooks";
import { setDocMerge } from "@/services/firebase-helpers";
import firebase from "../../../firebase/clientApp";
import { useDocument } from "react-firebase-hooks/firestore";

interface Props {
    className?: string;
}

export const layoutHorizontal = "flex flex-1";
export const layoutVertical =
    "flex flex-1 flex-col w-full pr-2 overflow-x-hidden";
export const layoutGrid =
    "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 pr-2 gap-3";
const layoutKey = "dasboard-layout";

export const Dashboard: React.FC<Props> = ({ className }) => {
    const { characterDocs, charactersLoading, charactersError } =
        useCharacters();

    const [layoutMode, setLayoutMode] = useLocalStorage({
        key: layoutKey,
        defaultValue: layoutHorizontal,
    });

    const { user } = useUser();
    const [userDoc] = useDocument(
        firebase.firestore().doc(`users/${user?.uid}`)
    );

    const syncLayout = () => {
        setDocMerge(userDoc, {
            settings: { currentLayout: layoutMode },
        });
    };

    return (
        <>
            <div
                className={clsx(
                    className,
                    "flex flex-col mx-10 mt-5 w-[calc(100vw-1rem)]"
                )}
            >
                <span className="flex flex-row mb-3 justify-between">
                    <span className="flex justify-start gap-3">
                        <PrimaryButton
                            className={clsx(
                                "h-fit w-fit py-1",
                                layoutMode === layoutHorizontal
                                    ? "bg-color-secondary"
                                    : "bg-color-special"
                            )}
                            onClick={() => {
                                setLayoutMode(layoutHorizontal);
                                syncLayout();
                            }}
                        >
                            <LayoutDistributeHorizontal />
                        </PrimaryButton>
                        <PrimaryButton
                            className={clsx(
                                "h-fit w-fit py-1",
                                layoutMode === layoutVertical
                                    ? "bg-color-secondary"
                                    : "bg-color-special"
                            )}
                            onClick={() => {
                                setLayoutMode(layoutVertical);
                                syncLayout();
                            }}
                        >
                            <LayoutDistributeVertical />
                        </PrimaryButton>
                        <PrimaryButton
                            className={clsx(
                                "h-fit w-fit py-1",
                                layoutMode === layoutGrid
                                    ? "bg-color-secondary"
                                    : "bg-color-special"
                            )}
                            onClick={() => {
                                setLayoutMode(layoutGrid);
                                syncLayout();
                            }}
                        >
                            <LayoutGrid />
                        </PrimaryButton>
                    </span>
                    <span>
                        <PrimaryButton
                            onClick={() => {
                                newBlankCharacter(user?.uid, user?.displayName);
                            }}
                            className="h-fit w-fit py-1"
                        >
                            <Plus />
                        </PrimaryButton>
                    </span>
                </span>
                <div className={clsx("overflow-auto", layoutMode)}>
                    {characterDocs.map((character) => (
                        <CharacterCard
                            key={character.id}
                            character={character}
                            dashboardMode={true}
                        ></CharacterCard>
                    ))}
                </div>

                {!characterDocs && charactersLoading && <Loader />}
                {charactersError && <>{charactersError.message}</>}
            </div>
        </>
    );
};
