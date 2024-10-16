import React from "react";
import NextLink from "next/link";
import { PiAirplaneTakeoff, PiTrain, PiBus } from "react-icons/pi";

export default function HomeTickets() {
  return (
    <div className="container-spacing">
      <div className="container-wrapper">
        <div className="grid grid-cols-5 gap-8 items-center">
          <div className="col-span-3">
            <h3 className="text-sm uppercase text-shark-500 pb-7 ">Квитки на будь-яку пригоду</h3>
            <h2 className="text-6xl font-bold text-astral-900 pb-6">Ваша подорож починається тут!</h2>
            <p className="text-lg text-shark-500 pb-20 pt-4 text-balance">
              Бронюйте квитки легко і вигідно. Літаки, автобуси, поїзди — ми все підготували для вашої
              зручності.
            </p>
            <NextLink
              href="/tickets"
              className=" text-lg relative rounded-2xl px-8 py-4 text-white bg-jaffa-400 transition-all duration-300 gap-4 capitalize font-bold hover:bg-jaffa-500 hover:translate-y-1 block w-fit"
            >
              <span>Забронювати квиток</span>
            </NextLink>
          </div>
          <div className="col-span-2">
            <HomeTicketsItem
              title="Авіаквитки"
              description="Забронюйте рейс за найкращими цінами та комфортно подорожуйте світом."
            >
              <PiAirplaneTakeoff className="text-jaffa-400 text-4xl" />
            </HomeTicketsItem>
            <HomeTicketsItem
              title="Автобуси"
              description="Легкі бронювання для міжміських або міжнародних поїздок."
            >
              <PiBus className="text-jaffa-400 text-4xl" />
            </HomeTicketsItem>
            <HomeTicketsItem
              title="Поїзди"
              description="Подорожуйте залізницею швидко та без турбот."
            >
              <PiTrain className="text-jaffa-400 text-4xl" />
            </HomeTicketsItem>
          </div>
        </div>
      </div>
    </div>
  );
}

type HomeTicketsItemProps = {
  children: React.ReactNode;
  title: string;
  description: string;
};

const HomeTicketsItem = ({ children, title, description }: HomeTicketsItemProps) => {
  return (
    <div className=" py-8 border-t border-shark-100">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">{children}</div>
        <div className="col-span-2">
          <h3 className="text-xl font-bold text-astral-900 pb-4">{title}</h3>
          <p className="text-lg text-shark-500">{description}</p>
        </div>
      </div>
    </div>
  );
};
