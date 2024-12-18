import About from "@/components/About";
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
      <div className="h-screen w-full"></div>
    </div>
  );
}
