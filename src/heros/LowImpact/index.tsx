import { Media } from '@/components/Media'
import type { Page } from '@/payload-types'

export const LowImpactHero: React.FC<Page['hero']> = ({ title, subtitle, cta, mediaGroup }) => {
  return (
    <div className="w-full container-spacing !py-0">
      <div className="container-wrapper">
        <div className="flex flex-col md:grid md:grid-cols-3 md:gap-10 pt-60 pb-16 md:pb-28 ">
          <h2 className="text-4xl md:text-7xl font-bold text-heading text-pretty md:pb-9 pb-4 md:col-span-2">
            {title}
          </h2>
          <div className="flex flex-col gap-4 md:col-span-1">
            {subtitle && <p className="text-shark-500 text-balance">{subtitle}</p>}
            {cta?.label && cta.url && (
              <a href={cta.url} className="btn">
                {cta.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
