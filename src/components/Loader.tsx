import clsx from "clsx";

export const loaderURL = "/Ellipsis-1s-200px.svg";

interface Props {
    className?: string;
}

export const Loader: React.FC<Props> = ({ className }) => {
    return (
        <div className={clsx("w-fit h-fit", className)}>
            <img
                alt="loader"
                aria-label="loader"
                src="/Ellipsis-1s-200px.svg"
            ></img>
        </div>
    );
};
