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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response: Dog[] = await Requests.getAllDogs();
        setDogs(response);
      } catch (error) {
        console.error("An error occurred while fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData().catch((error) => console.error(error));
  }, []);

  const { postDog, deleteDogRequest, patchFavoriteForDog } = Requests;

  return (
    <DogContext.Provider
      value={{
        dogs,
        setView,
        view,
        setDogs,
        isLoading,
        setIsLoading,
        postDog,
        deleteDogRequest,
        patchFavoriteForDog,
      }}
    >
      {children}
    </DogContext.Provider>
  );
};
