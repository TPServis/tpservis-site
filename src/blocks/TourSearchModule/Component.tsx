'use client'
import { useEffect, useState, useRef, use, useMemo } from 'react'
import Script from 'next/script'
import { fetchJSONP, createTimestampCallback, parseSearchResponse, parseSearchBilderResponse, fetchCountries, fetchDepartureCities, buildITTourSearchURL, getOptions, fetchAllPages } from './utils'
import dayjs from 'dayjs'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { CalendarIcon, Plane, MapPin, Loader2 } from 'lucide-react'
import { cn } from '@/utilities/cn'
import { DateRange } from 'react-day-picker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PeopleSelector from './PeopleSelector'
import NightsSelector from './NightsSelector'
import TransportSelector from './TransportSelector'
import { toast } from 'sonner'
import { SearchResultType } from './utils'
import { Stars } from './Stars'
import { useQuery } from '@tanstack/react-query'




  // https://www.ittour.com.ua/tour_search.php?callback=jQuery1710914436537394425_1741030350047&module_type=tour_search&id=DG400625103918756O740800&ver=1&type=2970&theme=38&action=get_package_tour_order_form&tour_id=03-08-f33af08145db2441a65b3aedcbbb3b1b&sharding_rule_id=&_=1741030363394
  // https://www.ittour.com.ua/tour_search.php?callback=jQuery1710914436537394425_1741030350049&module_type=tour_search&id=DG400625103918756O740800&ver=1&type=2970&theme=38&action=get_package_tour_order_form&tour_id=03-08-dfdd67c6b7607347a5a9dc3c822b5e84&sharding_rule_id=&_=1741030479830
  // https://www.ittour.com.ua/tour_search.php?callback=jQuery17108821699837300099_1741034930151&module_type=tour_search&id=DG400625103918756O740800&ver=1&type=2970&theme=38&action=get_package_tour_order_form&tour_id=03-08-1a1318631d4d6aec8ef22cbbec2eeac1&sharding_rule_id=&_=1741036767165
  // https://www.ittour.com.ua/tour_search.php?callback=jQuery4375644823069742_1741031012487&module_type=tour_search&id=DG400625103918756O740800&ver=1&type=2970&theme=38&action=get_package_tour_order_form&tour_id=03-08-840a980ca207ef2b2df684eeb0027aa8&sharding_rule_id=&_=1741031012487'
  // 03-08-840a980ca207ef2b2df684eeb0027aa8

  // https://www.ittour.com.ua/tour_search.php?callback=jQuery17106025752721087283_1741514343320&module_type=tour_search&id=DG400625103918756O740800&ver=1&type=2970&theme=38&action=package_tour_search&hotel_rating=4+78&items_per_page=50&hotel=&region=&child_age=&package_tour_type=1&transport_type=2&country=318&food=498+512+560&adults=2&children=0&date_from=10.03.25&date_till=21.03.25&night_from=6&night_till=8&price_from=0&price_till=900000&switch_price=UAH&departure_city=2014&module_location_url=http%3A%2F%2Flocalhost%3A3000%2Ftours&preview=1&_=1741514355260
  // https://www.ittour.com.ua/tour_search.php?callback=jQuery17103968606778564445_1741514676869&module_type=tour_search&id=DG400625103918756O740800&ver=1&type=2970&theme=38&action=package_tour_search&hotel_rating=4+78&items_per_page=50&hotel=&region=&child_age=&package_tour_type=1&transport_type=2&country=318&food=498+512+560&adults=2&children=0&date_from=10.03.25&date_till=21.03.25&night_from=6&night_till=8&price_from=0&price_till=900000&switch_price=UAH&departure_city=2014&module_location_url=http%3A%2F%2Flocalhost%3A3000%2Ftours&preview=1&_=1741514762876
  // https://www.ittour.com.ua/tour_search.php?callback=jQuery9569997690939707_1741515817928&module_type=tour_search&id=DG400625103918756O740800&ver=1&type=2970&theme=38&action=package_tour_search&hotel_rating=4%2B78&items_per_page=50&package_tour_type=1&transport_type=2&country=318&food=498%2B512%2B560&adults=2&children=0&date_from=10.03.25&date_till=21.03.25&night_from=6&night_till=8&price_from=0&price_till=900000&switch_price=UAH&departure_city=2014&module_location_url=http%253A%252F%252Flocalhost%253A3000%252Ftours&preview=1&_=1741515817928



