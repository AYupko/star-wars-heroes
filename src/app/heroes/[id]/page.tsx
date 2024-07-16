"use client";

import { useParams } from "next/navigation";
import useHero from "@/hooks/useHero";
import Graph from "@/components/Graph/Graph";

export default function HeroPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { hero, films, starships } = useHero(id);

  return (
    <section className="p-10 flex justify-center flex-col">
      {hero && films && starships && (
        <Graph hero={hero} films={films} starships={starships} />
      )} 
    </section>
  );
}
