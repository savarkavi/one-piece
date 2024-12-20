"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

type BentoCardProps = {
  src: string;
  title: string;
  content: string;
  styles: string;
  cardNum: number;
};

const BentoCard = ({
  src,
  title,
  content,
  cardNum,
  styles,
}: BentoCardProps) => {
  const itemRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: itemRef.current,
          start: "top bottom",
          toggleActions: "play none none reset",
        },
      })
      .from(itemRef.current, {
        rotateX: "-10deg",
        opacity: 0,
        duration: 1,
      });
  });

  const handleMouseEnter = contextSafe(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!itemRef.current) return;
      const { left, top, width, height } =
        itemRef.current?.getBoundingClientRect();

      const relativeX = (e.clientX - left) / width;
      const relativeY = (e.clientY - top) / height;

      const tiltX = (relativeY - 0.5) * 5;
      const tiltY = (relativeX - 0.5) * -5;

      gsap.to(itemRef.current, {
        transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.95, 0.95, 0.95)`,
        ease: "none",
      });
    }
  );

  const handleMouseLeave = contextSafe(() => {
    gsap.to(itemRef.current, {
      transform: `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      ease: "none",
    });
  });

  return (
    <div
      ref={itemRef}
      onMouseMove={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full ${styles} rounded-xl border border-gray-500 overflow-hidden 2xl:flex-1`}
    >
      <Image
        src={src}
        alt="world-img"
        fill
        className={`object-cover rounded-xl brightness-50 ${
          cardNum === 3 && "2xl:ml-32 rounded-none"
        }`}
      />
      <div className="absolute top-6 left-6 max-w-[300px]">
        <h2 className="text-white text-4xl 2xl:text-8xl font-zentry uppercase font-bold">
          {title}
        </h2>
        <p className="text-sm text-gray-500 mt-4">{content}</p>
      </div>
    </div>
  );
};

export default BentoCard;
