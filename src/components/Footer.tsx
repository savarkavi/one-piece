"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TextPlugin } from "gsap/all";
import React from "react";

gsap.registerPlugin(TextPlugin);

const Footer = () => {
  useGSAP(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#footer",
          start: "top 95%",
          toggleActions: "play none none reset",
        },
      })
      .to(".footer-text-1", {
        text: {
          value: "One",
        },
        ease: "none",
        duration: 1,
      })
      .to(".footer-text-2", {
        text: {
          value: "Piece",
        },
        ease: "none",
        duration: 1,
      });
  });

  return (
    <div
      id="footer"
      className="h-[400px] bg-blue-700 overflow-hidden flex flex-col 2xl:flex-row items-center justify-center"
    >
      <h1 className="text-[200px] 2xl:text-[450px] leading-[0.8] font-zentry font-bold footer-text-1"></h1>
      <h1 className="text-[200px] 2xl:text-[450px] leading-[0.8] font-zentry font-bold footer-text-2"></h1>
    </div>
  );
};

export default Footer;
