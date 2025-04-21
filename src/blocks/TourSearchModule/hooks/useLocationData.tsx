import { useCountries } from "../utils";
import { useDepartureCities } from "../utils";
import * as cheerio from "cheerio";
import { useMemo, useState, useEffect } from "react";
import type { Option, ResponsesStatus } from "../types";

type UseLocationDataResponse = {
  parsedCountries: ParserSearchBilderResponse;
  parsedDepartureCities: ParserSearchBilderResponse;
  isLoadingCountries: boolean;
  isLoadingDepartureCities: boolean;
  selectedCountry: string | null;
  selectedDepartureCity: string | null;
  setSelectedCountry: (country: string) => void;
  setSelectedDepartureCity: (city: string) => void;
};

type ParserSearchBilderResponse = {
  countries?: Option[];
  departureCities?: Option[];
  status: ResponsesStatus;
};

interface CountryResponse {
  country?: string;
  region?: string;
  hotel?: string;
  // biome-ignore lint: this case is valid
  departure_city?: string;
}

const HOTEL_RATING = "4+78";
export const useLocationData = (transportType: string): UseLocationDataResponse => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedDepartureCity, setSelectedDepartureCity] = useState<string | null>(null);

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

  return {
    parsedCountries,
    parsedDepartureCities,
    isLoadingCountries,
    isLoadingDepartureCities,
    selectedCountry,
    selectedDepartureCity,
    setSelectedCountry,
    setSelectedDepartureCity,
  };
};

type GetOptionsResponse = {
  options?: Option[];
  status: ResponsesStatus;
};

const getOptions = (htmlString: string): GetOptionsResponse => {
  try {
    const $ = cheerio.load(htmlString);
    const result: Option[] = [];

    $("option").each((_, item): void => {
      const id = $(item).attr("value");
      const name = $(item).text().trim();

      if (!(id && name)) {
        throw new Error("No valid id or name found");
      }

      result.push({ id, name });
    });

    return {
      options: result,
      status: "200",
    };
  } catch (error) {
    return {
      status: "400",
    };
  }
};

type SearchBilderResponse = CountryResponse;
const parseSearchBilderResponse = (response: SearchBilderResponse): ParserSearchBilderResponse => {
  try {
    if (!response) {
      return {
        countries: [],
        departureCities: [],
        status: "400",
      };
    }

    const { country, departure_city } = response;

    let countries: Option[] = [];
    let departureCities: Option[] = [];

    if (country) {
      const countriesResponse = getOptions(country);
      countries = countriesResponse.options ?? [];
    }

    if (departure_city) {
      const departureCitiesResponse = getOptions(departure_city);
      departureCities = departureCitiesResponse.options ?? [];
    }

    return {
      countries: countries ?? [],
      departureCities: departureCities ?? [],
      status: "200",
    };
  } catch (error) {
    return {
      status: "400",
    };
  }
};
