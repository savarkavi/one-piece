"use client";

import Image from "next/image";
import AnimatedTitle from "./AnimatedTitle";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
  useGSAP(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#about-img-container",
          start: "center center",
          end: "bottom center",
          scrub: 1,
          pin: true,
          pinSpacing: true,
        },
      })
      .to("#about-img", {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        transform: "translate3d(0, 0, 0) rotateY(0deg)",
      })
      .to(".about-img", { borderRadius: 0 }, 0);
  });

  return (
    <div className="min-h-screen flex flex-col items-center gap-8 pt-8">
      <h2 className="2xl:mt-24 font-general uppercase text-sm">
        Welcome to One Piece
      </h2>
      <AnimatedTitle title="Discover the world's<br />most popular Anime" />
      <div
        id="about-img-container"
        className="w-screen h-screen flex justify-center items-center"
        style={{
          perspective: 1000,
          transformStyle: "preserve-3d",
          perspectiveOrigin: "center center",
        }}
      >
        <div
          id="about-img"
          className="relative w-[320px] h-[500px] 2xl:w-[500px] 2xl:h-[600px] rounded-lg border border-black"
          style={{
            transform: "translate3d(0, 0, 50px) rotateY(20deg)",
          }}
        >
          <Image
            src="/about-banner.jpeg"
            alt="about image"
            fill
            className="object-cover rounded-lg about-img"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
