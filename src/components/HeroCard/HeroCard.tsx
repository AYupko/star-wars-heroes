import { Hero } from "@/types/types";
import Link from "next/link";

type Props = {
  hero: Hero;
};

export const HeroCard: React.FC<Props> = ({hero}) => {
  const { id, name, gender, birth_year } = hero;
  return (
    <Link href={`../heroes/${id}`} className="flex flex-col p-1 rounded-md space-y-2 items-center hover:scale-110 cursor-pointer transition-duration bg-white text-lg text-gray-600 font-semibold">
      <p>{name}</p>
      <span>{`Gender: ${gender}`}</span>
      <span>{`Date of birth: ${birth_year}`}</span>
    </Link>
  );
};