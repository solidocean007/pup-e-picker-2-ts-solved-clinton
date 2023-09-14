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
  createDog: (createDog: Omit<Dog, "id">) => Promise<unknown>;
  deleteDog: (dog: Dog) => void;
  favoriteDog: (updatedDog: Dog) => void;
  unFavoriteDog: (updatedDog: Dog) => void;
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

export const DogProvider = ({ children }: DogProviderProps) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [view, setView] = useState<TypeOfView>("showAllDogs");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { getAllDogs, postDog, patchFavoriteForDog } = Requests;

  const refetchDogs = async () => {
    setIsLoading(true);
    return getAllDogs()
      .then(setDogs)
      .catch((error)=> console.log(error))
      .finally(()=>setIsLoading(false));
  };

  const createDog = async (dog: Omit<Dog, 'id'>) => {
    setIsLoading(true);
    return postDog(dog)
      .then(()=> refetchDogs())
      .finally(()=> setIsLoading(false))
  }

  const deleteDog = (dog: Dog) => {
    setIsLoading(true);
    // Optimistically delete dog
    const updatedDogs = dogs.filter((d) => d.id !== dog.id);
    setDogs(updatedDogs);
    Requests.deleteDogRequest(dog.id)
    .catch((error: string) => {
      // Revert optimistic update
      setDogs([...updatedDogs, dog]);
      alert(`Failed to delete dog ${error}`);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  const favoriteDog = (dog: Dog) => {
    const updatedDog = { ...dog, isFavorite: true };
    const updatedDogs = dogs.map((d) => {
      return d.id === dog.id ? updatedDog : d;
    });
    setDogs(updatedDogs);
    setIsLoading(true);

    patchFavoriteForDog(dog.id, updatedDog)
      .catch((error: string) => {
        alert(`Failed to favorite dog ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const unFavoriteDog = (dog: Dog) => {
    const updatedDog = { ...dog, isFavorite: false };
    const updatedDogs = dogs.map((d) => {
      return d.id === dog.id ? updatedDog : d;
    });
    setDogs(updatedDogs);
    setIsLoading(true);

    patchFavoriteForDog(dog.id, updatedDog)
      .catch((error: string) => {
        alert(`Failed to unfavorite dog ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  
  useEffect(() => {
    refetchDogs().catch((error) => console.error(error));
  }, []);


  return (
    <DogContext.Provider
      value={{
        dogs,
        setView,
        view,
        setDogs,
        isLoading,
        setIsLoading,
        createDog,
        deleteDog,
        favoriteDog,
        unFavoriteDog,
      }}
    >
      {children}
    </DogContext.Provider>
  );
};
