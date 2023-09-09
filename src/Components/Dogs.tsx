// Right now these dogs are constant, but in reality we should be getting these from our server
// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
import { useContext } from "react";
import { DogContext } from "../providers/DogProvider";
import { DogCard } from "./DogCard";

export const Dogs = () =>
  // no props allowed
  {
    const context = useContext(DogContext);
    const {dogs} = context;

    return (
      //  the "<> </>"" are called react fragments, it's like adding all the html inside
      // without adding an actual html element
      <>{dogs.map((dog, index)=>(
        <DogCard key={index} dog={dog} />
      ))}</>
    );
  };
