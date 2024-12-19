"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

type AnimatedTitleProps = {
  title: string;
  styles?: string;
};

const AnimatedTitle = ({ title, styles }: AnimatedTitleProps) => {
  const titleRef = useRef(null);

  useGSAP(() => {
    gsap.set(titleRef.current, {
      transform: "translate3d(10px, 51px, -60px) rotateY(-60deg)",
      transformOrigin: "50% 50% -150px",
      opacity: 0,
    });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      })
      .to(titleRef.current, {
        opacity: 1,
        transform: "translate3d(0, 0, 0) rotateY(0deg)",
      });
  });

  return (
    <div
      ref={titleRef}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
        perspectiveOrigin: "center center",
      }}
    >
      <div
        id="animate-title"
        style={{
          perspective: 1000,
          transformStyle: "preserve-3d",
          perspectiveOrigin: "center center",
        }}
      >
        {title.split("<br />").map((item, i) => (
          <p
            key={i}
            className={`text-5xl 2xl:text-[120px] font-zentry font-bold uppercase leading-none ${styles}`}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AnimatedTitle;
