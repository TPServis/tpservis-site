import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
// biome-ignore lint: import
import * as cheerio from "cheerio";
import { addDays, format, parse } from "date-fns";
import { useMemo } from "react";
import type { ResponsesStatus } from "./types";



const DEFAULT_HOTEL_RATING = "4+78";
const DEFAULT_TRANSPORT_TYPE = "2";
const MODULE_TYPE = "tour_search";
const MERCHANT_ID = "DG400625103918756O740800";


const getBaseUrl = (url: string): string => {
	const urlObj = new URL(url);
	// Remove callback and timestamp parameters
	urlObj.searchParams.delete("callback");
	urlObj.searchParams.delete("_");
	return urlObj.toString();
};

// biome-ignore lint: this is a valid case
const useITTourRequest = (tourId: string): UseQueryResult<any> => {
	const { timestamp, jQueryCallback } = createTimestampCallback();

	const url = new URL("https://www.ittour.com.ua/tour_search.php");
	url.searchParams.append("callback", jQueryCallback);
	url.searchParams.append("module_type", MODULE_TYPE);
	url.searchParams.append("id", MERCHANT_ID);
	url.searchParams.append("ver", "1");
	url.searchParams.append("type", "2970");
	url.searchParams.append("theme", "38");
	url.searchParams.append("action", "get_package_tour_order_form");
	url.searchParams.append("tour_id", `${tourId}`);
	url.searchParams.append("sharding_rule_id", "");
	url.searchParams.append("_", timestamp.toString());

	return useJSONPQuery(url.toString());
};

const createTimestampCallback = (): { timestamp: number; jQueryCallback: string } => {
	const timestamp = Date.now();
	const random = Math.floor(Math.random() * 100000000000000000);
	const jQueryCallback = `jQuery${random}_${timestamp}`;
	return { timestamp, jQueryCallback };
};

// biome-ignore lint: this is a valid case
const fetchJSONP = (url: string, jQueryCallback: string): Promise<Content> => {
	return new Promise((resolve, reject): void => {
		(window as Window & typeof globalThis)[jQueryCallback] = (data: Content): void => {
			cleanup();
			resolve(data);
		};

		const script = document.createElement("script");
		script.src = url;
		script.type = "text/javascript";

		const cleanup = (): void => {
			if (script.parentNode) {
				script.parentNode.removeChild(script);
			}
			delete (window as Window & typeof globalThis)[jQueryCallback];
		};

		script.onerror = (): void => {
			cleanup();
			reject(new Error("Script loading failed"));
		};

		document.body.appendChild(script);
	});
};

// Modified JSONP fetcher that accepts base URL
// biome-ignore lint: this is a valid case
const fetchJSONPWithCache = (baseUrl: string): Promise<Content> => {
	const { timestamp, jQueryCallback } = createTimestampCallback();

	// Create URL object to manipulate parameters
	const url = new URL(baseUrl);
	const searchParams = url.searchParams;

	// Create a new URLSearchParams with callback first
	const newParams = new URLSearchParams();
	newParams.append("callback", jQueryCallback);

	// Add all existing parameters
	for (const [key, value] of searchParams.entries()) {
		newParams.append(key, value);
	}

	// Add timestamp at the end
	newParams.append("_", timestamp.toString());

	// Construct the final URL with reordered parameters
	const fullUrl = `${url.origin}${url.pathname}?${newParams.toString()}`
		.replace(/hotel_rating=4%2B78/g, "hotel_rating=4+78")
		.replace(/food=498%2B512%2B560/g, "food=498+512+560");

	return fetchJSONP(fullUrl, jQueryCallback);
};

// biome-ignore lint: this is a valid case
export const useJSONPQuery = <T = unknown>(url: string): UseQueryResult<T> => {
	const baseUrl = getBaseUrl(url);

	return useQuery<T, Error>({
		queryKey: ["jsonp", baseUrl], // Cache key uses base URL without random parameters
		queryFn: (): Promise<T> => fetchJSONPWithCache(baseUrl) as Promise<T>,
		staleTime: 30 * 60 * 1000, // Consider data fresh for 30 minutes
	});
};

