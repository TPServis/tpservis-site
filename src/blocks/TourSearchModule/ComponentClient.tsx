"use client";
import type { Form } from "@/payload-types";
import { Loader2, MapPin, Plane } from "lucide-react";
// biome-ignore lint: library choice
import { format } from "date-fns";
import type { JSX } from "react/jsx-runtime";
import type { DateRange } from "react-day-picker";
import { toast } from "sonner";
import { NightsSelector } from "./NightsSelector";
import PeopleSelector from "./PeopleSelector";
import TransportSelector from "./TransportSelector";
import {
	buildITTourSearchURL,
	fetchJSONPWithCache,
	parseSearchBilderResponse,
	parseSearchResponse,
	useCountries,
	useDepartureCities,
	validateSearchParams,
} from "./utils";
import { HotelGroup } from "./HotelGroup";
import * as v from "valibot";
import { useState, useEffect, useMemo } from "react";
import { SearchModule } from "./SearchModule";
import { SearchSelectField } from "./SearchSelectField";
import { DatePopover } from "./DatePopover";
import type { SearchResultType, ITTourSearchParams, Option } from "./utils";
import { SearchTooltip } from "./SearchTooltip";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import type { TourSearchResultType } from "./types";
// https://www.ittour.com.ua/tour_search.php?callback=jQuery1710914436537394425_1741030350047&module_type=tour_search&id=DG400625103918756O740800&ver=1&type=2970&theme=38&action=get_package_tour_order_form&tour_id=03-08-f33af08145db2441a65b3aedcbbb3b1b&sharding_rule_id=&_=1741030363394
// https://www.ittour.com.ua/tour_search.php?callback=jQuery1710914436537394425_1741030350049&module_type=tour_search&id=DG400625103918756O740800&ver=1&type=2970&theme=38&action=get_package_tour_order_form&tour_id=03-08-dfdd67c6b7607347a5a9dc3c822b5e84&sharding_rule_id=&_=1741030479830
// https://www.ittour.com.ua/tour_search.php?callback=jQuery17108821699837300099_1741034930151&module_type=tour_search&id=DG400625103918756O740800&ver=1&type=2970&theme=38&action=get_package_tour_order_form&tour_id=03-08-1a1318631d4d6aec8ef22cbbec2eeac1&sharding_rule_id=&_=1741036767165
// https://www.ittour.com.ua/tour_search.php?callback=jQuery4375644823069742_1741031012487&module_type=tour_search&id=DG400625103918756O740800&ver=1&type=2970&theme=38&action=get_package_tour_order_form&tour_id=03-08-840a980ca207ef2b2df684eeb0027aa8&sharding_rule_id=&_=1741031012487'
// 03-08-840a980ca207ef2b2df684eeb0027aa8

// https://www.ittour.com.ua/tour_search.php?callback=jQuery17106025752721087283_1741514343320&module_type=tour_search&id=DG400625103918756O740800&ver=1&type=2970&theme=38&action=package_tour_search&hotel_rating=4+78&items_per_page=50&hotel=&region=&child_age=&package_tour_type=1&transport_type=2&country=318&food=498+512+560&adults=2&children=0&date_from=10.03.25&date_till=21.03.25&night_from=6&night_till=8&price_from=0&price_till=900000&switch_price=UAH&departure_city=2014&module_location_url=http%3A%2F%2Flocalhost%3A3000%2Ftours&preview=1&_=1741514355260
// https://www.ittour.com.ua/tour_search.php?callback=jQuery17103968606778564445_1741514676869&module_type=tour_search&id=DG400625103918756O740800&ver=1&type=2970&theme=38&action=package_tour_search&hotel_rating=4+78&items_per_page=50&hotel=&region=&child_age=&package_tour_type=1&transport_type=2&country=318&food=498+512+560&adults=2&children=0&date_from=10.03.25&date_till=21.03.25&night_from=6&night_till=8&price_from=0&price_till=900000&switch_price=UAH&departure_city=2014&module_location_url=http%3A%2F%2Flocalhost%3A3000%2Ftours&preview=1&_=1741514762876
// https://www.ittour.com.ua/tour_search.php?callback=jQuery9569997690939707_1741515817928&module_type=tour_search&id=DG400625103918756O740800&ver=1&type=2970&theme=38&action=package_tour_search&hotel_rating=4%2B78&items_per_page=50&package_tour_type=1&transport_type=2&country=318&food=498%2B512%2B560&adults=2&children=0&date_from=10.03.25&date_till=21.03.25&night_from=6&night_till=8&price_from=0&price_till=900000&switch_price=UAH&departure_city=2014&module_location_url=http%253A%252F%252Flocalhost%253A3000%252Ftours&preview=1&_=1741515817928

