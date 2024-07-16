import { Film, Hero, heroesData, Starship } from "@/types/types";
import axios from "axios";

const BASE_URL = 'https://sw-api.starnavi.io';
// getting full data to use it for infinite scroll
const getHeroes = async (url: string): Promise<heroesData> => {
  const response = await axios.get(url);
  return response.data;
}

const getFilms = async (id: string): Promise<Film[]> => {
  const response = await axios.get(BASE_URL + `/films/?characters__in=${id}`);
  const { results }  = response.data;

  return results;
};

const getHero = async (id: string): Promise<Hero> => {
  const response = await axios.get(BASE_URL + `/people/${id}`);
  return response.data;
}

const getStarships = async (filmsIds: number[], id: string): Promise<Starship[]> => {
  const response = await axios.get(BASE_URL + `/starships/?films__in=${filmsIds.join(',')}&pilots__in=${id}`);
  const { results }  = response.data;

  return results;
};

export const service = {
  getHeroes,
  getHero,
  getFilms,
  getStarships,
};