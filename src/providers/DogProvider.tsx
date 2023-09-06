// DogProvider.tsx
import { createContext, ReactNode, useState, useEffect } from "react";
import { Dog } from "../types";
import { Requests } from "../api";

type TDogProvider = {
  dogs: Dog[];
  setDogs: React.Dispatch<React.SetStateAction<Dog[]>>;
  isLoading: boolean;
  postDog: (dog: Omit<Dog, 'id'>) => Promise<Dog>;
  deleteDogRequest: (id: number) => Promise<Response>;
  patchFavoriteForDog: (id: number, updatedDog: Dog) => Promise<Dog>;
};

// export const DogContext = createContext<TDogProvider>({} as TDogProvider);
export const DogContext = createContext<TDogProvider | undefined>(undefined);


export const DogProvider = ({ children }: { children: ReactNode }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [{ getAllDogs, postDog, deleteDogRequest, patchFavoriteForDog }] =
  //   Requests; I was trying to destructure the methods from Requests

  useEffect(() => {
    setIsLoading(true);
    Requests.getAllDogs().then(setDogs).finally(()=> setIsLoading(false));
  }, []);

  return (
    <DogContext.Provider
      value={{
        dogs,
        setDogs,
        postDog: Requests.postDog,
        deleteDogRequest: Requests.deleteDogRequest,
        patchFavoriteForDog: Requests.patchFavoriteForDog,
        isLoading,
      }}
    >
      {children}
    </DogContext.Provider>
  );
};
