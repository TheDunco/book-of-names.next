import { useId } from "@mantine/hooks";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface Props {
    className?: string;
    boxClassName?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
    label?: React.ReactNode;
    disabled?: boolean;
    checked?: boolean;
}
export const Checkbox: React.FC<Props> = ({
    className,
    boxClassName,
    onChange,
    onClick,
    label,
    disabled,
    checked,
}) => {
    const id = useId();
    return (
        <>
            <div className={clsx("flex items-center mb-4", className)}>
                <input
                    id={`checkbox-${id}`}
                    type="checkbox"
                    value=""
                    className={twMerge(
                        "w-5 h-5 text-color-primary bg-color-primary rounded border-color-special focus:ring-color-secondary focus:ring-1 focus:ring-opacity-20 ",
                        boxClassName
                    )}
                    disabled={disabled}
                    onChange={onChange}
                    onClick={onClick}
                    checked={checked}
                />
                <label
                    htmlFor={`checkbox-${id}`}
                    className="ml-2 text-sm text-color-text "
                >
                    {label}
                </label>
            </div>
        </>
    );
};
