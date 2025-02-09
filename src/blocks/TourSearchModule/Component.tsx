'use client'
import { useEffect, useState, useRef } from 'react'
import Script from 'next/script'

export const TourSearchModuleComponent = () => {
  const handleLoad = () => {
    console.log('handleLoad')
    const file_version = '59'

    const timeout = setTimeout(() => {
      updateSelectAvia()
    }, 500)

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
      ;(window as any).load_js('ui')
      ;(window as any).load_js('boxy')
      ;(window as any).load_js('datepicker')
      ;(window as any).load_js('orbit')
      ;(window as any).load_js('tour_seach_form')
      ;(window as any).load_js('prepare_form')

      // hike_search_form_submit(\'extended\', false);"
      // ;(window as any).hike_search_form_submit = function (type: string, is_extended: boolean) {
      //   console.log('hike_search_form_submit', type, is_extended)
      // }
    }
  }

  const updateSelectAvia = () => {
    const selectAvia = document.querySelector('#transport_type') as HTMLSelectElement
    if (selectAvia) {
      console.log('selectAvia', selectAvia)

      // Simulate a user clicking the select element
      selectAvia.selectedIndex = 2
      const event = new Event('change', { bubbles: true, cancelable: true })
      selectAvia.dispatchEvent(event)
    }
  }

  return (
    <div className="w-full container-spacing">
      <div className="logo_ittour">hello</div>

      <div className="container-wrapper">
        {/* <div id="itTourWidgetWrapper" data-agency-id="16227"></div>
        <script
          id="itTourWidgetScriptJsx"
          {...customAttrs}
          src="https://www.ittour.com.ua/tour_search.jsx?id=919219D3754G97N415113874&ver=3"
        ></script> */}

        <div id="tour_search_module"></div>
        <Script
          src="https://code.jquery.com/jquery-1.7.1.min.js"
          strategy="beforeInteractive"
          onLoad={() => {
            ;(window as any).jq = (window as any).jQuery
          }}
        />
        <Script
          src="https://www.ittour.com.ua/tour_search.jsx?id=DG400625103918756O740800&ver=1&type=2970"
          // strategy="afterInteractive"
          onLoad={handleLoad}
        />
        <style jsx global>{`
          .logo_ittour {
            display: none !important;
          }
        `}</style>
      </div>
    </div>
  )
}
