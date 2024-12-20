"use client";

import Image from "next/image";
import Button from "./Button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const Author = () => {
  const { contextSafe } = useGSAP();

  const boxRef1 = useRef<HTMLDivElement>(null);
  const boxRef2 = useRef<HTMLDivElement>(null);
  const boxRef3 = useRef<HTMLDivElement>(null);

  const handleMouseMove = contextSafe(
    (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      itemRef: React.RefObject<HTMLDivElement | null>
    ) => {
      if (!itemRef.current) return;
      const { left, top, width, height } =
        itemRef.current?.getBoundingClientRect();

      const relativeX = (e.clientX - left) / width;
      const relativeY = (e.clientY - top) / height;

      const tiltX = (relativeY - 0.5) * 50;
      const tiltY = (relativeX - 0.5) * -50;

      gsap.to(itemRef.current, {
        transform: `translate3d(0, 0, 200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
        width: 300,
        height: 300,
        ease: "none",
      });
    }
  );

  const handleMouseLeave = contextSafe(
    (itemRef: React.RefObject<HTMLDivElement | null>) => {
      gsap.to(itemRef.current, {
        transform: `translate3d(0, 0, 0)  rotateX(0deg) rotateY(0deg)`,
        width: 42,
        height: 42,
        ease: "none",
      });
    }
  );

  return (
    <div className="min-h-screen flex flex-col items-center gap-10">
      <h2 className="mt-8 2xl:mt-24 font-general uppercase text-sm">
        About the author
      </h2>
      <div className="max-w-[1000px] text-8xl font-zentry mx-auto text-center">
        <p className="">A dedicated writer and</p>
        <div
          className="flex gap-4 justify-center items-center relative"
          style={{
            perspective: 1000,
            transformStyle: "preserve-3d",
            perspectiveOrigin: "center center",
          }}
        >
          <p>artist</p>
          <div
            ref={boxRef1}
            onMouseMove={(e) => handleMouseMove(e, boxRef1)}
            onMouseLeave={() => handleMouseLeave(boxRef1)}
            className="absolute w-12 h-12 bg-black rounded-lg origin-center"
          >
            <Image
              src="/author-img1.jpg"
              alt="author-img"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <p>since adolescence,</p>
        </div>
        <p>Oda began working for</p>
        <div className="flex gap-4 justify-center items-center">
          <p>Shueisha&apos;s Shonen Jump</p>
          <div
            className="w-12 h-12 bg-black rounded-lg"
            ref={boxRef2}
            onMouseEnter={(e) => handleMouseMove(e, boxRef2)}
            onMouseLeave={() => handleMouseLeave(boxRef2)}
          ></div>
        </div>
        <p>at 17 and currently stands</p>
        <p>as one of the world&apos;s most</p>
        <div className="flex gap-4 justify-center items-center">
          <p>prominent</p>
          <div
            className="w-12 h-12 bg-black rounded-lg"
            ref={boxRef3}
            onMouseEnter={(e) => handleMouseMove(e, boxRef3)}
            onMouseLeave={() => handleMouseLeave(boxRef3)}
          ></div>
          <p>mangaka.</p>
        </div>
      </div>
      <Button classNames="bg-black text-white text-base py-3">
        Read Full Story
      </Button>
    </div>
  );
};

export default Author;
