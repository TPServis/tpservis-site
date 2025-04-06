export type Room = {
  id: string
  title: string
  price_usd: number
  price_uah: number
  nights: number
  meal_type: string
  date_from: string
  date_till: string
}

export type TourSearchResultType = {
  title: string
  stars: number
  location: string
  rooms: Room[]
}
