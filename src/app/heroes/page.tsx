'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HeroesPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, []);

  return null;
};

export default HeroesPage;