import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { DateRange } from "react-day-picker";
import type { ITTourSearchParams, SearchResultType } from "../utils";
import type { TourSearchResultType } from "../types";
import { format } from "date-fns";
import {
  buildITTourSearchURL,
  fetchJSONPWithCache,
  parseSearchResponse,
  validateSearchParams,
} from "../utils";
import * as v from "valibot";
import { useLocationData } from "./useLocationData";
import type { Option } from "../types";
type UseSearchResponse = {
  setters: {
    setIsLoadingResults: (isLoading: boolean) => void;
    setLoadedResults: (loadedResults: number) => void;
    setTransportType: (transportType: string) => void;
    setDate: (date: DateRange | undefined) => void;
    setAdultsNumber: (adultsNumber: number) => void;
    setChildrenNumber: (childrenNumber: number) => void;
    setNights: (nights: number[]) => void;
    setSearchParams: (searchParams: Partial<ITTourSearchParams>) => void;
    setSelectedCountry: (selectedCountry: string) => void;
    setSelectedDepartureCity: (selectedDepartureCity: string) => void;
  };
  getters: {
    isLoadingResults: boolean;
    loadedResults: number;
    transportType: string;
    date: DateRange | undefined;
    tourSearchData: TourSearchResultType[] | null;
    adultsNumber: number;
    childrenNumber: number;
    nights: number[];
    searchParams: Partial<ITTourSearchParams>;
    parsedCountries: Option[];
    parsedDepartureCities: Option[];
    isLoadingCountries: boolean;
    isLoadingDepartureCities: boolean;
    selectedCountry: string | null;
    selectedDepartureCity: string | null;
  };
  runSearch: () => void;
};

const searchCache = new Map<string, { results: SearchResultType[]; timestamp: number }>();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

export const useSearch = (): UseSearchResponse => {
  const [isLoadingResults, setIsLoadingResults] = useState<boolean>(false);
  const [loadedResults, setLoadedResults] = useState<number>(0);
  const [transportType, setTransportType] = useState<string>("2");
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [tourSearchData, setTourSearchData] = useState<TourSearchResultType[] | null>(null);
  const [adultsNumber, setAdultsNumber] = useState<number>(2);
  const [childrenNumber, setChildrenNumber] = useState<number>(0);
  const [nights, setNights] = useState<number[]>([7, 9]);
  const [searchParams, setSearchParams] = useState<Partial<ITTourSearchParams>>({});

  const {
    parsedCountries,
    parsedDepartureCities,
    isLoadingCountries,
    isLoadingDepartureCities,
    selectedCountry,
    selectedDepartureCity,
    setSelectedCountry,
    setSelectedDepartureCity,
  } = useLocationData(transportType);

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

  return {
    setters: {
      setIsLoadingResults,
      setLoadedResults,
      setTransportType,
      setDate,
      setAdultsNumber,
      setChildrenNumber,
      setNights,
      setSearchParams,
      setSelectedCountry,
      setSelectedDepartureCity,
    },
    getters: {
      isLoadingResults,
      loadedResults,
      transportType,
      date,
      tourSearchData,
      adultsNumber,
      childrenNumber,
      nights,
      searchParams,
      parsedCountries: parsedCountries.countries ?? [],
      parsedDepartureCities: parsedDepartureCities.departureCities ?? [],
      isLoadingCountries,
      isLoadingDepartureCities,
      selectedCountry,
      selectedDepartureCity,
    },
    runSearch,
  };
};

