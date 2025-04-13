import { Star } from 'lucide-react'

type StarsProps = {
  number: number
}
export const Stars = ({ number }: StarsProps) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: number }).map((_, index) => (
        <Star key={index} className="text-yellow-500 h-4 lg:h-8 w-auto" fill="currentColor" />
      ))}
    </div>
  )
}
