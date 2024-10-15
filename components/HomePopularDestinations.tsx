"use client";

import React from "react";
import HomeScrollingRow from "./HomeScrollingRow";

import Image1 from "@/public/images/popular-destination-1.png";
import Image2 from "@/public/images/popular-destination-2.png";
import Image3 from "@/public/images/popular-destination-3.png";
import Image4 from "@/public/images/popular-destination-4.png";
import Image5 from "@/public/images/popular-destination-5.png";
import Image6 from "@/public/images/popular-destination-6.png";
import { useScroll } from "framer-motion";
import { useRef } from "react";

export default function HomePopularDestinations() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div
      ref={ref}
      className="pb-20"
    >
      <div className="w-full container-spacing !pb-10">
        <div className="container-wrapper pb-0">
          <h2 className="text-6xl font-bold text-astral-900 pb-4">Популярні напрямки</h2>
        </div>
      </div>
      <HomeScrollingRow
        direction="left"
        items={dataRow1}
        scrollYProgress={scrollYProgress}
      />
      <HomeScrollingRow
        direction="right"
        items={dataRow2}
        scrollYProgress={scrollYProgress}
      />
    </div>
  );
}

const dataRow1 = [
  {
    image: Image1,
    title: "Греція",
  },
  {
    image: Image2,
    title: "Туреччина",
  },
  {
    image: Image3,
    title: "Франція",
  },
];

const dataRow2 = [
  {
    image: Image4,
    title: "Іспанія",
  },
  {
    image: Image5,
    title: "Італія",
  },
  {
    image: Image6,
    title: "Туніс",
  },
];
