import { createContext, ReactNode, useState } from "react";
import { Dog } from "../types";

interface DogContextType {
  dogs: Dog[];
  setDogs: React.Dispatch<React.SetStateAction<Dog[]>>;
}

export const DogContext = createContext<DogContextType | undefined>(undefined);

export const DogProvider = ({ children }:{ children: ReactNode }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);

  return (
    <DogContext.Provider value={{ dogs, setDogs }}>
      {children}
    </DogContext.Provider>
  );
}
