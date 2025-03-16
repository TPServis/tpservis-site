import * as cheerio from 'cheerio'
import { parse, addDays, format } from 'date-fns'

const DEFAULT_HOTEL_RATING = '4+78'
const DEFAULT_TRANSPORT_TYPE = '2'
const MODULE_TYPE = 'tour_search'
const MERCHANT_ID = 'DG400625103918756O740800'

type ResponsesStatus = '200' | '400'

const makeITTourRequest = (tourId: string) => {
  const { timestamp, jQueryCallback } = createTimestampCallback()

  const url = new URL('https://www.ittour.com.ua/tour_search.php')
  url.searchParams.append('callback', jQueryCallback)
  url.searchParams.append('module_type', MODULE_TYPE)
  url.searchParams.append('id', MERCHANT_ID)
  url.searchParams.append('ver', '1')
  url.searchParams.append('type', '2970')
  url.searchParams.append('theme', '38')
  url.searchParams.append('action', 'get_package_tour_order_form')
  url.searchParams.append('tour_id', `03-08-${tourId}`)
  url.searchParams.append('sharding_rule_id', '')
  url.searchParams.append('_', timestamp.toString())


  return fetchJSONP(url.toString(), jQueryCallback)
}

const createTimestampCallback = (): { timestamp: number; jQueryCallback: string } => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 100000000000000000);
  const jQueryCallback = `jQuery${random}_${timestamp}`;
  return { timestamp, jQueryCallback };
};

const fetchJSONP = (url: string, jQueryCallback: string): Promise<any> => {
  return new Promise((resolve, reject): void => {
    // Define the callback directly on window
    (window as any)[jQueryCallback] = function(data: any) {
      cleanup();
      resolve(data);
    };

    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';

    const cleanup = () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      delete (window as any)[jQueryCallback];
    };

    script.onerror = () => {
      cleanup();
      reject(new Error('Script loading failed'));
    };

    document.body.appendChild(script);
  });
};

const cleanPrice = (price: string) => {
  const priceMatch = price.match(/(\d+[\d\s]*)/)
  return priceMatch ? parseInt(priceMatch[0].trim()) : ''
}


const isValidSearchItem = (row: any) : boolean => {
  return row.hasClass('itt_odd') || row.hasClass('itt_even')
}

export type SearchResultType = {
  title: string
  id: string
  room_title?: string
  rating?: string
  price_usd?: string
  price_uah?: string
  nights?: string
  meal_type?: string
  date_from?: string
  date_till?: string
  location?: string
}

type ParseSearchResponse = {
  results?: SearchResultType[]
  status: ResponsesStatus
}

const searchSelectors = {
  items: 'tbody > tr',
  title: 'td:nth-child(4) > div',
  id: 'td:nth-child(2) > input',
  room_title: 'td:nth-child(6)',
  rating: 'td:nth-child(5)',
  price: 'td:nth-child(11) > a > span:nth-child(1) > span:nth-child(1)',
  price_uah: 'td:nth-child(11) > a > span:nth-child(2) > span:nth-child(1)',
  nights: 'td:nth-child(8)',
  meal_type: 'td:nth-child(7)',
  date_from: 'td:nth-child(10)',
  location: 'td:nth-child(3)',
}

const parseSearchResponse = (response: any): ParseSearchResponse => {

  try {
    const $ = cheerio.load(getValidContent(response))
    const results: SearchResultType[] = []

    $(searchSelectors.items).each((_, item) => {
      if (!isValidSearchItem($(item))) return

      const title = $(item).find(searchSelectors.title).text().trim()
      const id = $(item).find(searchSelectors.id).attr('id')
      const room_title = $(item).find(searchSelectors.room_title).attr('title')
      const rating = $(item).find(searchSelectors.rating).text().trim()
      const price_usd = $(item).find(searchSelectors.price).text().trim()
      const price_uah = $(item).find(searchSelectors.price_uah).text().trim()
      const nights = $(item).find(searchSelectors.nights).text().trim()
      const meal_type = $(item).find(searchSelectors.meal_type).text().trim()
      const date_from = $(item).find(searchSelectors.date_from).text().trim()
      const date_till = format(addDays(parse(date_from, 'dd.MM.yy', new Date()), parseInt(nights)), 'dd.MM.yy')
      const location = $(item).find(searchSelectors.location).text().trim()
      if (!title || !id) throw new Error('No valid title or id found')

      results.push({ title, id, room_title, rating, price_usd, price_uah, nights, meal_type, date_from, date_till, location })
    })

    return {
      results,
      status: '200',
    }

  } catch (error) {
    console.error('Error parsing ITTour response:', error)
    return {
      status: '400',
    }
  }
}

