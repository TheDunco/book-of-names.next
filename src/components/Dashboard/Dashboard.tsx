import { Loader } from "../Loader";
import clsx from "clsx";
import { useCharacters } from "../../services/character/use-characters";
import { CharacterCard } from "./CharacterCard";
import { PrimaryButton } from "../Buttons/PrimaryButton";
import {
    LayoutDistributeHorizontal,
    LayoutDistributeVertical,
    LayoutGrid,
    Plus,
} from "tabler-icons-react";
import { newBlankCharacter } from "@/services/character/add-character";
import { useUser } from "@/services/UserService";
import { useLocalStorage } from "@mantine/hooks";

interface Props {
    className?: string;
}

const layoutHorizontal = "";
const layoutVertical = "flex-col m-auto";
const layoutGrid = "flex-wrap";
const layoutKey = "dasboard-layout";

export const Dashboard: React.FC<Props> = ({ className }) => {
    const { characterDocs, charactersLoading, charactersError } =
        useCharacters();

    const [layoutMode, setLayoutMode] = useLocalStorage({
        key: layoutKey,
        defaultValue: layoutHorizontal,
    });
    const { user } = useUser();
    return (
        <>
            <div
                className={clsx(
                    className,
                    "flex flex-col ml-10 mt-5 w-[calc(100vw-4rem)] mr-10"
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
                            }}
                        >
                            <LayoutGrid />
                        </PrimaryButton>
                    </span>
                    <span>
                        <PrimaryButton
                            onClick={() => {
                                newBlankCharacter(user?.uid);
                            }}
                            className="h-fit w-fit py-1"
                        >
                            <Plus />
                        </PrimaryButton>
                    </span>
                </span>
                <div className={clsx("flex overflow-auto flex-1", layoutMode)}>
                    {characterDocs.map((character) => (
                        <CharacterCard
                            key={character.id}
                            character={character}
                        ></CharacterCard>
                    ))}
                </div>

                {!characterDocs && charactersLoading && <Loader />}
                {charactersError && <>{charactersError.message}</>}
            </div>
        </>
    );
};
