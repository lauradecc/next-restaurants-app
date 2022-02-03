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
      case 'PUT':
        return updateUser()
      case 'DELETE':
        return deleteUser()
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

  async function updateUser() {
    try {
      const { userId, restaurantId, action } = req.body
      let updatedUser
      if (action === 'ADD_FAVOURITE') {
        updatedUser = await User.findByIdAndUpdate(userId, { $push: { favouriteRestaurants: restaurantId } }, { new: true })
      } else if (action === 'REMOVE_FAVOURITE') {
        updatedUser = await User.findByIdAndUpdate(userId, { $pull: { favouriteRestaurants: restaurantId } }, { new: true })
      } else if (action === 'MODIFY_USER_DATA') {
        // TODO: allow user to modify username/password
      }
      return res.status(200).json({ code: 200, message: 'User successfully updated', updatedUser })
    } catch (error) {
      return res.status(400).json({ code: 400, message: 'Error updating user', error: error.message })
    }
  }

  async function deleteUser() {
    try {
      // const { id } = req.body
      const id = session.user._id
      const toDeleteUser = await User.findByIdAndDelete(id)
      return res.status(200).json({ code: 200, message: 'User successfully deleted', deletedUser: toDeleteUser })
    } catch (error) {
      return res.status(400).json({ code: 400, message: 'Error deleting user', error: error.message })
    }
  }

}
