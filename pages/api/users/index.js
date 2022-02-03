import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User.model'
import { getSession } from 'next-auth/react'


export default async function handler(req, res) {

  await dbConnect()

  const session = await getSession({ req })
  // console.log('Session ===>', session)

  if (session) {

    switch (req.method) {
      case 'GET':
        return getUsers()
      default:
        res.status(400).json({ code: 400, message: 'Method not managed' })
    }

  } else {
    res.status(401).json({ code: 401, message: 'Unauthorized' })
  }

  async function getUsers() {
    try {
      const users = await User.find()
      return res.status(200).json(users)
    } catch (error) {
      return res.status(400).json({ code: 400, message: 'Error retrieving users', error: error.message })
    }
  }

}