const selectors = {
  price: '.ittour_order_tour_price',
  tourId: '.ittour_order_block_title_box_id_tour strong',
  successMessage: '#tour_order_success_message .message strong',
  operator: '#itt_hidden_operator',
  hotelName: '.ittour_order_hotel_name',
  hotelLocation: '.ittour_order_city_name_green',
  hotelStars: '.number_stars',
  departureLocation: '.ittour_order_tour_info .ittour_order_left_list .ittour_order_description',
  departureDate: '.ittour_order_tour_info .ittour_order_left_list .ittour_order_description',
  returnDate: '.ittour_order_tour_info .ittour_order_left_list .ittour_order_description',
  transport: '.ittour_order_tour_info .ittour_order_left_list .ittour_order_description',
  roomType: '.ittour_order_tour_info .ittour_order_right_list .ittour_order_description',
  roomPeopleNumber: '.ittour_order_tour_info .ittour_order_right_list .ittour_order_description',
  mealType: '.ittour_order_tour_info .ittour_order_right_list .ittour_order_description',
  nights: '.ittour_order_tour_info .ittour_order_right_list .ittour_order_description',
}


type Option = {
  id: string
  name: string
}

type GetOptionsResponse = {
  options?: Option[]
  status: ResponsesStatus
}


const getOptions = (htmlString: string): GetOptionsResponse => {
  try {
    const $ = cheerio.load(htmlString)
    const result: Option[] = []

  $('option').each((_, item): void => {
    const id = $(item).attr('value')
    const name = $(item).text().trim()

    if (!id || !name) throw new Error('No valid id or name found')

    result.push({ id, name })
  })

  return {
      options: result,
      status: '200',
    }
  } catch (error) {
    console.error('Error parsing options:', error)
    return {
      status: '400',
    }
  }
}


type ParserSearchBilderResponse = {
  countries?: Option[]
  departureCities?: Option[]
  status?: '200' | '400'
}

const parseSearchBilderResponse = (response: any): ParserSearchBilderResponse => {
  try {
    let { country, departure_city } = response


    let countries: Option[] = []
    let departureCities: Option[] = []

    if(country) {
      const countriesResponse = getOptions(country)
      countries = countriesResponse.options ?? []
    }

    if(departure_city) {
      const departureCitiesResponse = getOptions(departure_city)
      departureCities = departureCitiesResponse.options ?? []
    }


    return {
      countries: countries ?? [],
      departureCities: departureCities ?? [],
      status: '200'
    }

  } catch (error) {
    console.error('Error parsing ITTour response:', error)
    return {
      status: '400',
    }
  }
}

const getValidContent = (content: any) => {
  if (content && typeof content.text === 'string') {
    return content.text
  } else if (typeof content === 'string') {
    return content
  } else if (content && typeof content === 'object') {
    return JSON.stringify(content)
  } else {
    throw new Error('No HTML valid content found')
  }
}

const parseITTourResponse = (response: any) => {
  try {
    const $ = cheerio.load(getValidContent(response))

    const price = cleanPrice($(selectors.price).text().trim())

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
          name: $(selectors.hotelName).text().trim().split('\n')[0],
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
          .split('\n')
          .map((item) => item.trim())
          .join(', '),
        nights: $(selectors.nights).eq(3).text().trim(),
      },
    }

    return result
  } catch (error) {
    console.error('Error parsing ITTour response:', error)
    return {
      error: 'Failed to parse response',
      raw: response,
    }
  }
}

const getGallery = ($: cheerio.CheerioAPI) => {
  const gallery = $('#gallery_big_img_tour')
  return gallery
    ?.html()
    ?.split('src="')
    .map((item) => item.split('"')[0])
    .filter((item) => item.includes('https://www.ittour.com.ua/images/hotel_image/'))
}

