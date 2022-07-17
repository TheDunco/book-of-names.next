import { TextButton } from "@/components/Buttons/TextButton";
import { CharacterCard } from "@/components/Dashboard/CharacterCard";
import { Loader } from "@/components/Loader";
import { SheetAccordion } from "@/components/SheetComponents/SheetAccordion";
import { ThemeLayout } from "@/layouts/ThemeLayout";
import { useCharacter } from "@/services/character/use-character";
import clsx from "clsx";
import { useRouter } from "next/router";
import ReactTooltip from "react-tooltip";
import { ArrowLeft } from "tabler-icons-react";

// const layoutHorizontal = "flex flex-1";
// const layoutVertical = "flex flex-1 flex-col m-auto ";
// const layoutGrid =
//     "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2";
// const layoutKey = "5e-sheet-layout";

const fifthEditionCharacterSheet: React.FC = () => {
    const router = useRouter();
    const routerId = router.asPath.split("/")[3];
    const characterId = routerId as string;

    const { character, characterLoading, characterError } =
        useCharacter(characterId);
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
                        <div className={clsx("m-3 mx-5")}>
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
                            <div className="flex flex-col h-content lg:flex-row lg:gap-5 lg:h-full">
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
                                <SheetAccordion headerContent="Roughly equal head">
                                    and content size
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
