export const baseUrl = "http://localhost:3000";
import { Dog } from "./types";

const getAllDogs = () => {
  return fetch(`${baseUrl}/dogs`).then((response) => response.json());
};

const postDog = (dog: Omit<Dog, 'id'>) => {
  return fetch(`${baseUrl}/dogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dog)
  }).then(response => response.json())
}

const deleteDogRequest = (id: number) => {
  return fetch(`${baseUrl}/dogs/${id}`, {
    method: "DELETE",
  });
}

const patchFavoriteForDog = (id: number, updatedDog: Dog) => {
  return fetch(`${baseUrl}/dogs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedDog),
  }).then((response) => response.json());
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
