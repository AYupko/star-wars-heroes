import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex px-20 items-center border-b-2 border-white">
      <Link href={'/'} className="h-50 w-40">
        <img src="../../../yoda_header.jpg" alt="" className="h-full w-full"/>
      </Link>
      <h1 className="w-full text-white text-center text-3xl font-bold">May the force be with you!</h1>
    </header>
  );
};