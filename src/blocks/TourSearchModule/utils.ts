import * as cheerio from 'cheerio'

const DEFAULT_HOTEL_RATING = '4+78'
const DEFAULT_TRANSPORT_TYPE = '2'
const MODULE_TYPE = 'tour_search'
const MERCHANT_ID = 'DG400625103918756O740800'

const makeITTourRequest = (tourId: string) => {
  const { timestamp, jQueryCallback } = createTimestampCallback()

  const url = new URL('https://www.ittour.com.ua/tour_search.php')
  url.searchParams.append('callback', jQueryCallback)
  url.searchParams.append('module_type', 'tour_search')
  url.searchParams.append('id', 'DG400625103918756O740800')
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


const parseSearchResponse = (response: any) => {

  try {
    let htmlContent = ''
    if (response && typeof response.text === 'string') {
      htmlContent = response.text
    } else if (typeof response === 'string') {
      htmlContent = response
    } else if (response && typeof response === 'object') {
      htmlContent = JSON.stringify(response)
    }

    if (!htmlContent) {
      throw new Error('No valid HTML content found in response')
    }

    const $ = cheerio.load(htmlContent)
    const results: { title: string; id: string }[] = []

    $('tbody > tr').each((_, element) => {
      const $row = $(element)
      if ($row.hasClass('itt_odd') || $row.hasClass('itt_even')) {
        const title = $row.find('td:nth-child(4) > div').text().trim()
        const id = $row.find('td:nth-child(2) > input').attr('id')

        if (title && id) {
          results.push({ title, id })
        }
      }
    })

    return results

  } catch (error) {
    console.error('Error parsing ITTour response:', error)
    return {
      error: 'Failed to parse response',
      raw: response,
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


type DepartureCity = {
  id: string
  name: string
}

type ParseDepartureCitiesResponse = {
  cities: Array<DepartureCity>
  status: '200' | '400'
}

const parseDepartureCities = (htmlString: string): ParseDepartureCitiesResponse => {
  if (!htmlString) {
    throw new Error('No valid HTML content provided')
  }

  const result: Array<DepartureCity> = []
  try {
    const $ = cheerio.load(htmlString)

    const options = $('option')

    options.each((_, element) => {
      const $item = $(element)
      const id = $item.attr('value')
      const name = $item.text().trim()

      if (id && name) {
        result.push({ id, name })
      }
    })



    return {
      cities: result,
      status: '200',
    }
  } catch (error) {
    console.error('Error parsing departure cities:', error)
    return {
      cities: [],
      status: '400',
    }
  }
}

type Country = {
  id: string
  title: string
}

const getCountries = (countries: string): Country[] => {
  const $ = cheerio.load(countries)
  let result: Country[] = []
  const countriesList = $('option')
  countriesList.each((_, element) => {
    const $item = $(element)
    const id = $item.attr('value')
    const title = $item.text().trim()
    if (id && title) {
      result.push({ id, title })
    }
  })
  return result
}

type ParserSearchBilderResponse = {
  countries: Country[]
  status?: '200' | '400'
}

const parseSearchBilderResponse = (response: any): ParserSearchBilderResponse => {
  try {
    let { country, region, hotel, departure_city } = response

    if (!country || !region || !hotel || !departure_city) {
      throw new Error('No valid HTML content found in response')
    }

    const countries = getCountries(country)


    return {
      countries,
      status: '200'
    }

  } catch (error) {
    console.error('Error parsing ITTour response:', error)
    return {
      countries: [],
      status: '400',
    }
  }
}

const parseITTourResponse = (response: any) => {
  try {
    let htmlContent = ''
    if (response && typeof response.text === 'string') {
      htmlContent = response.text
    } else if (typeof response === 'string') {
      htmlContent = response
    } else if (response && typeof response === 'object') {
      htmlContent = JSON.stringify(response)
    }

    if (!htmlContent) {
      throw new Error('No valid HTML content found in response')
    }

    console.log('htmlContent', htmlContent)

    const $ = cheerio.load(htmlContent)

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
    items_per_page: '50',
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

  return url.toString()
    .replace(/hotel_rating=4%2B78/, 'hotel_rating=4+78')
    .replace(/food=498%2B512%2B560/, 'food=498+512+560');
};

export { makeITTourRequest, parseITTourResponse, fetchJSONP, createTimestampCallback, parseSearchResponse, buildITTourSearchURL, parseSearchBilderResponse, parseDepartureCities, fetchCountries, fetchDepartureCities }
