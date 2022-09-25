import { twMerge } from "tailwind-merge";

interface Props {
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode;
    stopPropagation?: boolean;
}

export const PrimaryButton: React.FC<Props> = ({
    className,
    onClick,
    children,
    stopPropagation,
}) => {
    return (
        <button
            className={twMerge(
                "bg-color-primary text-lg px-3 py-1 hover:brightness-[.85] hover:text-opacity-0 rounded-md text-color-bg",
                className
            )}
            onClick={(e) => {
                onClick?.();
                if (stopPropagation) {
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    e.preventDefault();
                }
            }}
        >
            {children}
        </button>
    );
};