type TourSearchResultType = {
    title: string
    stars: number
    location: string
    rooms: {
      id: string
      title: string
      price_usd: number
      price_uah: number
      nights: number
      meal_type: string
      date_from: string
      date_till: string
    }[]
}



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
  const { data: countries, isLoading: isLoadingCountries } = fetchCountries(HOTEL_RATING, transportType);

  const parsedCountries = useMemo(() => {
    return parseSearchBilderResponse(countries)
  }, [countries])

  const [isLoadingResults, setIsLoadingResults] = useState<boolean>(false)
  const [loadedResults, setLoadedResults] = useState<number>(0)
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })
  const [selectedCountry, setSelectedCountry] = useState<any>(parsedCountries?.countries?.[0]?.id || null)
  const { data: departureCities, isLoading: isLoadingDepartureCities } = fetchDepartureCities(selectedCountry, HOTEL_RATING, transportType);
  const parsedDepartureCities = useMemo(() => {
    return parseSearchBilderResponse(departureCities)
  }, [departureCities])
  const [selectedDepartureCity, setSelectedDepartureCity] = useState<any>(null)
  const [tourSearchData, setTourSearchData] = useState<TourSearchResultType[] | null>(null)
  const [adultsNumber, setAdultsNumber] = useState<number>(2)
  const [childrenNumber, setChildrenNumber] = useState<number>(0)
  const [nights, setNights] = useState<number[]>([7, 9])



  useEffect(() => {
    setSelectedCountry(parsedCountries?.countries?.[0]?.id)
    setSelectedDepartureCity(parsedCountries?.departureCities?.[0]?.id)
  }, [parsedCountries])

  useEffect(() => {
    setSelectedDepartureCity(updateStateConditionally(selectedDepartureCity, parsedDepartureCities?.departureCities, 'Київ'))
  }, [parsedDepartureCities])


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
    if (!date?.from || !date?.to) {
      toast.error('Будь ласка, оберіть дату');
      return;
    }

    if (!selectedCountry || !selectedDepartureCity) {
      toast.error('Будь ласка, оберіть країну та місто відправлення');
      return;
    }

    if (nights[1] <= 3) {
      toast.error('Кількість ночей має бути не менше 3.');
      return;
    }

    if (adultsNumber === 0) {
      toast.error('Будь ласка, оберіть кількість дорослих');
      return;
    }

    try {
      if (!(window as any).jQuery) {
        toast.error('Виникла помилка. Спробуйте пізніше.');
        console.error('jQuery is not loaded');
        return;
      }

      setIsLoadingResults(true);
      setLoadedResults(0);
      setTourSearchData(null);

      const formattedDataFrom = dayjs(date?.from).format('DD.MM.YY');
      const formattedDataTo = dayjs(date?.to).format('DD.MM.YY');

      const searchParams = {
        date_from: formattedDataFrom,
        date_till: formattedDataTo,
        adults: adultsNumber.toString(),
        children: childrenNumber.toString(),
        departure_city: selectedDepartureCity,
        country: selectedCountry,
        night_from: nights[0].toString(),
        night_till: nights[1].toString(),
        transport_type: transportType,
        items_per_page: '100'
      };

      const allResults = await fetchAllPages(searchParams, (results) => {
        setLoadedResults(prev => prev + results.length);
      });
      setTourSearchData(buildResultResponse(allResults));

    } catch (error) {
      console.error('Error during tour search:', error);
      toast.error('Виникла помилка. Спробуйте пізніше.');
    } finally {
      setIsLoadingResults(false);
    }
  };



  const buildResultResponse = (list: SearchResultType[]): TourSearchResultType[] | null => {
    const result: TourSearchResultType[] = []

    const groupedByHotel: { [hotelTitle: string]: SearchResultType[] } = {}

    list.forEach((item: SearchResultType) => {
      const hotelTitle = item.title
      if (!groupedByHotel[hotelTitle]) {
        groupedByHotel[hotelTitle] = []
      }
      groupedByHotel[hotelTitle].push(item)
    })

    for (const hotelTitle in groupedByHotel) {
      if (groupedByHotel.hasOwnProperty(hotelTitle)) {
        const hotelGroup = groupedByHotel[hotelTitle];
        const firstItem = hotelGroup[0];
        const rating = firstItem?.rating;
        const location = firstItem?.location;

        result.push({
              title: hotelTitle,
              stars: parseInt(rating ?? '0'),
              location: location ?? '',
              rooms: groupedByHotel[hotelTitle].map((item) => ({
                id: item.id,
                title: item.room_title ?? "",
                price_usd: parseInt(item.price_usd ?? '0'),
                price_uah: parseInt(item.price_uah ?? '0'),
                nights: parseInt(item.nights ?? '0'),
                meal_type: item.meal_type ?? '',
                date_from: item.date_from ?? '',
              date_till: item.date_till ?? '',
            })),
          })
      }
    }

    return result
  }



  // const getDepartureCities = async (): Promise<void> => {
  //   try {
  //     setIsLoadingDepartureCities(true)
  //     // If there is no previous response, fetch the departure cities
  //     const response = await fetchDepartureCities(
  //       selectedCountry ?? COUNTRY,
  //       HOTEL_RATING,
  //       transportType,
  //     )
  //     if (response.departure_city) {
  //       const parsedResponse = parseSearchBilderResponse(response)
  //       if (
  //         parsedResponse.status === '400' ||
  //         !parsedResponse.departureCities ||
  //         parsedResponse.departureCities.length === 0
  //       )
  //         throw new Error('Error fetching departure cities: ' + JSON.stringify(parsedResponse))


  //       setDepartureCities(parsedResponse.departureCities)
  //       setSelectedDepartureCity(updateStateConditionally(selectedDepartureCity, parsedResponse.departureCities, 'Київ'))
  //       setIsLoadingDepartureCities(false)
  //     }
  //   } catch (error) {
  //     console.error('Failed to load departure cities:', error)
  //   }
  // }


  // const init = async () => {
  //   setIsLoadingCountries(true)
  //   setIsLoadingDepartureCities(true)
  //   fetchCountries(HOTEL_RATING, transportType).then((response) => {
  //     const parsedResponse = parseSearchBilderResponse(response)


  //     if (parsedResponse.status === '400') {
  //       console.error('Error fetching countries:', parsedResponse.status)
  //       return
  //     }

  //     if (parsedResponse.countries && parsedResponse.countries.length > 0) {
  //       setCountries(parsedResponse.countries)
  //       setSelectedCountry(updateStateConditionally(selectedCountry, parsedResponse.countries, 'Туреччина'))
  //       setIsLoadingCountries(false)
  //     }
  //   })
  // }

  const updateStateConditionally = (state: any, response: any, defaultOption: string) => {
    if (!state || !response || !response.find((item: {id: string}): boolean => item.id === state)) {
      return getDefaultOption(response, defaultOption)
    }
    return state
  }

  const getDefaultOption = (options: {name: string, id: string}[], defaultOption: string) => {
    // Check if options is undefined or empty
    if (!options || options.length === 0) {
      return '';
    }

    let option: {name: string, id: string} | undefined = options.find((option: {name: string}) => option.name === defaultOption)

    if (!option || !option.id) {
      option = options[0]
    }

    return option?.id || ''
  }

  // useEffect(() : void => {
  //   init()
  // }, [transportType])

  // useEffect(() : void => {
  //   getDepartureCities()
  // }, [selectedCountry, transportType])


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
                  {parsedCountries?.countries?.map((country: any) => (
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
                  {parsedDepartureCities?.departureCities?.map((city: any) => (
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


        {(isLoadingResults || (tourSearchData && tourSearchData.length > 0)) && (
          <div className="">
            <div className="flex items-center gap-4">
              <p className="text-sm text-shark-500">
                {isLoadingResults ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Знайдено {loadedResults} варіантів...
                  </span>
                ) : (
                  `${calcRoomsNumber(tourSearchData)} номерів знайдено`
                )}
              </p>
            </div>
            {!isLoadingResults && tourSearchData && tourSearchData.map((hotel: TourSearchResultType) => (
              <Hotel key={hotel.title} hotel={hotel} />
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



const RoomCard = ({ room, hotel }: { room: any, hotel: any }) => {

  const price = room.price_uah.toLocaleString('uk-UA')
  const title = room.title.length <= 3 ? hotel.title + ' ' + room.title : room.title
  return (
    <div className=" bg-astral-50 rounded-xl p-4 col-span-4 text-astral-900 font-light flex flex-col gap-2">
      <h3 className="font-bold text-2xl">{title}</h3>
      {/* <p>{room.price_usd}</p> */}
      <div className="flex flex-col gap-2 h-full">
        <p className="text-sm">
          Тип харчування: <span className="font-bold text-base">{room.meal_type}</span>
        </p>
        <div className="flex gap-2 justify-between *:items-baseline *:flex *:gap-1 *:text-sm *:[&>span]:font-bold *:[&>span]:text-base">
          <p>
            Ночей у турі:
            <span>{room.nights}</span>
          </p>
          <p>
            з<span>{room.date_from}</span>
            до
            <span>{room.date_till}</span>
          </p>
        </div>
        <div className="flex justify-end grow items-end">
          <p className="text-lg flex gap-1 items-baseline">
            <span className="text-sm">Ціна за номер</span>
            <span className="font-bold text-lg">{price}</span>
            <span className="text-sm">грн</span>
          </p>
        </div>
        <Button className="w-full mt-4 bg-background-secondary text-text-on-secondary-primary">
          Замовити тур
        </Button>
      </div>
    </div>
  )
}

const calcRoomsNumber = (results: TourSearchResultType[] | null): number => {
  if (!results) return 0;
  let totalRooms = 0;
  for (const hotel of results) {
    totalRooms += hotel.rooms.length;
  }
  return totalRooms;
}

const Hotel = ({ hotel }: { hotel: TourSearchResultType }) => {
  const [visibleRooms, setVisibleRooms] = useState<number>(6);
  const hasMoreRooms = hotel.rooms.length > visibleRooms;

  const handleShowMore = () => {
    setVisibleRooms(prev => prev + 6);
  };

  return (
    <div className="mt-20">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-4xl font-bold text-astral-800">{hotel.title}</h2>
          <Stars number={hotel.stars} />
        </div>
        <div className="flex items-center gap-2 text-shark-500">
          <p>{hotel.location}</p>
          <span className="w-1 h-1 rounded-full bg-shark-300" />
          <p className="text-sm">
            {hotel.rooms.length} {hotel.rooms.length === 1 ? 'номер' :
              hotel.rooms.length > 1 && hotel.rooms.length < 5 ? 'номери' :
              'номерів'} знайдено
          </p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        {hotel.rooms.slice(0, visibleRooms).map((room) => (
          <RoomCard key={room.id} room={room} hotel={hotel} />
        ))}
      </div>
      {hasMoreRooms && (
        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleShowMore}
            variant="outline"
            className="bg-astral-50 hover:bg-astral-100 text-astral-900"
          >
            Показати ще {Math.min(6, hotel.rooms.length - visibleRooms)} номерів
          </Button>
        </div>
      )}
    </div>
  );
};
