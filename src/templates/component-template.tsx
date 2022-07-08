import clsx from "clsx";
interface Props {
    className?: string;
}

export const Template: React.FC<Props> = ({ className }) => {
    return <div className={clsx(className, "")}></div>;
};
