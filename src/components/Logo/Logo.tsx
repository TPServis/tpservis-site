import { cn } from '@/utilities/cn'

type LogoProps = {
  className?: string
}
export const Logo = (props: LogoProps) => {
  return (
    <span className={cn('text-3xl text-astral-900', props.className)}>
      <span className="text-primary font-black">TPS</span>
      ervice
    </span>
  )
}
