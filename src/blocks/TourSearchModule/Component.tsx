'use client'
import { useEffect, useState, useRef } from 'react'
import Script from 'next/script'
import { makeITTourRequest, parseITTourResponse } from './utils'
export const TourSearchModuleComponent = () => {
  const handleLoad = () => {
    console.log('handleLoad')
    const file_version = '59'

    const timeout = setTimeout(() => {
      updateSelectAvia()
      removeWidth()
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

  const removeWidth = () => {
    const itt_in_middle: any = document.querySelector('.itt_in_middel')
    if (itt_in_middle) {
      itt_in_middle.style.width = '100%'
    }
  }

  const forceRemoveStyles = (element: HTMLElement) => {
    // Force override with !important
    const styleReset = `
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      transform: none !important;
      width: 100% !important;
      height: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
    `
    element.style.cssText = styleReset
    // Also try to remove the style attribute completely
    element.removeAttribute('style')
    // Then reapply our styles
    element.style.cssText = styleReset
  }

  // https://www.ittour.com.ua/tour_search.php?callback=jQuery1710914436537394425_1741030350047&module_type=tour_search&id=DG400625103918756O740800&ver=1&type=2970&theme=38&action=get_package_tour_order_form&tour_id=03-08-f33af08145db2441a65b3aedcbbb3b1b&sharding_rule_id=&_=1741030363394
  // https://www.ittour.com.ua/tour_search.php?callback=jQuery1710914436537394425_1741030350049&module_type=tour_search&id=DG400625103918756O740800&ver=1&type=2970&theme=38&action=get_package_tour_order_form&tour_id=03-08-dfdd67c6b7607347a5a9dc3c822b5e84&sharding_rule_id=&_=1741030479830
  // https://www.ittour.com.ua/tour_search.php?callback=jQuery17108821699837300099_1741034930151&module_type=tour_search&id=DG400625103918756O740800&ver=1&type=2970&theme=38&action=get_package_tour_order_form&tour_id=03-08-1a1318631d4d6aec8ef22cbbec2eeac1&sharding_rule_id=&_=1741036767165
  // https://www.ittour.com.ua/tour_search.php?callback=jQuery4375644823069742_1741031012487&module_type=tour_search&id=DG400625103918756O740800&ver=1&type=2970&theme=38&action=get_package_tour_order_form&tour_id=03-08-840a980ca207ef2b2df684eeb0027aa8&sharding_rule_id=&_=1741031012487'

  // 03-08-840a980ca207ef2b2df684eeb0027aa8

  // useEffect(() => {
  //   // Create a MutationObserver to watch for #tour_order element
  //   const observer = new MutationObserver((mutations) => {
  //     mutations.forEach(() => {
  //       const tourOrder = document.querySelector('#tour_order') as HTMLElement
  //       if (tourOrder) {
  //         // Immediate override
  //         // forceRemoveStyles(tourOrder)
  //         // // Additional override after a small delay to catch any re-applied styles
  //         // const timeout = setTimeout(() => {
  //         //   forceRemoveStyles(tourOrder)
  //         // }, 100)
  //         // return () => clearTimeout(timeout)
  //       }
  //     })
  //   })

  //   // Start observing the document with the configured parameters
  //   observer.observe(document.body, {
  //     childList: true,
  //     subtree: true,
  //     attributes: true,
  //     attributeFilter: ['style'],
  //   })

  //   // Also try to find and override the element on mount
  //   const initialTourOrder = document.querySelector('#tour_order') as HTMLElement
  //   // if (initialTourOrder) {
  //   //   forceRemoveStyles(initialTourOrder)
  //   // }

  //   // Cleanup observer on component unmount
  //   return () => observer.disconnect()
  // }, [])

  const fetchITTour = async () => {
    try {
      const response = await makeITTourRequest('1a1318631d4d6aec8ef22cbbec2eeac1')
      const parsedResponse = parseITTourResponse(response)
      console.log('✅response', parsedResponse)
    } catch (error) {
      console.error('❌error', error)
    }
  }

  const handleLoadData = () => {
    fetchITTour()
  }

  return (
    <div className="w-full container-spacing">
      <div className="container-wrapper min-h-[300px] relative">
        <div className="flex justify-center items-center">
          <button
            className="bg-astral-500 text-white px-4 py-2 rounded-md"
            onClick={handleLoadData}
          >
            load data
          </button>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="bg-astral-500 h-full rounded-full w-1/4 absolute top-0 animate-run"></div>
        </div>

        <div id="tour_search_module" className="relative z-10 hidden"></div>
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
          // #tour_search_module .itt_in_middel table {
          //   display: block !important;
          //   width: 100% !important;
          // }
          // #tour_search_module .itt_in_middel thead,
          // #tour_search_module .itt_in_middel tbody,
          // #tour_search_module .itt_in_middel tr,
          // #tour_search_module .itt_in_middel th,
          // #tour_search_module .itt_in_middel td {
          //   display: block !important;
          // }
          // #tour_search_module .itt_in_middel td,
          // #tour_search_module .itt_in_middel th {
          //   padding: 10px;
          //   border: 1px solid #ccc;
          // }
          .logo_ittour {
            display: none !important;
          }
          .itt_content {
            background-color: #fff !important;
          }

          * {
            box-sizing: border-box !important;
          }

          #tour_search_module#tour_search_module {
            #isolate {
              width: 100% !important;
              overflow: hidden !important;
              max-width: calc(100vw - 4rem) !important;

              & > table {
                width: 100% !important;
                overflow: hidden !important;
                max-width: calc(100vw - 4rem) !important;
                display: block !important;
              }
            }

            .itt_in_middel {
              max-width: calc(100vw - 4rem) !important;
              width: 100% !important;

              & > div {
                width: 100% !important;
              }

              & .extended_package_search_form {
                width: 100% !important;
                height: auto !important;

                & .frame_block {
                  height: auto !important;
                  width: 100% !important;
                  display: flex;
                  flex-direction: column;
                  float: none !important;

                  & .title {
                    display: none !important;
                  }

                  & .cart_link {
                    display: flex;
                    justify-content: flex-end;
                  }

                  & #package_search_form {
                    width: 100% !important;
                  }

                  & #package_search_form {
                    width: 100% !important;
                    order: 2;

                    & .itt_main_background {
                      width: 100% !important;
                      height: auto !important;

                      & .itt_links {
                        width: 100% !important;
                      }

                      & .itt_content {
                        width: 100% !important;
                        border-radius: 1rem !important;
                        overflow: hidden !important;
                        border: none !important;

                        & .first_box {
                          width: 100% !important;
                          padding: 1rem !important;
                          max-width: var(--container-width) !important;
                          overflow: hidden !important;
                          background-color: var(--color-astral-50) !important;

                          & .col-direction {
                            width: 100% !important;

                            float: none !important;
                            display: flex;
                            gap: 2rem;
                            padding: 0 !important;

                            @media (max-width: 768px) {
                              flex-direction: column !important;
                            }

                            & > div {
                              width: 100% !important;
                            }

                            & .country {
                              width: 100% !important;
                              height: 100% !important;
                            }

                            & .country ul {
                              width: 100% !important;
                              display: flex !important;
                              flex-direction: column !important;
                              gap: 1rem !important;

                              & li {
                                width: 100% !important;
                                display: flex;
                                flex-direction: column;
                                gap: 0.5rem;

                                // & label {
                                //   font-size: 16px !important;
                                //   color: var(--text-color-accent) !important;
                                // }

                                & select {
                                  width: 100% !important;
                                  border-radius: 0.5rem;
                                  border: 1px solid var(--color-border-primary) !important;
                                  padding: 0.5rem;
                                  font-size: 16px !important;
                                  color: var(--text-color-accent) !important;
                                  min-height: 2.5rem !important;

                                  &#region_list {
                                    height: 5rem !important;
                                    & > option {
                                      font-size: 14px !important;
                                      color: var(--text-color-secondary) !important;
                                      padding: 0.5rem !important;

                                      &:hover {
                                        background-color: var(
                                          --color-background-primary
                                        ) !important;
                                        color: var(--text-color-primary) !important;
                                        cursor: pointer !important;
                                      }

                                      &:focus {
                                        background-color: var(
                                          --color-background-primary
                                        ) !important;
                                        color: var(--text-color-primary) !important;
                                      }

                                      &:selected {
                                        background-color: var(
                                          --color-background-primary
                                        ) !important;
                                        color: var(--text-color-primary) !important;
                                      }
                                    }
                                  }
                                }
                              }
                            }

                            & .hotel {
                              width: 100% !important;
                              display: flex !important;
                              flex-direction: column !important;
                              gap: 0.5rem !important;
                              height: auto !important;
                              // & > label {
                              //   display: none !important;
                              //   font-size: 16px !important;
                              //   width: 100% !important;
                              //   height: 30px !important;
                              // }

                              & > ul {
                                width: 100% !important;
                                display: flex !important;
                                gap: 0.5rem !important;
                                position: relative !important;
                                left: 0 !important;
                                top: 0 !important;

                                & > li {
                                  font-size: 14px !important;
                                  color: var(--text-color-secondary) !important;

                                  & span {
                                    font-size: 16px !important;
                                    font-weight: 600 !important;
                                    color: var(--text-color-primary) !important;
                                  }
                                }
                              }

                              & > select {
                              }
                            }

                            & .fly-food {
                              width: 100% !important;
                              display: flex !important;
                              flex-direction: column !important;
                              gap: 0.5rem !important;
                              height: auto !important;
                              & .food_frame {
                                width: 100% !important;
                              }

                              & .parent-child {
                                width: 100% !important;
                                display: flex !important;
                                flex-direction: column !important;
                                gap: 0.5rem !important;

                                & .parent {
                                }
                              }
                            }
                          }
                        }
                        & .second_box {
                          background-color: var(--color-astral-50) !important;
                          width: 100% !important;
                          display: flex !important;
                          flex-direction: column !important;
                          gap: 1rem !important;
                          padding: 1rem !important;

                          & .col-detail-type {
                            width: 100% !important;
                            display: flex !important;
                            padding: 0 !important;
                            gap: 2rem !important;

                            @media (max-width: 768px) {
                              flex-direction: column !important;
                            }

                            & > div {
                              width: 100% !important;
                            }

                            & .txt {
                              font-size: 16px !important;
                              font-weight: 600 !important;
                              color: var(--color-astral-500) !important;
                            }

                            & .fly-date {
                              width: 100% !important;
                              display: flex !important;
                              flex-direction: column !important;
                              gap: 0.5rem !important;
                              height: auto !important;

                              & label {
                                margin: 0 !important;
                              }

                              & .txt {
                                width: 0px !important;
                                margin: 0 !important;
                                margin-top: -22px !important;
                              }

                              & .date-select {
                                width: 100% !important;
                                display: flex !important;
                                height: auto !important;
                                padding: 0 !important;
                                padding-top: 1.5rem !important;
                                gap: 0rem !important;

                                & input[type='text'] {
                                  width: 100% !important;
                                  max-width: none !important;
                                  margin: 0 !important;
                                  margin-right: 0.5rem !important;
                                }

                                & .unit {
                                  max-width: 75px !important;
                                }
                              }
                            }
                          }

                          & .night-age {
                            width: 100% !important;
                            display: flex !important;
                            flex-direction: column !important;
                            gap: 0.5rem !important;
                            height: auto !important;
                            padding: 0 !important;

                            & label {
                              margin: 0 !important;
                            }

                            & .txt {
                              width: 0px !important;
                              margin: 0 !important;
                              margin-top: -22px !important;
                            }

                            & .date-select {
                              width: 100% !important;
                              display: flex !important;
                              height: auto !important;
                              padding: 0 !important;
                              padding-top: 1.5rem !important;
                              gap: 0rem !important;

                              & input[type='text'] {
                                width: 100% !important;
                                max-width: none !important;
                                margin: 0 !important;
                                margin-right: 0.5rem !important;
                              }

                              & .unit {
                                max-width: 75px !important;
                              }
                            }
                          }

                          & .itt_price {
                            width: 100% !important;
                            display: flex !important;
                            flex-direction: column !important;
                            gap: 0.5rem !important;
                            height: auto !important;
                            padding: 0 !important;

                            & label {
                              margin: 0 !important;
                            }

                            & .txt {
                              width: 0px !important;
                              margin: 0 !important;
                              margin-top: -22px !important;
                            }

                            & .date-select {
                              width: 100% !important;
                              display: flex !important;
                              height: auto !important;
                              padding: 0 !important;
                              padding-top: 1.5rem !important;
                              gap: 0rem !important;

                              & input[type='text'] {
                                width: 100% !important;
                                max-width: none !important;
                                margin: 0 !important;
                                margin-right: 0.5rem !important;
                              }

                              & .unit {
                                max-width: 75px !important;
                              }
                            }
                          }

                          & .fly_from_box {
                            padding: 0 !important;
                            margin-top: 0rem !important;
                          }

                          & .pager-sub {
                            width: 100% !important;
                            padding: 0 !important;

                            & .btn-search {
                              width: 100% !important;
                              display: flex !important;
                              justify-content: flex-end !important;
                              height: auto !important;

                              & input[type='button'] {
                                max-width: none !important;
                                margin: 0 !important;
                                background-color: var(--color-jaffa-400) !important;
                                color: var(--color-jaffa-50) !important;
                                border-radius: 0.5rem !important;
                                border: none !important;
                                padding: 1rem !important;
                                font-size: 20px !important;
                                font-weight: 600 !important;
                                border: none !important;
                                background-image: none !important;
                                height: auto !important;
                                min-width: 300px !important;

                                &:hover {
                                  background-color: var(--color-jaffa-500) !important;
                                }

                                &:focus {
                                  background-color: var(--color-jaffa-500) !important;
                                }

                                @media (max-width: 768px) {
                                  margin-top: 2rem !important;
                                  min-width: 100% !important;
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }

                // // #isolate > table > tbody > tr:nth-child(2) > td > div > div.itt_main_block > div.tour_search_result
              }
            }

            .tour_search_result {
              max-width: 100% !important;
              overflow: scroll !important;

              .tour_not_found_description {
                width: 100% !important;
                display: flex !important;
                justify-content: center !important;
                flex-direction: column !important;
                align-items: center !important;
                text-align: center !important;
                font-size: 33px !important;
                color: var(--color-jaffa-400) !important;
                font-weight: 600 !important;
                margin-top: 4rem !important;
                gap: 2rem !important;

                span {
                  font-size: 16px !important;
                  color: var(--color-astral-400) !important;
                  font-weight: 600 !important;
                }
              }

              & > a {
                display: none !important;
              }

              & .package_search_result_table {
                & .itt_title {
                  display: none !important;
                }

                table {
                  display: block !important;
                  max-width: calc(100vw - 4rem) !important;
                  overflow: scroll !important;

                  & > tbody {
                    & > tr {
                      & > th {
                        background-color: var(--color-astral-50) !important;
                        color: var(--color-astral-500) !important;
                        font-size: 16px !important;
                        font-weight: 600 !important;
                        text-align: left !important;

                        &:nth-child(4),
                        &:nth-child(6) {
                          width: 20% !important;
                        }
                      }

                      &.itt_even {
                        background-color: var(--color-astral-100) !important;
                      }

                      & > td {
                        color: var(--color-astral-500) !important;
                        font-size: 16px !important;
                        text-align: left !important;

                        & a {
                          color: var(--color-jaffa-400) !important;
                          font-size: 16px !important;
                        }

                        &.itt_text-left > div {
                          color: var(--color-astral-500) !important;
                          font-size: 16px !important;
                          text-align: left !important;
                        }

                        &.itt_text-right {
                          text-align: right !important;
                        }
                      }
                    }
                  }
                }
              }
            }

            input[type='text'] {
              width: 100% !important;
              border-radius: 0.5rem;
              font-size: 16px !important;
              color: var(--text-color-accent) !important;
              min-height: 2.5rem !important;
              padding: 0.5rem !important;
              background-color: var(--color-astral-100) !important;
              border-style: solid !important;
              border-width: 3px !important;
              border-color: transparent !important;

              &:hover {
                border-color: var(--color-astral-200) !important;
              }

              &:focus {
                border-color: var(--color-astral-500) !important;
              }
            }

            label {
              font-size: 16px !important;
              // color: var(--text-color-secondary) !important;
              color: var(--color-astral-500) !important;
            }

            select {
              width: 100% !important;
              border-radius: 0.5rem;
              border: 1px solid var(--color-border-primary) !important;
              padding: 0.5rem;
              font-size: 16px !important;
              color: var(--text-color-accent) !important;
              font-weight: 600 !important;
              min-height: 2.5rem !important;
              background-color: var(--color-astral-100) !important;

              border-style: solid !important;
              border-width: 3px !important;
              border-color: transparent !important;

              &:hover {
                border-color: var(--color-astral-200) !important;
              }

              &#region_list,
              &#hotel_list,
              &#itt_nutrition_select {
                width: 100% !important;
                height: auto !important;
                height: 5rem !important;
                & > option {
                  font-size: 14px !important;
                  color: var(--text-color-secondary) !important;
                  padding: 0.5rem !important;

                  &:hover {
                    background-color: var(--color-background-primary) !important;
                    color: var(--text-color-primary) !important;
                    cursor: pointer !important;
                  }

                  &:focus {
                    background-color: var(--color-background-primary) !important;
                    color: var(--text-color-primary) !important;
                  }

                  &:selected {
                    background-color: var(--color-background-primary) !important;
                    color: var(--text-color-primary) !important;
                  }
                }
              }
            }
          }

          table#isolated {
            display: block !important;
            background-color: var(--color-astral-50) !important;
            position: fixed !important;
            width: 90vw !important;
            height: 90vh !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            z-index: 10000 !important;
            overflow: scroll !important;

            tbody {
              tr {
                &:nth-child(2) {
                  .left,
                  .right {
                    display: none !important;
                  }

                  #isolate {
                    width: 100% !important;
                    display: block !important;

                    #tour_order {
                      .ittour_order_block_tour_info {
                        .ittour_order_block_content_box {
                          .it_box_padding {
                            display: flex !important;
                            width: 100% !important;
                            gap: 1rem !important;

                            @media (max-width: 1024px) {
                              flex-direction: column !important;
                            }

                            .ittour_order_block_content_box_left_frame {
                              width: 100% !important;
                              order: 1 !important;
                            }

                            .ittour_order_block_content_box_right_frame {
                              width: 100% !important;
                              order: 0 !important;

                              & > div {
                                width: 100% !important;
                                overflow: hidden !important;
                                border-radius: 0.5rem !important;

                                img {
                                  width: 100% !important;
                                  height: 100% !important;
                                  object-fit: cover !important;
                                }

                                .ittour_order_block_content_box_filter {
                                  display: none !important;
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `}</style>
      </div>
    </div>
  )
}
