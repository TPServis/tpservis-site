"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useRef, useEffect } from "react";
import { StaticImageData } from "next/image";

import Image from "next/image";
import React from "react";

type HomeScrollingRowProps = {
  direction: "left" | "right";
  items: HomeScrollingRowItem[];
  scrollYProgress: any;
};

export default function HomeScrollingRow(props: HomeScrollingRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseXValue = useMotionValue(50);
  let widthDifference = 400;

  const x = useTransform(
    props.scrollYProgress,
    [0, 1],
    props.direction === "left" ? [0, -widthDifference] : [-widthDifference, 0]
  );
  const xSpring = useSpring(x, { stiffness: 200, damping: 40, mass: 1 });

  return (
    <div
      className="w-full overflow-hidden pb-8"
      ref={ref}
    >
      <motion.div
        className="grid grid-cols-3 w-[130vw] gap-8"
        style={{ x: xSpring }}
      >
        {props.items.map((item) => (
          <HomePopularDestinationItem
            key={item.title}
            title={item.title}
            image={item.image}
          />
        ))}
      </motion.div>
    </div>
  );
}

type HomeScrollingRowItem = {
  title: string;
  image: StaticImageData;
};

const HomePopularDestinationItem = (props: HomeScrollingRowItem) => {
  return (
    <div className="w-40vw aspect-video rounded-3xl overflow-hidden col-span-1 relative">
      <Image
        src={props.image}
        alt={props.title}
        className="w-full h-full object-cover"
        sizes="33vw"
        width={0}
        height={0}
      />
      <div className="absolute bottom-4 left-4 p-2 px-6 bg-white/80 rounded-lg">
        <h3 className="text-2xl font-bold text-astral-900">{props.title}</h3>
      </div>
    </div>
  );
};
