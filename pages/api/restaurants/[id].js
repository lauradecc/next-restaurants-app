import restaurants from '../../../data/restaurants.json'
// import dbConnect from '../../../lib/dbConnect'


export default function handler(req, res) {

  // await dbConnect()

  const { id } = req.query

  switch (req.method) {
    case 'GET':
      return getRestaurant()
    default:
      res.status(400).json({ code: 400, message: 'Method not managed' })
  }

  async function getRestaurant() {
    try {
      // TODO: modify when restaurants are in ddbb
      const restaurant = restaurants.filter(restaurant => restaurant.id.toString() === id.toString())
      if (restaurant) {
        const [restaurantObj] = restaurant
        return res.status(200).json(restaurantObj)
      } else {
        res.status(400).json({ code: 400, message: 'Restaurant not found' })
      }
    } catch (error) {
      return res.status(400).json({ code: 400, message: 'Error retrieving restaurant', error: error.message })
    }
  }

}
