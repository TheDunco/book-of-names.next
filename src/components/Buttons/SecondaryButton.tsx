import clsx from "clsx";

interface Props {
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode;
}

export const SecondaryButton: React.FC<Props> = ({
    className,
    onClick,
    children,
}) => {
    return (
        <button
            className={clsx(
                className,
                "bg-color-secondary px-3 py-2 hover:brightness-[.85] hover:text-opacity-0 rounded-md text-color-special"
            )}
            onClick={(e) => {
                if (onClick) {
                    onClick();
                }
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
            }}
        >
            {children}
        </button>
    );
};
