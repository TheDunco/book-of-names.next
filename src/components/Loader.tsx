import clsx from "clsx";

export const loaderURL = "loader.svg";

interface Props {
    className?: string;
}

export const Loader: React.FC<Props> = ({ className }) => {
    return (
        <div className={clsx("w-fit h-fit", className)}>
            <img alt="loader" aria-label="loader" src={loaderURL}></img>
        </div>
    );
};