// const MERCHANT_ID = "DG400625103918756O740800";
// const MODULE_TYPE = "tour_search";
// const HOTEL = "";
// const REGION = "";
// const CHILD_AGE = "";
// const TRANSPORT_TYPE = "2";
// const COUNTRY = "318";
// const FOOD = "498+512+560";
// const PRICE_FROM = "0";
// const PRICE_TILL = "900000";
// const SWITCH_PRICE = "UAH";
// const DEPARTURE_CITY = "2014";
const HOTEL_RATING = "4+78";

// Move cache outside component to avoid recreation
const searchCache = new Map<string, { results: SearchResultType[]; timestamp: number }>();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

export const TourSearchModule = ({ form }: { form: Form }): JSX.Element => {
	const [transportType, setTransportType] = useState<string>("2");
	const [isLoadingResults, setIsLoadingResults] = useState<boolean>(false);
	const [loadedResults, setLoadedResults] = useState<number>(0);
	const [date, setDate] = useState<DateRange | undefined>({
		from: undefined,
		to: undefined,
	});
	const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
	const [selectedDepartureCity, setSelectedDepartureCity] = useState<string | null>(null);
	const [tourSearchData, setTourSearchData] = useState<TourSearchResultType[] | null>(null);
	const [adultsNumber, setAdultsNumber] = useState<number>(2);
	const [childrenNumber, setChildrenNumber] = useState<number>(0);
	const [nights, setNights] = useState<number[]>([7, 9]);
	const [searchParams, setSearchParams] = useState<Partial<ITTourSearchParams>>({});

	const { data: countries, isLoading: isLoadingCountries } = useCountries(
		HOTEL_RATING,
		transportType,
	);
	const { data: departureCities, isLoading: isLoadingDepartureCities } = useDepartureCities(
		selectedCountry || "",
		HOTEL_RATING,
		transportType,
	);

	const parsedCountries = useMemo(() => {
		return parseSearchBilderResponse(countries ?? {});
	}, [countries]);

	const parsedDepartureCities = useMemo(() => {
		return parseSearchBilderResponse(departureCities ?? {});
	}, [departureCities]);

	useEffect(() => {
		if (parsedCountries?.countries && parsedCountries?.countries?.length > 0 && !selectedCountry) {
			setSelectedCountry(parsedCountries.countries[0].id);
		}
	}, [parsedCountries, selectedCountry]);

	useEffect(() => {
		if (
			parsedDepartureCities?.departureCities &&
			parsedDepartureCities?.departureCities?.length > 0 &&
			!selectedDepartureCity
		) {
			const kyiv = parsedDepartureCities.departureCities.find((city) => city.name === "Київ");
			setSelectedDepartureCity(kyiv?.id || parsedDepartureCities.departureCities[0].id);
		}
	}, [parsedDepartureCities, selectedDepartureCity]);

	useEffect(() => {
		// biome-ignore lint: complexity
		const fetchResults = async (): Promise<void> => {
			if (!searchParams || Object.keys(searchParams).length === 0) {
				return;
			}

			if (!validateSearchParams(searchParams)) {
				toast.error("Невірні параметри пошуку");
				return;
			}

			try {
				setIsLoadingResults(true);

				const baseUrl = buildITTourSearchURL(searchParams);

				// Check cache first
				const cachedData = searchCache.get(baseUrl);
				if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
					setLoadedResults(cachedData.results.length);
					setTourSearchData(buildResultResponse(cachedData.results));
					setIsLoadingResults(false);
					return;
				}

				const response = await fetchJSONPWithCache(baseUrl);
				const parsedResponse = parseSearchResponse(response);

				if (parsedResponse.status === "400" || !parsedResponse.results) {
					throw new Error("Failed to parse search results");
				}

				// Update cache
				searchCache.set(baseUrl, {
					results: parsedResponse.results,
					timestamp: Date.now(),
				});

				setLoadedResults(parsedResponse.results.length);
				setTourSearchData(buildResultResponse(parsedResponse.results));
			} catch (error) {
				toast.error("Виникла помилка. Спробуйте пізніше.", error);
				throw error;
			} finally {
				setIsLoadingResults(false);
			}
		};

		fetchResults();
	}, [searchParams]);


	const searchQuerySchema = v.object({
		date_from: v.pipe(v.string(), v.nonEmpty("Дата відправлення є обов'язковою")),
		date_till: v.pipe(v.string(), v.nonEmpty("Дата прибуття є обов'язковою")),
		adults: v.pipe(v.string()),
		children: v.pipe(v.string()),
		country: v.pipe(v.string(), v.nonEmpty("Країна є обов'язковою")),
		departure_city: v.pipe(v.string(), v.nonEmpty("Місто відправлення є обов'язковою")),
		night_from: v.pipe(v.string()),
		night_till: v.pipe(v.string()),
		transport_type: v.pipe(v.string()),
		items_per_page: v.pipe(v.string()),
	});

	type SearchQuery = v.InferOutput<typeof searchQuerySchema>;

	const getSearchParams = (): Partial<SearchQuery> => {
		const formattedDataFrom = date?.from ? format(date?.from, "dd.MM.yy") : "";
		const formattedDataTo = date?.to ? format(date?.to, "dd.MM.yy") : "";

		return v.parse(searchQuerySchema, {
			// biome-ignore lint: library choice
			date_from: formattedDataFrom,
			// biome-ignore lint: library choice
			date_till: formattedDataTo,
			adults: adultsNumber.toString(),
			children: childrenNumber.toString(),
			// biome-ignore lint: library choice
			departure_city: selectedDepartureCity || "",
			country: selectedCountry || "",
			// biome-ignore lint: library choice
			night_from: nights[0].toString(),
			// biome-ignore lint: library choice
			night_till: nights[1].toString(),
			// biome-ignore lint: library choice
			transport_type: transportType,
			// biome-ignore lint: library choice
			items_per_page: "100",
		});
	};

	const runSearch = (): void => {
		try {
    setLoadedResults(0);
    setTourSearchData(null);
    const params = getSearchParams();
    setSearchParams(params);
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
	};

	const buildResultResponse = (list: SearchResultType[]): TourSearchResultType[] | null => {
		const result: TourSearchResultType[] = [];

		const groupedByHotel: { [hotelTitle: string]: SearchResultType[] } = {};

		for (const item of list) {
			const hotelTitle = item.title;
			if (!groupedByHotel[hotelTitle]) {
				groupedByHotel[hotelTitle] = [];
			}
			groupedByHotel[hotelTitle].push(item);
		}

		for (const hotelTitle in groupedByHotel) {
			if (Object.prototype.hasOwnProperty.call(groupedByHotel, hotelTitle)) {
				const hotelGroup = groupedByHotel[hotelTitle];
				const firstItem = hotelGroup[0];
				const rating = firstItem?.rating;
				const location = firstItem?.location;

				result.push({
					title: hotelTitle,
					stars: Number.parseInt(rating ?? "0"),
					location: location ?? "",
					rooms: groupedByHotel[hotelTitle].map((item) => ({
						id: item.id,
						title: item.room_title ?? "",
						// biome-ignore lint: to refactor
						price_usd: Number.parseInt(item.price_usd ?? "0"),
						// biome-ignore lint: to refactor
						price_uah: Number.parseInt(item.price_uah ?? "0"),
						nights: Number.parseInt(item.nights ?? "0"),
						// biome-ignore lint: to refactor
						meal_type: item.meal_type ?? "",
						// biome-ignore lint: to refactor
						date_from: item.date_from ?? "",
						// biome-ignore lint: to refactor
						date_till: item.date_till ?? "",
					})),
				});
			}
		}

		return result;
	};
		
	return (
  <div className="w-full container-spacing">
    <div className="container-wrapper min-h-[300px] relative">
      <SearchModule runSearch={runSearch}>
        <>
          <div className="col-span-3">
            <SearchTooltip content="Оберіть тип транспорту">
              <TransportSelector
                transportType={transportType}
                setTransportType={setTransportType}
              />
            </SearchTooltip>
          </div>
          <div className="col-span-9 w-full">
            <SearchTooltip content="Оберіть країну призначення">
              <SearchSelectField
                options={parsedCountries?.countries ?? []}
                selectedOption={selectedCountry || ""}
                setSelectedOption={setSelectedCountry}
                isLoadingOptions={isLoadingCountries}
                icon={<Plane className="h-4" />}
              />
            </SearchTooltip>
          </div>
          <div className="col-span-12 w-full">
            <SearchTooltip content="Оберіть місто відправлення">
              <SearchSelectField
                options={parsedDepartureCities?.departureCities ?? []}
                selectedOption={selectedDepartureCity || ""}
                setSelectedOption={setSelectedDepartureCity}
                isLoadingOptions={isLoadingDepartureCities}
                icon={<MapPin className="h-4" />}
              />
            </SearchTooltip>
          </div>
          <div className="grid gap-2 col-span-12 w-full">
            <SearchTooltip content="Оберіть бажаний діапазон дат вильоту">
              <DatePopover date={date} setDate={setDate} />
            </SearchTooltip>
          </div>
          <div className="col-span-6">
            <SearchTooltip content="Оберіть кількість ночей">
              <NightsSelector nights={nights} setNights={setNights} />
            </SearchTooltip>
          </div>
          <div className="col-span-6">
            <SearchTooltip content="Оберіть кількість дорослих та дітей">
              <PeopleSelector
                childrenNumber={childrenNumber}
                setChildrenNumber={setChildrenNumber}
                adultsNumber={adultsNumber}
                setAdultsNumber={setAdultsNumber}
              />
            </SearchTooltip>
          </div>
        </>
      </SearchModule>

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
              <HotelGroup key={hotel.title} hotel={hotel} form={form} />
            ))}
        </div>
      )}
    </div>
  </div>
);
};

const calcRoomsNumber = (results: TourSearchResultType[] | null): number => {
	if (!results) {
		return 0;
	}
	let totalRooms = 0;
	for (const hotel of results) {
		totalRooms += hotel.rooms.length;
	}
	return totalRooms;
};

