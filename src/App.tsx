import { CreateDogForm } from "./Components/CreateDogForm";
import { Section } from "./Components/Section";
import { DogContext } from "./providers/DogProvider";
import { useContext } from "react";
import { Dogs } from "./Components/Dogs";

export function App() {
  const { view } = useContext(DogContext)!;

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label={"Dogs: "}>
        {view === "showCreateDog" ? <CreateDogForm /> : <Dogs />}
      </Section>
    </div>
  );
}
