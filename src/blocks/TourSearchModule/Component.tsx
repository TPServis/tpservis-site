'use client'
import { useEffect, useState, useRef, use } from 'react'
import Script from 'next/script'
import { fetchJSONP, createTimestampCallback, parseSearchResponse, parseSearchBilderResponse, fetchCountries, fetchDepartureCities, buildITTourSearchURL, getOptions } from './utils'
import dayjs from 'dayjs'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { CalendarIcon, Plane, MapPin } from 'lucide-react'
import { cn } from '@/utilities/cn'
import { DateRange } from 'react-day-picker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PeopleSelector from './PeopleSelector'
import NightsSelector from './NightsSelector'
import TransportSelector from './TransportSelector'



  // https://www.ittour.com.ua/tour_search.php?callback=jQuery1710914436537394425_1741030350047&module_type=tour_search&id=DG400625103918756O740800&ver=1&type=2970&theme=38&action=get_package_tour_order_form&tour_id=03-08-f33af08145db2441a65b3aedcbbb3b1b&sharding_rule_id=&_=1741030363394
  // https://www.ittour.com.ua/tour_search.php?callback=jQuery1710914436537394425_1741030350049&module_type=tour_search&id=DG400625103918756O740800&ver=1&type=2970&theme=38&action=get_package_tour_order_form&tour_id=03-08-dfdd67c6b7607347a5a9dc3c822b5e84&sharding_rule_id=&_=1741030479830
  // https://www.ittour.com.ua/tour_search.php?callback=jQuery17108821699837300099_1741034930151&module_type=tour_search&id=DG400625103918756O740800&ver=1&type=2970&theme=38&action=get_package_tour_order_form&tour_id=03-08-1a1318631d4d6aec8ef22cbbec2eeac1&sharding_rule_id=&_=1741036767165
  // https://www.ittour.com.ua/tour_search.php?callback=jQuery4375644823069742_1741031012487&module_type=tour_search&id=DG400625103918756O740800&ver=1&type=2970&theme=38&action=get_package_tour_order_form&tour_id=03-08-840a980ca207ef2b2df684eeb0027aa8&sharding_rule_id=&_=1741031012487'
  // 03-08-840a980ca207ef2b2df684eeb0027aa8

  // https://www.ittour.com.ua/tour_search.php?callback=jQuery17106025752721087283_1741514343320&module_type=tour_search&id=DG400625103918756O740800&ver=1&type=2970&theme=38&action=package_tour_search&hotel_rating=4+78&items_per_page=50&hotel=&region=&child_age=&package_tour_type=1&transport_type=2&country=318&food=498+512+560&adults=2&children=0&date_from=10.03.25&date_till=21.03.25&night_from=6&night_till=8&price_from=0&price_till=900000&switch_price=UAH&departure_city=2014&module_location_url=http%3A%2F%2Flocalhost%3A3000%2Ftours&preview=1&_=1741514355260
  // https://www.ittour.com.ua/tour_search.php?callback=jQuery17103968606778564445_1741514676869&module_type=tour_search&id=DG400625103918756O740800&ver=1&type=2970&theme=38&action=package_tour_search&hotel_rating=4+78&items_per_page=50&hotel=&region=&child_age=&package_tour_type=1&transport_type=2&country=318&food=498+512+560&adults=2&children=0&date_from=10.03.25&date_till=21.03.25&night_from=6&night_till=8&price_from=0&price_till=900000&switch_price=UAH&departure_city=2014&module_location_url=http%3A%2F%2Flocalhost%3A3000%2Ftours&preview=1&_=1741514762876
  // https://www.ittour.com.ua/tour_search.php?callback=jQuery9569997690939707_1741515817928&module_type=tour_search&id=DG400625103918756O740800&ver=1&type=2970&theme=38&action=package_tour_search&hotel_rating=4%2B78&items_per_page=50&package_tour_type=1&transport_type=2&country=318&food=498%2B512%2B560&adults=2&children=0&date_from=10.03.25&date_till=21.03.25&night_from=6&night_till=8&price_from=0&price_till=900000&switch_price=UAH&departure_city=2014&module_location_url=http%253A%252F%252Flocalhost%253A3000%252Ftours&preview=1&_=1741515817928



 const MERCHANT_ID = 'DG400625103918756O740800'
 const MODULE_TYPE = 'tour_search'
 const HOTEL_RATING = '4+78'
 const HOTEL = ''
 const REGION = ''
 const CHILD_AGE = ''
 const TRANSPORT_TYPE = '2'
 const COUNTRY = '318'
 const FOOD = '498+512+560'
 const PRICE_FROM = '0'
 const PRICE_TILL = '900000'
 const SWITCH_PRICE = 'UAH'
 const DEPARTURE_CITY = '2014'

