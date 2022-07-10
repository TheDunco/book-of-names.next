import clsx from "clsx";

interface Props {
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode;
}

export const TextButton: React.FC<Props> = ({
    className,
    onClick,
    children,
}) => {
    return (
        <button
            className={clsx(
                className,
                "bg-color-secondary px-3 py-2 rounded-md text-color-text"
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