const cleanPrice = (price: string): number => {
	const priceMatch = price.match(/(\d+[\d\s]*)/);
	return priceMatch ? Number.parseInt(priceMatch[0].trim()) : 0;
};

// biome-ignore lint: cheerio types are not typed
type Row = any;
const isValidSearchItem = (row: Row): boolean => {
	return row.hasClass("itt_odd") || row.hasClass("itt_even");
};

export type SearchResultType = {
		title: string;
		id: string;
		// biome-ignore lint: this is a valid case
		room_title?: string;
		rating?: string;
		// biome-ignore lint: this is a valid case
		price_usd?: string;
		// biome-ignore lint: this is a valid case
		price_uah?: string;
		nights?: string;
		// biome-ignore lint: this is a valid case
		meal_type?: string;
		// biome-ignore lint: this is a valid case
		date_from?: string;
		// biome-ignore lint: this is a valid case
		date_till?: string;
		location?: string;
	};

type ParseSearchResponse = {
	results?: SearchResultType[];
	status: ResponsesStatus;
};

const searchSelectors = {
	items: "tbody > tr",
	title: "td:nth-child(4) > div",
	id: "td:nth-child(2) > input",
	// biome-ignore lint: this is a valid case
	room_title: "td:nth-child(6)",
	rating: "td:nth-child(5)",
	price: "td:nth-child(11) > a > span:nth-child(1) > span:nth-child(1)",
	// biome-ignore lint: this is a valid case
	price_uah: "td:nth-child(11) > a > span:nth-child(2) > span:nth-child(1)",
	nights: "td:nth-child(8)",
	// biome-ignore lint: this is a valid case
	meal_type: "td:nth-child(7)",
	// biome-ignore lint: this is a valid case
	date_from: "td:nth-child(10)",
	location: "td:nth-child(3)",
};

const parseSearchResponse = (response: Content): ParseSearchResponse => {
	try {
  const validContent = getValidContent(response);
  if (!validContent) {
    throw new Error("Invalid content");
  }
  const $ = cheerio.load(validContent);

  const results: SearchResultType[] = [];

  $(searchSelectors.items).each((_, item): void => {
    //! this is necessary to skip invalid items and cannot return an error as it will break the loop
    if (!isValidSearchItem($(item))) {
      return;
    }

    const title = $(item).find(searchSelectors.title).text().trim();
    const id = $(item).find(searchSelectors.id).attr("id");

    if (!(title && id)) {
      return;
    }

    const departureDate = $(item).find(searchSelectors.date_from).text().trim();
    const nights = $(item).find(searchSelectors.nights).text().trim();
    const returnDate = getReturnDate(Number(nights), departureDate);

    const result = {
      title,
      id,
      // biome-ignore lint: this is a valid case
      room_title: $(item).find(searchSelectors.room_title).attr("title"),
      rating: $(item).find(searchSelectors.rating).text().trim(),
      // biome-ignore lint: this is a valid case
      price_usd: $(item).find(searchSelectors.price).text().trim(),
      // biome-ignore lint: this is a valid case
      price_uah: $(item).find(searchSelectors.price_uah).text().trim(),
      nights: $(item).find(searchSelectors.nights).text().trim(),
      // biome-ignore lint: this is a valid case
      meal_type: $(item).find(searchSelectors.meal_type).text().trim(),
      // biome-ignore lint: this is a valid case
      date_from: departureDate,
      // biome-ignore lint: this is a valid case
      date_till: returnDate,
      location: $(item).find(searchSelectors.location).text().trim(),
    };

    results.push(result);
  });

  return {
    results,
    status: "200",
  };
} catch (error) {
  return {
    status: "400",
  };
}
};

const getReturnDate = (nights: number, departureDate: string): string => {
	const date = parse(departureDate, "dd.MM.yy", new Date());
	const returnDate = addDays(date, nights);
	return format(returnDate, "dd.MM.yy");
};

