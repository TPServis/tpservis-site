import { cn } from 'src/utilities/cn'
import React from 'react'

interface CustomFormBlockProps {
  blockName?: string
  blockType: 'customForm'
  className?: string
}

export const CustomFormBlock: React.FC<CustomFormBlockProps> = ({ blockName, className }) => {
  return (
    <section className={cn('py-10 px-4 md:py-16 md:px-6 lg:py-20', className)}>
      <div className="container mx-auto">{/* Form content will be added here */}</div>
    </section>
  )
}
