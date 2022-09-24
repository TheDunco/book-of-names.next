import { PrimaryButton } from "@/components/Buttons/PrimaryButton";
import { TextButton } from "@/components/Buttons/TextButton";
import {
    layoutGrid,
    layoutHorizontal,
    layoutVertical,
} from "@/components/Dashboard/Dashboard";
import { use5eCharacterStore } from "@/lib/stores/5eCharacterStore";
import clsx from "clsx";
import router from "next/router";
import React from "react";
import ReactTooltip from "react-tooltip";
import {
    ArrowLeft,
    LayoutDistributeHorizontal,
    LayoutDistributeVertical,
    LayoutGrid,
} from "tabler-icons-react";

interface Props {
    layoutMode: string;
    setLayoutMode: (layout: string) => void;
    syncLayout: () => void;
}

export const CharacteName: React.FC<{ className?: string }> = ({
    className,
}) => {
    const characterState = use5eCharacterStore();
    return (
        <h1
            className={clsx(
                "font-bold text-color-primary w-fit text-2xl align-center",
                className
            )}
        >
            {characterState.name} &mdash; Level&nbsp;
            {characterState.level} {characterState.class}
        </h1>
    );
};

export const FifthEditionCharacterSheetHeader: React.FC<Props> = ({
    layoutMode,
    setLayoutMode,
    syncLayout,
}) => {
    return (
        <>
            <span className="flex justify-start gap-3 my-3">
                <div>
                    <ReactTooltip
                        id="backButtonTip"
                        type="light"
                        delayShow={400}
                    >
                        Back to Dashboard
                    </ReactTooltip>

                    <TextButton
                        data-tip
                        data-for="backButtonTip"
                        className="h-fit w-fit py-1"
                        onClick={() => {
                            router.push("/");
                        }}
                    >
                        <ArrowLeft />
                    </TextButton>
                </div>

                <PrimaryButton
                    className={clsx(
                        "h-fit w-fit py-1",
                        layoutMode === layoutHorizontal
                            ? "bg-color-special"
                            : "bg-color-secondary"
                    )}
                    onClick={() => {
                        setLayoutMode(layoutHorizontal);
                        syncLayout();
                    }}
                >
                    <LayoutDistributeHorizontal />
                </PrimaryButton>

                <PrimaryButton
                    className={clsx(
                        "h-fit w-fit py-1",
                        layoutMode === layoutVertical
                            ? "bg-color-special"
                            : "bg-color-secondary"
                    )}
                    onClick={() => {
                        setLayoutMode(layoutVertical);
                        syncLayout();
                    }}
                >
                    <LayoutDistributeVertical />
                </PrimaryButton>

                <PrimaryButton
                    className={clsx(
                        "h-fit w-fit py-1",
                        layoutMode === layoutGrid
                            ? "bg-color-special"
                            : "bg-color-secondary"
                    )}
                    onClick={() => {
                        setLayoutMode(layoutGrid);
                        syncLayout();
                    }}
                >
                    <LayoutGrid />
                </PrimaryButton>

                {/* TODO: Fix this enough to get it working. Default on for now */}
                {/* <PrimaryButton
                    className={clsx(
                        "h-fit w-fit py-1",
                        settings.settings.sheetAccordionBlur
                            ? "bg-color-special"
                            : "bg-color-secondary"
                    )}
                    onClick={() => {
                        settings.toggleSheetAccordionBlur();
                    }}
                >
                    <Blur />
                </PrimaryButton> */}

                <CharacteName className="hidden md:flex" />
            </span>
            <CharacteName className="md:hidden flex -mt-3 mb-2" />
        </>
    );
};
