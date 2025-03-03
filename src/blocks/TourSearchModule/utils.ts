import * as cheerio from 'cheerio'

const makeITTourRequest = (tourId: string) => {
  const timestamp = Date.now()
  const jQueryCallback = `jQuery${Math.random().toString().slice(2)}_${timestamp}`

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

  // Instead of using fetch, create a script element for JSONP
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url.toString()

    // Define the callback function
    ;(window as any)[jQueryCallback] = (data: any) => {
      resolve(data)
      document.body.removeChild(script)
      delete (window as any)[jQueryCallback]
    }

    script.onerror = () => {
      reject(new Error('Script loading failed'))
      document.body.removeChild(script)
      delete (window as any)[jQueryCallback]
    }

    document.body.appendChild(script)
  })
}

const cleanPrice = (price: string) => {
  const priceMatch = price.match(/(\d+[\d\s]*)/)
  return priceMatch ? parseInt(priceMatch[0].trim()) : ''
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

export { makeITTourRequest, parseITTourResponse }
