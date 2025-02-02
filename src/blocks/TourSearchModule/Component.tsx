import React from 'react'

export const TourSearchModuleComponent = () => {
  // Prepare custom attributes with a type assertion
  const customAttrs = {
    tourTab: '1',
    euroTab: '1',
    guidedTab: '1',
    ticketsTab: '1',
  } as any

  return (
    <div className="w-full container-spacing">
      <div className="container-wrapper">
        <div id="itTourWidgetWrapper" data-agency-id="16227"></div>
        <script
          id="itTourWidgetScriptJsx"
          {...customAttrs}
          src="https://www.ittour.com.ua/tour_search.jsx?id=919219D3754G97N415113874&ver=3"
        ></script>
      </div>
    </div>
  )
}
