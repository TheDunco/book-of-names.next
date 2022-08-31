import { CharacterInputValue } from "@/components/CharacterInputValue";
import { CharacterCard } from "@/components/Dashboard/CharacterCard";
import { use5eCharacterStore } from "@/lib/stores/5eCharacterStore";
import { AlignmentEnum, Character } from "@/types/character/5e-character";
import { useState } from "react";
import firebase from "../../../firebase/clientApp";

interface Props {
    character: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>;
}

export const SummaryContent: React.FC<Props> = ({ character }) => {
    // const staticCharacter = character.data() as Character;
    // const [characterState, setCharacterState] = useState(staticCharacter);
    const charRefSet = (data: any) => {
        character.ref.set(data, { merge: true });
    };

    const characterState = use5eCharacterStore();

    return (
        <>
            <CharacterCard character={character}></CharacterCard>

            <CharacterInputValue
                label="Name:"
                value={characterState.name}
                onChange={(e) => {
                    charRefSet({
                        name: e.target.value,
                    });
                }}
            />

            <CharacterInputValue
                label="Class:"
                value={characterState.class}
                onChange={(e) => {
                    charRefSet({
                        class: e.target.value,
                    });
                }}
            />

            <CharacterInputValue
                label="Age:"
                value={characterState.summary.age}
                onChange={(e) => {
                    charRefSet({
                        summary: { age: e.target.value },
                    });
                }}
            />

            <CharacterInputValue
                label="Height:"
                value={characterState.summary.height}
                onChange={(e) => {
                    charRefSet({
                        summary: { height: e.target.value },
                    });
                }}
            />

            <CharacterInputValue
                label="Weight:"
                value={characterState.summary.weight}
                onChange={(e) => {
                    charRefSet({
                        summary: { weight: e.target.value },
                    });
                }}
            />

            <CharacterInputValue
                label="Eyes:"
                value={characterState.summary.eyes}
                onChange={(e) => {
                    charRefSet({
                        summary: { eyes: e.target.value },
                    });
                }}
            />

            <CharacterInputValue
                label="Hair:"
                value={characterState.summary.hair}
                onChange={(e) => {
                    charRefSet({
                        summary: { hair: e.target.value },
                    });
                }}
            />

            <CharacterInputValue
                label="Skin:"
                value={characterState.summary.skin}
                onChange={(e) => {
                    charRefSet({
                        summary: { skin: e.target.value },
                    });
                }}
            />

            <CharacterInputValue
                label="Race:"
                value={characterState.summary.race}
                onChange={(e) => {
                    charRefSet({
                        summary: { race: e.target.value },
                    });
                }}
            />

            <CharacterInputValue
                label="Alignment:"
                value={characterState.summary.alignment}
                onChange={(e) => {
                    charRefSet({
                        summary: { alignment: e.target.value },
                    });
                }}
            />

            <CharacterInputValue
                label="Background:"
                value={characterState.summary.background}
                onChange={(e) => {
                    charRefSet({
                        summary: { background: e.target.value },
                    });
                }}
            />
        </>
    );
};
