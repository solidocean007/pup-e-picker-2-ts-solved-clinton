import { Section } from "./Components/Section";
import { DogProvider } from "./Providers/DogProvider";

type TypeOfView = { 'showAllDogs' | 'showFavoriteDogs' | 'showUnfavoriteDogs' | 'showCreateDog'}

export function App() {
  const [view, setView]= useState<TypeOfView>('showAllDogs')
  return (
    <DogProvider>
      <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label={"Dogs: "}>
        {/*switch statement to show different views*/}
      </Section>
    </div>
    </DogProvider>
  );
}
