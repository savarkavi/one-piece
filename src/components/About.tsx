import Image from "next/image";
import AnimatedTitle from "./AnimatedTitle";

const About = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center gap-8 py-8"
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
        perspectiveOrigin: "center center",
      }}
    >
      <h2 className="mt-24 font-general uppercase text-sm">
        Welcome to One Piece
      </h2>
      <AnimatedTitle title="Discover the world's<br />most popular Anime" />
      <div
        className="relative w-[500px] h-[700px] rounded-lg border border-black mb-32 mt-16"
        style={{
          transform: "translate3d(0, 0, 50px) rotateX(20deg) rotateY(20deg)",
        }}
      >
        <Image
          src="/about-image.jpg"
          alt="kid luffy"
          fill
          className="object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default About;
