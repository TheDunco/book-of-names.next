import clsx from "clsx";
import { ChangeEvent } from "react";

interface Props {
    className?: string;
    formClassName?: string;
    value: string | number | readonly string[] | undefined;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const standardStyles = "bg-color-bg text-color-text ";
const stateStyles =
    "border border-opacity-50 rounded-md hover:border-opacity-100 hover:ring-1 hover:ring-color-secondary focus:border-color-primary focus:ring-0";

export const CharacterInputValue: React.FC<Props> = ({
    className,
    value,
    formClassName,
    onChange,
}) => {
    return (
        <form className={formClassName}>
            <input
                className={clsx(className, stateStyles, standardStyles)}
                type="text"
                value={value}
                onChange={onChange}
            ></input>
        </form>
    );
};
