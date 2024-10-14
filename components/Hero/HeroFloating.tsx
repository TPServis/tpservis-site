"use client";

import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";

import { motion } from "framer-motion";
import Hero1 from "@/public/images/hero-1.jpeg";
import Hero2 from "@/public/images/hero-2.png";
import Hero3 from "@/public/images/hero-3.png";
import Hero4 from "@/public/images/hero-4.png";

export default function HeroFloating() {
  return (
    <div className="col-span-2 flex items-center justify-center">
      <div className="grid gap-8 grid-rows-5 w-full grid-[repeat(2, 40vw)] ">
        <FloatingImage
          img={Hero1}
          alt="Hero"
          className="row-start-1"
          delay={0}
        />
        <FloatingImage
          img={Hero2}
          alt="Hero"
          className=" row-start-2 animate-[float_10s_ease-in-out_1s_infinite]"
          delay={0.1}
        />
        <FloatingImage
          img={Hero3}
          alt="Hero"
          className="animate-[float_10s_ease-in-out_2s_infinite]"
          delay={0.2}
        />
        <FloatingImage
          img={Hero4}
          alt="Hero"
          className=" animate-[float_10s_ease-in-out_3s_infinite]"
          delay={0.3}
        />
      </div>
    </div>
  );
}

interface FloatingImageProps {
  img: StaticImageData;
  alt: string;
  className?: string;
  delay?: number;
}

const FloatingImage = (props: FloatingImageProps) => {
  return (
    <motion.div
      className={`rounded-3xl overflow-hidden col-span-1 row-span-2 w-[25vw] animate-float ${props.className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: props.delay, ease: "easeInOut" }}
    >
      <Image
        src={props.img}
        alt={props.alt}
        className="w-full h-full object-cover"
        width={1000}
        height={1000}
      />
    </motion.div>
  );
};
