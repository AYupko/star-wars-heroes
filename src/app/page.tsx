"use client";
import { HeroCard } from "@/components/HeroCard";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

export default function Home() {
  const { heroes } = useInfiniteScroll();

  return (
    <section>
      {!!heroes.length && (
        <div className="w-50vh grid gap-10 grid-cols-2 p-20 items-center">
          {heroes.map((hero) => (
            <HeroCard key={hero.id} hero={hero} />
          ))}
        </div>
      )}
    </section>
  );
}
