import axios from 'axios'

const RestaurantsService = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/restaurants`
})

export const getRestaurants = () => RestaurantsService.get('/')

export const getRestaurant = id => RestaurantsService.get(`/${id}`)
