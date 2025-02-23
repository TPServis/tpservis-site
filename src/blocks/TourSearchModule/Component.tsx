'use client'
import { useEffect, useState, useRef } from 'react'
import Script from 'next/script'

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

  const removeWidth = () => {
    const itt_in_middle: any = document.querySelector('.itt_in_middel')
    if (itt_in_middle) {
      itt_in_middle.style.width = '100%'
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
                  width: 100% !important;
                  overflow: scroll !important;

                  & > tbody {
                    & > tr {
                      & > th {
                        background-color: var(--color-astral-50) !important;
                        color: var(--color-astral-500) !important;
                        font-size: 16px !important;
                        font-weight: 600 !important;
                        text-align: left !important;
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
        `}</style>
      </div>
    </div>
  )
}
