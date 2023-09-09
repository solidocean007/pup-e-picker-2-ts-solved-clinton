import { ReactNode, useContext } from "react";
import { DogContext } from "../providers/DogProvider";
import { TypeOfView } from "../providers/DogProvider";

export const Section = ({
  label,
  children,
}: {
  label: string; 
  children: ReactNode;
}) => {
  const { dogs, view, setView } = useContext(DogContext); 

  const handleButtonClick = (newView: TypeOfView) => {
    if (newView === view) {
      setView('showAllDogs');
    } else {
      setView(newView);
    }
  };

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          <div
            className={`selector ${"active"}`}
            onClick={() => handleButtonClick('showFavoriteDogs')}
          >
            favorited ( {dogs.reduce((acc, curr) => acc + (curr.isFavorite ? 1 : 0), 0)} )
          </div>
          <div
            className={`selector ${""}`}
            onClick={() => handleButtonClick('showUnfavoriteDogs')}
          >
            unfavorited ( {dogs.reduce((acc, curr) => acc + (!curr.isFavorite ? 1 : 0), 0)} )
          </div>
          <div
            className={`selector ${""}`}
            onClick={() => handleButtonClick('showCreateDog')}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};

