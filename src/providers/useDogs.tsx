import { useContext } from "react";
import { DogContext } from "./DogProvider";

export const useDogs = () => {
  const context = useContext(DogContext);
    // Check if the context is available
    if (!context) {
      throw new Error("CreateDogForm must be used within a DogProvider");
    }
    return context
}