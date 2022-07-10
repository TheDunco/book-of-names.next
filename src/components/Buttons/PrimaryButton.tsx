import clsx from "clsx";

interface Props {
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode;
}

export const PrimaryButton: React.FC<Props> = ({
    className,
    onClick,
    children,
}) => {
    return (
        <button
            className={clsx(
                "bg-color-primary px-3 py-2 hover:brightness-[.85] hover:text-opacity-0 rounded-md text-color-bg",
                className
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
