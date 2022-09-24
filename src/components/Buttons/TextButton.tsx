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
        <div
            className={clsx(
                className,
                "px-3 py-2 text-color-primary cursor-pointer"
            )}
            onClick={onClick}
        >
            {children}
        </div>
    );
};
