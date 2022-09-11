import { useId } from "@mantine/hooks";
import clsx from "clsx";

interface Props {
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
    label?: React.ReactNode;
    disabled?: boolean;
    checked?: boolean;
}
export const Checkbox: React.FC<Props> = ({
    className,
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
                    className="w-5 h-5 text-color-primary bg-color-primary rounded border-color-special focus:ring-color-secondary focus:ring-1 focus:ring-opacity-20 "
                    disabled={disabled}
                    onChange={onChange}
                    onClick={onClick}
                    checked={checked}
                />
                <label
                    htmlFor={`checkbox-${id}`}
                    className="ml-2 text-sm font-lg text-color-text "
                >
                    {label}
                </label>
            </div>
        </>
    );
};
