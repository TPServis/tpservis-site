import React from "react";

import HeroFloating from "./HeroFloating";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Hero() {
  return (
    <div className="h-screen w-full bg-astral-50 container-spacing py-0 overflow-hidden flex items-center">
      <div className="container-wrapper grid grid-cols-5">
        <div className="flex flex-col justify-center h-full col-span-3">
          <h1 className="text-sm uppercase pb-6">Travel Professional Service</h1>
          <h2 className=" text-7xl font-bold text-astral-900 text-balance pb-9">Розширте горизонти з нами</h2>
          <p className="text-shark-500 text-2xl pb-16 ">комфорт, безпека та незабутні враження гарантовані</p>
          <button className="flex items-center gap-4 group hover:gap-6 transition-all duration-300">
            <span className="text-xl rounded-full p-7 bg-jaffa-400 text-white group-hover:scale-110 transition-all duration-300">
              <FaArrowRightLong className="-rotate-45 w-5 h-5 group-hover:rotate-0 transition-all duration-300" />
            </span>
            <span className="text-xl font-semibold text-astral-900">Дізнайтеся більше</span>
          </button>
        </div>
        <HeroFloating />
      </div>
    </div>
  );
}
