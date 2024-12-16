import About from "@/components/About";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <Hero />
      <About />
    </div>
  );
}
