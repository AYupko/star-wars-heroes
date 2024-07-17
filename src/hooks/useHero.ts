import { service } from "@/service/service";
import { Film, Hero, Starship } from "@/types/types";
import { useEffect, useState } from "react";

const useHero = (id: string) => {
  const [hero, setHero] = useState<Hero | null>(null);
  const [films, setFilms] = useState<Film[] | null>(null)
  const [starships, setStarships] = useState<Starship[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const heroData = await service.getHero(id);
        setHero(heroData);
  
        const allFilms = await service.getFilms(id);
        setFilms(allFilms);
  
        if (allFilms.length > 0) {
          const filmsIds = allFilms.map(film => film.id);
          const allStarships = await service.getStarships(filmsIds, id);
          setStarships(allStarships);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [id]);

  return {
    hero,
    films,
    starships,
  };
}

export default useHero;