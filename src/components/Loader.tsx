export const loaderURL = "/Ellipsis-1s-200px.svg";

export const Loader: React.FC = () => {
    return (
        <div className="w-fit h-fit">
            <img
                alt="loader"
                aria-label="loader"
                src="/Ellipsis-1s-200px.svg"
            ></img>
        </div>
    );
};