export const TourSearchModuleComponent = () => {
  const [transportType, setTransportType] = useState<string>('2')
  const [countries, setCountries] = useState<any>([])
  const [isLoadingCountries, setIsLoadingCountries] = useState<boolean>(false)
  const [departureCities, setDepartureCities] = useState<any>([])
  const [isLoadingDepartureCities, setIsLoadingDepartureCities] = useState<boolean>(false)
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })
  const [selectedCountry, setSelectedCountry] = useState<any>(null)
  const [selectedDepartureCity, setSelectedDepartureCity] = useState<any>(null)
  const [tourSearchData, setTourSearchData] = useState<any>(null)
  const [adultsNumber, setAdultsNumber] = useState<number>(2)
  const [childrenNumber, setChildrenNumber] = useState<number>(0)
  const [nights, setNights] = useState<number[]>([7, 9])

  const handleLoad = () => {
    console.log('handleLoad')
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
      ;(window as any).load_js('ui')
      ;(window as any).load_js('boxy')
      ;(window as any).load_js('datepicker')
      ;(window as any).load_js('orbit')
      ;(window as any).load_js('tour_seach_form')
      ;(window as any).load_js('prepare_form')
    }
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
        children: childrenNumber.toString(),
        departure_city: selectedDepartureCity,
        country: selectedCountry,
        night_from: nights[0].toString(),
        night_till: nights[1].toString(),
        transport_type: transportType,
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


  const getDepartureCities = async (): Promise<void> => {
    try {
      setIsLoadingDepartureCities(true)
      // If there is no previous response, fetch the departure cities
      const response = await fetchDepartureCities(
        selectedCountry ?? COUNTRY,
        HOTEL_RATING,
        transportType,
      )
      if (response.departure_city) {
        const parsedResponse = parseSearchBilderResponse(response)
        if (
          parsedResponse.status === '400' ||
          !parsedResponse.departureCities ||
          parsedResponse.departureCities.length === 0
        )
          throw new Error('Error fetching departure cities: ' + JSON.stringify(parsedResponse))


        setDepartureCities(parsedResponse.departureCities)
        setSelectedDepartureCity(updateStateConditionally(selectedDepartureCity, parsedResponse.departureCities, 'Київ'))
        setIsLoadingDepartureCities(false)
      }
    } catch (error) {
      console.error('Failed to load departure cities:', error)
    }
  }


  const init = async () => {
    setIsLoadingCountries(true)
    setIsLoadingDepartureCities(true)
    fetchCountries(HOTEL_RATING, transportType).then((response) => {
      const parsedResponse = parseSearchBilderResponse(response)


      if (parsedResponse.status === '400') {
        console.error('Error fetching countries:', parsedResponse.status)
        return
      }

      if (parsedResponse.countries && parsedResponse.countries.length > 0) {
        setCountries(parsedResponse.countries)
        setSelectedCountry(updateStateConditionally(selectedCountry, parsedResponse.countries, 'Туреччина'))
        setIsLoadingCountries(false)
      }
    })
  }

  const updateStateConditionally = (state: any, response: any, defaultOption: string) => {
    if (!state || !response.find((item: {id: string}) => item.id === state)) {
      return getDefaultOption(response, defaultOption)
    }
    return state
  }

  const getDefaultOption = (options: {name: string, id: string}[], defaultOption: string) => {
    let option = options.find((option: {name: string}) => option.name === defaultOption)

    if (!option) {
      option = options[0]
    }

    return option.id
  }

  useEffect(() : void => {
    init()
  }, [transportType])

  useEffect(() : void => {
    getDepartureCities()
  }, [selectedCountry, transportType])


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
          <div className="grid grid-cols-12 lg:flex gap-2 bg-jaffa-400 p-4 rounded-3xl w-full md:w-[calc(100%-2rem)] mx-auto -translate-y-1/2">
            <div className="col-span-3">
              <TransportSelector
                transportType={transportType}
                setTransportType={setTransportType}
              />
            </div>
            <div className="col-span-9 w-full">
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-full border-none bg-jaffa-50 text-jaffa-900 font-bold rounded-xl">
                  <div
                    className={cn('flex gap-2 items-center transition-all duration-100', {
                      'blur-sm': isLoadingCountries,
                    })}
                  >
                    <Plane className="h-4" />
                    <SelectValue placeholder="Select a country" />
                  </div>
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
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-12 w-full">
              <Select value={selectedDepartureCity} onValueChange={setSelectedDepartureCity}>
                <SelectTrigger className="w-full border-none bg-jaffa-50 text-jaffa-900 font-bold rounded-xl">
                  <div
                    className={cn('flex gap-2 items-center transition-all duration-100', {
                      'blur-sm': isLoadingDepartureCities,
                    })}
                  >
                    <MapPin className="h-4" />
                    <SelectValue placeholder="Select a departure city" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-jaffa-50 text-jaffa-900 rounded-2xl border-none">
                  {departureCities.map((city: any) => (
                    <SelectItem
                      key={city.id}
                      value={city.id}
                      className={cn('hover:bg-jaffa-100 rounded-xl', {
                        'bg-jaffa-200 font-bold hover:bg-jaffa-400':
                          selectedDepartureCity === city.id,
                      })}
                    >
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2 col-span-12 w-full">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={'outline'}
                    className={cn(
                      'lg:min-w-[300px] w-full justify-start text-left bg-jaffa-50 text-jaffa-900 font-bold border-none shadow-none rounded-xl',
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
                      <span>Виберіть дату</span>
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
            <div className="col-span-6">
              <NightsSelector nights={nights} setNights={setNights} />
            </div>
            <div className="col-span-6">
              <PeopleSelector
                childrenNumber={childrenNumber}
                setChildrenNumber={setChildrenNumber}
                adultsNumber={adultsNumber}
                setAdultsNumber={setAdultsNumber}
              />
            </div>

            <Button
              className="rounded-xl bg-jaffa-900 text-jaffa-50 col-span-12"
              onClick={runSearch}
            >
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
      </div>
    </div>
  )
}
