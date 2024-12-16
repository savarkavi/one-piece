"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RefObject, useEffect, useRef, useState } from "react";
import Button from "./Button";
import { Observer, ScrollTrigger } from "gsap/all";
import { useWindowSize } from "react-use";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);

  const { width } = useWindowSize();

  const vid1Ref = useRef<HTMLVideoElement>(null);
  const vid2Ref = useRef<HTMLVideoElement>(null);
  const vid3Ref = useRef<HTMLVideoElement>(null);
  const vid4Ref = useRef<HTMLVideoElement>(null);

  const videoFrameRef = useRef<HTMLDivElement>(null);

  const totalVideos = 4;

  const fullSizeVidStyles = (
    prevVid: RefObject<HTMLVideoElement | null>,
    nextVid: RefObject<HTMLVideoElement | null>
  ) => {
    return {
      width: "100%",
      height: "100%",
      borderRadius: 0,
      ease: "power1.out",
      onStart: () => {
        nextVid.current?.play();
        if (prevVid.current) {
          prevVid.current.currentTime = 0;
          prevVid.current.pause();
        }
      },
    };
  };

  const miniVidStyles = {
    width: width >= 1536 ? 256 : 128,
    height: width >= 1536 ? 256 : 128,
    borderRadius: 12,
    scale: 0,
  };

  const handleMiniVideoClick = () => {
    setHasClicked(true);
    setCurrentIndex((prev) => (prev % totalVideos) + 1);
  };

  const getVideoSrc = (index: number) => `/videos/hero-${index}.mp4`;
  gsap.registerPlugin(Observer, ScrollTrigger);

  useEffect(() => {
    vid1Ref.current?.play();
  }, []);

  useEffect(() => {
    if (width >= 1536) {
      const observer1 = Observer.create({
        target: videoFrameRef.current,
        type: "pointer",
        onMove: () => {
          gsap.to(`#video-${(currentIndex % 4) + 1}`, {
            scale: 1,
            duration: 1,
            ease: "power1.out",
          });
        },

        onStop: () => {
          gsap.to(`#video-${(currentIndex % 4) + 1}`, {
            scale: 0,
            ease: "power1.inOut",
          });
        },
        onStopDelay: 1,
      });

      return () => {
        observer1.kill();
      };
    }
  }, [currentIndex, width]);

  const { contextSafe } = useGSAP(
    () => {
      if (hasClicked) {
        if (currentIndex === 2) {
          gsap.set("#video-2", { z: 0, rotateX: 0, rotateY: 0 });
          gsap
            .timeline()
            .to("#video-2", fullSizeVidStyles(vid1Ref, vid2Ref))
            .set("#video-1", miniVidStyles);

          gsap.set("#video-2", { zIndex: 0 });
          gsap.to("#video-3", { scale: 1, duration: 1 });
        }

        if (currentIndex === 3) {
          gsap.set("#video-3", { z: 0, rotateX: 0, rotateY: 0 });

          gsap
            .timeline()
            .to("#video-3", fullSizeVidStyles(vid2Ref, vid3Ref))
            .set("#video-2", miniVidStyles);

          gsap.to("#video-4", { scale: 1, duration: 1 });
        }

        if (currentIndex === 4) {
          gsap.set("#video-4", { z: 0, rotateX: 0, rotateY: 0 });

          gsap
            .timeline()
            .to("#video-4", fullSizeVidStyles(vid3Ref, vid4Ref))
            .set("#video-3", miniVidStyles);
          gsap.set("#video-1", {
            zIndex: 99,
            width: width >= 1536 ? 256 : 128,
            height: width >= 1536 ? 256 : 128,
            top: "50%",
            left: "50%",
            translateX: "-50%",
            translateY: "-50%",
            borderRadius: 12,
            border: "1px solid black",
          });

          gsap.to("#video-1", { scale: 1 });
        }

        if (currentIndex === 1) {
          gsap.set("#video-1", { z: 0, rotateX: 0, rotateY: 0 });

          gsap
            .timeline()
            .to("#video-1", fullSizeVidStyles(vid4Ref, vid1Ref))
            .set("#video-1", { zIndex: 0 })
            .set("#video-4", miniVidStyles);

          gsap.set("#video-2", { zIndex: 99 });
          gsap.to("#video-2", { scale: 1, duration: 1 });
        }

        gsap.to(`#hero-text-${currentIndex - 1 === 0 ? 4 : currentIndex - 1}`, {
          opacity: 0,
          x: 300,
        });
        gsap.fromTo(
          `#hero-text-${currentIndex}`,
          { opacity: 0, x: -300 },
          { opacity: 1, x: 0, ease: "back.out" }
        );
      }

      gsap.fromTo(
        `#video-frame`,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          borderRadius: "0% 0% 0% 0%",
        },
        {
          clipPath: "polygon(20% 0, 72% 0, 85% 85%, 0 90%)",
          ease: "power1.out",
          scrollTrigger: {
            trigger: "#video-frame",
            start: "center center",
            end: "bottom 30%",
            scrub: 1,
          },
        }
      );
    },

    { dependencies: [currentIndex] }
  );

  useEffect(() => {
    const handleImageTilt = contextSafe((e: MouseEvent) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const centerX = windowWidth / 2;
      const centerY = windowHeight / 2;

      const moveX = (e.clientX - centerX) / centerX;
      const moveY = (e.clientY - centerY) / centerY;

      gsap.set(`#video-${(currentIndex % 4) + 1}`, {
        rotationX: -moveY * 30,
        rotationY: moveX * 30,
        z: 200,
        ease: "power1.out",
        duration: 0.6,
      });
    });
    const vidFrame = videoFrameRef.current;

    vidFrame?.addEventListener("mousemove", handleImageTilt);

    return () => {
      vidFrame?.removeEventListener("mousemove", handleImageTilt);
    };
  }, [currentIndex, contextSafe]);

  return (
    <div className="relative h-dvh">
      <div
        ref={videoFrameRef}
        id="video-frame"
        className="relative w-full h-screen overflow-hidden border border-black"
        style={{
          perspective: 1000,
          transformStyle: "preserve-3d",
          perspectiveOrigin: "center center",
        }}
      >
        <video
          ref={vid1Ref}
          onClick={currentIndex === 1 ? undefined : handleMiniVideoClick}
          id="video-1"
          loop
          muted
          className={`absolute top-0 left-0 size-full object-cover ${
            currentIndex === 1 ? "cursor-auto brightness-50" : "cursor-pointer"
          }`}
          src={getVideoSrc(1)}
        />
        <video
          ref={vid2Ref}
          onClick={currentIndex === 2 ? undefined : handleMiniVideoClick}
          id="video-2"
          loop
          muted
          className={`absolute size-32 2xl:size-64 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-black object-cover ${
            currentIndex === 2
              ? "cursor-auto brightness-50"
              : "cursor-pointer 2xl:scale-0"
          }`}
          src={getVideoSrc(2)}
        />
        <video
          ref={vid3Ref}
          onClick={currentIndex === 3 ? undefined : handleMiniVideoClick}
          id="video-3"
          loop
          muted
          className={`absolute size-32 2xl:size-64 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-black object-cover ${
            currentIndex === 3
              ? "cursor-auto brightness-50"
              : "cursor-pointer scale-0"
          }`}
          src={getVideoSrc(3)}
        />
        <video
          ref={vid4Ref}
          onClick={currentIndex === 4 ? undefined : handleMiniVideoClick}
          id="video-4"
          loop
          muted
          className={`absolute size-32 2xl:size-64 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-black object-cover ${
            currentIndex === 4
              ? "cursor-auto brightness-50"
              : "cursor-pointer scale-0"
          }`}
          src={getVideoSrc(4)}
        />
        <h1 className="text-[80px] z-[999] 2xl:text-[200px] absolute top-28 2xl:top-16 left-4 2xl:left-12 text-white uppercase font-zentry">
          Experience
        </h1>
        <div className="text-white flex items-center justify-between w-full 2xl:w-auto px-4 2xl:p-0 2xl:block absolute bottom-16 2xl:top-[350px] 2xl:left-12 z-[999]">
          <p className="font-robert-medium text-sm 2xl:text-2xl">
            Welcome to the world of <br /> Pirates and Dreams
          </p>
          <Button classNames="w-[120px] 2xl:w-[180px] mr-3 2xl:mr-0 2xl:mt-8 py-2 2xl:py-3 bg-amber-300 text-base text-[10px] 2xl:text-base">
            Watch Now
          </Button>
        </div>
        {["Dreams", "Pirates", "Greatness", "One Piece"].map((item, i) => (
          <h1
            id={`hero-text-${i + 1}`}
            key={item}
            className={`text-[80px] 2xl:text-[250px] text-white uppercase font-zentry absolute top-48 2xl:top-auto 2xl:bottom-0 right-8 2xl:right-12 z-[999] origin-center ${
              currentIndex !== i + 1 && "opacity-0"
            }`}
          >
            {item}
          </h1>
        ))}
      </div>
      {["Dreams", "Pirates", "Greatness", "One Piece"].map((item, i) => (
        <h1
          id={`hero-text-${i + 1}`}
          key={item}
          className={`hidden 2xl:block text-[80px] 2xl:text-[250px] text-black uppercase font-zentry absolute 2xl:bottom-0 2xl:right-12 z-[-999] origin-center ${
            currentIndex !== i + 1 && "opacity-0"
          }`}
        >
          {item}
        </h1>
      ))}
    </div>
  );
};

export default Hero;
