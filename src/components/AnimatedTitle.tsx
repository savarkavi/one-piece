"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type AnimatedTitleProps = {
  title: string;
};

const AnimatedTitle = ({ title }: AnimatedTitleProps) => {
  useGSAP(() => {
    gsap.set("#animate-title", {
      transform: "translate3d(10px, 51px, -60px) rotateY(-60deg)",
      transformOrigin: "50% 50% -150px",
      opacity: 0,
    });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#animate-title",
          start: "200 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      })
      .to("#animate-title", {
        opacity: 1,
        transform: "translate3d(0, 0, 0) rotateY(0deg)",
        duration: 1,
      });
  });

  return (
    <div id="animate-title">
      {title.split("<br />").map((item, i) => (
        <p
          key={i}
          className="text-[120px] font-zentry font-bold uppercase leading-none text-center"
        >
          {item}
        </p>
      ))}
    </div>
  );
};

export default AnimatedTitle;