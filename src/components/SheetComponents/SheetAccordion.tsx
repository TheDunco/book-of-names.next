import { useToggle } from "@mantine/hooks";
import clsx from "clsx";
import { CaretDown } from "tabler-icons-react";

export interface AccordionProps {
    className?: string;
    children: React.ReactNode;
    headerContent?: React.ReactNode;
}

export const SheetAccordion: React.FC<AccordionProps> = ({
    className,
    children,
    headerContent,
}) => {
    const [expanded, toggleExpanded] = useToggle(true, [true, false]);
    return (
        <div className={clsx("", className)}>
            <div
                aria-label="accordion-border"
                className={clsx(
                    "flex flex-col border border-color-special rounded-md p-3 transition-all duration-300 ease-in-out"
                )}
            >
                <div
                    aria-label="accordion-header"
                    className={clsx(
                        "flex flex-row justify-center items-center",
                        expanded
                            ? "border-b border-color-special mb-2 pb-2"
                            : ""
                    )}
                    onClick={() => {
                        toggleExpanded();
                    }}
                >
                    <CaretDown
                        className={clsx(
                            "transition-all duration-300 ease-in-out",
                            expanded
                                ? "rotate-180 cursor-s-resize"
                                : "cursor-n-resize"
                        )}
                    />
                    <h2
                        className={clsx(
                            "font-semibold select-none whitespace-nowrap",
                            expanded ? "cursor-s-resize" : "cursor-n-resize"
                        )}
                    >
                        {headerContent}
                    </h2>
                </div>
                <div className={clsx(expanded ? "" : "h-0 hidden")}>
                    {children}
                </div>
            </div>
        </div>
    );
};
