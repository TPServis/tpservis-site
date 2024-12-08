import { Media } from '@/components/Media'
import type { Page } from '@/payload-types'

export const MediumImpactHero: React.FC<Page['hero']> = ({ title, subtitle, cta, mediaGroup }) => {
  console.log(mediaGroup?.[0])

  return (
    <div className="md:min-h-screen w-full container-spacing !py-0">
      <div className="container-wrapper">
        <div className="flex flex-col md:flex-row md:justify-start md:gap-10 md:items-center pt-60 pb-16 md:pb-28 ">
          <h2 className="text-4xl md:text-7xl font-bold text-heading text-pretty md:pb-9 pb-4 text-pretty md:w-4/6">
            {title}
          </h2>
          <div className="flex flex-col gap-4">
            {subtitle && <p className="text-shark-500 text-balance">{subtitle}</p>}
            {cta && cta.label && cta.url && (
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
