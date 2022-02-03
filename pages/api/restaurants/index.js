import restaurants from '../../../data/restaurants.json'
// import dbConnect from '../../../lib/dbConnect'


export default async function handler(req, res) {

  // await dbConnect()

  switch (req.method) {
    case 'GET':
      return getRestaurants()
    default:
      res.status(400).json({ code: 400, message: 'Method not managed' })
  }

  async function getRestaurants() {
    try {
      return res.status(200).json(restaurants)
    } catch (error) {
      return res.status(400).json({ code: 400, message: 'Error retrieving users', error: error.message })
    }
  }

}
