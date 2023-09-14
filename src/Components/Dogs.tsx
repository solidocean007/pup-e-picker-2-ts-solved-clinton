// Right now these dogs are constant, but in reality we should be getting these from our server
// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
import { DogCard } from "./DogCard";
import { Dog } from "../types";
import { useDogs } from "../Providers/useDogs";

export const Dogs = () => {
  const { dogs, view, deleteDog, favoriteDog, unFavoriteDog } = useDogs();

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
          onTrashIconClick={() => deleteDog(dog)} 
          onHeartClick={() => unFavoriteDog(dog)}
          onEmptyHeartClick={() => favoriteDog(dog)}
          isLoading={false}
        />
      ))}
    </>
  );
};
