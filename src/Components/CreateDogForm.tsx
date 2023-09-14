// CreateDogForm.tsx
import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";
import { toast } from "react-hot-toast";
import { useDogs } from "../Providers/useDogs";

export type OptimisticDog = Omit<Dog, "id"> & { id?: number };

export const CreateDogForm = () =>
  // no props allowed
  {
    const [selectedImage, setSelectedImage] = useState(dogPictures.Boxer);
    const { createDog, isLoading } = useDogs();

    const [newDog, setNewDog] = useState<OptimisticDog>({
      name: "",
      image: selectedImage,
      description: "",
      isFavorite: false,
    });

    const validEntry = newDog.name.length > 0 && newDog.description.length > 0;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setNewDog((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleTextareaChange = (
      e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setNewDog((prevData) => ({ ...prevData, [name]: value }));
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
          if (!validEntry) {
            toast.error("Invalid Entry");
            return;
          }
          createDog({ ...newDog })
            .then(() => {
              toast.success("Created a dog!");
              formReset();
            })
            .catch(() => toast.error("Something went wrong."));
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