const selectors = {
	price: ".ittour_order_tour_price",
	tourId: ".ittour_order_block_title_box_id_tour strong",
	successMessage: "#tour_order_success_message .message strong",
	operator: "#itt_hidden_operator",
	hotelName: ".ittour_order_hotel_name",
	hotelLocation: ".ittour_order_city_name_green",
	hotelStars: ".number_stars",
	departureLocation: ".ittour_order_tour_info .ittour_order_left_list .ittour_order_description",
	departureDate: ".ittour_order_tour_info .ittour_order_left_list .ittour_order_description",
	returnDate: ".ittour_order_tour_info .ittour_order_left_list .ittour_order_description",
	transport: ".ittour_order_tour_info .ittour_order_left_list .ittour_order_description",
	roomType: ".ittour_order_tour_info .ittour_order_right_list .ittour_order_description",
	roomPeopleNumber: ".ittour_order_tour_info .ittour_order_right_list .ittour_order_description",
	mealType: ".ittour_order_tour_info .ittour_order_right_list .ittour_order_description",
	nights: ".ittour_order_tour_info .ittour_order_right_list .ittour_order_description",
};




type Content = { text: string } | string;
const getValidContent = (content: Content): string | null => {
	if (content instanceof Object && "text" in content && typeof content.text === "string") {
		return content.text;
	}
	if (typeof content === "string") {
		return content;
	}
	if (content && typeof content === "object") {
		return JSON.stringify(content);
	}
	return null;
};

// biome-ignore lint: this is a valid case
const parseITTourResponse = (response: Content): object => {
	try {
		const $ = cheerio.load(getValidContent(response) ?? "");

		const price = cleanPrice($(selectors.price).text().trim());

		const result = {
			tourId: $(selectors.tourId).text().trim(),
			// successMessage: $(selectors.successMessage).text().trim(),
			isSuccess: $(selectors.successMessage).length > 0,
			status: getStatus($),
			gallery: getGallery($),
			tour: {
				price: price,
				operator: $(selectors.operator).text().trim(),
				hotel: {
					name: $(selectors.hotelName).text().trim().split("\n")[0],
					location: $(selectors.hotelLocation).eq(0).text().trim(),
					stars: $(selectors.hotelStars).text().trim(),
				},
				departure: {
					location: $(selectors.departureLocation).first().text().trim(),
					date: $(selectors.departureDate).eq(1).text().trim(),
				},
				return: {
					date: $(selectors.returnDate).eq(2).text().trim(),
				},
				transport: $(selectors.transport).eq(3).text().trim(),
				roomType: $(selectors.roomType).eq(0).text().trim(),
				roomPeopleNumber: $(selectors.roomPeopleNumber).eq(1).text().trim(),
				mealType: $(selectors.mealType)
					.eq(2)
					.text()
					.trim()
					.split("\n")
					.map((item) => item.trim())
					.join(", "),
				nights: $(selectors.nights).eq(3).text().trim(),
			},
		};

		return result;
	} catch (error) {
		return {
			error: "Failed to parse response",
			raw: response,
		};
	}
};

const getGallery = ($: cheerio.CheerioAPI): string[] | undefined => {
	const gallery = $("#gallery_big_img_tour");
	return gallery
		?.html()
		?.split('src="')
		.map((item): string => item.split('"')[0])
		.filter((item): boolean => item.includes("https://www.ittour.com.ua/images/hotel_image/"));
};

// Helper function to determine tour status
const getStatus = ($: cheerio.CheerioAPI): string => {
	// biome-ignore lint: block is not prefered here
	if ($(".tour_not_found").length > 0) return "not_found";
	// biome-ignore lint: block is not prefered here
	if ($("#tour_order_success_message").length > 0) return "success";
	// biome-ignore lint: block is not prefered here
	if ($('.ittour_order_tour_price:contains("Готель у стопі")').length > 0) return "hotel_stop";
	// biome-ignore lint: block is not prefered here
	if ($('.ittour_order_tour_price:contains("Немає місць в готелі")').length > 0)
		return "no_hotel_rooms";
	// biome-ignore lint: block is not prefered here
	if ($('.ittour_order_tour_price:contains("Немає місць на авіарейсі")').length > 0)
		return "no_flight_seats";
	// biome-ignore lint: block is not prefered here
	if ($('.ittour_order_tour_price:contains("Перевірити ціну не вдалося")').length > 0)
		return "price_check_failed";
	return "available";
};

