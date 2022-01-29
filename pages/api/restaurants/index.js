// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import restaurants from '../../../data/restaurants.json'

export default function handler(req, res) {
  res.status(200).json(restaurants)
}
