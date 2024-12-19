"use client";

import { useGSAP } from "@gsap/react";
import BentoCard from "./BentoCard";
import gsap from "gsap";

const World = () => {
  useGSAP(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#world",
          start: "bottom 80%",
          toggleActions: "play none none reset",
        },
      })
      .to("#world", { backgroundColor: "#EDFF66" });
  });

  return (
    <div id="world" className="min-h-screen bg-black py-32 px-6">
      <div
        className="max-w-[1536px] mx-auto"
        style={{
          perspective: 1000,
          transformStyle: "preserve-3d",
          perspectiveOrigin: "center center",
        }}
      >
        <div className="font-robert-regular 2xl:text-2xl mb-32">
          <p className="text-white">Dive into the world of One Piece</p>
          <p className="text-gray-500">
            Immerse yourself in a rich and ever-expanding
            <br /> universe created by lgendry Eiichiro Oda.
          </p>
        </div>
        <BentoCard
          src="/world-img1.png"
          styles="h-[500px]"
          cardNum={1}
          title="pirates"
          content=" A pirate is any professional criminal that operates wholly or
              partially on the world's seas, especially people conducting
              robbery by ship. In most, if not all, cases they lead or belong to
              a group of like-minded criminals, known as a crew."
        />
        <div
          className="mt-16 flex flex-col h-[200vh] 2xl:h-auto 2xl:flex-row 2xl:justify-between gap-8 w-full"
          style={{
            perspective: 1000,
            transformStyle: "preserve-3d",
            perspectiveOrigin: "center center",
          }}
        >
          <BentoCard
            src="/world-img2.png"
            styles="h-[500px] 2xl:h-[1032px]"
            cardNum={2}
            title="emperors"
            content=" The Four Emperors, which constitute one of the Three Great
                Powers, are a group of four pirates considered to be the most
                notorious and powerful captains in the world. They are not
                declared allies nor are they strictly enemies, Instead, the four
                prefer to remain autonomous."
          />
          <div
            className="flex-1 flex flex-col gap-8 w-full"
            style={{
              perspective: 1000,
              transformStyle: "preserve-3d",
              perspectiveOrigin: "center center",
            }}
          >
            <BentoCard
              src="/world-img3.png"
              styles="h-[500px]"
              cardNum={3}
              title="warlords"
              content="The Seven Warlords of the Sea, or simply the Seven Warlords,
                  are a selection of seven incredibly powerful and notorious
                  pirates authorized by the World Government"
            />
            <BentoCard
              src="/world-img4.jpg"
              styles="h-[500px]"
              cardNum={4}
              title="marines"
              content="The Marines are the seaborne military forces of the World
                  Government, tasked with maritime law enforcement and naval
                  warfare operations."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default World;
