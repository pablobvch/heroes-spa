import { heroes } from "../data/heroes";

export const getHeroeById = (id) => {
  return heroes.find((heroes) => heroes.id === id);
};
