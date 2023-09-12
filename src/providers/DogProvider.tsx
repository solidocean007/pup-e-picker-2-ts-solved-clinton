// DogProvider.tsx
import { createContext, useState, useEffect, ReactNode } from "react";
import { Dog } from "../types";
import { Requests } from "../api";

type TDogProvider = {
  dogs: Dog[];
  setView: React.Dispatch<React.SetStateAction<TypeOfView>>;
  view: TypeOfView;
  setDogs: React.Dispatch<React.SetStateAction<Dog[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  postDog: (dog: Omit<Dog, "id">) => Promise<Dog>;
  deleteDogRequest: (id: number) => Promise<Response>;
  patchFavoriteForDog: (id: number, updatedDog: Dog) => Promise<Dog>;
  totalFavoriteCount: number;
  totalUnfavoriteCount: number;
};

export type TypeOfView =
  | "showAllDogs"
  | "showFavoriteDogs"
  | "showUnfavoriteDogs"
  | "showCreateDog";

type DogProviderProps = {
  children: ReactNode;
};

export const DogContext = createContext<TDogProvider | undefined>(undefined); // does this have to be undefined?

export const DogProvider = ({ children }: DogProviderProps) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [view, setView] = useState<TypeOfView>("showAllDogs");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalFavoriteCount, setTotalFavoriteCount] = useState(0);
  const [totalUnfavoriteCount, setTotalUnfavoriteCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response: Dog[] = await Requests.getAllDogs(); // I need to get my api function to return Promise<Dog[]>.  this still has an error

        setDogs(response);
        setTotalFavoriteCount(response.filter((d) => d.isFavorite).length);
        setTotalUnfavoriteCount(response.filter((d) => !d.isFavorite).length);
      } catch (error) {
        console.error("An error occurred while fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData().catch((error) => console.error(error));
  }, []);

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

  const { postDog, deleteDogRequest, patchFavoriteForDog } = Requests;

  return (
    <DogContext.Provider
      value={{
        dogs: filteredDogs(),
        setView,
        view,
        setDogs, // type mismatch
        isLoading,
        setIsLoading,
        postDog,
        deleteDogRequest,
        patchFavoriteForDog,
        totalFavoriteCount,
        totalUnfavoriteCount,
      }}
    >
      {children}
    </DogContext.Provider>
  );
};
