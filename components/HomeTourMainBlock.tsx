"use client";

import React from "react";
import NextLink from "next/link";
import { MdChevronRight } from "react-icons/md";

import Image from "next/image";
import tourImage from "@/public/images/tours-main.png";

import { useRef } from "react";
import { useScroll, motion, useTransform, useSpring } from "framer-motion";

export default function HomeTourMainBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const ySpring = useSpring(y, { stiffness: 200, damping: 40, mass: 1 });

  return (
    <div className="w-full container-spacing pt-48">
      <div className="container-wrapper grid grid-cols-5 pb-10">
        <div className="col-span-3 row-span-1 w-[80%]">
          <h2 className="text-6xl font-bold text-astral-900">Кожна поїздка — це пригода!</h2>
        </div>
        <div className="col-span-2 row-span-1">
          <p className=" text-lg text-shark-500 pb-6">
            Знаходьте своє натхнення та обирайте тур, що відповідає вашим мріям.
          </p>
          <NextLink
            href="/tours"
            className="text-xl rounded-full py-7 text-jaffa-400 transition-all duration-300 flex items-center gap-4 uppercase font-bold
            hover:gap-6
            "
          >
            <span>Дізнатися більше</span>
            <MdChevronRight className="w-7 h-7" />
          </NextLink>
        </div>
      </div>
      <div
        className="container-wrapper rounded-3xl overflow-hidden aspect-video mb-16"
        ref={ref}
      >
        <motion.div style={{ y: ySpring }}>
          <Image
            src={tourImage}
            alt="Tour Image"
            className="w-full h-full object-cover scale-125"
            sizes="100vw"
            width={0}
            height={0}
          />
        </motion.div>
      </div>
      <div className="container-wrapper grid grid-cols-3 gap-16">
        <div className="col-span-1">
          <h3 className="text-2xl font-bold text-astral-900 pb-6">Екскурсійні пригоди</h3>
          <p className="text-lg text-shark-500 text-balance">
            Вирушайте в захоплюючі подорожі, відкривайте неймовірні місця та дізнавайтеся про різні культури.
          </p>
        </div>
        <div className="col-span-1">
          <h3 className="text-2xl font-bold text-astral-900 pb-6">Морські релакс-тури</h3>
          <p className="text-lg text-shark-500 text-balance">
            Відчуйте спокій на найкращих пляжах світу — ідеальний відпочинок для вас і ваших близьких
          </p>
        </div>
        <div className="col-span-1">
          <h3 className="text-2xl font-bold text-astral-900 pb-6">Тематичні тури</h3>
          <p className="text-lg text-shark-500 text-balance">
            Особливі подорожі для шукачів унікальних вражень — від культурних до освітніх пригод.
          </p>
        </div>
      </div>
    </div>
  );
}
