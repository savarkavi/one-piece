import About from "@/components/About";
import Arcs from "@/components/Arcs";
import Author from "@/components/Author";
import DevilFruits from "@/components/DevilFruits";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import World from "@/components/World";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Header />
      <Hero />
      <About />
      <World />
      <DevilFruits />
      <Author />
      <Arcs />
      <Footer />
    </div>
  );
}
