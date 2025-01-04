"use client";

import Image from "next/image";
import Button from "./Button";
import { useWindowScroll } from "react-use";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AlignJustify } from "lucide-react";

const navItems = ["Author", "Manga", "Anime", "About", "Contact"];

const Header = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isFloatingNav, setIsFloatingNav] = useState(false);

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavbarVisible(true);
      setIsFloatingNav(false);
    } else if (currentScrollY > lastScrollY) {
      setIsNavbarVisible(false);
    } else if (currentScrollY < lastScrollY) {
      setIsNavbarVisible(true);
      setIsFloatingNav(true);
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useGSAP(() => {
    gsap.to("#navbar-container", {
      y: isNavbarVisible ? 0 : -100,
    });
  }, [isNavbarVisible]);

  return (
    <div className="text-white z-[9999] fixed w-full top-0 p-1 2xl:p-3">
      <div
        id="navbar-container"
        className={`w-full px-2 2xl:px-8 py-2 rounded-lg flex items-center justify-between ${
          isFloatingNav && "bg-black border border-gray-500"
        }`}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-6 w-full">
            <div className="relative w-12 h-12 2xl:w-16 2xl:h-16">
              <Image
                src="/onepiece-logo.png"
                alt="logo"
                fill
                className="object-cover"
              />
            </div>
            <Button classNames="bg-white text-[10px] 2xl:text-sm">
              Products
            </Button>
            <Button classNames="bg-white text-[10px] 2xl:text-sm">
              Wallpapers
            </Button>
          </div>
          <AlignJustify className="xl:hidden" />
        </div>
        <div className="hidden 2xl:flex items-center gap-24 text-sm font-general uppercase">
          {navItems.map((item) => (
            <h2 className="font-semibold cursor-pointer" key={item}>
              {item}
            </h2>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
