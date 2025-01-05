'use client'
import { cn } from 'src/utilities/cn'

import React, { useRef, useEffect } from 'react'
import { useState } from 'react'
import RichText from '@/components/RichText'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

type Props = {
  title: string
  questions: {
    question: string
    answer: any
  }[]
}

export const FAQ = (props: Props) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const faqRef = useRef<HTMLDivElement>(null)

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const items = props.questions
    const currentIndex = expandedIndex ?? -1

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (currentIndex < items.length - 1) {
          setExpandedIndex(currentIndex + 1)
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (currentIndex > 0) {
          setExpandedIndex(currentIndex - 1)
        }
        break
      case 'Home':
        e.preventDefault()
        setExpandedIndex(0)
        break
      case 'End':
        e.preventDefault()
        setExpandedIndex(items.length - 1)
        break
    }
  }

  return (
    <div className="container-spacing">
      <div className="container-wrapper">
        <h2 className="text-3xl md:text-6xl font-bold text-heading pb-10">{props.title}</h2>
        <div
          ref={faqRef}
          className="border border-shark-100 rounded-3xl overflow-hidden"
          onKeyDown={handleKeyDown}
        >
          {props.questions.map((item, index) => (
            <FaqItem
              key={index}
              question={item.question}
              answer={item.answer}
              isExpanded={expandedIndex === index}
              toggleAccordion={() => toggleAccordion(index)}
              index={index}
              totalItems={props.questions.length}
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
  index: number
  totalItems: number
}

const FaqItem = ({ question, answer, isExpanded, toggleAccordion, index, totalItems }: FaqItem) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isExpanded && buttonRef.current) {
      buttonRef.current.focus()
    }
  }, [isExpanded])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case ' ':
      case 'Enter':
        e.preventDefault()
        toggleAccordion()
        break
      case 'ArrowDown':
        e.preventDefault()
        if (index < totalItems - 1) {
          const nextButton =
            e.currentTarget.parentElement?.nextElementSibling?.querySelector('button')
          nextButton?.focus()
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (index > 0) {
          const prevButton =
            e.currentTarget.parentElement?.previousElementSibling?.querySelector('button')
          prevButton?.focus()
        }
        break
      case 'Home':
        e.preventDefault()
        const firstButton =
          e.currentTarget.parentElement?.parentElement?.firstElementChild?.querySelector('button')
        firstButton?.focus()
        break
      case 'End':
        e.preventDefault()
        const lastButton =
          e.currentTarget.parentElement?.parentElement?.lastElementChild?.querySelector('button')
        lastButton?.focus()
        break
    }
  }

  const itemClasses = cn(
    'flex flex-col gap-0 border-b border-shark-100 py-8 px-8 transition-all duration-300 overflow-hidden',
    {
      group: true,
    },
  )

  const buttonClasses = cn(
    'w-full text-left md:text-2xl text-xl font-bold text-astral-900 flex justify-between items-center',
    'focus:outline-none focus:ring-2 focus:ring-astral-400 focus:ring-offset-2 rounded-lg p-2 -m-2',
  )

  const iconClasses = cn('w-6 h-6 transform transition-transform duration-300', {
    'rotate-180': isExpanded,
  })

  return (
    <div className={itemClasses} data-expanded={isExpanded}>
      <h3>
        <button
          ref={buttonRef}
          onClick={(e) => {
            e.preventDefault()
            toggleAccordion()
          }}
          onKeyDown={handleKeyDown}
          className={buttonClasses}
          aria-expanded={isExpanded}
          aria-controls={`faq-content-${index}`}
        >
          <span>{question}</span>
          <ChevronDown className={iconClasses} aria-hidden="true" />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            ref={contentRef}
            id={`faq-content-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: {
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1],
                },
                opacity: {
                  duration: 0.25,
                  delay: 0.1,
                },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: {
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1],
                },
                opacity: {
                  duration: 0.25,
                },
              },
            }}
            className="text-astral-900"
          >
            <div className="py-4 text-lg md:text-base">
              <RichText content={answer} enableGutter={false} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

FaqItem.displayName = 'FaqItem'
