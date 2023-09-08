import { Section } from "./Components/Section";
import { DogProvider } from "./providers/DogProvider";
import { useState } from 'react';




export function App() {
  const [view, setView]= useState<TypeOfView>('showAllDogs')

  const renderContent = () => {
    switch (view) {
      case "showAllDogs":
        return <AllDogsComponent />;
      case "showFavoriteDogs":
        return <FavoriteDogsComponent />;
      case "showUnfavoriteDogs":
        return <UnfavoriteDogsComponent />;
      case "showCreateDog":
        return <CreateDogFormComponent />;
      default:
        return <div>Invalid view</div>;
    }
  };

  return (
    <DogProvider>
      <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label={"Dogs: "}>
          {renderContent()}
        </Section>
    </div>
    </DogProvider>
  );
}
