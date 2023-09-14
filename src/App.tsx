import { CreateDogForm } from "./Components/CreateDogForm";
import { Section } from "./Components/Section";
import { Dogs } from "./Components/Dogs";
import { useDogs } from "./Providers/useDogs";

export function App() {
  const { view } = useDogs();

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
