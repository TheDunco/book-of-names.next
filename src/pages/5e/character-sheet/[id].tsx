import { FifthEditionCharacterSheetHeader } from "@/components/5e/5eHeaderContent";
import { AbilitiesContent } from "@/components/5e/AbilitiesContent";
import { AbilityScoresContent } from "@/components/5e/AbilityScoresContent";
import { ActionsContent } from "@/components/5e/ActionsContent";
import { DefensesContent } from "@/components/5e/DefensesContent";
import { EquipmentContent } from "@/components/5e/EquipmentContent";
import { FeatsContent } from "@/components/5e/FeatsContent";
import { HealthContent } from "@/components/5e/HealthContent";
import { ImagesContent } from "@/components/5e/ImagesContent";
import { LanguagesContent } from "@/components/5e/LanguagesContent";
import { NotesContent } from "@/components/5e/NotesContent";
import { ProficienciesContent } from "@/components/5e/ProficienciesContent";
import { SkillsContent } from "@/components/5e/SkillsContent";
import { SpellsContent } from "@/components/5e/SpellsContent";
import { layoutHorizontal } from "@/components/Dashboard/Dashboard";
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
        characterState.abilityScores[0] =
            staticCharacter.abilityScores.scores.Charisma;
        characterState.abilityScores[1] =
            staticCharacter.abilityScores.scores.Constitution;
        characterState.abilityScores[2] =
            staticCharacter.abilityScores.scores.Dexterity;
        characterState.abilityScores[3] =
            staticCharacter.abilityScores.scores.Intelligence;
        characterState.abilityScores[4] =
            staticCharacter.abilityScores.scores.Strength;
        characterState.abilityScores[5] =
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
                            <FifthEditionCharacterSheetHeader
                                layoutMode={layoutMode}
                                setLayoutMode={setLayoutMode}
                                syncLayout={syncLayout}
                            />
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
                                    headerContent={"Ability Scores"}
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

                                <SheetAccordion headerContent={"Defenses"}>
                                    <DefensesContent />
                                </SheetAccordion>

                                <SheetAccordion headerContent={"Proficiencies"}>
                                    <ProficienciesContent />
                                </SheetAccordion>

                                <SheetAccordion headerContent={"Languages"}>
                                    <LanguagesContent />
                                </SheetAccordion>

                                <SheetAccordion headerContent={"Images"}>
                                    <ImagesContent />
                                </SheetAccordion>

                                <SheetAccordion headerContent={"Notes"}>
                                    <NotesContent />
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
