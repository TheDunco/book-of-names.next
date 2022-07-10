import clsx from "clsx";

interface Props {
    className?: string;
}

export const Dashboard: React.FC<Props> = ({ className }) => {
    return (
        <>
            <div className={clsx(className, "flex justify-start ml-10 mt-5")}>
                <div>Dashboard</div>
            </div>
        </>
    );
};
