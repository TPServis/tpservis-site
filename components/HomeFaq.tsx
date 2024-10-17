"use client";

import React from "react";
import { useState } from "react";

export default function HomeFaq() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="container-spacing">
      <div className="container-wrapper">
        <h2 className="text-6xl font-bold text-astral-900 pb-10">Часті запитання (FAQ)</h2>
        <div className="border border-shark-100 rounded-3xl overflow-hidden">
          {faqItems.map((item, index) => (
            <FaqItem
              key={index}
              question={item.question}
              answer={item.answer}
              isExpanded={expandedIndex === index}
              toggleAccordion={() => toggleAccordion(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

type FaqItem = {
  question: string;
  answer: string;
  isExpanded: boolean;
  toggleAccordion: () => void;
};

const FaqItem = ({ question, answer, isExpanded, toggleAccordion }: FaqItem) => {
  return (
    <div
      className="flex flex-col gap-0 border-b border-shark-100 py-8 group data-[expanded='true']:gap-4 px-8 transition-all duration-300"
      onClick={toggleAccordion}
      data-expanded={isExpanded}
    >
      <h3 className="text-2xl font-bold text-astral-900">{question}</h3>
      <p className="text-astral-900 block overflow-x-hidden overflow-y-auto transition-all duration-300 max-h-0 group-data-[expanded='true']:max-h-[110px] blur-sm group-data-[expanded='true']:blur-none  group-data-[expanded='false']:scale-95 ">
        {answer}
      </p>
    </div>
  );
};

const faqItems = [
  {
    question: "Чи можу я змінити або скасувати свій тур?",
    answer:
      "Зазвичай потрібен лише ваш паспорт. Зв'яжіться з нами, щоб уточнити деталі для конкретного рейсу.",
  },
  {
    question: "Чи потрібна мені віза для подорожі?",
    answer:
      "Зазвичай потрібен лише ваш паспорт. Зв'яжіться з нами, щоб уточнити деталі для конкретного рейсу. Зазвичай потрібен лише ваш паспорт. Зв'яжіться з нами, щоб уточнити деталі для конкретного рейсу. Зазвичай потрібен лише ваш паспорт. Зв'яжіться з нами, щоб уточнити деталі для конкретного рейсу. Зазвичай потрібен лише ваш паспорт. Зв'яжіться з нами, щоб уточнити деталі для конкретного рейсу. Зазвичай потрібен лише ваш паспорт. Зв'яжіться з нами, щоб уточнити деталі для конкретного рейсу. Зазвичай потрібен лише ваш паспорт. Зв'яжіться з нами, щоб уточнити деталі для конкретного рейсу. Зазвичай потрібен лише ваш паспорт. Зв'яжіться з нами, щоб уточнити деталі для конкретного рейсу. Зазвичай потрібен лише ваш паспорт. Зв'яжіться з нами, щоб уточнити деталі для конкретного рейсу. Зазвичай потрібен лише ваш паспорт. Зв'яжіться з нами, щоб уточнити деталі для конкретного рейсу. Зазвичай потрібен лише ваш паспорт. Зв'яжіться з нами, щоб уточнити деталі для конкретного рейсу. Зазвичай потрібен лише ваш паспорт. Зв'яжіться з нами, щоб уточнити деталі для конкретного рейсу. Зазвичай потрібен лише ваш паспорт. Зв'яжіться з нами, щоб уточнити деталі для конкретного рейсу. Зазвичай потрібен лише ваш паспорт. Зв'яжіться з нами, щоб уточнити деталі для конкретного рейсу. Зазвичай потрібен лише ваш паспорт. Зв'яжіться з нами, щоб уточнити деталі для конкретного рейсу. Зазвичай потрібен лише ваш паспорт. Зв'яжіться з нами, щоб уточнити деталі для конкретного рейсу.",
  },
  {
    question: "Які документи потрібні для бронювання квитків?",
    answer:
      "Зазвичай потрібен лише ваш паспорт. Зв'яжіться з нами, щоб уточнити деталі для конкретного рейсу.",
  },
  {
    question: "Чи є у вас страхування для подорожей?",
    answer:
      "Зазвичай потрібен лише ваш паспорт. Зв'яжіться з нами, щоб уточнити деталі для конкретного рейсу.",
  },
];
