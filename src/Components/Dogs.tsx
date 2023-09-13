// Right now these dogs are constant, but in reality we should be getting these from our server
// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
import { DogCard } from "./DogCard";
import { Dog } from "../types";
import { useDogs } from "../Providers/useDogs";

export const Dogs = () => {
  const { dogs, setDogs, view, setIsLoading, deleteDogRequest, patchFavoriteForDog } =
    useDogs();

    const filteredDogs = () => {
      switch (view) {
        case "showAllDogs":
          return dogs;
        case "showFavoriteDogs":
          return dogs.filter((dog) => dog.isFavorite);
        case "showUnfavoriteDogs":
          return dogs.filter((dog) => !dog.isFavorite);
        default:
          return dogs;
      }
    };

    const dogsToDisplay = filteredDogs();

  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {dogsToDisplay.map((dog: Dog, index: number) => (
        <DogCard
          dog={dog}
          key={index}
          onTrashIconClick={() => {
            // Optimistically delete dog
            const updatedDogs = dogs.filter((d) => d.id !== dog.id);
            setDogs(updatedDogs);
            setIsLoading(true);

            // API call
            deleteDogRequest(dog.id)
              .then(() => {
                // good to go nothing to do
              })
              .catch((error: string) => {
                // Revert optimistic update
                setDogs([...updatedDogs, dog]);
                alert(`Failed to delete dog ${error}`);
              })
              .finally(() => {
                setIsLoading(false);
              });
          }}
          onHeartClick={() => {
            const updatedDog = { ...dog, isFavorite: false };
            const updatedDogs = dogs.map((d) => {
              return d.id === dog.id ? updatedDog : d;
            });
            setDogs(updatedDogs);
            setIsLoading(true);

            patchFavoriteForDog(dog.id, updatedDog)
              .then(() => {
                // success
              })
              .catch((error: string) => {
                alert(`Failed to unfavorite dog ${error}`);
              })
              .finally(() => {
                setIsLoading(false);
              });
          }}
          onEmptyHeartClick={() => {
            const updatedDog = { ...dog, isFavorite: true };
            const updatedDogs = dogs.map((d) => {
              return d.id === dog.id ? updatedDog : d;
            });
            setDogs(updatedDogs);
            setIsLoading(true);

            patchFavoriteForDog(dog.id, updatedDog)
              .then(() => {
                // success
              })
              .catch((error: string) => {
                alert(`Failed to favorite dog ${error}`);
              })
              .finally(() => {
                setIsLoading(false);
              });
          }}
          isLoading={false}
        />
      ))}
    </>
  );
};
