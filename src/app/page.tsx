import About from "@/components/About";
import Author from "@/components/Author";
import DevilFruits from "@/components/DevilFruits";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import World from "@/components/World";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <Hero />
      <About />
      <World />
      <DevilFruits />
      <Author />
      <div className="h-screen w-full bg-[#EDFF66]"></div>
    </div>
  );
}
