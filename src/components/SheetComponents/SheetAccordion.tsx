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
    // const settings = useSettingsStore((state) => state.settings);
    return (
        <div className={className}>
            <div
                aria-label="accordion-border"
                className={clsx(
                    "flex flex-col border bg-color-bg border-color-special rounded-md p-3 transition-all duration-300 ease-in-out min-w-[300px] max-w-screen",
                    "sm:bg-transparent sm:backdrop-blur-[100px] shadow-lg" // this eventually should be toggleable
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
                    <h2
                        className={clsx(
                            "font-semibold select-none whitespace-nowrap min-w-fit",
                            expanded ? "cursor-n-resize" : "cursor-s-resize"
                        )}
                    >
                        {headerContent}
                    </h2>
                    <CaretDown
                        className={clsx(
                            "transition-all duration-300 ease-in-out",
                            expanded
                                ? "rotate-180 cursor-n-resize"
                                : "cursor-s-resize"
                        )}
                    />
                </div>
                <div className={clsx(expanded ? "" : "h-0 hidden")}>
                    {children}
                </div>
            </div>
        </div>
    );
};
