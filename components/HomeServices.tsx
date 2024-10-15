import React from "react";

export default function HomeAbout() {
  return (
    <div className="w-full container-spacing pt-48">
      <div className="container-wrapper grid grid-cols-5">
        <div className="col-span-3 row-span-1 w-[80%]">
          <h2 className="text-6xl font-bold text-astral-900">Наші суперпропозиції для вашої подорожі</h2>
        </div>
        <ul className="col-span-2 row-span-1">
          <ServiceItem
            title="Тури"
            number="01"
          />
          <ServiceItem
            title="Продаж квитків"
            number="02"
          />
          <ServiceItem
            title="Візова підтримка"
            number="03"
          />
          <ServiceItem
            title="Страхування"
            number="04"
          />
          <ServiceItem
            title="Переклади"
            number="05"
          />
        </ul>
      </div>
    </div>
  );
}

interface ServiceItemProps {
  title: string;
  number: string;
}

const ServiceItem = (props: ServiceItemProps) => {
  return (
    <li className="flex items-center justify-between gap-4 w-full border-t border-shark-200 py-7 group">
      <span className="text-2xl font-bold text-astral-900 group-hover:ml-2 transition-all duration-300">
        {props.title}
      </span>
      <span className="text-2xl font-bold text-astral-900/20 group-hover:text-astral-900 transition-all duration-300">
        {props.number}
      </span>
    </li>
  );
};
