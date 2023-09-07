import { Section } from "./Components/Section";
import { DogProvider } from "./Providers/DogProvider";
import React, { useState } from 'react';


type TypeOfView = 'showAllDogs' | 'showFavoriteDogs' | 'showUnfavoriteDogs' | 'showCreateDog';

export function App() {
  const [view, setView]= useState<TypeOfView>('showAllDogs')
  return (
    <DogProvider>
      <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label={"Dogs: "}>
        

switch (view) {
  case "showAllDogs":
    console.log("It's Monday!");
    break;
  case "showFavoriteDogs":
    console.log("It's Tuesday!");
    break;
  case "showUnfavoriteDogs":
    console.log("It's Wednesday!");
    break;
  case "showCreateDog":
    console.log("It's Wednesday!");
    break;
}
      </Section>
    </div>
    </DogProvider>
  );
}
