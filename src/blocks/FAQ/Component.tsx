'use client'
import { cn } from 'src/utilities/cn'

import React from 'react'
import { useState } from 'react'
import RichText from '@/components/RichText'

type Props = {
  title: string
  questions: {
    question: string
    answer: any
  }[]
}
export const FAQ = (props: Props) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <div className="container-spacing">
      <div className="container-wrapper">
        <h2 className="text-3xl md:text-6xl font-bold text-astral-900 pb-10">{props.title}</h2>
        <div className="border border-shark-100 rounded-3xl overflow-hidden">
          {props.questions.map((item, index) => (
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
  )
}

type FaqItem = {
  question: string
  answer: any
  isExpanded: boolean
  toggleAccordion: () => void
}

const FaqItem = ({ question, answer, isExpanded, toggleAccordion }: FaqItem) => {
  return (
    <div
      className="flex flex-col gap-0 border-b border-shark-100 py-8 group data-[expanded='true']:gap-4 px-8 transition-all duration-300"
      onClick={toggleAccordion}
      data-expanded={isExpanded}
    >
      <h3 className="md:text-2xl text-xl font-bold text-astral-900">{question}</h3>
      {isExpanded && (
        <RichText
          content={answer}
          enableGutter={false}
          className="text-astral-900 mx-0 py-4 text-lg md:text-base"
        />
      )}
    </div>
  )
}
