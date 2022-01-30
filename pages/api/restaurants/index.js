// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import restaurants from '../../../data/restaurants.json'
import { connectToDatabase } from '../../../lib/mongodb'
import dbConnect from '../../../lib/dbConnect'


export default async function handler(req, res) {

  await dbConnect()

  res.status(200).json(restaurants)
}
