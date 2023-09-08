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
  postDog: (dog: Omit<Dog, 'id'>) => Promise<Dog>;
  deleteDogRequest: (id: number) => Promise<Response>;
  patchFavoriteForDog: (id: number, updatedDog: Dog) => Promise<Dog>;
};

type TypeOfView = 'showAllDogs' | 'showFavoriteDogs' | 'showUnfavoriteDogs' | 'showCreateDog';

type DogProviderProps = {
  children: ReactNode;
};

export const DogContext = createContext<TDogProvider | undefined>(undefined);


// export const DogProvider = ({ children }: { children: ReactNode }) => {
export const DogProvider = ({ children }: { children: DogProviderProps }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [view, setView] = useState<TypeOfView>('showAllDogs');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await Requests.getAllDogs();
        setDogs(response);
      } catch (error) {
        console.error("An error occurred while fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredDogs = () => {
    switch (view) {
      case 'showAllDogs':
        return dogs;
      case 'showFavoriteDogs':
        return dogs.filter((dog) => dog.isFavorite);
      case 'showUnfavoriteDogs':
        return dogs.filter((dog) => !dog.isFavorite);
      default:
        return dogs;
    }
  };

  return (
    <DogContext.Provider value={{ dogs: filteredDogs(), setView }}>
      {children}
    </DogContext.Provider>
  );
};
