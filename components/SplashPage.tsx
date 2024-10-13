import Background from "@/public/images/SplashPageBG.jpg";
import Image from "next/image";

import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { SiGooglemaps } from "react-icons/si";

export default function SplashPage() {
  return (
    <div className="relative h-screen grid grid-cols-1 lg:grid-cols-3">
      <div className="col-span-1">
        <SplashPageContent />
      </div>
      <div className="col-span-2 relative">
        <Image
          src={Background}
          alt="Image of a beautiful beach"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}

const SplashPageContent = () => {
  return (
    <div className="h-full relative">
      <div className="h-full flex flex-col items-start justify-center p-10">
        <h1 className="text-5xl font-black">TPServis</h1>
        <h2 className="text-lg">Наразі наш вебсайт перебуває у процесі розробки.</h2>
        <p className="text-sm opacity-50 text-pretty">
          Скоро ми будемо готові до запуску, тому залишайтеся з нами!
        </p>
      </div>
      <ul className="bg-gray-500/10 absolute bottom-0 left-0 w-full p-4 px-10">
        <SplashPageContactItem
          href="tel:+380975300860"
          icon={<FaPhoneAlt className="mr-2 w-4 h-4" />}
        >
          +38 (097) 530-08-60
        </SplashPageContactItem>
        <SplashPageContactItem
          href="tel:+380681299177"
          icon={<FaPhoneAlt className="mr-2 w-4 h-4" />}
        >
          +38 (068) 129-91-77
        </SplashPageContactItem>
        <SplashPageContactItem
          href="mailto:tpservice@ukr.net"
          icon={<IoIosMail className="mr-2 w-4 h-4  " />}
        >
          tpservice@ukr.net
        </SplashPageContactItem>
        <SplashPageContactItem
          href="https://maps.app.goo.gl/CGFwaTtPhQJqhGv56"
          icon={<SiGooglemaps className="mr-2 w-4 h-4" />}
        >
          вул. Ст. Прощенка, 34, Ніжин
        </SplashPageContactItem>
      </ul>
    </div>
  );
};

const SplashPageContactItem = ({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <li>
      <a
        href={href}
        className="flex items-center text-sm hover:underline"
      >
        {icon}
        {children}
      </a>
    </li>
  );
};
