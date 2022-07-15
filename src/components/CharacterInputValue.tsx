import clsx from "clsx";
import { ChangeEvent } from "react";

interface Props {
    className?: string;
    value: string | number | readonly string[] | undefined;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const CharacterInputValue: React.FC<Props> = ({
    className,
    value,
    onChange,
}) => {
    return (
        <form>
            <input
                className={clsx(
                    className,
                    "border-none bg-color-bg text-color-text rounded-sm focus:border-color-primary focus:ring-0 focus:outline-color-primary"
                )}
                type="text"
                value={value}
                onChange={onChange}
            ></input>
        </form>
    );
};
