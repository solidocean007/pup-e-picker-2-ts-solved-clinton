// CreateDogForm.tsx
import { useState, useContext } from "react";
import { DogContext } from "../providers/DogProvider";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

export type OptimisticDog = Omit<Dog, 'id'> & { id?: number };


export const CreateDogForm = () =>
  // no props allowed
  {
    const context = useContext(DogContext);
    // Check if the context is available
    if (!context) {
      throw new Error("CreateDogForm must be used within a DogProvider");
    }
    const [selectedImage, setSelectedImage] = useState(dogPictures.Boxer);
    const { setDogs, postDog, isLoading, setView } = context;

    const [newDog, setNewDog] = useState<OptimisticDog>({
      name: "",
      image: selectedImage,
      description: "",
      isFavorite: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setNewDog((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setNewDog((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmitDog = async () => {
      // Optimistically update state
      setDogs((prevDogs) => [...prevDogs, newDog as Dog]); 
    
      try {
        // Actual API call
        const savedDog = await postDog(newDog);
    
        // Update the state with the returned dog data
        setDogs((prevDogs) => {
          const filteredDogs = prevDogs.filter(dog => dog !== newDog); // remove optimistic dog
          return [...filteredDogs, savedDog]; // add saved dog
        });
    
        setView('showAllDogs');
      } catch (error) {
        setDogs((prevDogs) => prevDogs.filter((dog) => dog !== newDog));
        alert("Failed to add the dog. Please try again.");
      }
    };
    

    const formReset = () => {
      setNewDog({
        name: "",
        description: "",
        image: selectedImage,
        isFavorite: false,
      });
    };

    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitDog().finally(()=>formReset() );
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          name="name"
          type="text"
          value={newDog.name}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name="description"
          id="description"
          value={newDog.description}
          onChange={handleTextareaChange}
          disabled={isLoading}
          cols={80}
          rows={10}
        ></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
          id=""
          onChange={(e) => {
            setSelectedImage(e.target.value);
          }}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" />
      </form>
    );
  };
