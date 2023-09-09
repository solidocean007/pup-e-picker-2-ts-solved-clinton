// DogProvider.tsx
import { createContext, useState, useEffect, ReactNode } from "react";
import { Dog } from "../types";
import { Requests } from "../api";
import { OptimisticDog } from "../Components/CreateDogForm";

type TDogProvider = {
  dogs: Dog[];
  setView: React.Dispatch<React.SetStateAction<TypeOfView>>;
  setDogs: React.Dispatch<React.SetStateAction<Dog[] | OptimisticDog[]>>;
  isLoading: boolean;
  postDog: (dog: Omit<Dog, "id">) => Promise<Dog>;
  deleteDogRequest: (id: number) => Promise<Response>;
  patchFavoriteForDog: (id: number, updatedDog: Dog) => Promise<Dog>;
};

export type TypeOfView =
  | "showAllDogs"
  | "showFavoriteDogs"
  | "showUnfavoriteDogs"
  | "showCreateDog";

type DogProviderProps = {
  children: ReactNode;
};

export const DogContext = createContext<TDogProvider | undefined>(undefined);

export const DogProvider = ({ children }: { children: DogProviderProps }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [view, setView] = useState<TypeOfView>("showAllDogs");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await Requests.getAllDogs(); //unsafe assingment of any value
        setDogs(response); // unsafe argument of type any
      } catch (error) {
        console.error("An error occurred while fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData(); // Promises must be awaited, end with a call to .catch, end with a call to .then with a rejection handler or be explicitly marked as ignored with the `void` operator
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


  return (
    <DogContext.Provider value={{ dogs: filteredDogs(), setView }}>
      {children}
      {/*Type 'DogProviderProps' is not assignable to type 'ReactNode'.
  Type 'DogProviderProps' is missing the following properties from type 'ReactPortal': key, type, props*/}
    </DogContext.Provider>
  );
};
