import Image from "next/image";
import HeroHeader from "./_components/HeroHeader";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <div className=" max-h-screen bg-white">
      <HeroHeader />
      <Hero />
    </div>
  );
}
