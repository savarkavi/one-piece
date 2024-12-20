"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useState } from "react";
import AnimatedTitle from "./AnimatedTitle";
import FruitType from "./FruitType";
import Image from "next/image";

const DevilFruits = () => {
  const [fruitIndex, setFruitIndex] = useState("01");

  useGSAP(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#devil",
          start: "top 80%",
          toggleActions: "play none none reset",
          onLeave: () => {
            gsap.to("#devil", { backgroundColor: "#dfdff0" });
          },
          onEnterBack: () => {
            gsap.to("#devil", { backgroundColor: "#EDFF66" });
          },
        },
      })
      .to("#devil", { backgroundColor: "#EDFF66" });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#devil-content",
          start: "top top",
          pin: true,
          scrub: 1,
        },
      })
      .to("#progress-bar01", {
        height: "100%",
        ease: "linear",
        onComplete: () => setFruitIndex("02"),
      })
      .to("#progress-bar02", {
        height: "100%",
        ease: "linear",
        onComplete: () => setFruitIndex("03"),
        onReverseComplete: () => setFruitIndex("01"),
      })
      .to("#progress-bar03", {
        height: "100%",
        ease: "linear",
        onReverseComplete: () => setFruitIndex("02"),
        // onComplete:
      });
  });

  const { context, contextSafe } = useGSAP();

  useEffect(() => {
    const images = ["01", "02", "03"];

    const imageAnimate = contextSafe(() => {
      images.forEach((idx) => {
        gsap.to(`.image-${idx}`, {
          scale: 1,
          duration: 0.3,
        });
      });

      gsap.to(`.image-${fruitIndex}`, {
        scale: 1.2,
        repeat: Infinity,
        yoyo: true,
      });
    });

    imageAnimate();

    return () => context.revert();
  }, [fruitIndex, contextSafe, context]);

  return (
    <div id="devil" className="min-h-screen p-6 2xl:px-16 bg-black">
      <div
        id="devil-content"
        className="flex flex-col justify-between gap-8 h-screen py-8 2xl:pt-12 2xl:pb-16"
      >
        <div className="flex flex-col gap-6">
          <AnimatedTitle title="The anatomy<br />of devil fruits" />
          <p className="max-w-[500px] font-robert-regular text-sm">
            Devil Fruits are supernatural fruits. Any living being who eats one
            will gain a unique ability at the cost of becoming weakened in
            bodies of water, resulting in them losing the ability to swim.
          </p>
        </div>
        <div className="flex-1 flex justify-center gap-8 items-center self-end 2xl:mr-24">
          <div className="relative w-[100px] 2xl:w-[200px] h-[100px] 2xl:h-[200px] image-01">
            <Image
              src="/fruit-1.png"
              alt="fruit"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative w-[100px] 2xl:w-[200px] h-[100px] 2xl:h-[200px] image-02">
            <Image
              src="/fruit-2.png"
              alt="fruit"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative w-[100px] 2xl:w-[200px] h-[100px] 2xl:h-[200px] image-03">
            <Image
              src="/fruit-3.png"
              alt="fruit"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <FruitType
            fruitIndex={fruitIndex}
            idx="01"
            title="Paramecia"
            content="The most common Devil Fruit type, Paramecia, encompasses fruits that grant any one of a wide variety of 'superhuman' abilities. Their one unifying characteristic is that they are anything other than the ability to transform into animals or into elements of nature."
          />
          <FruitType
            fruitIndex={fruitIndex}
            idx="02"
            title="Zoan"
            content="Zoan-type Devil Fruits grant the power to transform into a specific animal, as well as transform into a hybrid form between the ability user's own species (most frequently human) and the aforesaid animal. Unlike other Fruits, they are said to carry a will of their own."
          />
          <FruitType
            fruitIndex={fruitIndex}
            idx="03"
            title="Logia"
            content="Logia, the rarest and most powerful of the three basic Devil Fruit types, refers to fruits that grant the power to create, control, and transform one's body into an element of nature, e.g.: fire, lightning, ice, etc"
          />
        </div>
      </div>
    </div>
  );
};

export default DevilFruits;
