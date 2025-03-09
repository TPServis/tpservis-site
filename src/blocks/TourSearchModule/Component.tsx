'use client'
import { useEffect, useState, useRef, use } from 'react'
import Script from 'next/script'
import { fetchJSONP, createTimestampCallback, parseSearchResponse, parseSearchBilderResponse, parseDepartureCities } from './utils'
import dayjs from 'dayjs'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/utilities/cn'
import { DateRange } from 'react-day-picker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
export const TourSearchModuleComponent = () => {
  const [countries, setCountries] = useState<any>([])
  const [departureCities, setDepartureCities] = useState<any>([])
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })
  const [selectedCountry, setSelectedCountry] = useState<any>(null)
  const [selectedDepartureCity, setSelectedDepartureCity] = useState<any>(null)
  const [tourSearchData, setTourSearchData] = useState<any>(null)
  const [adultsNumber, setAdultsNumber] = useState<number>(2)

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

  // https://www.ittour.com.ua/tour_search.php?callback=jQuery17106025752721087283_1741514343320&module_type=tour_search&id=DG400625103918756O740800&ver=1&type=2970&theme=38&action=package_tour_search&hotel_rating=4+78&items_per_page=50&hotel=&region=&child_age=&package_tour_type=1&transport_type=2&country=318&food=498+512+560&adults=2&children=0&date_from=10.03.25&date_till=21.03.25&night_from=6&night_till=8&price_from=0&price_till=900000&switch_price=UAH&departure_city=2014&module_location_url=http%3A%2F%2Flocalhost%3A3000%2Ftours&preview=1&_=1741514355260
  // https://www.ittour.com.ua/tour_search.php?callback=jQuery17103968606778564445_1741514676869&module_type=tour_search&id=DG400625103918756O740800&ver=1&type=2970&theme=38&action=package_tour_search&hotel_rating=4+78&items_per_page=50&hotel=&region=&child_age=&package_tour_type=1&transport_type=2&country=318&food=498+512+560&adults=2&children=0&date_from=10.03.25&date_till=21.03.25&night_from=6&night_till=8&price_from=0&price_till=900000&switch_price=UAH&departure_city=2014&module_location_url=http%3A%2F%2Flocalhost%3A3000%2Ftours&preview=1&_=1741514762876
  // https://www.ittour.com.ua/tour_search.php?callback=jQuery9569997690939707_1741515817928&module_type=tour_search&id=DG400625103918756O740800&ver=1&type=2970&theme=38&action=package_tour_search&hotel_rating=4%2B78&items_per_page=50&package_tour_type=1&transport_type=2&country=318&food=498%2B512%2B560&adults=2&children=0&date_from=10.03.25&date_till=21.03.25&night_from=6&night_till=8&price_from=0&price_till=900000&switch_price=UAH&departure_city=2014&module_location_url=http%253A%252F%252Flocalhost%253A3000%252Ftours&preview=1&_=1741515817928

  const MERCHANT_ID = 'DG400625103918756O740800'
  const MODULE_VERSION = '1'
  const MODULE_TYPE = 'tour_search'
  const MODULE_THEME = '38'
  const MODULE_ACTION = 'package_tour_search'
  const HOTEL_RATING = '4+78'
  const ITEMS_PER_PAGE = '50'
  const HOTEL = ''
  const REGION = ''
  const CHILD_AGE = ''
  const PACKAGE_TOUR_TYPE = '1'
  const TRANSPORT_TYPE = '2'
  const COUNTRY = '318'
  const FOOD = '498+512+560'
  const ADULTS = '2'
  const CHILDREN = '0'
  const DATE_FROM = '10.03.25'
  const DATE_TILL = '21.03.25'
  const NIGHT_FROM = '6'
  const NIGHT_TILL = '8'
  const PRICE_FROM = '0'
  const PRICE_TILL = '900000'
  const SWITCH_PRICE = 'UAH'
  const DEPARTURE_CITY = '2014'
  const MODULE_LOCATION_URL = encodeURIComponent(window.location.href)
  const PREVIEW = '1'
  const TIMESTAMP = Date.now()

  interface ITTourSearchParams {
    callback: string // jQuery callback name with timestamp
    module_type: 'tour_search'
    id: string // Partner ID: 'DG400625103918756O740800'
    ver: '1'
    type: '2970'
    theme: '38'
    action: 'package_tour_search'
    hotel_rating: string // e.g. '4+78'
    items_per_page: string // e.g. '50'
    hotel?: string
    region?: string
    child_age?: string
    package_tour_type: '1'
    transport_type: '2' // Seems to be for avia/flight
    country: '318' // Country code
    food: string // Food types, e.g. '498+512+560'
    adults: string // Number of adults
    children: string // Number of children
    date_from: string // Format: 'DD.MM.YY'
    date_till: string // Format: 'DD.MM.YY'
    night_from: string // Min nights
    night_till: string // Max nights
    price_from: string // Min price
    price_till: string // Max price
    switch_price: 'UAH' // Currency
    departure_city: string // City code, e.g. '2014'
    module_location_url: string // Current page URL
    preview: '1'
    _: string // Timestamp to prevent caching
  }

  const buildITTourSearchURL = (params: Partial<ITTourSearchParams>): string => {
    const baseURL = 'https://www.ittour.com.ua/tour_search.php'
    const { timestamp, jQueryCallback } = createTimestampCallback()

    // Pre-format certain parameters that need + instead of %2B
    const hotelRating = '4+78'
    const food = '498+512+560'

    const defaultParams: ITTourSearchParams = {
      callback: jQueryCallback,
      module_type: 'tour_search',
      id: 'DG400625103918756O740800',
      ver: '1',
      type: '2970',
      theme: '38',
      action: 'package_tour_search',
      hotel_rating: hotelRating,
      items_per_page: '50',
      package_tour_type: '1',
      transport_type: '2',
      country: '318',
      food: food,
      adults: '2',
      children: '0',
      date_from: '10.03.25',
      date_till: '21.03.25',
      night_from: '6',
      night_till: '8',
      price_from: '0',
      price_till: '900000',
      switch_price: 'UAH',
      departure_city: '2014',
      module_location_url: encodeURIComponent(window.location.href),
      preview: '1',
      _: timestamp.toString(),
      ...params,
    }

    const url = new URL(baseURL)
    Object.entries(defaultParams).forEach(([key, value]) => {
      if (value !== undefined) {
        // Don't encode these specific parameters
        if (key === 'hotel_rating' || key === 'food') {
          url.searchParams.append(key, value)
        } else {
          url.searchParams.append(key, value)
        }
      }
    })

    // Replace any encoded plus signs back to actual plus signs for specific parameters
    const finalUrl = url
      .toString()
      .replace(/hotel_rating=4%2B78/, 'hotel_rating=4+78')
      .replace(/food=498%2B512%2B560/, 'food=498+512+560')

    return finalUrl
  }

  const runSearch = async (): Promise<void> => {
    try {
      if (!(window as any).jQuery) {
        console.error('jQuery is not loaded');
        return;
      }

      const { timestamp, jQueryCallback } = createTimestampCallback();

      const formattedDataFrom = dayjs(date?.from).format('DD.MM.YY');
      const formattedDataTo = dayjs(date?.to).format('DD.MM.YY');

      console.log('formattedDataFrom', formattedDataFrom);
      console.log('formattedDataTo', formattedDataTo);

      const url = buildITTourSearchURL({
        callback: jQueryCallback,
        date_from: formattedDataFrom,
        date_till: formattedDataTo,
        adults: adultsNumber.toString(),
        _: timestamp.toString()
      });

      const response = await fetchJSONP(url, jQueryCallback);
      const parsedResponse = parseSearchResponse(response);
      setTourSearchData(parsedResponse);
      console.log('✅response', parsedResponse);
    } catch (error) {
      console.error('Error during tour search:', error);
    }
  };

  interface CountryResponse {
    country?: string
    region?: string
    hotel?: string
    departure_city?: string
  }

  const fetchCountries = async (
    hotelRating: string = HOTEL_RATING,
    transportType: string = TRANSPORT_TYPE,
  ): Promise<CountryResponse> => {
    const { timestamp, jQueryCallback } = createTimestampCallback()

    const url = new URL('https://www.ittour.com.ua/tour_search.php')
    url.searchParams.append('callback', jQueryCallback)
    url.searchParams.append('module_type', MODULE_TYPE)
    url.searchParams.append('id', MERCHANT_ID)
    url.searchParams.append('action', 'get_package_search_filtered_field')
    url.searchParams.append('event', 'select_transport')
    url.searchParams.append('hotel_rating_id', hotelRating)
    url.searchParams.append('transport_type_id', transportType)
    url.searchParams.append('_', timestamp.toString())

    try {
      const response = await fetchJSONP(url.toString(), jQueryCallback)
      return response
    } catch (error) {
      console.error('Error fetching countries:', error)
      throw error
    }
  }

  interface DepartureCityResponse {
    departure_city?: string
    error?: string
  }

  const fetchDepartureCities = async (
    countryId: string,
    hotelRating: string = HOTEL_RATING,
    transportType: string = TRANSPORT_TYPE,
  ): Promise<DepartureCityResponse> => {
    const { timestamp, jQueryCallback } = createTimestampCallback()

    const url = new URL('https://www.ittour.com.ua/tour_search.php')
    url.searchParams.append('callback', jQueryCallback)
    url.searchParams.append('module_type', 'tour_search')
    url.searchParams.append('id', 'DG400625103918756O740800')
    url.searchParams.append('action', 'get_package_search_filtered_field')
    url.searchParams.append('event', 'select_country')
    url.searchParams.append('country_id', countryId)
    url.searchParams.append('hotel_rating_id', hotelRating)
    url.searchParams.append('transport_type_id', transportType)
    url.searchParams.append('_', timestamp.toString())

    try {
      const response = await fetchJSONP(url.toString(), jQueryCallback)
      return response
    } catch (error) {
      console.error('Error fetching departure cities:', error)
      return { error: 'Failed to fetch departure cities' }
    }
  }

  const loadDepartureCities = async () => {
    try {
      const response = await fetchDepartureCities(selectedCountry ?? COUNTRY)
      if (response.departure_city) {
        const cities = parseDepartureCities(response.departure_city)
        setDepartureCities(cities.cities)

        // Optionally set first city as default
        if (cities.status === '200' && cities.cities.length > 0 && !selectedDepartureCity) {

          let defaultCity = cities.cities.find((city: any) => city.name === 'Київ')

          if (!defaultCity) {
            defaultCity = cities.cities[0]
          }

          setSelectedDepartureCity(defaultCity.id)
        }
      }
    } catch (error) {
      console.error('Failed to load departure cities:', error)
    }
  }


  const init = async () => {
    fetchCountries().then((response) => {
      const parsedResponse = parseSearchBilderResponse(response)
      if (
        parsedResponse.status === '200' &&
        parsedResponse.countries &&
        parsedResponse.countries.length > 0
      ) {
        setCountries(parsedResponse.countries)
        setSelectedCountry(parsedResponse.countries[0].id)
      } else {
        console.error('Error fetching countries:', parsedResponse.status)
      }
    })

    loadDepartureCities()
  }

  useEffect(() : void => {
    loadDepartureCities()
  }, [selectedCountry])

  useEffect(() : void => {
    init()
  }, [])

  return (
    <div className="w-full container-spacing">
      <div className="container-wrapper min-h-[300px] relative">
        <div className="w-full h-[300px] relative mb-40">
          <div className="w-full h-full overflow-hidden rounded-4xl">
            <img
              src="https://o0z4coknhf.ufs.sh/f/UucILLerskLA60WL4Z0DxYO4iVTzFcfGgbECp9eH6Z8yrIAn"
              alt="ITTour"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2 bg-jaffa-400 p-4 rounded-3xl w-[calc(100%-2rem)] mx-auto -translate-y-1/2">
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-full border-none bg-jaffa-50 text-jaffa-900 font-bold rounded-xl">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent className="bg-jaffa-50 text-jaffa-900 rounded-2xl border-none">
                {countries.map((country: any) => (
                  <SelectItem
                    key={country.id}
                    value={country.id}
                    className={cn('hover:bg-jaffa-100 rounded-xl', {
                      'bg-jaffa-200 font-bold hover:bg-jaffa-400': selectedCountry === country.id,
                    })}
                  >
                    {country.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedDepartureCity} onValueChange={setSelectedDepartureCity}>
              <SelectTrigger className="w-full border-none bg-jaffa-50 text-jaffa-900 font-bold rounded-xl">
                <SelectValue placeholder="Select a departure city" />
              </SelectTrigger>
              <SelectContent className="bg-jaffa-50 text-jaffa-900 rounded-2xl border-none">
                {departureCities.map((city: any) => (
                  <SelectItem
                    key={city.id}
                    value={city.id}
                    className={cn('hover:bg-jaffa-100 rounded-xl', {
                      'bg-jaffa-200 font-bold hover:bg-jaffa-400': selectedDepartureCity === city.id,
                    })}
                  >
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="grid gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={'outline'}
                    className={cn(
                      'w-[300px] justify-start text-left bg-jaffa-50 text-jaffa-900 font-bold border-none shadow-none rounded-xl',
                      !date && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                        </>
                      ) : (
                        format(date.from, 'LLL dd, y')
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white border-none" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    disabled={{
                      before: dayjs().add(1, 'day').toDate(),
                      after: date?.from ? dayjs(date?.from).add(11, 'day').toDate() : undefined,
                    }}
                    classNames={{
                      cell: 'hover:bg-jaffa-50 rounded-md',
                      day_disabled: '!text-gray-400 !cursor-not-allowed hover:!bg-white',
                      day_selected: '!font-bold',
                      day_range_start:
                        'bg-linear-to-br from-jaffa-50 from-50% to-50% to-jaffa-100 text-jaffa-800 rounded-r-none',
                      day_range_end:
                        'bg-linear-to-br from-jaffa-100 from-50% to-50% to-jaffa-50 text-jaffa-800 rounded-l-none',
                      day_range_middle: 'bg-jaffa-100 text-jaffa-800 rounded-none',
                      day_outside: 'invisible',
                    }}
                    selected={date}
                    onSelect={(range) =>
                      setDate(
                        range
                          ? {
                              from: range.from,
                              to: range.to,
                            }
                          : {
                              from: undefined,
                              to: undefined,
                            },
                      )
                    }
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button className="rounded-xl bg-jaffa-900 text-jaffa-50" onClick={runSearch}>
              Search
            </Button>
          </div>
        </div>

        {tourSearchData && (
          <div className="">
            {tourSearchData.map((tour: any) => (
              <div key={tour.id}>
                <h2>{tour.title}</h2>
              </div>
            ))}
          </div>
        )}

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
