import About from "@/components/About";
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
      <div className="h-screen w-full bg-[#EDFF66]"></div>
    </div>
  );
}
