import { Character } from "@/services/Character/CharacterService";
import clsx from "clsx";
import ReactTooltip from "react-tooltip";
import { CharacterInputValue } from "../CharacterInputValue";

interface Props {
    className?: string;
    character: Character;
}

export const CharacterCard: React.FC<Props> = ({ className, character }) => {
    return (
        <>
            <ReactTooltip id={character.id} delayShow={500} type="dark">
                <span>To {character.name}'s character sheet</span>
            </ReactTooltip>
            <div
                data-tip
                data-for={character.id}
                className={clsx(
                    className,
                    "border border-color-secondary rounded-md p-5 cursor-pointer w-fit h-fit mr-5"
                )}
            >
                <CharacterInputValue characterName={character.name} />
            </div>
        </>
    );
};
