import clsx from "clsx";
import { useState } from "react";

interface Props {
    className?: string;
    characterName: string;
}

export const CharacterInputValue: React.FC<Props> = ({
    className,
    characterName,
}) => {
    const [value, setValue] = useState(characterName);
    return (
        <form>
            <input
                className={clsx(
                    className,
                    "border-none bg-color-bg text-color-text rounded-sm focus:border-color-primary focus:ring-0 focus:outline-color-primary"
                )}
                type="text"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            ></input>
        </form>
    );
};
