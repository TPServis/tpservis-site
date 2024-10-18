import React from "react";
import { MdSupportAgent } from "react-icons/md";
import { BsPersonBoundingBox } from "react-icons/bs";
import { FaRegRectangleList } from "react-icons/fa6";

export default function HomeWhyUs() {
  return (
    <div className="w-full container-spacing">
      <div className="container-wrapper">
        <h3 className="text-sm font-bold text-shark-400 pb-6 uppercase">Про нас</h3>
        <h2 className="text-6xl font-bold text-astral-900 pb-16">Три причини обрати нас</h2>
        <div className="grid grid-cols-3 gap-16">
          <HomeWhyUsItem
            title="Великий вибір турів"
            description="Екскурсії, пляжі, пригоди — ми маємо все!"
            icon={<FaRegRectangleList className="w-6 h-6" />}
          />
          <HomeWhyUsItem
            title="Підхід для вас"
            description="Унікальні та комфортні поїздки під ваші бажання."
            icon={<BsPersonBoundingBox className="w-6 h-6" />}
          />
          <HomeWhyUsItem
            title="Професійна підтримка"
            description="Завжди поруч, щоб усе пройшло гладко."
            icon={<MdSupportAgent className="w-6 h-6" />}
          />
        </div>
      </div>
    </div>
  );
}

type HomeWhyUsItemProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const HomeWhyUsItem = (props: HomeWhyUsItemProps) => {
  return (
    <div className="border-l-2 border-shark-100/50 pl-10 py-10">
      <div className="bg-jaffa-400 rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl mb-12 shadow-lg shadow-jaffa-400/50">
        {props.icon}
      </div>
      <h3 className="text-2xl font-bold text-astral-900 pb-6">{props.title}</h3>
      <p className="text-lg text-shark-500 text-balance">{props.description}</p>
    </div>
  );
};
