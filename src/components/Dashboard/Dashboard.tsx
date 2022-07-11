import { Loader } from "../Loader";
import clsx from "clsx";
import { useCharacters } from "../../services/Character/CharacterService";
import { CharacterCard } from "./CharacterCard";

interface Props {
    className?: string;
}

export const Dashboard: React.FC<Props> = ({ className }) => {
    const {
        usersCharacters,
        usersCharactersLoading,
        charactersError,
        userError,
        userDocumentError,
    } = useCharacters();

    return (
        <>
            <div className={clsx(className, "flex justify-start ml-10 mt-5")}>
                <span className={clsx("flex flex-row w-screen")}>
                    {usersCharacters?.map((character) => (
                        <CharacterCard
                            key={character.id}
                            character={character}
                        ></CharacterCard>
                    ))}
                </span>
                {!usersCharacters && usersCharactersLoading && <Loader />}
                {charactersError && <>{charactersError.message}</>}
                {userError && <>{userError.message}</>}
                {userDocumentError && <>{userDocumentError.message}</>}
            </div>
        </>
    );
};