interface CountryResponse {
	country?: string;
	region?: string;
	hotel?: string;
	// biome-ignore lint: this case is valid
	departure_city?: string;
}

const getCountriesBaseUrl = (
	hotelRating: string = DEFAULT_HOTEL_RATING,
	transportType: string = DEFAULT_TRANSPORT_TYPE,
): string => {
	const url = new URL("https://www.ittour.com.ua/tour_search.php");
	url.searchParams.append("module_type", MODULE_TYPE);
	url.searchParams.append("id", MERCHANT_ID);
	url.searchParams.append("action", "get_package_search_filtered_field");
	url.searchParams.append("event", "select_transport");
	url.searchParams.append("hotel_rating_id", hotelRating);
	url.searchParams.append("transport_type_id", transportType);
	return url.toString();
};

const useCountries = (
	hotelRating: string = DEFAULT_HOTEL_RATING,
	transportType: string = DEFAULT_TRANSPORT_TYPE,
): UseQueryResult<CountryResponse> => {
	const baseUrl = getCountriesBaseUrl(hotelRating, transportType);
	return useJSONPQuery<CountryResponse>(baseUrl);
};

interface DepartureCityResponse {
	// biome-ignore lint: this is a valid case
	departure_city?: string;
	error?: string;
}

const getDepartureCitiesBaseUrl = (
	countryId: string,
	hotelRating: string = DEFAULT_HOTEL_RATING,
	transportType: string = DEFAULT_TRANSPORT_TYPE,
): string => {
	const url = new URL("https://www.ittour.com.ua/tour_search.php");
	url.searchParams.append("module_type", MODULE_TYPE);
	url.searchParams.append("id", MERCHANT_ID);
	url.searchParams.append("action", "get_package_search_filtered_field");
	url.searchParams.append("event", "select_country");
	url.searchParams.append("country_id", countryId);
	url.searchParams.append("hotel_rating_id", hotelRating);
	url.searchParams.append("transport_type_id", transportType);
	return url.toString();
};

const useDepartureCities = (
	countryId: string,
	hotelRating: string = DEFAULT_HOTEL_RATING,
	transportType: string = DEFAULT_TRANSPORT_TYPE,
): UseQueryResult<DepartureCityResponse> => {
	const baseUrl = getDepartureCitiesBaseUrl(countryId, hotelRating, transportType);
	return useJSONPQuery<DepartureCityResponse>(baseUrl);
};

// biome-ignore lint: this is a valid case
export interface ITTourSearchParams {
	callback: string;
	// biome-ignore lint: this is a valid case
	module_type: "tour_search";
	id: string;
	ver: "1";
	type: "2970";
	theme: "38";
	action: "package_tour_search";
	// biome-ignore lint: this is a valid case
	hotel_rating: string;
	// biome-ignore lint: this is a valid case
	items_per_page: string;
	hotel?: string;
	region?: string;
	// biome-ignore lint: this is a valid case
	child_age?: string;
	// biome-ignore lint: this is a valid case
	package_tour_type: "1";
	// biome-ignore lint: this is a valid case
	transport_type: string;
	country: string;
	food: string;
	adults: string;
	children: string;
	// biome-ignore lint: this is a valid case
	date_from: string;
	// biome-ignore lint: this is a valid case
	date_till: string;
	// biome-ignore lint: this is a valid case
	night_from: string;
	// biome-ignore lint: this is a valid case
	night_till: string;
	// biome-ignore lint: this is a valid case
	price_from: string;
	// biome-ignore lint: this is a valid case
	price_till: string;
	// biome-ignore lint: this is a valid case
	switch_price: "UAH";
	// biome-ignore lint: this is a valid case
	departure_city: string;
	// biome-ignore lint: this is a valid case
	module_location_url: string;
	preview: "1";
	_: string;
	page?: number;
}

