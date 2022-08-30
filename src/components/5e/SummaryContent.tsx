import { CharacterInputValue } from "@/components/CharacterInputValue";
import { CharacterCard } from "@/components/Dashboard/CharacterCard";
import { AlignmentEnum, Character } from "@/types/character/5e-character";
import { useState } from "react";
import firebase from "../../../firebase/clientApp";

interface Props {
    character: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>;
}

export const SummaryContent: React.FC<Props> = ({ character }) => {
    const staticCharacter = character.data() as Character;
    const [characterState, setCharacterState] = useState(staticCharacter);
    const charRefSet = (data: any) => {
        character.ref.set(data, { merge: true });
    };

    return (
        <>
            <CharacterCard character={character}></CharacterCard>

            <CharacterInputValue
                label="Name:"
                value={characterState.name}
                onChange={(e) => {
                    setCharacterState({
                        ...characterState,
                        name: e.target.value,
                    });
                    charRefSet({
                        name: e.target.value,
                    });
                }}
            />

            <CharacterInputValue
                label="Class:"
                value={characterState.class}
                onChange={(e) => {
                    setCharacterState({
                        ...characterState,
                        class: e.target.value,
                    });
                    charRefSet({
                        class: e.target.value,
                    });
                }}
            />

            <CharacterInputValue
                label="Age:"
                value={characterState.summary.age}
                onChange={(e) => {
                    setCharacterState({
                        ...characterState,
                        summary: {
                            ...characterState.summary,
                            age: e.target.value,
                        },
                    });
                    charRefSet({
                        summary: { age: e.target.value },
                    });
                }}
            />

            <CharacterInputValue
                label="Height:"
                value={characterState.summary.height}
                onChange={(e) => {
                    setCharacterState({
                        ...characterState,
                        summary: {
                            ...characterState.summary,
                            height: e.target.value,
                        },
                    });
                    charRefSet({
                        summary: { height: e.target.value },
                    });
                }}
            />

            <CharacterInputValue
                label="Weight:"
                value={characterState.summary.weight}
                onChange={(e) => {
                    setCharacterState({
                        ...characterState,
                        summary: {
                            ...characterState.summary,
                            weight: e.target.value,
                        },
                    });
                    charRefSet({
                        summary: { weight: e.target.value },
                    });
                }}
            />

            <CharacterInputValue
                label="Eyes:"
                value={characterState.summary.eyes}
                onChange={(e) => {
                    setCharacterState({
                        ...characterState,
                        summary: {
                            ...characterState.summary,
                            eyes: e.target.value,
                        },
                    });
                    charRefSet({
                        summary: { eyes: e.target.value },
                    });
                }}
            />

            <CharacterInputValue
                label="Hair:"
                value={characterState.summary.hair}
                onChange={(e) => {
                    setCharacterState({
                        ...characterState,
                        summary: {
                            ...characterState.summary,
                            hair: e.target.value,
                        },
                    });
                    charRefSet({
                        summary: { hair: e.target.value },
                    });
                }}
            />

            <CharacterInputValue
                label="Skin:"
                value={characterState.summary.skin}
                onChange={(e) => {
                    setCharacterState({
                        ...characterState,
                        summary: {
                            ...characterState.summary,
                            skin: e.target.value,
                        },
                    });
                    charRefSet({
                        summary: { skin: e.target.value },
                    });
                }}
            />

            <CharacterInputValue
                label="Race:"
                value={characterState.summary.race}
                onChange={(e) => {
                    setCharacterState({
                        ...characterState,
                        summary: {
                            ...characterState.summary,
                            race: e.target.value,
                        },
                    });
                    charRefSet({
                        summary: { race: e.target.value },
                    });
                }}
            />

            <CharacterInputValue
                label="Alignment:"
                value={characterState.summary.alignment}
                onChange={(e) => {
                    setCharacterState({
                        ...characterState,
                        summary: {
                            ...characterState.summary,
                            alignment: e.target.value as AlignmentEnum,
                        },
                    });
                    charRefSet({
                        summary: { alignment: e.target.value },
                    });
                }}
            />

            <CharacterInputValue
                label="Background:"
                value={characterState.summary.background}
                onChange={(e) => {
                    setCharacterState({
                        ...characterState,
                        summary: {
                            ...characterState.summary,
                            background: e.target.value,
                        },
                    });
                    charRefSet({
                        summary: { background: e.target.value },
                    });
                }}
            />
        </>
    );
};
