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
  const context = useContext(DogContext)!
  const { dogs, view, setView, totalFavoriteCount, totalUnfavoriteCount } = context; 

  const handleButtonClick = (newView: TypeOfView) => {
    if (newView === view) {
      setView('showAllDogs');
    } else {
      setView(newView);
    }
  };

  console.log('Dogs Array:', dogs);


  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          <div
            className={`selector ${"active"}`}
            onClick={() => handleButtonClick('showFavoriteDogs')}
          >
            favorited ( {totalFavoriteCount} )

          </div>
          <div
            className={`selector ${""}`}
            onClick={() => handleButtonClick('showUnfavoriteDogs')}
          >
            unfavorited ( {totalUnfavoriteCount} )

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