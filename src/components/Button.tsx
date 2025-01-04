"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ReactNode, useRef } from "react";

type ButtonProps = {
  children: ReactNode;
  classNames?: string;
};

const Button = ({ children, classNames }: ButtonProps) => {
  const btnRef = useRef(null);
  const animation = useRef<gsap.core.Tween>(null);

  const { contextSafe } = useGSAP();

  const handleMouseHover = contextSafe(() => {
    animation.current = gsap.to(btnRef.current, {
      borderRadius: "2px",
      skewY: "5px",
      scale: 1.1,
      duration: 0.2,
    });
  });

  const handleMouseLeave = contextSafe(() => {
    animation.current?.reverse();
  });

  return (
    <button
      ref={btnRef}
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseLeave}
      className={`text-black text-[12px] uppercase rounded-[20px] font-general font-semibold py-2 px-6 ${classNames}`}
    >
      {children}
    </button>
  );
};

export default Button;
