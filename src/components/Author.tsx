"use client";

import Image from "next/image";
import Button from "./Button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "usehooks-ts";

const Author = () => {
  const boxRef1 = useRef<HTMLDivElement>(null);
  const boxRef2 = useRef<HTMLDivElement>(null);
  const boxRef3 = useRef<HTMLDivElement>(null);

  const smallScreen = useMediaQuery("(max-width: 1280px)");

  const { contextSafe } = useGSAP(() => {
    gsap.set(".img-1, .img-2, .img-3", { opacity: 0 });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#author",
          start: smallScreen ? "top top" : "152 top",
          toggleActions: "play none none reset",
        },
      })
      .to("#author", { backgroundColor: "black" })
      .to(".text-container", { color: "white" }, 0)
      .to(".section-title", { color: "white" }, 0)
      .to(
        [boxRef1.current, boxRef2.current, boxRef3.current, ".author-btn"],
        {
          backgroundColor: "white",
          color: "black",
        },
        0
      );
  });

  const handleMouseMove = contextSafe(
    (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      itemRef: React.RefObject<HTMLDivElement | null>,
      image: string
    ) => {
      if (!itemRef.current) return;
      const { left, top, width, height } =
        itemRef.current?.getBoundingClientRect();

      const relativeX = (e.clientX - left) / width;
      const relativeY = (e.clientY - top) / height;

      const tiltX = (relativeY - 0.5) * 50;
      const tiltY = (relativeX - 0.5) * -50;

      gsap.to(itemRef.current, {
        transform: `translate3d(0, 0, 200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(5, 5, 5)`,
        duration: 0.2,
        ease: "none",
      });

      gsap.to(image, { opacity: 1, duration: 0.2 });
    }
  );

  const handleMouseLeave = contextSafe(
    (itemRef: React.RefObject<HTMLDivElement | null>, image: string) => {
      gsap.to(itemRef.current, {
        transform: `translate3d(0, 0, 0)  rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
        duration: 0.2,
        ease: "none",
      });

      gsap.to(image, { opacity: 0, duration: 0.2 });
    }
  );

  const handleMouseClick = contextSafe(
    (itemRef: React.RefObject<HTMLDivElement | null>, image: string) => {
      gsap.to(itemRef.current, {
        scale: 5,
        duration: 0.2,
        ease: "none",
      });

      gsap.to(image, { opacity: 1, duration: 0.2 });
    }
  );

  return (
    <div
      id="author"
      className="min-h-screen flex flex-col items-center gap-10 pb-48 justify-center"
    >
      <h2 className="section-title mt-8 2xl:mt-24 font-general uppercase text-sm">
        About the author
      </h2>
      <div className="w-full px-4 xl:p-0 max-w-[1000px] text-4xl 2xl:text-8xl font-zentry mx-auto text-center text-container">
        <p className="">A dedicated writer and</p>
        <div className="flex gap-4 justify-center items-center relative flex-wrap">
          <p>artist</p>
          <div
            style={{
              perspective: 1000,
              transformStyle: "preserve-3d",
              perspectiveOrigin: "center center",
            }}
          >
            <div
              ref={boxRef1}
              onMouseMove={(e) =>
                smallScreen ? {} : handleMouseMove(e, boxRef1, ".img-1")
              }
              onClick={() =>
                smallScreen ? handleMouseClick(boxRef1, ".img-1") : {}
              }
              onMouseLeave={() => handleMouseLeave(boxRef1, ".img-1")}
              className="relative w-6 xl:w-12 h-6 xl:h-12 bg-black rounded-md xl:rounded-lg"
            >
              <Image
                src="/author-img1.jpg"
                alt="author-img"
                fill
                className="object-cover rounded-sm xl:rounded-lg img-1"
              />
            </div>
          </div>
          <p>since</p>
          <p>adolescence,</p>
        </div>
        <p>Oda began working for</p>
        <div className="flex gap-4 justify-center items-center flex-wrap">
          <p>Shueisha&apos;s</p>
          <div
            style={{
              perspective: 1000,
              transformStyle: "preserve-3d",
              perspectiveOrigin: "center center",
            }}
          >
            <div
              className="relative w-6 xl:w-12 h-6 xl:h-12 bg-black rounded-md xl:rounded-lg"
              ref={boxRef2}
              onMouseMove={(e) =>
                smallScreen ? {} : handleMouseMove(e, boxRef2, ".img-2")
              }
              onClick={() =>
                smallScreen ? handleMouseClick(boxRef2, ".img-2") : {}
              }
              onMouseLeave={() => handleMouseLeave(boxRef2, ".img-2")}
            >
              <Image
                src="/author-img2.jpg"
                alt="author-img"
                fill
                className="object-cover rounded-sm xl:rounded-lg img-2"
              />
            </div>
          </div>
          <p>Shonen Jump</p>
        </div>
        <p>at 17 and currently stands</p>
        <p>as one of the world&apos;s most</p>
        <div className="flex gap-4 justify-center items-center flex-wrap">
          <p>prominent</p>
          <div
            style={{
              perspective: 1000,
              transformStyle: "preserve-3d",
              perspectiveOrigin: "center center",
            }}
          >
            <div
              className="relative w-6 xl:w-12 h-6 xl:h-12 bg-black rounded-md xl:rounded-lg"
              ref={boxRef3}
              onMouseMove={(e) =>
                smallScreen ? {} : handleMouseMove(e, boxRef3, ".img-3")
              }
              onClick={() =>
                smallScreen ? handleMouseClick(boxRef3, ".img-3") : {}
              }
              onMouseLeave={() => handleMouseLeave(boxRef3, ".img-3")}
            >
              <Image
                src="/author-img3.jpg"
                alt="author-img"
                fill
                className="object-cover rounded-sm xl:rounded-lg img-3"
              />
            </div>
          </div>
          <p>mangaka.</p>
        </div>
      </div>
      <Button classNames="bg-black text-white text-base py-3 author-btn">
        Read Full Story
      </Button>
    </div>
  );
};

export default Author;
