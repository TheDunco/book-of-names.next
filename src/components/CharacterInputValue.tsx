import clsx from "clsx";
import { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
    className?: string;
    formClassName?: string;
    value: string | number | readonly string[] | undefined;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    label?: React.ReactNode;
    type?: "text" | "number";
}

const standardStyles = "bg-color-bg text-color-text w-full";
const stateStyles =
    "border border-opacity-50 rounded-md hover:border-opacity-100 hover:ring-1 hover:ring-color-secondary focus:border-color-primary focus:ring-0";

export const CharacterInputValue: React.FC<Props> = ({
    className,
    value,
    formClassName,
    onChange,
    label,
    type,
}) => {
    return (
        <form
            className={twMerge(formClassName, "flex flex-row py-2")}
            onSubmit={(e) => {
                e.preventDefault();
            }}
            onKeyDownCapture={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                }
            }}
        >
            <label className="mr-3">{label}</label>
            <input
                className={clsx(className, stateStyles, standardStyles)}
                type={type}
                value={value}
                onChange={onChange}
                onClick={(e) => {
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                }}
            ></input>
        </form>
    );
};
