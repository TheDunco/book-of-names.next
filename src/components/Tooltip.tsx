import React, { useState } from "react";

interface Props {
    children: React.ReactNode;
    content: React.ReactNode;
    delay?: number;
    direction?: string;
}

export const Tooltip: React.FC<Props> = ({
    children,
    content,
    delay = 700,
    direction = "top",
}) => {
    let timeout: NodeJS.Timeout | undefined;
    const [active, setActive] = useState(false);

    const showTip = () => {
        timeout = setTimeout(() => {
            setActive(true);
        }, delay);
    };

    const hideTip = () => {
        clearInterval(timeout);
        setActive(false);
    };

    return (
        <div
            className="Tooltip-Wrapper"
            // When to show the tooltip
            onMouseEnter={showTip}
            onMouseLeave={hideTip}
        >
            {/* Wrapping */}
            {children}
            {active && (
                <div className={`Tooltip-Tip ${direction} p-2 `}>
                    {/* Content */}
                    {content}
                </div>
            )}
        </div>
    );
};
