"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

const saga = [
  { id: 1, name: "east blue saga", arcs: 6 },
  { id: 2, name: "arabasta saga", arcs: 5 },
  { id: 3, name: "sky island saga", arcs: 2 },
  { id: 4, name: "water 7 saga", arcs: 4 },
  { id: 5, name: "thriller bark saga", arcs: 1 },
  { id: 6, name: "summit war saga", arcs: 5 },
  { id: 7, name: "fishman island saga", arcs: 2 },
  { id: 8, name: "dressrosa saga", arcs: 2 },
  { id: 9, name: "whole cake island saga", arcs: 3 },
  { id: 10, name: "wano country saga", arcs: 1 },
  { id: 11, name: "final saga", arcs: 2 },
];

const Arcs = () => {
  const [currentSaga, setCurrentSaga] = useState(1);
  const smallScreen = useMediaQuery("(max-width: 1280px)");

  useGSAP(() => {
    if (!smallScreen) {
      gsap.timeline({
        scrollTrigger: {
          trigger: "#saga-info",
          start: "top center",
          end: "bottom top",
          pin: true,
          pinSpacing: true,
        },
      });
    }

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#arcs",
          start: "top bottom",
          toggleActions: "play none none reset",
        },
      })
      .to("#arcs", { backgroundColor: "black" });
  });

  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: `#saga-${currentSaga}`,
        start: "top 60%",
        end: "bottom 55%",
        onLeave: () => setCurrentSaga((prev) => (prev === 11 ? 11 : prev + 1)),
        onLeaveBack: () =>
          setCurrentSaga((prev) => (prev === 1 ? 1 : prev - 1)),
      },
    });

    return () => {
      timeline.scrollTrigger?.kill();
    };
  }, [currentSaga]);

  return (
    <div
      id="arcs"
      className="min-h-screen w-full flex flex-col 2xl:flex-row text-white pt-16 pb-16 2xl:pb-[400px] px-8"
    >
      <div className="text-sm 2xl:h-screen flex justify-center mb-16 2xl:mb-0 2xl:flex-1">
        <p id="saga-info" className="max-w-[500px] 2xl:h-[60vh]">
          The storyline of One Piece—manga and anime alike—is commonly divided
          into individual story arcs for easier understanding. While the exact
          divisions are somewhat fluid, it is generally understood that an arc
          begins when the Straw Hat Pirates land on a specific island and ends
          when they leave. All story arcs are grouped into larger sagas, which
          tend to reflect goals and/or enemies that the Straw Hats pursue across
          multiple islands.
        </p>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        {saga.map((item) => (
          <div key={item.id} className="flex gap-6">
            <h3 className="text-sm">{`${item.arcs} Arcs`}</h3>
            <p
              id={`saga-${item.id}`}
              className={`text-4xl 2xl:text-8xl uppercase font-zentry ${
                currentSaga === item.id ? "text-[#EDFF66]" : "text-white"
              }`}
            >
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Arcs;
