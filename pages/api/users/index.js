import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User.model'


export default async function handler(req, res) {

  await dbConnect()

  const { method, body } = req // TODO: use body and update hardcoded data

  switch (method) {
    case 'GET':
      return getUsers()
    case 'POST':
      return createUser()
    case 'PUT':
      return updateUser()
    case 'DELETE':
      return deleteUser()
    default:
      res.status(400).json({ code: 400, message: "Method not managed" })
  }

  async function getUsers() {
    try {
      const users = await User.find()
      return res.status(200).json(users)
    } catch (error) {
      // res.status(400).json({ success: false })
      return res.status(400).json({ code: 400, message: "Error retrieving users", error: error.message })
    }
  }

  async function createUser() {
    try {
      // sin favourite restaurants (signup)
      const newUser = await User.create({ username: 'teo', password: 'teo', favouriteRestaurants: [] })
      return res.status(201).json({ code: 201, message: 'User created', newUser })
    } catch (error) {
      return res.status(400).json({ code: 400, message: "Error creating user", error: error.message })
    }
  }

  async function updateUser() {
    try {
      const id = '61f64f9ba4bc8f510df67251'
      const newUserInfo = { username: 'guille', password: 'guille', favouriteRestaurants: [] }
      const updatedUser = await User.findByIdAndUpdate(id, newUserInfo, { new: true })
      return res.status(200).json({ code: 200, message: 'User successfully updated', updatedUser })
    } catch (error) {
      return res.status(400).json({ code: 400, message: "Error updating user", error: error.message })
    }
  }

  async function deleteUser() {
    try {
      const id = '61f64f9ba4bc8f510df67251'
      const toDeleteUser = await User.findByIdAndDelete(id)
      return res.status(200).json({ code: 200, message: 'User successfully deleted', deletedUser: toDeleteUser })
    } catch (error) {
      return res.status(400).json({ code: 400, message: "Error deleting user", error: error.message })
    }
  }

}
