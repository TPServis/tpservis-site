'use client'
import { useEffect, useState, useRef } from 'react'
import Script from 'next/script'
export const TourSearchModuleComponent = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const moduleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isLoaded || !moduleRef.current) return

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        setTimeout(() => {
          setIsLoaded(true)
        }, 1000)
      })
    })

    observer.observe(moduleRef.current, {
      childList: true,
      subtree: true,
    })
  }, [])

  const handleLoad = () => {
    const file_version = '59'
    if ((window as any).load_js) {
      ;(window as any).load_stylesheet(
        'https://www.ittour.com.ua/classes/handlers/ittour_external_modules/ittour_modules/css/clear_all.css?i=' +
          file_version,
      )
      ;(window as any).load_stylesheet(
        'https://www.ittour.com.ua/classes/handlers/ittour_external_modules/ittour_modules/css/tour_search_main_clr.css?i=' +
          file_version,
      )
      ;(window as any).load_stylesheet(
        'https://www.ittour.com.ua/classes/handlers/ittour_external_modules/ittour_modules/css/tour_seach_form_clr_650x375.css?i=' +
          file_version,
      )
      ;(window as any).load_stylesheet(
        'https://www.ittour.com.ua/classes/handlers/ittour_external_modules/ittour_modules/css/jquery-ui-1.7.2.custom.css?i=1',
      )
      ;(window as any).load_stylesheet(
        'https://www.ittour.com.ua/classes/handlers/ittour_external_modules/ittour_modules/css/orbit-1.2.3.css?i=' +
          file_version,
      )
      ;(window as any).load_js('jquery')
    }
  }

  return (
    <div className="w-full container-spacing">
      <div className="container-wrapper">
        {/* <div id="itTourWidgetWrapper" data-agency-id="16227"></div>
        <script
          id="itTourWidgetScriptJsx"
          {...customAttrs}
          src="https://www.ittour.com.ua/tour_search.jsx?id=919219D3754G97N415113874&ver=3"
        ></script> */}

        <div
          id="tour_search_module"
          // style={{ display: isLoaded ? 'block' : 'none' }}
          // ref={moduleRef}
        ></div>
        <Script src="https://code.jquery.com/jquery-1.7.1.min.js" strategy="beforeInteractive" />
        <Script
          src="https://www.ittour.com.ua/tour_search.jsx?id=DG400625103918756O740800&ver=1&type=2970"
          strategy="afterInteractive"
          onLoad={handleLoad}
        />
      </div>
    </div>
  )
}
