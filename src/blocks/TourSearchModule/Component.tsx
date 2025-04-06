'use client'
import { useEffect, useMemo, useState } from 'react'
import {
  parseSearchResponse,
  parseSearchBilderResponse,
  useCountries,
  useDepartureCities,
  buildITTourSearchURL,
  ITTourSearchParams,
  validateSearchParams,
  fetchJSONPWithCache,
} from './utils'
import dayjs from 'dayjs'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { CalendarIcon, Plane, MapPin, Loader2 } from 'lucide-react'
import { cn } from '@/utilities/cn'
import { DateRange } from 'react-day-picker'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import PeopleSelector from './PeopleSelector'
import NightsSelector from './NightsSelector'
import TransportSelector from './TransportSelector'
import { toast } from 'sonner'
import { SearchResultType } from './utils'
import { Stars } from './Stars'
import Image from 'next/image'
import RoomCard from './RoomCard'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import { TourSearchResultType } from './types'
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

// Move cache outside component to avoid recreation
const searchCache = new Map<string, { results: SearchResultType[]; timestamp: number }>()
const CACHE_DURATION = 30 * 60 * 1000 // 30 minutes in milliseconds

export const TourSearchModuleComponent = () => {
  const [transportType, setTransportType] = useState<string>('2')
  const [isLoadingResults, setIsLoadingResults] = useState<boolean>(false)
  const [loadedResults, setLoadedResults] = useState<number>(0)
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })
  const [selectedCountry, setSelectedCountry] = useState<any>(null)
  const [selectedDepartureCity, setSelectedDepartureCity] = useState<any>(null)
  const [tourSearchData, setTourSearchData] = useState<TourSearchResultType[] | null>(null)
  const [adultsNumber, setAdultsNumber] = useState<number>(2)
  const [childrenNumber, setChildrenNumber] = useState<number>(0)
  const [nights, setNights] = useState<number[]>([7, 9])
  const [searchParams, setSearchParams] = useState<Partial<ITTourSearchParams>>({})
  const [searchError, setSearchError] = useState<Error | null>(null)

  const { data: countries, isLoading: isLoadingCountries } = useCountries(
    HOTEL_RATING,
    transportType,
  )
  const { data: departureCities, isLoading: isLoadingDepartureCities } = useDepartureCities(
    selectedCountry,
    HOTEL_RATING,
    transportType,
  )

  const parsedCountries = useMemo(() => {
    return parseSearchBilderResponse(countries)
  }, [countries])

  const parsedDepartureCities = useMemo(() => {
    return parseSearchBilderResponse(departureCities)
  }, [departureCities])

  // Handle search when params change

  useEffect(() => {
    if (parsedCountries?.countries && parsedCountries?.countries?.length > 0 && !selectedCountry) {
      setSelectedCountry(parsedCountries.countries[0].id)
    }
  }, [parsedCountries, selectedCountry])

  useEffect(() => {
    if (
      parsedDepartureCities?.departureCities &&
      parsedDepartureCities?.departureCities?.length > 0 &&
      !selectedDepartureCity
    ) {
      setSelectedDepartureCity(parsedDepartureCities.departureCities[0].id)
    }
  }, [parsedDepartureCities, selectedDepartureCity])

  useEffect(() => {
    const fetchResults = async () => {
      if (!searchParams || Object.keys(searchParams).length === 0) {
        return
      }

      if (!validateSearchParams(searchParams)) {
        console.error('Invalid search parameters')
        return
      }

      try {
        setIsLoadingResults(true)
        setSearchError(null)

        const baseUrl = buildITTourSearchURL(searchParams)

        // Check cache first
        const cachedData = searchCache.get(baseUrl)
        if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
          setLoadedResults(cachedData.results.length)
          setTourSearchData(buildResultResponse(cachedData.results))
          setIsLoadingResults(false)
          return
        }

        const response = await fetchJSONPWithCache(baseUrl)
        const parsedResponse = parseSearchResponse(response)

        if (parsedResponse.status === '400' || !parsedResponse.results) {
          throw new Error('Failed to parse search results')
        }

        // Update cache
        searchCache.set(baseUrl, {
          results: parsedResponse.results,
          timestamp: Date.now(),
        })

        setLoadedResults(parsedResponse.results.length)
        setTourSearchData(buildResultResponse(parsedResponse.results))
      } catch (error) {
        console.error('Error during tour search:', error)
        setSearchError(error as Error)
        toast.error('Виникла помилка. Спробуйте пізніше.')
      } finally {
        setIsLoadingResults(false)
      }
    }

    fetchResults()
  }, [searchParams]) // No need for CACHE_DURATION and searchCache in deps as they're now outside component

  const runSearch = async (): Promise<void> => {
    if (!date?.from || !date?.to) {
      toast.error('Будь ласка, оберіть дату')
      return
    }

    if (!selectedCountry || !selectedDepartureCity) {
      toast.error('Будь ласка, оберіть країну та місто відправлення')
      return
    }

    if (nights[1] <= 3) {
      toast.error('Кількість ночей має бути не менше 3.')
      return
    }

    if (adultsNumber === 0) {
      toast.error('Будь ласка, оберіть кількість дорослих')
      return
    }

    try {
      setLoadedResults(0)
      setTourSearchData(null)

      const formattedDataFrom = dayjs(date?.from).format('DD.MM.YY')
      const formattedDataTo = dayjs(date?.to).format('DD.MM.YY')

      const params: Partial<ITTourSearchParams> = {
        date_from: formattedDataFrom,
        date_till: formattedDataTo,
        adults: adultsNumber.toString(),
        children: childrenNumber.toString(),
        departure_city: selectedDepartureCity,
        country: selectedCountry,
        night_from: nights[0].toString(),
        night_till: nights[1].toString(),
        transport_type: transportType,
        items_per_page: '100',
      }

      setSearchParams(params)
    } catch (error) {
      console.error('Error during tour search:', error)
      toast.error('Виникла помилка. Спробуйте пізніше.')
    }
  }

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
        const hotelGroup = groupedByHotel[hotelTitle]
        const firstItem = hotelGroup[0]
        const rating = firstItem?.rating
        const location = firstItem?.location

        result.push({
          title: hotelTitle,
          stars: parseInt(rating ?? '0'),
          location: location ?? '',
          rooms: groupedByHotel[hotelTitle].map((item) => ({
            id: item.id,
            title: item.room_title ?? '',
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
  return (
    <div className="w-full container-spacing">
      <div className="container-wrapper min-h-[300px] relative">
        <div className="w-full h-[300px] relative mb-40">
          <div className="w-full h-full overflow-hidden rounded-4xl">
            <Image
              src="https://o0z4coknhf.ufs.sh/f/UucILLerskLA60WL4Z0DxYO4iVTzFcfGgbECp9eH6Z8yrIAn"
              alt="ITTour"
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
              priority
            />
          </div>
          <div className="grid grid-cols-12 lg:flex gap-1.5 bg-jaffa-400 p-4 rounded-3xl w-full md:w-[calc(100%-2rem)] mx-auto -translate-y-1/2">
            <div className="col-span-3">
              <TransportSelector
                transportType={transportType}
                setTransportType={setTransportType}
              />
            </div>
            <div className="col-span-9 w-full">
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <TooltipProvider>
                  <Tooltip delayDuration={600}>
                    <TooltipTrigger asChild>
                      <SelectTrigger className="w-full border-none bg-jaffa-50  text-jaffa-900 font-bold rounded-xl">
                        <div
                          className={cn('flex gap-2 items-center transition-all duration-100', {
                            'blur-sm': isLoadingCountries,
                          })}
                        >
                          <Plane className="h-4" />
                          <SelectValue placeholder="Select a country" />
                        </div>
                      </SelectTrigger>
                    </TooltipTrigger>
                    <TooltipContent
                      className="bg-jaffa-50 text-jaffa-900 rounded-lg border-none font-bold text-sm"
                      sideOffset={8}
                    >
                      <p>Оберіть країну призначення</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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
                <TooltipProvider>
                  <Tooltip delayDuration={600}>
                    <TooltipTrigger asChild>
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
                    </TooltipTrigger>
                    <TooltipContent
                      className="bg-jaffa-50 text-jaffa-900 rounded-lg border-none font-bold text-sm"
                      sideOffset={8}
                    >
                      <p>Оберіть місто відправлення</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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
                <TooltipProvider>
                  <Tooltip delayDuration={600}>
                    <TooltipTrigger asChild>
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
                    </TooltipTrigger>
                    <TooltipContent
                      className="bg-jaffa-50 text-jaffa-900 rounded-lg border-none font-bold text-sm"
                      sideOffset={8}
                    >
                      <p>Оберіть бажаний діапазон дат вильоту</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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
              <TooltipProvider>
                <Tooltip delayDuration={600}>
                  <TooltipTrigger asChild>
                    <div>
                      <NightsSelector nights={nights} setNights={setNights} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    className="bg-jaffa-50 text-jaffa-900 rounded-lg border-none font-bold text-sm"
                    sideOffset={8}
                  >
                    <p>Оберіть бажану кількість ночей</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="col-span-6">
              <TooltipProvider>
                <Tooltip delayDuration={600}>
                  <TooltipTrigger asChild>
                    <div>
                      <PeopleSelector
                        childrenNumber={childrenNumber}
                        setChildrenNumber={setChildrenNumber}
                        adultsNumber={adultsNumber}
                        setAdultsNumber={setAdultsNumber}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    className="bg-jaffa-50 text-jaffa-900 rounded-lg border-none font-bold text-sm"
                    sideOffset={8}
                  >
                    <p>Оберіть кількість дорослих та дітей</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <Button
              className="rounded-xl bg-jaffa-900 text-jaffa-50 col-span-12 font-bold"
              onClick={runSearch}
            >
              Знайти тури
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
            {!isLoadingResults &&
              tourSearchData &&
              tourSearchData.map((hotel: TourSearchResultType) => (
                <Hotel key={hotel.title} hotel={hotel} />
              ))}
          </div>
        )}

        {/* <div id="tour_search_module" className="relative z-10 hidden"></div>
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
        /> */}
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