// biome-ignore lint: this is a valid case
const buildITTourSearchURL = (params: Partial<ITTourSearchParams>): string => {
	// biome-ignore lint: this is a valid case
	const baseURL = "https://www.ittour.com.ua/tour_search.php";

	const defaultParams = {
		// biome-ignore lint: this is a valid case
		module_type: "tour_search",
		id: MERCHANT_ID,
		ver: "1",
		type: "2970",
		theme: "38",
		action: "package_tour_search",
		// biome-ignore lint: this is a valid case
		hotel_rating: "4+78",
		// biome-ignore lint: this is a valid case
		items_per_page: "50",
		hotel: "",
		region: "",
		// biome-ignore lint: this is a valid case
		child_age: "",
		// biome-ignore lint: this is a valid case
		package_tour_type: "1",
		// biome-ignore lint: this is a valid case
		transport_type: "2",
		country: params.country || "318",
		food: "498+512+560",
		adults: params.adults || "2",
		children: params.children || "0",
		// biome-ignore lint: this is a valid case
		date_from: params.date_from || "",
		// biome-ignore lint: this is a valid case
		date_till: params.date_till || "",
		// biome-ignore lint: this is a valid case
		night_from: params.night_from || "7",
		// biome-ignore lint: this is a valid case
		night_till: params.night_till || "9",
		// biome-ignore lint: this is a valid case
		price_from: "20000",
		// biome-ignore lint: this is a valid case
		price_till: "900000",
		// biome-ignore lint: this is a valid case
		switch_price: "UAH",
		// biome-ignore lint: this is a valid case
		departure_city: params.departure_city || "2014",
		// biome-ignore lint: this is a valid case
		module_location_url: encodeURIComponent(window.location.href),
		preview: "2",
		...params,
	};

	const url = new URL(baseURL);

	// Add parameters in specific order
	for (const [key, value] of Object.entries(defaultParams)) {
		if (value !== undefined && value !== null && !["callback", "_"].includes(key)) {
			url.searchParams.append(key, value.toString());
		}
	}

	// Fix encoding for specific parameters and ensure proper format
	const finalUrl = url
		.toString()
		.replace(/hotel_rating=4%2B78/g, "hotel_rating=4+78")
		.replace(/food=498%2B512%2B560/g, "food=498+512+560");

	return finalUrl;
};

// Add a helper function to validate search params
const validateSearchParams = (params: Partial<ITTourSearchParams>): boolean => {
	const requiredParams = [
		"date_from",
		"date_till",
		"adults",
		"children",
		"departure_city",
		"country",
		"night_from",
		"night_till",
	];

	const missingParams = requiredParams.filter(
		(param): boolean => !params[param as keyof ITTourSearchParams],
	);

	if (missingParams.length > 0) {
		return false;
	}

	return true;
};

const useFetchSearchResults = (
	params: Partial<ITTourSearchParams>,
	onPageLoad?: (results: SearchResultType[]) => void,
): UseQueryResult<SearchResultType[]> => {
	const baseUrl = useMemo(() => {
		if (!params || Object.keys(params).length === 0) {
			return null;
		}
		if (!validateSearchParams(params)) {
			return null;
		}
		return buildITTourSearchURL(params);
	}, [params]);

	return useQuery({
		queryKey: ["searchResults", baseUrl],
		queryFn: async (): Promise<SearchResultType[]> => {
			if (!baseUrl) {
				return [];
			}

			const response = await fetchJSONPWithCache(baseUrl);
			const parsedResponse = parseSearchResponse(response);

			if (parsedResponse.status === "400" || !parsedResponse.results) {
				throw new Error("Failed to parse search results");
			}

			onPageLoad?.(parsedResponse.results);
			return parsedResponse.results;
		},
		enabled: !!baseUrl,
		staleTime: 30 * 60 * 1000,
	});
};

export {
  useITTourRequest,
  parseITTourResponse,
  fetchJSONP,
  createTimestampCallback,
  parseSearchResponse,
  buildITTourSearchURL,
  useCountries,
  useDepartureCities,
  useFetchSearchResults,
  validateSearchParams,
  fetchJSONPWithCache,
};
