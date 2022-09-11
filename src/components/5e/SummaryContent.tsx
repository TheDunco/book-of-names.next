import { CharacterInputValue } from "@/components/CharacterInputValue";
import { CharacterCard } from "@/components/Dashboard/CharacterCard";
import { charRefSet } from "@/lib/charRefSet";
import { use5eCharacterStore } from "@/lib/stores/5eCharacterStore";
import firebase from "../../../firebase/clientApp";

interface Props {
    character: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>;
}

export const SummaryContent: React.FC<Props> = ({ character }) => {
    const characterState = use5eCharacterStore();

    return (
        <>
            <CharacterCard character={character}></CharacterCard>

            <CharacterInputValue
                label="Name:"
                value={characterState.name}
                onChange={(e) => {
                    charRefSet(character, {
                        name: e.target.value,
                    });
                }}
            />

            <CharacterInputValue
                label="Class:"
                value={characterState.class}
                onChange={(e) => {
                    charRefSet(character, {
                        class: e.target.value,
                    });
                }}
            />

            <CharacterInputValue
                label="Age:"
                value={characterState.summary.age}
                onChange={(e) => {
                    charRefSet(character, {
                        summary: { age: e.target.value },
                    });
                }}
            />

            <CharacterInputValue
                label="Height:"
                value={characterState.summary.height}
                onChange={(e) => {
                    charRefSet(character, {
                        summary: { height: e.target.value },
                    });
                }}
            />

            <CharacterInputValue
                label="Weight:"
                value={characterState.summary.weight}
                onChange={(e) => {
                    charRefSet(character, {
                        summary: { weight: e.target.value },
                    });
                }}
            />

            <CharacterInputValue
                label="Eyes:"
                value={characterState.summary.eyes}
                onChange={(e) => {
                    charRefSet(character, {
                        summary: { eyes: e.target.value },
                    });
                }}
            />

            <CharacterInputValue
                label="Hair:"
                value={characterState.summary.hair}
                onChange={(e) => {
                    charRefSet(character, {
                        summary: { hair: e.target.value },
                    });
                }}
            />

            <CharacterInputValue
                label="Skin:"
                value={characterState.summary.skin}
                onChange={(e) => {
                    charRefSet(character, {
                        summary: { skin: e.target.value },
                    });
                }}
            />

            <CharacterInputValue
                label="Race:"
                value={characterState.summary.race}
                onChange={(e) => {
                    charRefSet(character, {
                        summary: { race: e.target.value },
                    });
                }}
            />

            <CharacterInputValue
                label="Alignment:"
                value={characterState.summary.alignment}
                onChange={(e) => {
                    charRefSet(character, {
                        summary: { alignment: e.target.value },
                    });
                }}
            />

            <CharacterInputValue
                label="Background:"
                value={characterState.summary.background}
                onChange={(e) => {
                    charRefSet(character, {
                        summary: { background: e.target.value },
                    });
                }}
            />
        </>
    );
};
