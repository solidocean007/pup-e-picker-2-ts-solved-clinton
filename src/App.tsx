import { Section } from "./Components/Section";
import { DogProvider } from "./providers/DogProvider";

export function App() {
  return (
    <DogProvider>
      <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label={"Dogs: "}>

      </Section>
    </div>
    </DogProvider>
  );
}
