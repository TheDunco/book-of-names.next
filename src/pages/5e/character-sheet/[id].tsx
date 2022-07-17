import { PrimaryButton } from "@/components/Buttons/PrimaryButton";
import { SecondaryButton } from "@/components/Buttons/SecondaryButton";
import { TextButton } from "@/components/Buttons/TextButton";
import { CharacterCard } from "@/components/Dashboard/CharacterCard";
import { Loader } from "@/components/Loader";
import { SheetAccordion } from "@/components/SheetComponents/SheetAccordion";
import { ThemeLayout } from "@/layouts/ThemeLayout";
import { useCharacter } from "@/services/character/use-character";
import { useLocalStorage } from "@mantine/hooks";
import clsx from "clsx";
import { useRouter } from "next/router";
import ReactTooltip from "react-tooltip";
import {
    ArrowLeft,
    Globe,
    LayoutDistributeHorizontal,
    LayoutDistributeVertical,
    LayoutGrid,
} from "tabler-icons-react";
import axios from "axios";

const layoutHorizontal = "flex flex-1";
const layoutVertical = "flex flex-1 flex-col m-auto ";
const layoutGrid = "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3";
const layoutKey = "5e-sheet-layout";

const fifthEditionCharacterSheet: React.FC = () => {
    const router = useRouter();
    const routerId = router.asPath.split("/")[3];
    const characterId = routerId as string;

    const { character, characterLoading, characterError } =
        useCharacter(characterId);
    const [layoutMode, setLayoutMode] = useLocalStorage({
        key: layoutKey,
        defaultValue: layoutHorizontal,
    });
    const syncLayout = () => {
        character?.ref.set({ layout: layoutMode }, { merge: true });
    };
    return (
        <>
            {characterLoading ? (
                <ThemeLayout>
                    <Loader />
                </ThemeLayout>
            ) : (
                character && (
                    <ThemeLayout>
                        {characterError && <div>{characterError.message}</div>}
                        <div
                            className={clsx(
                                "flex flex-col mx-10 w-[calc(100vw-4rem)]"
                            )}
                        >
                            <span className="flex justify-start gap-3 my-3">
                                <div>
                                    <ReactTooltip
                                        id="backButtonTip"
                                        type="light"
                                        delayShow={400}
                                    >
                                        Back to Dashboard
                                    </ReactTooltip>
                                    <TextButton
                                        data-tip
                                        data-for="backButtonTip"
                                        className="h-fit w-fit py-1"
                                        onClick={() => {
                                            router.push("/");
                                        }}
                                    >
                                        <ArrowLeft />
                                    </TextButton>
                                </div>
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
                            <div
                                className={clsx(
                                    "overflow-auto gap-3",
                                    layoutMode
                                )}
                            >
                                <SheetAccordion
                                    headerContent={character.data()?.name}
                                >
                                    <CharacterCard
                                        character={character}
                                    ></CharacterCard>
                                </SheetAccordion>
                                <SheetAccordion headerContent="Very large header but very small">
                                    Content
                                </SheetAccordion>
                                <SheetAccordion headerContent="Very">
                                    Small header but very relatively large
                                    content
                                </SheetAccordion>
                                <SheetAccordion headerContent="Roughly equal">
                                    header and content
                                </SheetAccordion>
                            </div>
                        </div>
                    </ThemeLayout>
                )
            )}
        </>
    );
};

export default fifthEditionCharacterSheet;
