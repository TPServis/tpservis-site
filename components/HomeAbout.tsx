import React from "react";

export default function HomeAbout() {
  return (
    <div className="w-full px-4 py-24 pt-48">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-5">
        <div className="col-span-3 row-span-1 w-[80%]">
          <h2 className="text-6xl font-bold text-astral-900">Кожна поїздка — це пригода!</h2>
        </div>
        <div className="col-span-2 row-span-1">
          <h3 className="text-3xl font-bold text-shark-900 pb-6">Чому обирають нас:</h3>
          <p className=" text-lg text-shark-500 pb-6">
            Ми робимо ваші подорожі легкими та незабутніми. Наш досвід, індивідуальний підхід і широкий вибір
            турів гарантують найкращі враження. Професійна підтримка на кожному кроці, доступні ціни та
            безпека — ось що робить нас найкращим вибором для подорожей.{" "}
          </p>

          <p className="text-lg text-shark-500">
            Залиште турботи нам, а самі насолоджуйтеся кожним моментом.
          </p>
        </div>
      </div>
    </div>
  );
}
