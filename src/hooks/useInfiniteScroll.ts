import { service } from "@/service/service";
import { Hero } from "@/types/types";
import { useEffect, useState } from "react";

const useInfiniteScroll = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [fetching, setFetching] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>('https://sw-api.starnavi.io/people/');

  useEffect(() => {
    if (fetching && nextPageUrl) {
      const fetchHeroes = async () => {
        try {
          const heroesData = await service.getHeroes(nextPageUrl);
          const allHeroes = heroesData.results;
          setHeroes([...heroes, ...allHeroes]);
          setNextPageUrl(heroesData.next);
        } catch {
          console.log('Cannot upload data');
        } finally {
          setFetching(false);
        }
      };
      
      fetchHeroes();
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);

    return () => document.removeEventListener('scroll', scrollHandler);
  }, []);

  //function is called on every scroll. If we are close to bottom, it should activate next fetch to upload piece of data
  const scrollHandler = (e: Event) => {
    const target = e.target as Document;
    const scrollHeight = target.documentElement.scrollHeight;
    const scrollTop = target.documentElement.scrollTop;
    const innerHeight = window.innerHeight;

    if (scrollHeight - (scrollTop + innerHeight) < 150) {
      setFetching(true);
    }
  };

  return { heroes }
};

export default useInfiniteScroll;