// Helper function to determine tour status
const getStatus = ($: cheerio.CheerioAPI): string => {
  if ($('.tour_not_found').length > 0) return 'not_found'
  if ($('#tour_order_success_message').length > 0) return 'success'
  if ($('.ittour_order_tour_price:contains("Готель у стопі")').length > 0) return 'hotel_stop'
  if ($('.ittour_order_tour_price:contains("Немає місць в готелі")').length > 0)
    return 'no_hotel_rooms'
  if ($('.ittour_order_tour_price:contains("Немає місць на авіарейсі")').length > 0)
    return 'no_flight_seats'
  if ($('.ittour_order_tour_price:contains("Перевірити ціну не вдалося")').length > 0)
    return 'price_check_failed'
  return 'available'
}


interface CountryResponse {
  country?: string
  region?: string
  hotel?: string
  departure_city?: string
}

const fetchCountries = async (
  hotelRating: string = DEFAULT_HOTEL_RATING,
  transportType: string = DEFAULT_TRANSPORT_TYPE,
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
  hotelRating: string = DEFAULT_HOTEL_RATING,
  transportType: string = DEFAULT_TRANSPORT_TYPE,
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

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface ITTourSearchParams {
  callback: string
  module_type: 'tour_search'
  id: string
  ver: '1'
  type: '2970'
  theme: '38'
  action: 'package_tour_search'
  hotel_rating: string
  items_per_page: string
  hotel?: string
  region?: string
  child_age?: string
  package_tour_type: '1'
  transport_type: string
  country: '318'
  food: string
  adults: string
  children: string
  date_from: string
  date_till: string
  night_from: string
  night_till: string
  price_from: string
  price_till: string
  switch_price: 'UAH'
  departure_city: string
  module_location_url: string
  preview: '1'
  _: string
  page?: number
}

const buildITTourSearchURL = (params: Partial<ITTourSearchParams>): string => {
  const { timestamp, jQueryCallback } = createTimestampCallback();
  const baseURL = 'https://www.ittour.com.ua/tour_search.php';

  const defaultParams = {
    callback: jQueryCallback,
    module_type: 'tour_search',
    id: 'DG400625103918756O740800',
    ver: '1',
    type: '2970',
    theme: '38',
    action: 'package_tour_search',
    hotel_rating: '4+78',
    items_per_page: '100',
    hotel: '',
    region: '',
    child_age: '',
    package_tour_type: '1',
    transport_type: '2',
    country: '318',
    food: '498+512+560',
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
    module_location_url: window.location.href,
    preview: '1',
    _: timestamp.toString(),
    ...params
  };

  const url = new URL(baseURL);
  Object.entries(defaultParams).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(key, value.toString());
    }
  });

  // Add page parameter if provided
  if (params.page && params.page > 1) {
    url.searchParams.append('page', params.page.toString());
  }

  return url.toString()
    .replace(/hotel_rating=4%2B78/, 'hotel_rating=4+78')
    .replace(/food=498%2B512%2B560/, 'food=498+512+560');
};

const fetchAllPages = async (
  initialParams: Partial<ITTourSearchParams>,
  onPageLoad?: (results: SearchResultType[]) => void
): Promise<SearchResultType[]> => {
  let allResults: SearchResultType[] = [];
  let currentPage = 1;
  let hasMoreResults = true;

  while (hasMoreResults) {
    // Add delay between requests to avoid rate limiting
    if (currentPage > 1) {
      await delay(1000); // 1 second delay between requests
    }

    const { timestamp, jQueryCallback } = createTimestampCallback();
    const url = buildITTourSearchURL({
      ...initialParams,
      page: currentPage,
      _: timestamp.toString(),
      callback: jQueryCallback
    });

    try {
      const response = await fetchJSONP(url, jQueryCallback);
      const parsedResponse = parseSearchResponse(response);

      if (parsedResponse.status === '400' || !parsedResponse.results || parsedResponse.results.length === 0) {
        hasMoreResults = false;
      } else {
        allResults = [...allResults, ...parsedResponse.results];
        onPageLoad?.(parsedResponse.results);

        // If we get less than the requested items_per_page, we've reached the last page
        if (parsedResponse.results.length < parseInt(initialParams.items_per_page || '100')) {
          hasMoreResults = false;
        } else {
          currentPage++;
        }
      }
    } catch (error) {
      console.error(`Error fetching page ${currentPage}:`, error);
      hasMoreResults = false;
    }
  }

  return allResults;
};

export { makeITTourRequest, parseITTourResponse, fetchJSONP, createTimestampCallback, parseSearchResponse, buildITTourSearchURL, parseSearchBilderResponse, fetchCountries, fetchDepartureCities, getOptions, fetchAllPages }
