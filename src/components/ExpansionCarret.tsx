import { CaretDown } from "tabler-icons-react";
import { twMerge } from "tailwind-merge";

interface Props {
    className?: string;
    down: boolean;
}
export const ExpansionCarret: React.FC<Props> = ({ className, down }) => {
    return (
        <span
            className={twMerge(
                className,
                "transform-gpu transition-all duration-200 ease-in-out",
                down ? "mt-1 rotate-180 lg:mt-2" : "mb-1 lg:mt-2"
            )}
        >
            <CaretDown />
        </span>
    );
};
