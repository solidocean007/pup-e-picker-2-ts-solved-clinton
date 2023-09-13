import { ReactNode } from "react";
import { TypeOfView } from "../Providers/DogProvider";
import { useDogs } from "../Providers/useDogs";

export const Section = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  const { dogs, setDogs, view, setView } =
    useDogs();
    const totalFavoriteCount = dogs.reduce((acc, dog) => acc + (dog.isFavorite ? 1 : 0), 0);
    const totalUnfavoriteCount = dogs.length - totalFavoriteCount;

  const handleButtonClick = (newView: TypeOfView) => {
    if (newView === view) {
      setView("showAllDogs");
    } else {
      setView(newView);
    }
  };

  console.log("Dogs Array:", dogs);

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          <div
            className={`selector ${view === "showFavoriteDogs" ? "active" : ''}`}
            onClick={() => handleButtonClick("showFavoriteDogs")}
          >
            favorited ( {totalFavoriteCount} )
          </div>
          <div
            className={`selector ${view === "showUnfavoriteDogs" ? "active" : ''}`}
            onClick={() => handleButtonClick("showUnfavoriteDogs")}
          >
            unfavorited ( {totalUnfavoriteCount} )
          </div>
          <div
            className={`selector ${view === "showCreateDog" ? "active" : ''}`}
            onClick={() => handleButtonClick("showCreateDog")}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
