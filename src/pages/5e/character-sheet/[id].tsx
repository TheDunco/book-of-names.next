import { AbilitiesContent } from "@/components/5e/AbilitiesContent";
import { AbilityScoresContent } from "@/components/5e/AbilityScoresContent";
import { ActionsContent } from "@/components/5e/ActionsContent";
import { EquipmentContent } from "@/components/5e/EquipmentContent";
import { FeatsContent } from "@/components/5e/FeatsContent";
import { HealthContent } from "@/components/5e/HealthContent";
import { SkillsContent } from "@/components/5e/SkillsContent";
import { SpellsContent } from "@/components/5e/SpellsContent";
import { PrimaryButton } from "@/components/Buttons/PrimaryButton";
import { TextButton } from "@/components/Buttons/TextButton";
import {
    layoutGrid,
    layoutHorizontal,
    layoutVertical,
} from "@/components/Dashboard/Dashboard";
import { Loader } from "@/components/Loader";
import { SheetAccordion } from "@/components/SheetComponents/SheetAccordion";
import { ThemeLayout } from "@/layouts/ThemeLayout";
import { charRefSet } from "@/lib/charRefSet";
import { use5eCharacterStore } from "@/lib/stores/5eCharacterStore";
import { useCharacter } from "@/services/5e-character/use-character";
import { useUser } from "@/services/user-service";
import { Character } from "@/types/character/5e-character";
import { AppConfig } from "@/utils/AppConfig";
import { useLocalStorage } from "@mantine/hooks";
import clsx from "clsx";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import ReactTooltip from "react-tooltip";
import {
    ArrowLeft,
    LayoutDistributeHorizontal,
    LayoutDistributeVertical,
    LayoutGrid,
} from "tabler-icons-react";
import { SummaryContent } from "../../../components/5e/SummaryContent";

const layoutKey = "5e-sheet-layout";

const fifthEditionCharacterSheet: React.FC = () => {
    const router = useRouter();
    const { user, userLoading } = useUser();

    useEffect(() => {
        // redirect to login if user is not logged in and we're on the client
        if (!user && !userLoading) {
            router.push("/");
        }
    }, [user, userLoading]);

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

    const check = character?.data();
    const staticCharacter = check as Character;
    const characterState = use5eCharacterStore();

    const mapAbilityScores = () => {
        characterState.abilityScores.charisma =
            staticCharacter.abilityScores.scores.Charisma;
        characterState.abilityScores.constitution =
            staticCharacter.abilityScores.scores.Constitution;
        characterState.abilityScores.dexterity =
            staticCharacter.abilityScores.scores.Dexterity;
        characterState.abilityScores.intelligence =
            staticCharacter.abilityScores.scores.Intelligence;
        characterState.abilityScores.strength =
            staticCharacter.abilityScores.scores.Strength;
        characterState.abilityScores.wisdom =
            staticCharacter.abilityScores.scores.Wisdom;
    };

    if (!characterLoading && Boolean(check) && !!character) {
        characterState.firebaseCharacter = character;
        characterState.name = staticCharacter.name;
        characterState.class = staticCharacter.class;
        characterState.summary = staticCharacter.summary;
        characterState.level = staticCharacter.level;
        characterState.health = staticCharacter.health;
        characterState.unconscious = staticCharacter.unconscious;
        characterState.dead = staticCharacter.dead;
        mapAbilityScores();
        charRefSet(character, {
            currentVersion: AppConfig.version,
        });
    }

    return (
        <>
            {characterLoading ? (
                <ThemeLayout>
                    <Loader />
                </ThemeLayout>
            ) : (
                character && (
                    <ThemeLayout backgroundImage={staticCharacter.imageLink}>
                        {characterError && <div>{characterError.message}</div>}
                        <div
                            className={clsx(
                                "flex flex-col mx-1 sm:mx-3 w-[calc(100vw-1rem)] pb-5"
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
                            <h1 className="flex font-bold text-2xl align-center">
                                {characterState.name} &mdash; Level&nbsp;
                                {characterState.level} {characterState.class}
                            </h1>

                            <div
                                className={clsx(
                                    "overflow-auto gap-3",
                                    layoutMode
                                )}
                            >
                                <SheetAccordion
                                    headerContent={staticCharacter.name}
                                >
                                    <SummaryContent
                                        character={character}
                                    ></SummaryContent>
                                </SheetAccordion>

                                <SheetAccordion
                                    headerContent={`Health: ${
                                        Number(
                                            staticCharacter.health.hpCurrent
                                        ) +
                                        Number(staticCharacter.health.hpTemp)
                                    }/${staticCharacter.health.hpMax}`}
                                >
                                    <HealthContent character={character} />
                                </SheetAccordion>

                                <SheetAccordion
                                    headerContent={`Ability Scores`}
                                >
                                    <AbilityScoresContent />
                                </SheetAccordion>

                                <SheetAccordion headerContent={"Skills"}>
                                    <SkillsContent />
                                </SheetAccordion>

                                <SheetAccordion headerContent={"Spells"}>
                                    <SpellsContent />
                                </SheetAccordion>

                                <SheetAccordion headerContent={"Actions"}>
                                    <ActionsContent />
                                </SheetAccordion>

                                <SheetAccordion headerContent={"Abilities"}>
                                    <AbilitiesContent />
                                </SheetAccordion>

                                <SheetAccordion headerContent={"Feats"}>
                                    <FeatsContent />
                                </SheetAccordion>

                                <SheetAccordion headerContent={"Equipment"}>
                                    <EquipmentContent />
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
