import { Star } from 'lucide-react'

type StarsProps = {
  number: number
}
export const Stars = ({ number }: StarsProps) => {
  return <div className="flex items-center gap-2">
    {Array.from({ length: number }).map((_, index) => (
        <Star key={index} className="text-yellow-500" fill="currentColor" />
      ))}
  </div>
}
